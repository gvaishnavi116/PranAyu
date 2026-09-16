import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'pranayu_super_secret_ayurveda_key_2026';

/**
 * Hash a password using Node's native PBKDF2 (similar security to bcrypt).
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

/**
 * Verify a password against a hash and salt.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === checkHash;
}

interface JwtPayload {
  userId: string;
  email: string;
  exp: number;
}

/**
 * Base64URL encoding helpers for light-weight JWT
 */
function base64UrlEncode(str: string | Buffer): string {
  const base64 = typeof str === 'string' ? Buffer.from(str).toString('base64') : str.toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Sign a custom JWT token
 */
export function signToken(userId: string, email: string, expiresInSeconds = 86400 * 7): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = {
    userId,
    email,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac('sha256', JWT_SECRET);
  hmac.update(signatureInput);
  const signature = base64UrlEncode(hmac.digest());

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify and decode a JWT token. Returns payload if valid, null otherwise.
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;

    // Verify signature
    const signatureInput = `${header}.${payload}`;
    const hmac = crypto.createHmac('sha256', JWT_SECRET);
    hmac.update(signatureInput);
    const expectedSignature = base64UrlEncode(hmac.digest());

    if (signature !== expectedSignature) {
      return null;
    }

    const decodedPayload = JSON.parse(base64UrlDecode(payload)) as JwtPayload;

    // Check expiration
    if (Date.now() / 1000 > decodedPayload.exp) {
      return null; // Expired
    }

    return decodedPayload;
  } catch (e) {
    return null;
  }
}
