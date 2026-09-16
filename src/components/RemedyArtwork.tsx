import React from 'react';

interface RemedyArtworkProps {
  id: string;
  title: string;
  category?: string;
  className?: string;
}

export default function RemedyArtwork({ id, title, className = 'w-full h-full' }: RemedyArtworkProps) {
  const lower = (id + ' ' + title).toLowerCase();

  // 1. Ginger-Tulsi Kadha
  if (id === 'rem_1' || lower.includes('kadha') || lower.includes('tulsi') || lower.includes('ginger-tulsi')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/25 via-rose-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-rose-100/20 to-transparent animate-pulse-glow" />
        
        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="clayCupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c5a68c" />
              <stop offset="50%" stopColor="#a3765a" />
              <stop offset="100%" stopColor="#784e36" />
            </linearGradient>
            <linearGradient id="teaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="lotusPinkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>

          {/* Sparkles */}
          <circle cx="100" cy="70" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="300" cy="80" r="2.5" fill="#f472b6" className="animate-sparkle-delay" />

          {/* Floating Lotus Blossom Background */}
          <path d="M 200 220 Q 180 180 140 210 Q 180 230 200 220 Z" fill="url(#lotusPinkGrad)" opacity="0.6" />
          <path d="M 200 220 Q 220 180 260 210 Q 220 230 200 220 Z" fill="url(#lotusPinkGrad)" opacity="0.6" />
          <path d="M 200 220 Q 200 170 200 220 Z" fill="#fecdd3" opacity="0.8" />

          {/* Clay Saucer */}
          <ellipse cx="200" cy="240" rx="90" ry="18" fill="#784e36" opacity="0.8" />
          <ellipse cx="200" cy="238" rx="85" ry="14" fill="#a3765a" />

          {/* River Clay Mug Body */}
          <path d="M 140 140 C 140 230, 260 230, 260 140 Z" fill="url(#clayCupGrad)" stroke="#5c3823" strokeWidth="2" />
          <path d="M 260 160 C 290 160, 290 200, 260 205" fill="none" stroke="#a3765a" strokeWidth="12" strokeLinecap="round" />

          {/* Tea Liquid surface */}
          <ellipse cx="200" cy="140" rx="60" ry="14" fill="url(#teaGrad)" />
          
          {/* Floating Ginger Slice */}
          <g className="animate-float-bob">
            <ellipse cx="185" cy="140" rx="14" ry="7" fill="#fef08a" opacity="0.9" />
            <ellipse cx="185" cy="140" rx="10" ry="5" fill="#fde047" opacity="0.9" />
          </g>

          {/* Fresh Tulsi Leaf Floating */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '230px 138px' }}>
            <path d="M 220 138 Q 235 125 240 138 Q 230 148 220 138 Z" fill="#15803d" />
            <path d="M 220 138 Q 230 133 240 138" stroke="#86efac" strokeWidth="1" />
          </g>

          {/* Steam Trails */}
          <path d="M 180 120 Q 170 90 185 60" fill="none" stroke="#fce7f3" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 200 115 Q 215 80 200 50" fill="none" stroke="#fff1f2" strokeWidth="4" strokeLinecap="round" opacity="0.9" className="animate-steam-2" />
          <path d="M 220 120 Q 210 90 225 65" fill="none" stroke="#fecdd3" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />

          {/* Floating Petals */}
          <g className="animate-leaf-1">
            <path d="M 100 120 Q 115 105 120 120 Q 110 130 100 120 Z" fill="#f472b6" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 290 110 Q 305 95 310 110 Q 300 120 290 110 Z" fill="#be185d" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 2. Golden Milk (Haldi Doodh)
  if (id === 'rem_2' || lower.includes('golden milk') || lower.includes('haldi doodh')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-900/30 via-orange-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-yellow-100/30 to-transparent animate-pulse-glow" />
        
        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldenMilk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="clayMug" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="100%" stopColor="#d8b4fe" />
            </linearGradient>
          </defs>

          {/* Golden Aura Rings */}
          <circle cx="200" cy="150" r="110" fill="#fde047" opacity="0.18" className="animate-pulse-glow" />
          <circle cx="200" cy="150" r="80" fill="#fef08a" opacity="0.25" />

          {/* Sparkles */}
          <circle cx="110" cy="80" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="290" cy="90" r="3.5" fill="#fef08a" className="animate-sparkle-delay" />

          {/* Coaster */}
          <ellipse cx="200" cy="245" rx="80" ry="15" fill="#78350f" opacity="0.7" />

          {/* Mug */}
          <path d="M 150 120 L 160 235 C 160 245, 240 245, 240 235 L 250 120 Z" fill="#9a3412" stroke="#78350f" strokeWidth="2" />

          {/* Golden Milk Filling */}
          <path d="M 153 130 L 161 230 C 161 238, 239 238, 239 230 L 247 130 Z" fill="url(#goldenMilk)" />

          {/* Milk Foam Surface */}
          <ellipse cx="200" cy="130" rx="47" ry="12" fill="#fef08a" />
          <circle cx="190" cy="130" r="3" fill="#854d0e" />
          <circle cx="205" cy="128" r="2.5" fill="#854d0e" />
          <circle cx="198" cy="133" r="2.5" fill="#854d0e" />

          {/* Star Anise Accent */}
          <g className="animate-float-bob">
            <path d="M 215 125 L 220 135 L 210 132 L 222 128 Z" fill="#713f12" />
          </g>

          {/* Golden Steam */}
          <path d="M 185 110 Q 175 80 190 50" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 215 110 Q 225 75 210 45" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />

          {/* Turmeric Root & Flower Accents */}
          <g className="animate-leaf-1">
            <path d="M 80 210 Q 100 190 120 210 Q 95 225 80 210 Z" fill="#eab308" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 280 200 Q 300 180 320 200 Q 295 215 280 200 Z" fill="#f59e0b" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 3. CCF Tea (Cumin-Coriander-Fennel)
  if (id === 'rem_3' || lower.includes('ccf') || lower.includes('cumin-coriander')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/25 via-stone-900/20 to-emerald-950/20 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-stone-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e6d5c3" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="amberTea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Sparkles */}
          <circle cx="90" cy="90" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="310" cy="80" r="2.5" fill="#a7f3d0" className="animate-sparkle-delay" />

          {/* Glass Teapot Body */}
          <circle cx="200" cy="170" r="75" fill="url(#glassGrad)" stroke="#d5bea6" strokeWidth="2.5" />
          <circle cx="200" cy="175" r="68" fill="url(#amberTea)" opacity="0.85" />

          {/* Spout & Handle */}
          <path d="M 270 150 Q 320 130 310 180" fill="none" stroke="#d5bea6" strokeWidth="10" strokeLinecap="round" />
          <path d="M 130 150 C 90 150, 90 210, 130 210" fill="none" stroke="#d5bea6" strokeWidth="8" strokeLinecap="round" />

          {/* Teapot Lid */}
          <ellipse cx="200" cy="98" rx="35" ry="10" fill="#a3765a" />
          <circle cx="200" cy="85" r="10" fill="#be185d" />

          {/* Seeds inside */}
          <g className="animate-float-bob">
            <ellipse cx="180" cy="160" rx="5" ry="2" fill="#78350f" transform="rotate(20 180 160)" />
            <ellipse cx="210" cy="180" rx="5" ry="2" fill="#78350f" transform="rotate(-15 210 180)" />
            <circle cx="195" cy="195" r="3.5" fill="#fef08a" />
            <circle cx="220" cy="165" r="3.5" fill="#84cc16" />
          </g>

          {/* Steam from Spout */}
          <path d="M 310 170 Q 330 140 320 110" fill="none" stroke="#fff1f2" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />

          {/* Drifting Seeds / Petals */}
          <g className="animate-leaf-1">
            <path d="M 80 120 Q 95 105 100 120 Q 90 130 80 120 Z" fill="#be185d" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 290 120 Q 305 105 310 120 Q 300 130 290 120 Z" fill="#10b981" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 4. Ashwagandha Latte / Night Tonic
  if (id === 'rem_4' || lower.includes('ashwagandha') || lower.includes('latte')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/40 to-stone-950 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/25 via-indigo-900/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightMug" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#353129" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>

          {/* Crescent Moon & Twinkling Stars */}
          <path d="M 310 60 A 24 24 0 1 0 334 84 A 19 19 0 1 1 310 60 Z" fill="#fef08a" opacity="0.95" />
          <circle cx="90" cy="60" r="2.5" fill="#ffffff" className="animate-sparkle" />
          <circle cx="130" cy="90" r="2" fill="#e0e7ff" className="animate-sparkle-delay" />
          <circle cx="270" cy="110" r="2" fill="#ffffff" className="animate-sparkle" />

          {/* Dark Clay Mug */}
          <path d="M 145 130 L 155 240 C 155 250, 245 250, 245 240 L 255 130 Z" fill="url(#nightMug)" stroke="#be185d" strokeWidth="2.5" />
          <path d="M 255 150 C 285 150, 285 200, 255 205" fill="none" stroke="#be185d" strokeWidth="8" strokeLinecap="round" />

          {/* Nutmeg Foam Surface with Heart Art */}
          <ellipse cx="200" cy="130" rx="52" ry="12" fill="#fef3c7" />
          <ellipse cx="200" cy="130" rx="35" ry="8" fill="#fde68a" />
          <path d="M 200 134 Q 190 126 185 130 Q 195 134 200 134 Z" fill="#be185d" />
          <path d="M 200 134 Q 210 126 215 130 Q 205 134 200 134 Z" fill="#be185d" />

          {/* Night Steam */}
          <path d="M 180 115 Q 165 80 185 45" fill="none" stroke="#fecdd3" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 220 115 Q 235 80 215 45" fill="none" stroke="#f472b6" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 5. Triphala Gentle Detox Cleanser
  if (id === 'rem_5' || lower.includes('triphala gentle') || lower.includes('detox cleanser')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-stone-900/30 to-emerald-950/25 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-yellow-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="woodBowl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a3765a" />
              <stop offset="100%" stopColor="#5c3823" />
            </linearGradient>
          </defs>

          {/* Sparkles */}
          <circle cx="100" cy="75" r="3" fill="#84cc16" className="animate-sparkle" />
          <circle cx="300" cy="85" r="3" fill="#fde047" className="animate-sparkle-delay" />

          {/* Clay Bowl */}
          <path d="M 130 160 C 130 250, 270 250, 270 160 Z" fill="url(#woodBowl)" stroke="#3e2313" strokeWidth="2.5" />
          
          {/* Churna Powder Mound */}
          <ellipse cx="200" cy="160" rx="68" ry="18" fill="#a16207" />
          <path d="M 150 160 Q 200 130 250 160 Z" fill="#ca8a04" />

          {/* Three Native Fruits (Amla, Haritaki, Bibhitaki) */}
          <g className="animate-float-bob">
            <circle cx="120" cy="210" r="18" fill="#65a30d" />
            <circle cx="115" cy="205" r="14" fill="#84cc16" />
            <ellipse cx="280" cy="210" rx="16" ry="22" fill="#78350f" transform="rotate(-15 280 210)" />
          </g>

          {/* Lotus Backdrop */}
          <path d="M 200 100 Q 180 70 150 90 Q 180 110 200 100 Z" fill="#be185d" opacity="0.8" />
          <path d="M 200 100 Q 220 70 250 90 Q 220 110 200 100 Z" fill="#e11d48" opacity="0.8" />

          {/* Floating Petals */}
          <g className="animate-leaf-1">
            <path d="M 90 130 Q 105 115 110 130 Q 100 140 90 130 Z" fill="#84cc16" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 290 120 Q 305 105 310 120 Q 300 130 290 120 Z" fill="#be185d" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 6. Aloe Vera & Mint Cooler
  if (id === 'rem_6' || lower.includes('mint cooler') || (lower.includes('aloe vera') && lower.includes('cooler'))) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950/30 via-teal-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-300/40 via-teal-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aloeJuice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Cooling Sparkles */}
          <circle cx="100" cy="70" r="3.5" fill="#a7f3d0" className="animate-sparkle" />
          <circle cx="300" cy="80" r="3" fill="#6ee7b7" className="animate-sparkle-delay" />

          {/* Tall Highball Glass */}
          <path d="M 160 95 L 170 240 C 170 248, 230 248, 230 240 L 240 95 Z" fill="url(#aloeJuice)" opacity="0.9" stroke="#064e3b" strokeWidth="2.5" />
          
          {/* Glass Surface */}
          <ellipse cx="200" cy="95" rx="40" ry="10" fill="#a7f3d0" />

          {/* Aloe Slice Rim Accent */}
          <path d="M 235 85 Q 260 70 265 85 Q 250 100 235 85 Z" fill="#10b981" stroke="#047857" strokeWidth="1.5" />

          {/* Ice Cubes */}
          <g className="animate-float-bob">
            <rect x="180" y="130" width="22" height="22" rx="4" fill="#ffffff" opacity="0.75" transform="rotate(15 180 130)" />
            <rect x="195" y="170" width="20" height="20" rx="4" fill="#ffffff" opacity="0.65" transform="rotate(-12 195 170)" />
          </g>

          {/* Cool Vapors */}
          <path d="M 180 85 Q 165 55 185 25" fill="none" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 215 85 Q 230 50 210 20" fill="none" stroke="#6ee7b7" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />

          {/* Mint Leaves Floating */}
          <g className="animate-leaf-1">
            <path d="M 110 160 Q 125 145 130 160 Q 120 170 110 160 Z" fill="#059669" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 285 150 Q 300 135 305 150 Q 295 160 285 150 Z" fill="#10b981" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 7. Shallaki & Nirgundi Decoction (Knee Pain & Arthritis)
  if (id === 'rem_7' || lower.includes('shallaki') || lower.includes('nirgundi')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-orange-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/40 via-orange-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kansaBowl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Sparkles */}
          <circle cx="110" cy="70" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="290" cy="80" r="2.5" fill="#f97316" className="animate-sparkle-delay" />

          {/* Kansa Ayurvedic Pan Base */}
          <ellipse cx="200" cy="240" rx="95" ry="20" fill="#451a03" />

          {/* Pot/Bowl Body */}
          <path d="M 130 150 C 130 240, 270 240, 270 150 Z" fill="url(#kansaBowl)" stroke="#451a03" strokeWidth="3" />

          {/* Copper Fluid Surface */}
          <ellipse cx="200" cy="150" rx="68" ry="16" fill="#b45309" />

          {/* Shallaki Resin Drops floating */}
          <g className="animate-float-bob">
            <circle cx="180" cy="150" r="5" fill="#fef08a" />
            <circle cx="215" cy="152" r="6" fill="#fde047" />
            <circle cx="198" cy="148" r="4" fill="#fbbf24" />
          </g>

          {/* Soothing Vapors */}
          <path d="M 180 135 Q 165 95 185 55" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 220 135 Q 235 95 215 55" fill="none" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />

          {/* Nirgundi Herbal Leaves Drifting */}
          <g className="animate-leaf-1">
            <path d="M 90 140 Q 105 125 110 140 Q 100 150 90 140 Z" fill="#15803d" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 290 130 Q 305 115 310 130 Q 300 140 290 130 Z" fill="#047857" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 8. Mahanarayana Oil & Warm Sesame Poultice (Janu Basti)
  if (id === 'rem_8' || lower.includes('mahanarayana') || lower.includes('poultice') || lower.includes('sesame oil')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/35 via-rose-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-rose-100/25 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sparkles */}
          <circle cx="100" cy="70" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="300" cy="75" r="2.5" fill="#f472b6" className="animate-sparkle-delay" />

          {/* Brass Plate */}
          <ellipse cx="200" cy="235" rx="100" ry="22" fill="#78350f" />
          <ellipse cx="200" cy="232" rx="92" ry="17" fill="#d97706" />

          {/* Potali Compress Pouch */}
          <g className="animate-float-bob">
            {/* Cotton Pouch Base */}
            <path d="M 160 180 C 150 225, 250 225, 240 180 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Tied Top */}
            <path d="M 190 150 L 210 150 L 205 180 L 195 180 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Red String Tie */}
            <rect x="190" y="170" width="20" height="5" rx="2" fill="#be185d" />
          </g>

          {/* Warm Diya Lamp Next to Pouch */}
          <path d="M 280 210 C 270 235, 320 235, 310 210 Z" fill="#9a3412" />
          <ellipse cx="295" cy="200" r="6" fill="#fde047" className="animate-pulse-glow" />

          {/* Soothing Vapors */}
          <path d="M 185 140 Q 170 100 190 60" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 215 140 Q 230 100 210 60" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 9. Sunthi (Dry Ginger) & Castor Oil Paste (Joint Swelling)
  if (id === 'rem_9' || lower.includes('sunthi') || lower.includes('castor oil')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/25 via-stone-900/30 to-amber-900/20 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-yellow-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sparkles */}
          <circle cx="110" cy="75" r="3" fill="#fde047" className="animate-sparkle" />
          <circle cx="290" cy="85" r="2.5" fill="#f59e0b" className="animate-sparkle-delay" />

          {/* Mortar & Pestle (Kharal) */}
          <path d="M 130 160 C 130 250, 270 250, 270 160 Z" fill="#44403c" stroke="#1c1917" strokeWidth="3" />
          
          {/* Ginger Castor Paste Inside */}
          <ellipse cx="200" cy="160" rx="68" ry="18" fill="#ca8a04" />

          {/* Pestle Handle */}
          <path d="M 210 90 L 230 170" stroke="#78716c" strokeWidth="22" strokeLinecap="round" />

          {/* Golden Castor Oil Droplet */}
          <g className="animate-float-bob">
            <path d="M 175 120 Q 175 100 185 110 Q 195 120 175 120 Z" fill="#facc15" />
          </g>

          {/* Soothing Vapors */}
          <path d="M 170 145 Q 155 105 175 65" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 220 145 Q 235 105 215 65" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 10. Fenugreek (Methi) & Flaxseed Porridge
  if (id === 'rem_10' || lower.includes('fenugreek') || lower.includes('methi') || lower.includes('flaxseed')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-900/25 via-yellow-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200/40 via-amber-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Porridge Bowl */}
          <path d="M 130 150 C 130 240, 270 240, 270 150 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          
          {/* Porridge Surface */}
          <ellipse cx="200" cy="150" rx="68" ry="18" fill="#fde047" />

          {/* Sprinkled Flaxseeds & Methi */}
          <g className="animate-float-bob">
            <circle cx="180" cy="150" r="3" fill="#78350f" />
            <circle cx="195" cy="148" r="3.5" fill="#78350f" />
            <circle cx="210" cy="152" r="3" fill="#84cc16" />
            <circle cx="225" cy="149" r="2.5" fill="#84cc16" />
          </g>

          {/* Steam */}
          <path d="M 180 135 Q 165 95 185 55" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 220 135 Q 235 95 215 55" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 11. Dashamoola Kashayam (Sciatica & Back Pain)
  if (id === 'rem_11' || lower.includes('dashamoola') || lower.includes('sciatica')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-orange-950/35 via-amber-950/25 to-stone-950 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/40 via-orange-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ancient Brass Kashayam Pot */}
          <path d="M 140 140 C 130 230, 270 230, 260 140 Z" fill="#b45309" stroke="#78350f" strokeWidth="3" />
          <ellipse cx="200" cy="140" rx="60" ry="15" fill="#78350f" />

          {/* 10-Root Bundle Accent */}
          <g className="animate-float-bob">
            <path d="M 270 180 L 320 210" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
            <path d="M 275 190 L 325 220" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Steam */}
          <path d="M 180 125 Q 165 85 185 45" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 220 125 Q 235 85 215 45" fill="none" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 12. Hadjod & Turmeric Milk (Bone Density)
  if (id === 'rem_12' || lower.includes('hadjod') || lower.includes('bone')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-900/30 via-emerald-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-emerald-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Calcium Energy Sparkles */}
          <circle cx="100" cy="70" r="3.5" fill="#ffffff" className="animate-sparkle" />
          <circle cx="300" cy="80" r="3" fill="#fde047" className="animate-sparkle-delay" />

          {/* Golden Cup */}
          <path d="M 150 120 L 160 235 C 160 245, 240 245, 240 235 L 250 120 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
          
          {/* Milk Surface */}
          <ellipse cx="200" cy="120" rx="48" ry="12" fill="#fef08a" />

          {/* Hadjod Jointed Green Stem */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '235px 110px' }}>
            <rect x="235" y="80" width="10" height="35" rx="3" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
            <rect x="235" y="55" width="10" height="28" rx="3" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
          </g>

          {/* Steam */}
          <path d="M 180 105 Q 165 70 185 35" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 215 105 Q 230 70 210 35" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 13. Guggulu & Ajwain Warm Herbal Compress
  if (id === 'rem_13' || lower.includes('guggulu') || lower.includes('ajwain')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-rose-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-rose-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Potali Pouch */}
          <g className="animate-float-bob">
            <path d="M 150 170 C 140 225, 260 225, 250 170 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
            <path d="M 190 130 L 210 130 L 205 170 L 195 170 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
            <rect x="190" y="155" width="20" height="6" rx="2" fill="#be185d" />
          </g>

          {/* Ajwain Seeds around */}
          <circle cx="120" cy="220" r="2.5" fill="#78350f" />
          <circle cx="130" cy="225" r="2.5" fill="#78350f" />
          <circle cx="270" cy="220" r="2.5" fill="#78350f" />

          {/* Steam */}
          <path d="M 180 120 Q 165 80 185 40" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 220 120 Q 235 80 215 40" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 14. Punarnava & Giloy Decoction
  if (id === 'rem_14' || lower.includes('punarnava') || lower.includes('giloy')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950/35 via-teal-950/25 to-stone-900/35 flex items-center justify-center ${className}`}>
        {/* Soothing Joint & Uric Acid Detox Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-300/40 via-teal-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brassLota" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="kashayamFluid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Sparkles */}
          <circle cx="100" cy="70" r="3" fill="#6ee7b7" className="animate-sparkle" />
          <circle cx="300" cy="75" r="3.5" fill="#fde047" className="animate-sparkle-delay" />

          {/* Brass Lota Plate Base */}
          <ellipse cx="200" cy="240" rx="85" ry="16" fill="#451a03" opacity="0.8" />
          <ellipse cx="200" cy="237" rx="78" ry="12" fill="#b45309" />

          {/* Traditional Ayurvedic Copper/Brass Lota Body */}
          <path d="M 150 140 C 130 190, 140 230, 200 230 C 260 230, 270 190, 250 140 Z" fill="url(#brassLota)" stroke="#451a03" strokeWidth="2.5" />
          
          {/* Lota Neck & Rim */}
          <path d="M 160 140 C 160 125, 240 125, 240 140 Z" fill="#d97706" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="200" cy="125" rx="42" ry="10" fill="url(#brassLota)" stroke="#78350f" strokeWidth="2" />
          
          {/* Decoction Surface Inside Rim */}
          <ellipse cx="200" cy="125" rx="36" ry="8" fill="url(#kashayamFluid)" />

          {/* Twining Giloy Heart-Leafed Vine around the Brass Lota */}
          <path d="M 130 200 Q 160 170 180 210 Q 210 240 260 180" fill="none" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          
          {/* Giloy Heart Leaves */}
          <g className="animate-float-bob">
            {/* Heart leaf 1 */}
            <path d="M 140 180 C 125 170, 120 195, 140 200 C 150 190, 145 175, 140 180 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            {/* Heart leaf 2 */}
            <path d="M 250 170 C 265 160, 270 185, 250 190 C 240 180, 245 165, 250 170 Z" fill="#10b981" stroke="#047857" strokeWidth="1" />
          </g>

          {/* Rising Warm Healing Steam */}
          <path d="M 180 110 Q 165 70 185 30" fill="none" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 220 110 Q 235 70 215 30" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />

          {/* Punarnava Pink & Gold Petals */}
          <g className="animate-leaf-1">
            <path d="M 90 130 Q 105 115 110 130 Q 100 140 90 130 Z" fill="#f472b6" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 300 120 Q 315 105 320 120 Q 310 130 300 120 Z" fill="#fbbf24" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 15. Bala & Ashwagandha Nourishing Tonic
  if (id === 'rem_15' || lower.includes('bala') || lower.includes('muscle atrophy')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-yellow-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200/40 via-amber-100/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bronze Kansa Bowl */}
          <path d="M 130 150 C 130 240, 270 240, 270 150 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
          
          {/* Tonic Milk */}
          <ellipse cx="200" cy="150" rx="68" ry="18" fill="#fef08a" />

          {/* Yellow Bala Petals */}
          <g className="animate-float-bob">
            <circle cx="180" cy="150" r="5" fill="#facc15" />
            <circle cx="215" cy="152" r="5" fill="#fde047" />
          </g>

          {/* Steam */}
          <path d="M 180 135 Q 165 95 185 55" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 220 135 Q 235 95 215 55" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 16. Eucalyptus & Camphor Liniment
  if (id === 'rem_16' || lower.includes('eucalyptus') || lower.includes('liniment')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-teal-950/40 via-cyan-950/30 to-emerald-950/40 flex items-center justify-center ${className}`}>
        {/* Cooling Soothing Vapor Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-300/35 via-teal-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amberBottleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="40%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="oilDropGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="camphorCrystal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="eucalyptusLeafGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Sparkles / Cooling Ice Crystals */}
          <circle cx="85" cy="65" r="3.5" fill="#a7f3d0" className="animate-sparkle" />
          <circle cx="315" cy="75" r="3" fill="#38bdf8" className="animate-sparkle-delay" />
          <circle cx="200" cy="50" r="2.5" fill="#ffffff" className="animate-sparkle" />
          <circle cx="110" cy="220" r="2" fill="#67e8f9" className="animate-sparkle-delay" />

          {/* Bottle Shadow */}
          <ellipse cx="200" cy="240" rx="70" ry="14" fill="#0f172a" opacity="0.6" />

          {/* Centerpiece: Amber Glass Apothecary Liniment Bottle */}
          <g className="animate-float-bob">
            {/* Main Bottle Body */}
            <rect x="160" y="115" width="80" height="115" rx="16" fill="url(#amberBottleGrad)" stroke="#451a03" strokeWidth="2.5" />
            
            {/* Vintage Apothecary Label */}
            <rect x="172" y="135" width="56" height="75" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
            {/* Label Text Details */}
            <line x1="180" y1="150" x2="220" y2="150" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="184" y1="160" x2="216" y2="160" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="182" y1="170" x2="218" y2="170" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="200" cy="188" r="7" fill="#047857" />
            <circle cx="200" cy="188" r="4" fill="#34d399" />

            {/* Neck & Metallic Screw Collar */}
            <rect x="180" y="95" width="40" height="22" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <rect x="184" y="80" width="32" height="18" rx="3" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />

            {/* Glass Dropper Pipette Top */}
            <rect x="193" y="62" width="14" height="20" rx="4" fill="#1e293b" />
            
            {/* Single Floating Soothing Liniment Droplet */}
            <path d="M 200 48 Q 193 32 200 24 Q 207 32 200 48 Z" fill="url(#oilDropGrad)" opacity="0.95" />
          </g>

          {/* Left Side: Blocks of Pure White Camphor Crystals */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '110px 190px' }}>
            <polygon points="90,180 115,165 135,180 110,195" fill="url(#camphorCrystal)" stroke="#7dd3fc" strokeWidth="1" />
            <polygon points="90,180 110,195 110,215 90,200" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="110,195 135,180 135,200 110,215" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />

            <polygon points="75,200 95,188 110,200 90,212" fill="url(#camphorCrystal)" stroke="#7dd3fc" strokeWidth="1" />
            <polygon points="75,200 90,212 90,225 75,213" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />
          </g>

          {/* Right Side: Twining Eucalyptus Leaves with Silver Veins */}
          <g className="animate-float-bob">
            <path d="M 245 160 Q 285 130 320 150 Q 280 195 245 160 Z" fill="url(#eucalyptusLeafGrad)" stroke="#064e3b" strokeWidth="1.5" />
            <path d="M 245 160 Q 285 152 320 150" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />

            <path d="M 255 190 Q 295 180 325 205 Q 275 235 255 190 Z" fill="#0d9488" stroke="#064e3b" strokeWidth="1.5" />
            <path d="M 255 190 Q 290 198 325 205" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Cooling Relieving Vapor Waves */}
          <path d="M 130 110 Q 110 70 135 35" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 270 100 Q 290 65 265 30" fill="none" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // 17. Neem, Turmeric & Aloe Vera Face Lepa (Skin & Hair)
  if (id === 'rem_17' || lower.includes('neem') || lower.includes('face lepa') || lower.includes('lepa for acne')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-rose-950/30 to-amber-950/40 flex items-center justify-center ${className}`}>
        {/* Soft Glowing Radiance Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-300/40 via-rose-200/25 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roseBowlGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="neemPasteGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="aloeLeafGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="brushWood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Glowing Skin Radiance Sparkles */}
          <circle cx="80" cy="70" r="3.5" fill="#f472b6" className="animate-sparkle" />
          <circle cx="320" cy="75" r="3" fill="#fde047" className="animate-sparkle-delay" />
          <circle cx="200" cy="55" r="2.5" fill="#a7f3d0" className="animate-sparkle" />
          <circle cx="110" cy="220" r="2" fill="#fbcfe8" className="animate-sparkle-delay" />

          {/* Rose Quartz Bowl Shadow / Base Ring */}
          <ellipse cx="200" cy="235" rx="75" ry="15" fill="#4c0519" opacity="0.6" />

          {/* Elegant Rose Quartz / Ceramic Mask Bowl */}
          <path d="M 130 145 C 130 230, 270 230, 270 145 Z" fill="url(#roseBowlGrad)" stroke="#be185d" strokeWidth="2.5" />
          
          {/* Gold Inlaid Rim */}
          <ellipse cx="200" cy="145" rx="70" ry="16" fill="#fde047" opacity="0.9" />
          <ellipse cx="200" cy="145" rx="66" ry="13" fill="#9d174d" />

          {/* Fresh Emerald Neem & Aloe Lepa Paste Inside Bowl */}
          <ellipse cx="200" cy="145" rx="62" ry="11" fill="url(#neemPasteGrad)" />
          
          {/* Swirls of Golden Turmeric in Paste */}
          <path d="M 170 143 Q 190 148 210 142" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M 180 146 Q 195 141 215 147" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

          {/* Wooden Facial Mask Applicator Brush across Rim */}
          <g className="animate-float-bob">
            {/* Wooden Handle */}
            <path d="M 230 110 L 310 70" stroke="url(#brushWood)" strokeWidth="10" strokeLinecap="round" />
            {/* Rose Gold Ferrule */}
            <rect x="220" y="110" width="16" height="12" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1" transform="rotate(-26 220 110)" />
            {/* Soft Bristles dipping in Lepa */}
            <path d="M 205 125 L 222 118 L 210 135 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
            <path d="M 202 127 Q 206 132 212 135" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Fresh Aloe Vera Sliced Leaf (Left Side) */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '110px 180px' }}>
            <path d="M 70 200 Q 110 150 140 175 Q 100 215 70 200 Z" fill="url(#aloeLeafGrad)" stroke="#14532d" strokeWidth="1.5" />
            {/* Translucent Gel Drop */}
            <circle cx="120" cy="170" r="5" fill="#a7f3d0" opacity="0.85" />
            <circle cx="128" cy="178" r="3.5" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Fresh Neem Leaves Sprig (Right Side) */}
          <g className="animate-float-bob">
            <path d="M 275 190 Q 305 165 325 185 Q 295 210 275 190 Z" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
            <path d="M 290 175 Q 315 150 335 170 Q 310 195 290 175 Z" fill="#22c55e" stroke="#14532d" strokeWidth="1" />
          </g>

          {/* Floating Pink Rose Petals & Aloe Gel Drop Drops */}
          <g className="animate-leaf-1">
            <path d="M 100 120 Q 115 105 120 120 Q 110 130 100 120 Z" fill="#f472b6" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 290 110 Q 305 95 310 110 Q 300 120 290 110 Z" fill="#be185d" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 18. Bhringraj, Amla & Coconut Oil Massage
  if (id === 'rem_18' || lower.includes('bhringraj') || lower.includes('hair loss') || lower.includes('scalp strength')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-teal-950/30 to-amber-950/40 flex items-center justify-center ${className}`}>
        {/* Deep Herbal & Nourishing Scalp Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-300/35 via-teal-200/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brassPourer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="coconutBowl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c0a00" />
            </linearGradient>
            <linearGradient id="herbalOilGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="amlaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="60%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#3f6212" />
            </linearGradient>
          </defs>

          {/* Golden Nourishing Sparkles */}
          <circle cx="80" cy="70" r="3.5" fill="#fde047" className="animate-sparkle" />
          <circle cx="320" cy="75" r="3" fill="#6ee7b7" className="animate-sparkle-delay" />
          <circle cx="200" cy="55" r="2.5" fill="#ffffff" className="animate-sparkle" />
          <circle cx="110" cy="225" r="2" fill="#fef08a" className="animate-sparkle-delay" />

          {/* Shadow Base */}
          <ellipse cx="200" cy="240" rx="80" ry="15" fill="#022c22" opacity="0.6" />

          {/* Centerpiece: Carved Coconut Shell Hair Oil Bowl */}
          <g className="animate-float-bob">
            {/* Coconut Shell Bowl Outer Body */}
            <path d="M 125 155 C 125 235, 275 235, 275 155 Z" fill="url(#coconutBowl)" stroke="#451a03" strokeWidth="2.5" />
            <ellipse cx="200" cy="155" rx="75" ry="16" fill="#451a03" stroke="#78350f" strokeWidth="2" />

            {/* Herbal Bhringraj Infused Oil Surface */}
            <ellipse cx="200" cy="155" rx="68" ry="12" fill="url(#herbalOilGrad)" />
            <circle cx="185" cy="153" r="3" fill="#fde047" opacity="0.8" />
            <circle cx="215" cy="156" r="4" fill="#fde047" opacity="0.9" />
          </g>

          {/* Left Side: Traditional Brass Taila Pourer (Tilted dispensing oil) */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '110px 110px' }}>
            {/* Spout and Pitcher */}
            <path d="M 70 80 Q 110 90 140 120" stroke="url(#brassPourer)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 50 65 L 90 65 L 85 105 L 55 105 Z" fill="url(#brassPourer)" stroke="#78350f" strokeWidth="1.5" />
            {/* Pitcher Rim */}
            <ellipse cx="70" cy="65" rx="20" ry="6" fill="#fde047" />

            {/* Golden Oil Stream Pouring into Coconut Bowl */}
            <path d="M 138 120 Q 150 135 160 152" fill="none" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="160" cy="152" r="3" fill="#ffffff" />
          </g>

          {/* Right Side: Fresh Green Amla Gooseberry Fruits */}
          <g className="animate-float-bob">
            {/* Amla 1 */}
            <circle cx="285" cy="205" r="20" fill="url(#amlaGrad)" stroke="#3f6212" strokeWidth="1.5" />
            {/* Segment Lines on Amla 1 */}
            <path d="M 285 185 Q 275 205 285 225" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.7" />
            <path d="M 285 185 Q 295 205 285 225" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.7" />
            <circle cx="278" cy="198" r="3" fill="#ffffff" opacity="0.7" />

            {/* Amla 2 (Smaller) */}
            <circle cx="320" cy="215" r="15" fill="url(#amlaGrad)" stroke="#3f6212" strokeWidth="1.5" />
            <circle cx="315" cy="210" r="2.5" fill="#ffffff" opacity="0.7" />
          </g>

          {/* White Bhringraj Flowers & Serrated Leaves */}
          <g className="animate-gentle-rotate" style={{ transformOrigin: '260px 120px' }}>
            {/* Bhringraj Leaves */}
            <path d="M 235 130 Q 270 110 280 135 Q 250 160 235 130 Z" fill="#15803d" stroke="#064e3b" strokeWidth="1" />
            {/* Little White Daisy Flower of Bhringraj */}
            <circle cx="275" cy="115" r="10" fill="#ffffff" />
            <circle cx="275" cy="115" r="4" fill="#eab308" />
          </g>

          {/* Golden Oil Droplets floating */}
          <path d="M 180 90 Q 175 75 180 65 Q 185 75 180 90 Z" fill="#fde047" opacity="0.9" />
          <path d="M 220 100 Q 215 88 220 80 Q 225 88 220 100 Z" fill="#facc15" opacity="0.85" />
        </svg>
      </div>
    );
  }

  // 19. Chyawanprash & Golden Warm Milk
  if (id === 'rem_19' || lower.includes('chyawanprash') || lower.includes('vitality')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-stone-900/40 flex items-center justify-center ${className}`}>
        {/* Warm Golden Vitality Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-yellow-100/25 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="warmMilkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="brassCupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="jamGloss" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#3a1700" />
              <stop offset="100%" stopColor="#1c0a00" />
            </linearGradient>
          </defs>

          {/* Ojas Vitality Sparkles */}
          <circle cx="80" cy="70" r="4" fill="#fde047" className="animate-sparkle" />
          <circle cx="320" cy="75" r="3.5" fill="#f59e0b" className="animate-sparkle-delay" />
          <circle cx="200" cy="60" r="2.5" fill="#ffffff" className="animate-sparkle" />

          {/* RIGHT SIDE: Warm Golden Milk Cup & Saucer */}
          {/* Saucer */}
          <ellipse cx="270" cy="225" rx="55" ry="12" fill="#78350f" opacity="0.8" />
          <ellipse cx="270" cy="222" rx="50" ry="9" fill="#d97706" />

          {/* Brass Cup */}
          <path d="M 230 120 L 240 215 C 240 222, 300 222, 300 215 L 310 120 Z" fill="url(#brassCupGrad)" stroke="#78350f" strokeWidth="2" />
          
          {/* Milk Liquid & Foam Surface */}
          <path d="M 233 128 L 241 210 C 241 216, 299 216, 299 210 L 307 128 Z" fill="url(#warmMilkGrad)" />
          <ellipse cx="270" cy="128" rx="37" ry="10" fill="#fef08a" />
          
          {/* Saffron Strands on Foam */}
          <path d="M 260 126 Q 265 124 268 128" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 275 127 Q 280 130 282 125" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cup Handle */}
          <path d="M 310 140 C 330 140, 330 180, 305 185" fill="none" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />

          {/* Warm Steam Rising from Milk */}
          <path d="M 255 110 Q 240 75 260 40" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-1" />
          <path d="M 285 110 Q 300 75 280 40" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" className="animate-steam-2" />

          {/* LEFT SIDE: Carved Wooden Spoon & Clay Dish with Chyawanprash Jam */}
          {/* Small Clay Dish */}
          <ellipse cx="120" cy="225" rx="50" ry="12" fill="#5c3823" opacity="0.8" />
          <ellipse cx="120" cy="222" rx="45" ry="9" fill="#8c5839" />

          {/* Spoon resting angled in dish (Animated gentle bobbing) */}
          <g className="animate-float-bob">
            {/* Spoon Handle extending left-top */}
            <path d="M 60 130 Q 90 155 125 185" stroke="#a3765a" strokeWidth="12" strokeLinecap="round" />
            <path d="M 60 130 Q 90 155 125 185" stroke="#784e36" strokeWidth="8" strokeLinecap="round" />

            {/* Spoon Bowl */}
            <ellipse cx="135" cy="192" rx="28" ry="18" fill="#784e36" stroke="#5c3823" strokeWidth="2" transform="rotate(-15 135 192)" />
            
            {/* Glossy Herbal Jam Scoop */}
            <ellipse cx="135" cy="190" rx="22" ry="13" fill="url(#jamGloss)" transform="rotate(-15 135 190)" />
            <ellipse cx="130" cy="186" rx="10" ry="5" fill="#d97706" opacity="0.8" transform="rotate(-15 130 186)" />
            <circle cx="126" cy="184" r="2.5" fill="#fef08a" opacity="0.9" />
          </g>

          {/* Floating Saffron & Herbal Petals */}
          <g className="animate-leaf-1">
            <path d="M 180 140 Q 195 125 200 140 Q 190 150 180 140 Z" fill="#f59e0b" opacity="0.85" />
          </g>
          <g className="animate-leaf-2">
            <path d="M 90 100 Q 105 85 110 100 Q 100 110 90 100 Z" fill="#be185d" opacity="0.85" />
          </g>
        </svg>
      </div>
    );
  }

  // 20. Triphala Water Bedtime Tonic
  if (id === 'rem_20' || lower.includes('triphala water') || lower.includes('bedtime tonic')) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/40 to-stone-950 flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/25 via-purple-900/20 to-transparent animate-pulse-glow" />

        <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Night Sky Crescent Moon & Stars */}
          <path d="M 310 60 A 24 24 0 1 0 334 84 A 19 19 0 1 1 310 60 Z" fill="#fde047" opacity="0.95" />
          <circle cx="90" cy="60" r="2.5" fill="#ffffff" className="animate-sparkle" />
          <circle cx="130" cy="90" r="2" fill="#e0e7ff" className="animate-sparkle-delay" />

          {/* Copper Water Glass */}
          <path d="M 160 110 L 170 235 C 170 245, 230 245, 230 235 L 240 110 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
          
          {/* Warm Infusion Surface */}
          <ellipse cx="200" cy="110" rx="40" ry="10" fill="#f59e0b" />

          {/* Night Steam */}
          <path d="M 180 95 Q 165 60 185 25" fill="none" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
          <path d="M 215 95 Q 230 60 210 25" fill="none" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />
        </svg>
      </div>
    );
  }

  // Fallback / General Category Animated Artwork
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950/25 via-rose-950/20 to-stone-900/30 flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-200/40 via-teal-100/20 to-transparent animate-pulse-glow" />

      <svg viewBox="0 0 400 300" className="w-full h-full object-contain relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coolGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Twinkling Sparkles */}
        <circle cx="110" cy="80" r="3" fill="#6ee7b7" className="animate-sparkle" />
        <circle cx="290" cy="70" r="2.5" fill="#fde047" className="animate-sparkle-delay" />

        {/* Tall Refreshing Glass */}
        <path d="M 160 100 L 170 240 C 170 248, 230 248, 230 240 L 240 100 Z" fill="url(#coolGlass)" opacity="0.85" stroke="#047857" strokeWidth="2.5" />
        
        {/* Mint Sprig on Rim */}
        <path d="M 235 90 Q 255 75 260 90 Q 245 105 235 90 Z" fill="#15803d" />

        {/* Ice Cubes with Gentle Bobbing Animation */}
        <g className="animate-float-bob">
          <rect x="180" y="140" width="22" height="22" rx="4" fill="#ffffff" opacity="0.65" transform="rotate(15 180 140)" />
          <rect x="195" y="180" width="20" height="20" rx="4" fill="#ffffff" opacity="0.55" transform="rotate(-10 195 180)" />
        </g>

        {/* Rising Vapors */}
        <path d="M 180 90 Q 165 60 185 30" fill="none" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-1" />
        <path d="M 215 90 Q 230 55 210 25" fill="none" stroke="#6ee7b7" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" className="animate-steam-2" />

        {/* Floating Pink Lotus petals around base */}
        <g className="animate-leaf-1">
          <path d="M 120 230 Q 100 210 90 230 Q 110 245 120 230 Z" fill="#be185d" opacity="0.9" />
        </g>
        <g className="animate-leaf-2">
          <path d="M 280 230 Q 300 210 310 230 Q 290 245 280 230 Z" fill="#e11d48" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
