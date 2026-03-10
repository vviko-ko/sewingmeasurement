import sys

filepath = "src/App.tsx"
with open(filepath, "r", encoding="utf-8") as file:
    content = file.read()

# 1. Update PatternShape
old_pattern_shape = """type PatternShape =
    | "front_bodice" | "back_bodice" | "sleeve" | "collar"
    | "skirt_panel" | "trouser_front" | "waistband"
    | "agbada_outer" | "embroidery_panel" | "kente_strip" | "pocket";"""

new_pattern_shape = """type PatternShape =
    | "front_bodice" | "back_bodice" | "sleeve" | "collar"
    | "skirt_panel" | "trouser_front" | "waistband"
    | "agbada_outer" | "embroidery_panel" | "kente_strip" | "pocket"
    | "trouser_back" | "sleeve_cuff" | "yoke_back"
    | "front_facing" | "back_facing" | "undercollar" | "top_collar"
    | "fly_shield" | "pocket_bag" | "pocket_welt" | "pocket_flap"
    | "upper_sleeve" | "under_sleeve" | "agbada_inner" | "gele_tie"
    | "wrapper_panel" | "lapel_facing" | "placket" | "buba_sleeve"
    | "side_panel";"""

content = content.replace(old_pattern_shape, new_pattern_shape)

