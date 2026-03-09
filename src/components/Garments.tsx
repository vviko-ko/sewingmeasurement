import React from "react";

export interface GarmentProps {
    c1?: string;
    c2?: string;
    c3?: string;
    sz?: number;
}

export const G: Record<string, React.FC<GarmentProps>> = {
    // ── African styles ──
    agbada: ({ c1 = "#2D6A4F", c2 = "#C14B1A", c3 = "#D4A017", sz = 130 }) => (
        <svg width={sz} height={sz * 1.25} viewBox="0 0 130 162">
            <ellipse cx="65" cy="155" rx="62" ry="6" fill="rgba(0,0,0,0.18)" />
            <path d="M30,55 L100,55 L108,155 L22,155 Z" fill={c1} opacity=".85" />
            <path d="M10,48 Q30,42 65,44 L70,155 L5,155 Z" fill={c2} opacity=".92" />
            <path d="M120,48 Q100,42 65,44 L60,155 L125,155 Z" fill={c2} opacity=".92" />
            <ellipse cx="65" cy="52" rx="24" ry="12" fill={c3} opacity=".9" />
            <ellipse cx="65" cy="52" rx="18" ry="8" fill={c1} />
            {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1={45 + i * 8} y1="58" x2={45 + i * 8} y2="90" stroke={c3} strokeWidth="1" opacity=".5" />
            ))}
            <path d="M10,48 Q2,75 8,105 L22,105 Q18,78 28,60 Z" fill={c2} opacity=".88" />
            <path d="M120,48 Q128,75 122,105 L108,105 Q112,78 102,60 Z" fill={c2} opacity=".88" />
            <path d="M40,50 Q65,46 90,50 Q80,42 65,40 Q50,42 40,50 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    senator: ({ c1 = "#1A3A5C", c2 = "#D4A017", c3 = "#F7F2E8", sz = 130 }) => (
        <svg width={sz} height={sz * 1.25} viewBox="0 0 130 162">
            <ellipse cx="65" cy="156" rx="52" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M38,98 L55,98 L58,158 L38,158 Z" fill={c1} opacity=".9" />
            <path d="M92,98 L75,98 L72,158 L92,158 Z" fill={c1} opacity=".9" />
            <path d="M38,98 L92,98 L88,118 L42,118 Z" fill={c1} />
            <path d="M32,50 L98,50 L95,100 L35,100 Z" fill={c3} opacity=".95" />
            <path d="M52,50 L65,62 L78,50 Z" fill={c3} />
            <path d="M52,50 L45,36 L65,28 L85,36 L78,50 L65,62 Z" fill={c3} opacity=".9" />
            {[0, 1, 2].map(i => (
                <path key={i} d={`M${50 + i * 8},55 Q${54 + i * 8},65 ${50 + i * 8},75`} fill="none" stroke={c2} strokeWidth="1.5" opacity=".7" />
            ))}
            <line x1="65" y1="62" x2="65" y2="95" stroke={c2} strokeWidth="1" strokeDasharray="3,2" />
            {[0, 1, 2].map(i => <circle key={i} cx="65" cy={68 + i * 9} r="2" fill={c2} opacity=".8" />)}
            <path d="M32,50 Q20,58 18,80 L28,82 Q30,65 38,58 Z" fill={c3} opacity=".92" />
            <path d="M98,50 Q110,58 112,80 L102,82 Q100,65 92,58 Z" fill={c3} opacity=".92" />
            <path d="M42,52 Q65,48 88,52 L85,44 Q65,40 45,44 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
    ),

    dashiki: ({ c1 = "#B22222", c2 = "#D4A017", c3 = "#2D6A4F", sz = 130 }) => (
        <svg width={sz} height={sz * 1.1} viewBox="0 0 130 143">
            <ellipse cx="65" cy="138" rx="50" ry="5" fill="rgba(0,0,0,0.15)" />
            <path d="M25,45 L105,45 L108,135 L22,135 Z" fill={c1} opacity=".9" />
            <path d="M25,45 L105,45 L102,70 L28,70 Z" fill={c2} opacity=".85" />
            <path d="M55,45 L65,68 L75,45 Z" fill={c1} opacity=".95" />
            <path d="M55,45 L65,68 L75,45 L72,43 L65,64 L58,43 Z" fill={c3} opacity=".9" />
            {[0, 1, 2, 3, 4, 5].map(i => (
                <line key={i} x1={28 + i * 14} y1="45" x2={28 + i * 13} y2="70" stroke={c3} strokeWidth="1.5" opacity=".6" />
            ))}
            {[0, 1, 2].map(i => (
                <line key={i} x1="28" y1={50 + i * 7} x2="102" y2={50 + i * 7} stroke={c3} strokeWidth="0.8" opacity=".4" />
            ))}
            <path d="M25,45 Q10,52 8,78 L22,80 Q22,60 32,55 Z" fill={c1} opacity=".88" />
            <path d="M105,45 Q120,52 122,78 L108,80 Q108,60 98,55 Z" fill={c1} opacity=".88" />
            <path d="M8,78 L22,80 L20,90 L6,88 Z" fill={c2} opacity=".7" />
            <path d="M108,80 L122,78 L124,88 L110,90 Z" fill={c2} opacity=".7" />
            <path d="M38,46 Q65,42 92,46 L88,38 Q65,34 42,38 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
    ),

    boubou: ({ c1 = "#4A1A7A", c2 = "#D4A017", sz = 130 }) => (
        <svg width={sz} height={sz * 1.3} viewBox="0 0 130 169">
            <ellipse cx="65" cy="163" rx="62" ry="6" fill="rgba(0,0,0,0.18)" />
            <path d="M5,45 Q35,40 65,42 Q95,40 125,45 L128,163 L2,163 Z" fill={c1} opacity=".88" />
            <path d="M52,42 L78,42 L82,163 L48,163 Z" fill={c2} opacity=".25" />
            <ellipse cx="65" cy="46" rx="20" ry="10" fill={c1} />
            <ellipse cx="65" cy="46" rx="14" ry="7" fill={c2} opacity=".6" />
            {[0, 1, 2, 3].map(i => (
                <path key={i} d={`M${56 + i * 5},55 Q${59 + i * 5},65 ${56 + i * 5},75 Q${53 + i * 5},85 ${56 + i * 5},95`}
                    fill="none" stroke={c2} strokeWidth="1.2" opacity=".6" />
            ))}
            {[0, 1, 2].map(i => (
                <line key={i} x1="10" y1={70 + i * 28} x2="120" y2={70 + i * 28} stroke={c2} strokeWidth="0.8" opacity=".3" />
            ))}
            <path d="M5,45 Q15,80 12,130" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <path d="M125,45 Q115,80 118,130" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <path d="M25,46 Q65,40 105,46 Q95,36 65,34 Q35,36 25,46 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
    ),

    kente_cloth: ({ c1 = "#D4A017", c2 = "#B22222", c3 = "#2D6A4F", sz = 130 }) => (
        <svg width={sz} height={sz * 1.05} viewBox="0 0 130 136">
            <ellipse cx="65" cy="130" rx="55" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M15,40 Q55,30 110,38 L115,125 L10,125 Z" fill={c1} opacity=".85" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x={15 + i * 14} y="40" width="7" height="85"
                    fill={[c1, c2, c3, "#0E0C09"][i % 4]} opacity=".7" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <line key={i} x1="15" y1={42 + i * 9} x2="113" y2={44 + i * 9} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
            ))}
            <path d="M15,40 Q30,28 50,35 L55,50 Q35,44 18,55 Z" fill={c2} opacity=".8" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <line key={i} x1={12 + i * 10} y1="125" x2={10 + i * 10} y2="133" stroke={c1} strokeWidth="1.5" opacity=".7" />
            ))}
            <path d="M25,42 Q65,34 105,40 Q95,32 65,28 Q38,32 25,42 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
    ),

    adire_dress: ({ c1 = "#1A3A5C", c2 = "#2D6A4F", c3 = "#F7F2E8", sz = 130 }) => (
        <svg width={sz} height={sz * 1.3} viewBox="0 0 130 169">
            <ellipse cx="65" cy="163" rx="55" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M28,42 L102,42 L112,163 L18,163 Z" fill={c1} opacity=".9" />
            {[[40, 65], [75, 80], [55, 110], [85, 130], [35, 145], [70, 155], [50, 85], [90, 100]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={8 + i % 3 * 4} fill="none" stroke={c3} strokeWidth="1" opacity=".35" />
            ))}
            {[[40, 65], [75, 80], [55, 110], [85, 130], [35, 145], [70, 155], [50, 85], [90, 100]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={3 + i % 3 * 2} fill={c3} opacity=".25" />
            ))}
            <path d="M28,80 Q65,72 112,80" fill="none" stroke={c3} strokeWidth="1" opacity=".3" />
            <path d="M22,115 Q65,105 114,115" fill="none" stroke={c3} strokeWidth="1" opacity=".3" />
            <path d="M45,42 Q65,35 85,42 L82,52 Q65,46 48,52 Z" fill={c2} opacity=".7" />
            <path d="M28,42 Q15,52 14,72 L26,74 Q26,56 34,50 Z" fill={c1} opacity=".88" />
            <path d="M102,42 Q115,52 116,72 L104,74 Q104,56 96,50 Z" fill={c1} opacity=".88" />
            <path d="M40,44 Q65,38 90,44 L86,36 Q65,30 44,36 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    gele_iro: ({ c1 = "#C14B1A", c2 = "#D4A017", c3 = "#1A3A5C", sz = 130 }) => (
        <svg width={sz} height={sz * 1.35} viewBox="0 0 130 175">
            <ellipse cx="65" cy="169" rx="50" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M20,88 L110,88 L108,168 L22,168 Z" fill={c1} opacity=".88" />
            {[0, 1, 2, 3].map(i => (
                <line key={i} x1="22" y1={98 + i * 18} x2="108" y2={98 + i * 18} stroke={c2} strokeWidth="1.5" opacity=".5" />
            ))}
            <path d="M28,48 L102,48 L106,92 L24,92 Z" fill={c3} opacity=".92" />
            <path d="M28,48 Q14,55 12,76 L24,78 Q24,60 34,56 Z" fill={c3} opacity=".88" />
            <path d="M102,48 Q116,55 118,76 L106,78 Q106,60 96,56 Z" fill={c3} opacity=".88" />
            <ellipse cx="65" cy="26" rx="32" ry="20" fill={c1} opacity=".9" />
            <path d="M33,26 Q55,14 97,26 Q88,8 65,6 Q42,8 33,26 Z" fill={c2} opacity=".7" />
            <path d="M85,12 Q100,18 97,30" fill="none" stroke={c2} strokeWidth="2" opacity=".6" />
            <path d="M80,10 Q96,16 95,28" fill="none" stroke={c2} strokeWidth="1.5" opacity=".4" />
            <ellipse cx="65" cy="44" rx="12" ry="14" fill="#8B6914" opacity=".6" />
            <path d="M30,50 Q65,44 100,50 L96,42 Q65,36 34,42 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    kaftan: ({ c1 = "#5A1F1F", c2 = "#D4A017", c3 = "#C14B1A", sz = 130 }) => (
        <svg width={sz} height={sz * 1.3} viewBox="0 0 130 169">
            <ellipse cx="65" cy="163" rx="62" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M8,44 Q38,38 65,40 Q92,38 122,44 L124,163 L6,163 Z" fill={c1} opacity=".9" />
            <path d="M58,40 L72,40 L75,163 L55,163 Z" fill={c2} opacity=".2" />
            <line x1="65" y1="40" x2="65" y2="163" stroke={c2} strokeWidth="1" strokeDasharray="4,3" opacity=".4" />
            <path d="M48,40 Q65,52 82,40 L80,38 Q65,48 50,38 Z" fill={c3} opacity=".85" />
            {[[-1, 1], [0, 1], [1, 1]].map((_, i) => (
                <path key={i} d={`M${55 + i * 5},40 Q${57 + i * 5},50 ${55 + i * 5},60`}
                    fill="none" stroke={c2} strokeWidth="1.5" opacity=".6" />
            ))}
            <path d="M8,44 L30,44 L28,163 L6,163 Z" fill={c3} opacity=".15" />
            <path d="M122,44 L100,44 L102,163 L124,163 Z" fill={c3} opacity=".15" />
            {[0, 1, 2, 3].map(i => (
                <line key={i} x1="8" y1={65 + i * 28} x2="122" y2={65 + i * 28} stroke={c2} strokeWidth="0.8" opacity=".3" />
            ))}
            <path d="M22,46 Q65,38 108,46 Q96,34 65,32 Q34,34 22,46 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    // ── Global styles ──
    blazer: ({ c1 = "#1A3A5C", c2 = "#F7F2E8", c3 = "#D4A017", sz = 130 }) => (
        <svg width={sz} height={sz * 1.15} viewBox="0 0 130 150">
            <ellipse cx="65" cy="145" rx="52" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M22,38 L108,38 L112,140 L18,140 Z" fill={c1} opacity=".75" />
            <path d="M22,38 L58,38 L55,140 L18,140 Z" fill={c1} opacity=".95" />
            <path d="M108,38 L72,38 L75,140 L112,140 Z" fill={c1} opacity=".95" />
            <path d="M52,38 L65,58 L58,72 L38,38 Z" fill={c2} opacity=".92" />
            <path d="M78,38 L65,58 L72,72 L92,38 Z" fill={c2} opacity=".92" />
            <path d="M58,38 L72,38 L70,140 L60,140 Z" fill={c2} opacity=".7" />
            <rect x="26" y="75" width="18" height="12" rx="1" fill={c2} opacity=".5" stroke={c1} strokeWidth="0.8" />
            {[0, 1, 2].map(i => <circle key={i} cx="65" cy={80 + i * 12} r="2.5" fill={c3} opacity=".8" />)}
            <path d="M22,38 Q8,50 6,85 L18,88 Q18,58 28,48 Z" fill={c1} opacity=".92" />
            <path d="M108,38 Q122,50 124,85 L112,88 Q112,58 102,48 Z" fill={c1} opacity=".92" />
            <path d="M35,40 Q65,34 95,40 L88,32 Q65,26 42,32 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    aline_dress: ({ c1 = "#2D6A4F", c2 = "#D4A017", c3 = "#F7F2E8", sz = 130 }) => (
        <svg width={sz} height={sz * 1.3} viewBox="0 0 130 169">
            <ellipse cx="65" cy="163" rx="62" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M42,38 L88,38 L115,163 L15,163 Z" fill={c1} opacity=".9" />
            <path d="M42,38 Q65,30 88,38 L84,50 Q65,44 46,50 Z" fill={c2} opacity=".8" />
            <path d="M32,85 L98,85 L115,163 L15,163 Z" fill={c1} opacity=".1" />
            <path d="M36,75 L94,75 L96,84 L34,84 Z" fill={c2} opacity=".5" />
            <path d="M15,145 L115,145" stroke={c3} strokeWidth="1" opacity=".3" strokeDasharray="5,4" />
            <path d="M46,40 Q65,34 84,40 L80,32 Q65,26 50,32 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
    ),

    puff_blouse: ({ c1 = "#C14B1A", c2 = "#F7F2E8", c3 = "#D4A017", sz = 130 }) => (
        <svg width={sz} height={sz * 0.95} viewBox="0 0 130 123">
            <ellipse cx="65" cy="118" rx="50" ry="4" fill="rgba(0,0,0,0.15)" />
            <path d="M28,42 L102,42 L105,112 L25,112 Z" fill={c2} opacity=".92" />
            <path d="M28,42 Q5,45 3,70 Q5,80 18,82 Q8,62 26,56 Z" fill={c1} opacity=".85" />
            <ellipse cx="10" cy="76" rx="10" ry="8" fill={c1} opacity=".9" />
            <path d="M102,42 Q125,45 127,70 Q125,80 112,82 Q122,62 104,56 Z" fill={c1} opacity=".85" />
            <ellipse cx="120" cy="76" rx="10" ry="8" fill={c1} opacity=".9" />
            <path d="M48,42 Q65,36 82,42 L79,52 Q65,47 51,52 Z" fill={c3} opacity=".8" />
            <line x1="65" y1="52" x2="65" y2="108" stroke={c3} strokeWidth="0.8" strokeDasharray="3,2" opacity=".5" />
            {[0, 1, 2, 3].map(i => <circle key={i} cx="65" cy={58 + i * 13} r="2" fill={c3} opacity=".7" />)}
            <path d="M38,44 Q65,38 92,44 L88,36 Q65,30 42,36 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
    ),

    trousers: ({ c1 = "#2C1810", c2 = "#8B7355", sz = 130 }) => (
        <svg width={sz} height={sz * 1.3} viewBox="0 0 130 169">
            <ellipse cx="65" cy="163" rx="52" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M22,15 L108,15 L112,82 L98,168 L68,168 L65,120 L62,168 L32,168 L18,82 Z" fill={c1} opacity=".9" />
            <line x1="48" y1="82" x2="44" y2="168" stroke={c2} strokeWidth="1" opacity=".5" />
            <line x1="82" y1="82" x2="86" y2="168" stroke={c2} strokeWidth="1" opacity=".5" />
            <path d="M22,15 L108,15 L110,28 L20,28 Z" fill={c2} opacity=".7" />
            {[0, 1, 2, 3].map(i => (
                <rect key={i} x={28 + i * 22} y="13" width="5" height="8" rx="1" fill={c1} stroke={c2} strokeWidth="0.8" opacity=".8" />
            ))}
            <path d="M26,32 Q30,42 26,52" fill="none" stroke={c2} strokeWidth="1.2" opacity=".5" />
            <path d="M28,16 Q65,10 102,16 L98,8 Q65,2 32,8 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
    ),

    isiagu: ({ c1 = "#8B0000", c2 = "#D4A017", c3 = "#0E0C09", sz = 130 }) => (
        <svg width={sz} height={sz * 1.1} viewBox="0 0 130 143">
            <ellipse cx="65" cy="137" rx="52" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M25,42 L105,42 L108,132 L22,132 Z" fill={c1} opacity=".9" />
            {[[38, 65], [65, 58], [92, 65], [38, 95], [65, 88], [92, 95], [52, 125], [78, 125]].map(([x, y], i) => (
                <g key={i} transform={`translate(${x},${y})`} opacity=".55">
                    <circle cx="0" cy="0" r="7" fill={c2} />
                    <circle cx="0" cy="0" r="4" fill={c1} />
                    <circle cx="0" cy="0" r="1.5" fill={c3} />
                </g>
            ))}
            <path d="M52,42 L65,58 L78,42 Z" fill={c1} />
            <path d="M52,42 L46,30 L65,24 L84,30 L78,42 L65,58 Z" fill={c1} opacity=".9" stroke={c2} strokeWidth="1.5" />
            <path d="M52,42 L46,30 L65,24 L84,30 L78,42 L65,58 Z" fill="none" stroke={c2} strokeWidth="2.5" opacity=".7" />
            <path d="M25,42 Q12,50 10,74 L22,76 Q22,58 32,52 Z" fill={c1} opacity=".9" />
            <path d="M105,42 Q118,50 120,74 L108,76 Q108,58 98,52 Z" fill={c1} opacity=".9" />
            <path d="M10,74 L22,76 L20,86 L8,84 Z" fill={c2} opacity=".7" />
            <path d="M108,76 L120,74 L122,84 L110,86 Z" fill={c2} opacity=".7" />
            <path d="M35,44 Q65,38 95,44 L90,36 Q65,30 40,36 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
    ),

    wrapper_set: ({ c1 = "#4A0E6B", c2 = "#D4A017", c3 = "#C14B1A", sz = 130 }) => (
        <svg width={sz} height={sz * 1.35} viewBox="0 0 130 175">
            <ellipse cx="65" cy="169" rx="55" ry="5" fill="rgba(0,0,0,0.18)" />
            <path d="M18,85 L112,85 L115,168 L15,168 Z" fill={c1} opacity=".88" />
            {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="18" y1={95 + i * 16} x2="112" y2={95 + i * 16} stroke={c2} strokeWidth="1.5" opacity=".35" />
            ))}
            {[0, 1, 2, 3, 4, 5].map(i => (
                <line key={i} x1={22 + i * 16} y1="85" x2={18 + i * 16} y2="168" stroke={c3} strokeWidth="0.8" opacity=".25" />
            ))}
            <ellipse cx="28" cy="86" rx="12" ry="8" fill={c2} opacity=".7" />
            <circle cx="28" cy="86" r="5" fill={c1} opacity=".8" />
            <path d="M30,44 L100,44 L105,88 L25,88 Z" fill={c3} opacity=".9" />
            <path d="M48,44 Q65,36 82,44 L80,54 Q65,48 50,54 Z" fill={c2} opacity=".8" />
            <path d="M30,44 Q16,52 14,70 L26,72 Q26,58 36,52 Z" fill={c3} opacity=".88" />
            <path d="M100,44 Q114,52 116,70 L104,72 Q104,58 94,52 Z" fill={c3} opacity=".88" />
            <path d="M40,46 Q65,40 90,46 L86,38 Q65,32 44,38 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
    ),
};