# 2. Update PatSVG Component
new_pat_svgs = """const PatSVG: FC<PatSVGProps> = ({ shape }): ReactElement => {
    const c = "#C14B1A", f = "rgba(255,255,255,1)", g = "#2D6A4F", d = "#000000";
    // Technical-grade exact pattern shapes with seam allowances, notches, drill holes, and grainlines
    const N = (x:number, y:number) => <polygon points={`${x},${y} ${x-2},${y-3} ${x+2},${y-3}`} fill={c}/>; // Top notch
    const NR = (x:number, y:number) => <polygon points={`${x},${y} ${x+3},${y-2} ${x+3},${y+2}`} fill={c}/>; // Right notch
    const NL = (x:number, y:number) => <polygon points={`${x},${y} ${x-3},${y-2} ${x-3},${y+2}`} fill={c}/>; // Left notch
    const NB = (x:number, y:number) => <polygon points={`${x},${y} ${x-2},${y+3} ${x+2},${y+3}`} fill={c}/>; // Bottom notch
    const DH = (x:number, y:number) => <circle cx={x} cy={y} r="1.5" fill="none" stroke={c} strokeWidth="1"/>; // Drill hole
    
    const shapes: Record<PatternShape, ReactElement> = {
        front_bodice: (
            <svg viewBox="0 0 120 160" width="100" height="135">
                <path d="M20,15 L75,15 C 85 15 95 25 100,40 L110,140 C 110 145 105 150 100 150 L15,150 L20,40 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <path d="M20,15 C 45 25 70 25 75,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2"/>
                <text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CF FOLD</text>
                <line x1="65" y1="50" x2="65" y2="120" stroke={g} strokeWidth="1.5"/><polygon points="61,55 65,45 69,55" fill={g}/><polygon points="61,115 65,125 69,115" fill={g}/><text x="70" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                <path d="M20,15 L20,150" stroke={c} strokeWidth="2.5" strokeDasharray="8,4"/>
                {N(45,15)} {NR(108,120)} {DH(80,110)} {DH(50,130)}
                <path d="M80,110 L85,150 M50,130 L50,150 M20,105 L50,95 L50,130" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        back_bodice: (
            <svg viewBox="0 0 120 160" width="100" height="135">
                <path d="M15,10 L80,10 C 90 10 100 20 105,35 L115,145 C 115 150 110 150 105 150 L10,150 L15,35 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <path d="M15,10 C 40 15 65 15 80,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2"/>
                <text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CB SEAM</text>
                <line x1="60" y1="45" x2="60" y2="115" stroke={g} strokeWidth="1.5"/><polygon points="56,50 60,40 64,50" fill={g}/><polygon points="56,110 60,120 64,110" fill={g}/>
                <path d="M15,10 L10,150" stroke={c} strokeWidth="2"/><line x1="85" y1="18" x2="90" y2="18" stroke={c} strokeWidth="2"/>
                {NL(12, 60)} {NL(11.5, 90)} {N(40,10)} {DH(70,90)}
                <path d="M70,90 L75,150" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        side_panel: (
            <svg viewBox="0 0 80 160" width="65" height="135">
                <path d="M10,25 C 20 20 30 15 50,15 C 60 40 70 80 65,150 L15,150 C 5 90 0 50 10,25 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="35" y1="40" x2="35" y2="130" stroke={g} strokeWidth="1.5"/><polygon points="31,45 35,35 39,45" fill={g}/><polygon points="31,125 35,135 39,125" fill={g}/>
                {NL(7.5, 75)} {NR(67.5, 90)}
            </svg>
        ),
        sleeve: (
            <svg viewBox="0 0 140 160" width="115" height="135">
                <path d="M70,10 C 110 10 135 30 135,55 L120,145 L20,145 L5,55 C 5 30 30 10 70,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="70" y1="35" x2="70" y2="125" stroke={g} strokeWidth="1.5"/><polygon points="66,40 70,30 74,40" fill={g}/><polygon points="66,120 70,130 74,120" fill={g}/><text x="75" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                {N(70,10)} {NL(20,40)} {NR(120,40)} {NR(115,35)}
            </svg>
        ),
        upper_sleeve: (
            <svg viewBox="0 0 110 180" width="90" height="150">
                <path d="M55,10 C 85 10 105 30 105,50 C 105 90 95 130 85,170 L25,170 C 15 130 5 90 5,60 C 5 25 30 10 55,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="55" y1="40" x2="50" y2="140" stroke={g} strokeWidth="1.5"/><polygon points="51,45 55,35 59,45" fill={g}/>
                {N(55,10)} {NR(105,50)} {NL(5,60)} {NL(6,65)}
            </svg>
        ),
        under_sleeve: (
            <svg viewBox="0 0 80 160" width="65" height="135">
                <path d="M40,25 C 60 25 75 35 75,50 C 70 80 60 120 55,150 L15,150 C 10 120 5 80 5,50 C 15 35 25 25 40,25 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <path d="M5,50 C 40 70 75 50 75,50" fill="none" stroke={c} strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="35" y1="60" x2="35" y2="130" stroke={g} strokeWidth="1.5"/><polygon points="31,65 35,55 39,65" fill={g}/>
                {NR(75,50)} {NL(5,50)} {NL(6,55)}
            </svg>
        ),
        sleeve_cuff: (
            <svg viewBox="0 0 140 60" width="115" height="50">
                <rect x="10" y="10" width="120" height="40" fill={f} stroke={c} strokeWidth="2"/>
                <line x1="10" y1="30" x2="130" y2="30" stroke={c} strokeWidth="1" strokeDasharray="5,3"/>
                <line x1="70" y1="15" x2="70" y2="45" stroke={g} strokeWidth="1.5"/><polygon points="66,20 70,10 74,20" fill={g}/>
                {N(70,10)} {NB(70,50)}
            </svg>
        ),
        collar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M10,65 L25,15 C 60 5 100 5 135,15 L150,65 C 100 75 60 75 10,65 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="80" y1="25" x2="80" y2="55" stroke={g} strokeWidth="1.5"/><polygon points="76,30 80,20 84,30" fill={g}/><text x="85" y="45" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN FOLD</text>
                <path d="M80,8 L80,72" stroke={c} strokeWidth="1.5" strokeDasharray="6,4"/>
                {N(40,11)} {N(120,11)} {NB(40,68)} {NB(120,68)} {NB(80,72)}
            </svg>
        ),
        undercollar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M12,65 L27,15 C 60 5 100 5 133,15 L148,65 C 100 73 60 73 12,65 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="40" y1="20" x2="70" y2="60" stroke={g} strokeWidth="1.5"/><polygon points="41,25 37,17 48,22" fill={g}/>
                <path d="M80,8 L80,70" stroke={c} strokeWidth="2"/><text x="82" y="35" fontFamily="DM Mono" fontSize="6" fill={c}>CB SEAM</text>
                {N(40,11)} {N(120,11)} {NB(40,68)} {NB(120,68)}
            </svg>
        ),
        top_collar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M8,67 L23,13 C 60 3 100 3 137,13 L152,67 C 100 77 60 77 8,67 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="80" y1="25" x2="80" y2="55" stroke={g} strokeWidth="1.5"/><polygon points="76,30 80,20 84,30" fill={g}/>
                <path d="M80,6 L80,74" stroke={c} strokeWidth="1.5" strokeDasharray="6,4"/><text x="82" y="35" fontFamily="DM Mono" fontSize="6" fill={c}>CB FOLD</text>
            </svg>
        ),
        skirt_panel: (
            <svg viewBox="0 0 140 180" width="115" height="150">
                <path d="M30,10 L110,10 L135,170 L5,170 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="30" y1="10" x2="110" y2="10" stroke={c} strokeWidth="1" strokeDasharray="5,3"/>
                <line x1="70" y1="40" x2="70" y2="140" stroke={g} strokeWidth="1.5"/><polygon points="66,45 70,35 74,45" fill={g}/><polygon points="66,135 70,145 74,135" fill={g}/><text x="75" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                <line x1="15" y1="165" x2="125" y2="165" stroke={c} strokeWidth="1" strokeDasharray="4,2"/>
                {N(70,10)} {DH(50,50)} {DH(90,50)}
                <path d="M50,10 L50,50 L55,10 M90,10 L90,50 L85,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        trouser_front: (
            <svg viewBox="0 0 130 210" width="105" height="170">
                <path d="M20,10 L105,10 L110,100 C 110 110 105 120 95,200 L65,200 L60,135 L25,200 L10,200 L15,100 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="60" y1="30" x2="60" y2="150" stroke={g} strokeWidth="1.5"/><polygon points="56,35 60,25 64,35" fill={g}/>
                <text x="65" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>CREASE/GRAIN</text>
                <path d="M20,10 L15,100" stroke={c} strokeWidth="2.5"/><path d="M105,10 L95,60" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,4"/>
                {N(17,80)} {N(18,50)} {NR(108,80)} {DH(60,40)}
                <path d="M60,10 L60,40 L65,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        trouser_back: (
            <svg viewBox="0 0 140 210" width="115" height="170">
                <path d="M30,5 L115,15 L125,100 C 120 120 110 150 105,200 L75,200 L70,130 L20,200 L5,200 L10,105 C 10 70 20 40 30,5 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="65" y1="35" x2="60" y2="160" stroke={g} strokeWidth="1.5"/><polygon points="61,40 65,30 69,40" fill={g}/>
                <text x="70" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>CREASE/GRAIN</text>
                <path d="M30,5 L10,105" stroke={c} strokeWidth="2.5"/>
                {N(20,60)} {N(21,65)} {NR(120,70)} {DH(75,45)} {DH(55,40)}
                <path d="M75,10 L75,45 L80,11 M55,8 L55,40 L60,9" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        waistband: (
            <svg viewBox="0 0 190 55" width="170" height="49">
                <rect x="10" y="10" width="170" height="35" rx="2" fill={f} stroke={c} strokeWidth="2"/>
                <line x1="10" y1="27.5" x2="180" y2="27.5" stroke={c} strokeWidth="1" strokeDasharray="5,3"/>
                <line x1="95" y1="15" x2="95" y2="40" stroke={g} strokeWidth="1.5"/><polygon points="91,20 95,10 99,20" fill={g}/>
                {N(50,10)} {N(95,10)} {N(140,10)} {NB(50,45)} {NB(95,45)} {NB(140,45)}
            </svg>
        ),
        fly_shield: (
            <svg viewBox="0 0 60 120" width="45" height="90">
                <path d="M15,15 L45,15 L45,95 C 45 105 35 110 25 110 C 15 110 15 100 15,95 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="30" y1="30" x2="30" y2="90" stroke={g} strokeWidth="1.5"/><polygon points="26,35 30,25 34,35" fill={g}/>
                <text x="20" y="60" fontFamily="DM Mono" fontSize="5" fill={g} style={{writingMode: "vertical-rl"}}>GRAIN FOLD</text>
                <path d="M15,15 L15,95" stroke={c} strokeWidth="1.5" strokeDasharray="4,4"/>
            </svg>
        ),
        yoke_back: (
            <svg viewBox="0 0 140 70" width="115" height="60">
                <path d="M20,15 L60,25 L120,15 L115,55 L70,60 L25,55 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="70" y1="25" x2="70" y2="50" stroke={g} strokeWidth="1.5"/><polygon points="66,30 70,20 74,30" fill={g}/>
                {N(70,25)} {NB(70,60)} {NL(22,35)} {NR(117,35)}
                <path d="M70,25 L70,60" stroke={c} strokeWidth="1" strokeDasharray="3,3"/><text x="75" y="45" fontFamily="DM Mono" fontSize="5" fill={c}>CB FOLD</text>
            </svg>
        ),
        front_facing: (
            <svg viewBox="0 0 70 170" width="55" height="140">
                <path d="M20,10 L50,10 C 60 20 60 40 50,60 C 40 80 40 120 45,160 L15,160 C 10 100 15 50 20,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="30" y1="30" x2="30" y2="130" stroke={g} strokeWidth="1.5"/><polygon points="26,35 30,25 34,35" fill={g}/>
                {NR(55,50)} {NR(46,120)}
            </svg>
        ),
        back_facing: (
            <svg viewBox="0 0 120 60" width="100" height="50">
                <path d="M15,15 C 45 25 75 25 105,15 L115,45 C 80 55 40 55 5,45 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="60" y1="23" x2="60" y2="48" stroke={g} strokeWidth="1.5"/><polygon points="56,28 60,18 64,28" fill={g}/>
                <path d="M60,23 L60,48" stroke={c} strokeWidth="1" strokeDasharray="4,4"/><text x="65" y="40" fontFamily="DM Mono" fontSize="5" fill={c}>CB FOLD</text>
            </svg>
        ),
        lapel_facing: (
            <svg viewBox="0 0 80 180" width="65" height="150">
                <path d="M25,10 L60,10 C 70 30 75 60 65,100 C 55 140 50 160 55,170 L15,170 C 15 120 20 60 25,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="35" y1="30" x2="35" y2="140" stroke={g} strokeWidth="1.5"/><polygon points="31,35 35,25 39,35" fill={g}/>
                {N(45,10)} {NR(69,70)} {NL(18,70)}
            </svg>
        ),
        placket: (
            <svg viewBox="0 0 50 160" width="40" height="135">
                <rect x="15" y="10" width="20" height="140" fill={f} stroke={c} strokeWidth="2"/>
                <line x1="25" y1="10" x2="25" y2="150" stroke={c} strokeWidth="1" strokeDasharray="5,3"/>
                <line x1="20" y1="30" x2="20" y2="130" stroke={g} strokeWidth="1.5"/><polygon points="16,35 20,25 24,35" fill={g}/>
                {N(25,10)} {NB(25,150)}
            </svg>
        ),
        pocket_bag: (
            <svg viewBox="0 0 100 130" width="80" height="105">
                <path d="M20,15 L80,15 L85,60 C 90 90 70 115 50 115 C 30 115 10 90 15,60 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="50" y1="30" x2="50" y2="90" stroke={g} strokeWidth="1.5"/><polygon points="46,35 50,25 54,35" fill={g}/>
                {N(40,15)} {N(60,15)}
            </svg>
        ),
        pocket_welt: (
            <svg viewBox="0 0 90 50" width="75" height="42">
                <rect x="15" y="15" width="60" height="20" fill={f} stroke={c} strokeWidth="2"/>
                <line x1="15" y1="25" x2="75" y2="25" stroke={c} strokeWidth="1" strokeDasharray="4,2"/>
                <line x1="45" y1="18" x2="45" y2="32" stroke={g} strokeWidth="1.5"/><polygon points="41,20 45,16 49,20" fill={g}/>
            </svg>
        ),
        pocket_flap: (
            <svg viewBox="0 0 90 60" width="75" height="50">
                <path d="M15,15 L75,15 L70,45 L20,45 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="45" y1="20" x2="45" y2="40" stroke={g} strokeWidth="1.5"/><polygon points="41,25 45,15 49,25" fill={g}/>
                {N(30,15)} {N(60,15)}
            </svg>
        ),
        agbada_outer: (
            <svg viewBox="0 0 210 150" width="180" height="130">
                <path d="M5,15 C 105 5 205 15 205,15 L195,140 L15,140 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <path d="M5,15 C 105 5 205 15 205,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="5,5"/>
                <line x1="105" y1="30" x2="105" y2="90" stroke={g} strokeWidth="1.5"/><polygon points="101,35 105,25 109,35" fill={g}/><polygon points="101,85 105,95 109,85" fill={g}/><text x="110" y="65" fontFamily="DM Mono" fontSize="7" fill={g}>GRAIN FOLD</text>
                <ellipse cx="105" cy="40" rx="20" ry="10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/>
                {N(105,15)} {NB(105,140)} {DH(50,50)} {DH(160,50)}
            </svg>
        ),
        agbada_inner: (
            <svg viewBox="0 0 140 160" width="115" height="135">
                <path d="M20,15 L120,15 L125,70 L80,150 L60,150 L15,70 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <ellipse cx="70" cy="15" rx="15" ry="8" fill="none" stroke={c} strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="70" y1="40" x2="70" y2="120" stroke={g} strokeWidth="1.5"/><polygon points="66,45 70,35 74,45" fill={g}/>
                {NL(18,40)} {NR(122,40)}
            </svg>
        ),
        buba_sleeve: (
            <svg viewBox="0 0 160 120" width="135" height="100">
                <rect x="20" y="20" width="120" height="80" fill={f} stroke={c} strokeWidth="2"/>
                <line x1="80" y1="35" x2="80" y2="85" stroke={g} strokeWidth="1.5"/><polygon points="76,40 80,30 84,40" fill={g}/>
                {N(80,20)} {NB(80,100)}
            </svg>
        ),
        gele_tie: (
            <svg viewBox="0 0 250 60" width="210" height="50">
                <path d="M10,30 C 50 10 200 10 240,30 C 200 50 50 50 10,30 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="125" y1="20" x2="125" y2="40" stroke={g} strokeWidth="1.5"/><polygon points="121,25 125,15 129,25" fill={g}/><text x="130" y="32" fontFamily="DM Mono" fontSize="5" fill={g}>BIAS GRAIN</text>
                {N(125,13)} {NB(125,47)}
            </svg>
        ),
        wrapper_panel: (
            <svg viewBox="0 0 180 120" width="150" height="100">
                <rect x="10" y="10" width="160" height="100" fill={f} stroke={c} strokeWidth="2"/>
                <path d="M10,10 L170,10 M10,110 L170,110" stroke={c} strokeWidth="3"/>
                <line x1="90" y1="30" x2="90" y2="90" stroke={g} strokeWidth="1.5"/><polygon points="86,35 90,25 94,35" fill={g}/>
                <text x="95" y="60" fontFamily="DM Mono" fontSize="7" fill={c}>SELVAGE TO SELVAGE</text>
            </svg>
        ),
        embroidery_panel: (
            <svg viewBox="0 0 60 130" width="50" height="110">
                <rect x="10" y="10" width="40" height="110" rx="3" fill={f} stroke={c} strokeWidth="2"/>
                {[0,1,2,3,4,5].map(i=><path key={i} d={`M20,${25+i*16} C 30,${35+i*16} 40,${25+i*16} 40,${25+i*16}`} fill="none" stroke={c} strokeWidth="1.2" opacity="0.6"/>)}
                <line x1="30" y1="20" x2="30" y2="110" stroke={g} strokeWidth="1.5"/><polygon points="26,25 30,15 34,25" fill={g}/><polygon points="26,105 30,115 34,105" fill={g}/>
                {N(30,10)} {NB(30,120)}
            </svg>
        ),
        kente_strip: (
            <svg viewBox="0 0 45 180" width="35" height="150">
                <rect x="10" y="10" width="25" height="160" fill={f} stroke={c} strokeWidth="2"/>
                {[0,1,2,3,4,5,6,7,8].map(i=><rect key={i} x="10" y={10+i*17.7} width="25" height="10" fill={(["#D4A017","#B22222","#2D6A4F","#0A0805"] as string[])[i%4]} opacity="0.3"/>)}
                <line x1="22.5" y1="30" x2="22.5" y2="150" stroke={g} strokeWidth="1.5"/><polygon points="18.5,35 22.5,25 26.5,35" fill={g}/><polygon points="18.5,145 22.5,155 26.5,145" fill={g}/>
            </svg>
        ),
        pocket: (
            <svg viewBox="0 0 100 110" width="80" height="90">
                <path d="M15,15 L85,15 L90,80 C 90 95 70 100 50 100 C 30 100 10 95 10 80 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
                <line x1="50" y1="35" x2="50" y2="75" stroke={g} strokeWidth="1.5"/><polygon points="46,40 50,30 54,40" fill={g}/><polygon points="46,70 50,80 54,70" fill={g}/>
                <line x1="15" y1="15" x2="85" y2="15" stroke={c} strokeWidth="3"/><line x1="45" y1="15" x2="55" y2="15" stroke={c} strokeWidth="1.5"/>
                <path d="M15,25 L85,25" stroke={c} strokeWidth="1.5" strokeDasharray="4,2"/>
                {N(50,15)} {DH(30,70)} {DH(70,70)}
            </svg>
        ),
    };
    return shapes[shape] ?? shapes.front_bodice;
};"""

start_idx_pat = content.find("const PatSVG: FC<PatSVGProps>")
end_idx_pat = content.find("/* ═══════════════════════════════════════════\n   DATA")

if start_idx_pat != -1 and end_idx_pat != -1:
    content = content[:start_idx_pat] + new_pat_svgs + "\n" + content[end_idx_pat:]

with open(filepath, "w", encoding="utf-8") as file:
    file.write(content)

print("Pattern definitions and SVGs updated successfully!")
