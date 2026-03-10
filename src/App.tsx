import { useState, type FC, type ReactElement } from "react";

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Region = "West Africa" | "North Africa" | "International";
type GarmentType =
    | "agbada" | "senator" | "dashiki" | "boubou" | "kente"
    | "adire" | "gele" | "kaftan" | "isiagu" | "wrapper"
    | "blazer" | "adress" | "trousers" | "pblouse";
type PatternShape =
    | "front_bodice" | "back_bodice" | "sleeve" | "collar"
    | "skirt_panel" | "trouser_front" | "waistband"
    | "agbada_outer" | "embroidery_panel" | "kente_strip" | "pocket";

interface PatternPiece {
    id: string; name: string; shape: PatternShape;
    dims: string; qty: number; notes: string[]; instructions: string[];
}
interface GarmentStyle {
    id: number; name: string; category: string; region: Region;
    origin: string; difficulty: Difficulty; fabric: string;
    tags: string[]; african: boolean; garmentType: GarmentType;
    accent: string; bg: string;
    desc: string; measurements: Record<string, string>;
    pieces: PatternPiece[];
}
interface PatSVGProps { shape: PatternShape; }

/* ═══════════════════════════════════════════
   CSS
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#FDFBF7;--surface:#F5F2EA;--card:#FFFFFF;
  --border:rgba(212,160,23,0.2);--border2:rgba(212,160,23,0.35);
  --gold:#D4A017;--gold2:#F0C040;--rust:#C14B1A;--sage:#2D6A4F;
  --cream:#1A1510;--muted:#8C7D6B;--text:#2C241B;--subtext:#5C4D3C;
}
html,body{background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--surface);}
::-webkit-scrollbar-thumb{background:rgba(212,160,23,0.3);border-radius:2px;}
.hdr{position:fixed;top:0;left:0;right:0;z-index:300;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(253,251,247,0.9);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.logo{display:flex;align-items:center;gap:10px;}
.logo-text{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--cream);}
.logo-text span{color:var(--gold);}
.logo-sub{font-family:'DM Mono',monospace;font-size:0.48rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);display:block;}
.nav{display:flex;gap:2rem;}
.nav button{font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.14em;text-transform:uppercase;background:none;border:none;cursor:pointer;color:var(--muted);padding:6px 0;border-bottom:1px solid transparent;transition:all .2s;}
.nav button:hover,.nav button.on{color:var(--gold);border-bottom-color:var(--gold);}
.hero{min-height:100vh;display:flex;align-items:center;padding:80px 3rem 3rem;background:radial-gradient(ellipse 80% 60% at 60% 40%,rgba(212,160,23,0.05) 0%,transparent 60%),var(--bg);position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,160,23,0.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,160,23,0.03) 60px);}
.hero-left{flex:1;max-width:520px;position:relative;z-index:2;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(212,160,23,0.25);padding:5px 14px;margin-bottom:1.8rem;}
.hero-h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(2.8rem,5.5vw,4.5rem);line-height:1.03;color:var(--cream);margin-bottom:1.4rem;}
.hero-h1 em{color:var(--gold);font-style:italic;}
.hero-p{font-size:1.05rem;font-weight:300;line-height:1.8;color:var(--subtext);margin-bottom:2.2rem;max-width:420px;}
.hero-btns{display:flex;gap:.9rem;flex-wrap:wrap;}
.btn-primary{background:linear-gradient(135deg,var(--gold),#B8880F);color:#FDFBF7;border:none;padding:.75rem 2rem;font-family:'DM Mono',monospace;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;transition:all .22s;font-weight:500;}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(212,160,23,0.25);}
.btn-outline{background:transparent;color:var(--text);border:1px solid rgba(0,0,0,0.15);padding:.75rem 2rem;font-family:'DM Mono',monospace;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;transition:all .22s;}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);}
.hero-right{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:380px;position:relative;z-index:2;}
.hero-ill{border:1px solid var(--border);overflow:hidden;height:160px;position:relative;transition:border-color .3s;}
.hero-ill:hover{border-color:rgba(212,160,23,0.4);}
.hero-ill:nth-child(2){margin-top:20px;}
.hero-ill:nth-child(4){margin-top:-20px;}
.fbar{background:rgba(245,242,234,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:.8rem 2rem;display:flex;gap:.45rem;flex-wrap:wrap;align-items:center;position:sticky;top:60px;z-index:200;}
.flabel{font-family:'DM Mono',monospace;font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-right:.3rem;}
.fchip{padding:4px 12px;border:1px solid rgba(0,0,0,0.08);background:transparent;font-family:'DM Mono',monospace;font-size:0.57rem;letter-spacing:0.09em;text-transform:uppercase;color:var(--muted);cursor:pointer;transition:all .18s;}
.fchip:hover{border-color:var(--rust);color:var(--rust);}
.fchip.on{background:var(--rust);border-color:var(--rust);color:#fff;}
.layout{display:flex;min-height:calc(100vh - 60px);}
.gallery{flex:1;padding:1.8rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.2rem;align-content:start;}
.card{background:var(--card);border:1px solid var(--border);cursor:pointer;transition:all .3s;overflow:hidden;animation:fadeUp .4s ease both;}
.card:hover{border-color:rgba(212,160,23,0.4);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.5);}
.card.sel{border-color:var(--gold);box-shadow:0 0 0 2px rgba(212,160,23,0.2);}
.card-ill{height:220px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.card-ill svg{width:100%;height:100%;}
.diff-pill{position:absolute;top:10px;left:10px;z-index:5;font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.1em;text-transform:uppercase;padding:3px 9px;backdrop-filter:blur(8px);}
.diff-pill.Beginner{background:rgba(45,106,79,0.85);color:#A8E6C8;border:1px solid rgba(45,106,79,0.6);}
.diff-pill.Intermediate{background:rgba(212,160,23,0.2);color:var(--gold);border:1px solid rgba(212,160,23,0.4);}
.diff-pill.Advanced{background:rgba(193,75,26,0.25);color:#F0825A;border:1px solid rgba(193,75,26,0.5);}
.diff-pill.Expert{background:rgba(80,20,120,0.3);color:#C89EF0;border:1px solid rgba(120,40,180,0.5);}
.origin-pill{position:absolute;top:10px;right:10px;z-index:5;font-family:'DM Mono',monospace;font-size:0.48rem;letter-spacing:0.08em;text-transform:uppercase;padding:3px 8px;background:rgba(255,255,255,0.9);color:var(--subtext);border:1px solid rgba(0,0,0,0.06);}
.card-body{padding:.9rem 1.1rem;border-top:1px solid var(--border);}
.card-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;color:var(--cream);margin-bottom:2px;}
.card-meta{font-family:'DM Mono',monospace;font-size:0.56rem;letter-spacing:0.09em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem;}
.card-tags{display:flex;gap:4px;flex-wrap:wrap;}
.tag{font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:.06em;text-transform:uppercase;padding:2px 7px;}
.tag.af{color:var(--gold);border:1px solid rgba(212,160,23,0.3);}
.tag.gl{color:var(--sage);border:1px solid rgba(45,106,79,0.4);}
.dpanel{width:420px;min-width:420px;border-left:1px solid var(--border);background:var(--surface);overflow-y:auto;max-height:calc(100vh - 60px - 48px);position:sticky;top:calc(60px + 48px);}
.dp-empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2rem;padding:3rem;text-align:center;}
.dp-empty p{font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);line-height:2;}
.dp-stage{height:300px;position:relative;overflow:hidden;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center;}
.dp-stage svg{width:100%;height:100%;}
.stage-label{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(212,160,23,0.6);z-index:3;white-space:nowrap;}
.dp-hdr{padding:1.3rem 1.5rem;border-bottom:1px solid var(--border);}
.dp-eyebrow{font-family:'DM Mono',monospace;font-size:0.56rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--rust);margin-bottom:.3rem;}
.dp-title{font-family:'Playfair Display',serif;font-weight:900;font-size:1.5rem;color:var(--cream);margin-bottom:.3rem;}
.dp-desc{font-size:.88rem;font-weight:300;line-height:1.65;color:var(--subtext);font-style:italic;}
.dp-sec{padding:1rem 1.5rem;border-bottom:1px solid var(--border);}
.sec-hd{font-family:'DM Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:.7rem;display:flex;align-items:center;gap:8px;}
.sec-hd::after{content:'';flex:1;height:1px;background:var(--border);}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
.mitem{background:rgba(0,0,0,0.03);border:1px solid var(--border);padding:7px 9px;}
.mlbl{font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:1px;}
.mval{font-family:'DM Mono',monospace;font-size:0.8rem;font-weight:500;color:var(--cream);}
.plist{display:flex;flex-direction:column;gap:4px;}
.pitem{border:1px solid var(--border);background:rgba(0,0,0,0.02);overflow:hidden;transition:border-color .2s;}
.pitem:hover,.pitem.open{border-color:rgba(212,160,23,0.35);}
.phdr{padding:9px 11px;display:flex;align-items:center;gap:8px;cursor:pointer;}
.pnum{width:20px;height:20px;background:var(--rust);color:#fff;font-family:'DM Mono',monospace;font-size:0.56rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pname{font-family:'Outfit',sans-serif;font-weight:600;font-size:.88rem;color:var(--cream);flex:1;}
.pdim{font-family:'DM Mono',monospace;font-size:.52rem;color:var(--muted);}
.parr{background:none;border:none;cursor:pointer;color:var(--muted);font-size:.9rem;transition:transform .2s;line-height:1;}
.parr.open{transform:rotate(180deg);}
.pbody{display:none;padding:0 11px 12px;}
.pbody.show{display:block;}
.patbox{background:rgba(0,0,0,0.02);border:1px solid var(--border);padding:12px;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:7px;}
.patgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(212,160,23,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.06) 1px,transparent 1px);background-size:16px 16px;}
.nlbl{font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rust);margin-bottom:4px;margin-top:8px;}
.slbl{font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:4px;margin-top:8px;}
.nlist,.slist{list-style:none;padding:0;}
.nlist li,.slist li{font-size:.82rem;font-weight:300;line-height:1.65;color:var(--text);padding-left:1rem;position:relative;margin-bottom:2px;}
.nlist li::before{content:'—';position:absolute;left:0;color:var(--rust);font-size:.65rem;}
.slist li::before{content:'→';position:absolute;left:0;color:var(--sage);font-size:.65rem;}
.dp-actions{padding:1rem 1.5rem;display:flex;gap:.7rem;flex-wrap:wrap;background:rgba(0,0,0,0.04);border-top:1px solid var(--border);}
.bact{padding:.5rem 1.2rem;font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.bact.out{background:transparent;color:var(--gold);border:1px solid rgba(212,160,23,0.3);}
.bact.out:hover{background:rgba(212,160,23,0.1);border-color:var(--gold);}
.bact.sol{background:linear-gradient(135deg,var(--rust),#9E3A12);color:#fff;border:none;}
.bact.sol:hover{background:linear-gradient(135deg,#D4562A,var(--rust));}
.pm-ov{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999;display:flex;align-items:center;justify-content:center;padding:2rem;backdrop-filter:blur(4px);}
.pm-box{background:var(--surface);max-width:820px;width:100%;max-height:90vh;overflow-y:auto;border:1px solid var(--border2);}
.pm-hdr{background:var(--card);padding:1.1rem 1.6rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);}
.pm-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1.1rem;color:var(--cream);}
.pm-close{background:none;border:none;color:var(--muted);font-size:1.3rem;cursor:pointer;}
.pm-body{padding:1.8rem;}
.pm-sheet{border:1px solid var(--border);padding:1.4rem;margin-bottom:1.2rem;}
.pm-slbl{font-family:'DM Mono',monospace;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rust);margin-bottom:.3rem;}
.pm-stitle{font-family:'Playfair Display',serif;font-weight:700;font-size:1.15rem;color:var(--cream);margin-bottom:.9rem;}
.pm-inner{display:flex;gap:1.4rem;flex-wrap:wrap;align-items:flex-start;}
.pm-pat{background:rgba(0,0,0,0.03);border:1px solid var(--border);padding:10px;position:relative;flex-shrink:0;}
.pm-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(212,160,23,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.06) 1px,transparent 1px);background-size:16px 16px;}
.pm-foot{margin-top:9px;border-top:1px solid var(--border);padding-top:6px;font-family:'DM Mono',monospace;font-size:.5rem;color:var(--muted);display:flex;justify-content:space-between;}
.pm-acts{display:flex;justify-content:flex-end;gap:.8rem;margin-top:1rem;}
.kente{height:3px;background:repeating-linear-gradient(90deg,#B22222 0,#B22222 14px,#D4A017 14px,#D4A017 28px,#2D6A4F 28px,#2D6A4F 42px,#FDFBF7 42px,#FDFBF7 56px);}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.ill-float{animation:float 4s ease-in-out infinite;}

@media (max-width: 900px) {
  .hero { flex-direction: column; padding: 100px 2rem 2rem; }
  .hero-right { margin-top: 3rem; max-width: 100%; }
  .dpanel { width: 320px; min-width: 320px; }
}
@media (max-width: 768px) {
  .logo-sub { display: none; }
  .hdr { padding: 0 1rem; }
  .nav { gap: 1rem; }
  .fbar { top: 60px; padding: .6rem 1rem; }
  .layout { flex-direction: column; }
  .gallery { padding: 1rem; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: .8rem; }
  .card-ill { height: 160px; }
  
  .dpanel {
    position: fixed; top: 0; left: 0; width: 100%; min-width: 100%; height: 100vh; max-height: 100vh;
    z-index: 500; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dpanel.active { transform: translateY(0); }
  .dp-empty { display: none; }
  .mgrid { grid-template-columns: 1fr; }
  .dp-actions { position: sticky; bottom: 0; background: var(--surface); padding-bottom: 2rem; z-index: 10; border-top: 1px solid var(--border); }
  .pm-box { margin: 10px; max-height: calc(100vh - 20px); }
  .pm-inner { flex-direction: column; }
  .pm-pat { width: 100%; overflow: hidden; display: flex; justify-content: center; }
}
`;
/* ═══════════════════════════════════════════
   GARMENT ILLUSTRATIONS — pure inline SVG
   No external URLs, no CORS, works everywhere
═══════════════════════════════════════════ */
const GarmentIllustration: FC<{ type: GarmentType; accent: string; bg: string; size?: "card" | "panel" }> = ({ type, accent, bg, size = "card" }) => {
    const h = size === "panel" ? 300 : 220;
    const w = size === "panel" ? 420 : 280;

    const illustrations: Record<GarmentType, ReactElement> = {

        agbada: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* bg grid */}
                <line x1="140" y1="0" x2="140" y2="220" stroke={accent} strokeWidth=".3" opacity=".15" />
                <line x1="0" y1="110" x2="280" y2="110" stroke={accent} strokeWidth=".3" opacity=".15" />
                {/* outer robe */}
                <path d="M40,50 Q140,30 240,50 L260,200 L20,200Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                <path d="M40,50 Q140,30 240,50 L260,200 L20,200Z" fill="none" stroke={accent} strokeWidth="1.5" />
                {/* embroidery at neck */}
                <path d="M105,52 Q140,42 175,52" fill="none" stroke={accent} strokeWidth="2" opacity=".8" />
                {[0, 1, 2, 3, 4].map(i => (
                    <circle key={i} cx={108 + i * 16} cy={54} r="2.5" fill={accent} opacity=".7" />
                ))}
                {/* inner buba */}
                <path d="M95,55 L185,55 L195,200 L85,200Z" fill={accent} opacity=".25" stroke={accent} strokeWidth="1" />
                {/* wide sleeves */}
                <path d="M40,50 L20,120 L85,130 L95,55Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" />
                <path d="M240,50 L260,120 L195,130 L185,55Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" />
                {/* embroidery lines on body */}
                {[0, 1, 2].map(i => (
                    <path key={i} d={`M120,${80 + i * 30} Q140,${75 + i * 30} 160,${80 + i * 30}`} fill="none" stroke={accent} strokeWidth="1.2" opacity=".5" />
                ))}
                {/* cap */}
                <ellipse cx="140" cy="40" rx="22" ry="12" fill={accent} opacity=".35" stroke={accent} strokeWidth="1" />
                <path d="M118,40 Q140,28 162,40" fill={accent} opacity=".5" stroke={accent} strokeWidth="1" />
                {/* label */}
                <text x="140" y="215" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">AGBADA</text>
            </svg>
        ),

        senator: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                <line x1="140" y1="0" x2="140" y2="220" stroke={accent} strokeWidth=".3" opacity=".15" />
                {/* long senator top */}
                <path d="M95,45 L185,45 L195,185 L85,185Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* collar stand */}
                <path d="M118,45 Q140,38 162,45 L158,58 Q140,50 122,58Z" fill={accent} opacity=".45" stroke={accent} strokeWidth="1" />
                {/* CF embroidery band */}
                <line x1="140" y1="58" x2="140" y2="130" stroke={accent} strokeWidth="2" opacity=".6" />
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <path key={i} d={`M134,${65 + i * 10} Q140,${62 + i * 10} 146,${65 + i * 10}`} fill="none" stroke={accent} strokeWidth="1.2" opacity=".55" />
                ))}
                {/* long sleeves */}
                <path d="M95,45 L65,50 L60,155 L85,150 L85,185" fill="none" stroke={accent} strokeWidth="1.2" opacity=".7" />
                <path d="M185,45 L215,50 L220,155 L195,150 L195,185" fill="none" stroke={accent} strokeWidth="1.2" opacity=".7" />
                {/* trousers */}
                <path d="M100,185 L85,215 L120,215 L140,195 L160,215 L195,215 L180,185Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                {/* buttons on CF */}
                {[0, 1, 2].map(i => (
                    <circle key={i} cx="140" cy={138 + i * 10} r="2" fill={accent} opacity=".8" />
                ))}
                <text x="140" y="215" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">SENATOR</text>
            </svg>
        ),

        dashiki: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* colorful background pattern */}
                {[0, 1, 2, 3, 4].map(i => (
                    <rect key={i} x={20 + i * 48} y="0" width="44" height="220" fill={accent} opacity={i % 2 === 0 ? ".04" : ".02"} />
                ))}
                {/* dashiki body */}
                <path d="M80,48 L200,48 L210,185 L70,185Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* V-neck */}
                <path d="M120,48 L140,75 L160,48" fill="none" stroke={accent} strokeWidth="2" />
                {/* yoke embroidery band */}
                <path d="M80,48 L200,48 L200,80 L80,80Z" fill={accent} opacity=".3" />
                {/* geometric yoke pattern */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <path key={i} d={`M${85 + i * 16},50 L${93 + i * 16},58 L${85 + i * 16},66 L${77 + i * 16},58Z`} fill="none" stroke={accent} strokeWidth="1" opacity=".6" />
                ))}
                {/* short sleeves */}
                <path d="M80,48 L45,58 L48,100 L80,95" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.2" />
                <path d="M200,48 L235,58 L232,100 L200,95" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.2" />
                {/* hem detail */}
                <path d="M70,185 L210,185" stroke={accent} strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="140" y="215" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">DASHIKI</text>
            </svg>
        ),

        boubou: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* massive flowing robe */}
                <path d="M30,42 Q140,22 250,42 L265,205 L15,205Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.5" />
                {/* voluminous sleeves implied by width */}
                <path d="M30,42 Q10,80 15,150 L30,205" fill="none" stroke={accent} strokeWidth="1.2" opacity=".5" />
                <path d="M250,42 Q270,80 265,150 L250,205" fill="none" stroke={accent} strokeWidth="1.2" opacity=".5" />
                {/* neck opening with embroidery */}
                <ellipse cx="140" cy="55" rx="32" ry="16" fill={bg} stroke={accent} strokeWidth="2" />
                {/* neck embroidery */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <path key={i} d={`M${110 + i * 12},46 Q${116 + i * 12},55 ${110 + i * 12},64`} fill="none" stroke={accent} strokeWidth="1.5" opacity=".6" />
                ))}
                {/* chest embroidery panel */}
                <path d="M108,72 Q140,65 172,72 L168,120 Q140,128 112,120Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" />
                {/* decorative embroidery inside panel */}
                {[0, 1, 2].map(i => (
                    <path key={i} d={`M118,${80 + i * 12} Q140,${76 + i * 12} 162,${80 + i * 12}`} fill="none" stroke={accent} strokeWidth="1.2" opacity=".55" />
                ))}
                {/* hem border */}
                <path d="M15,200 L265,200" stroke={accent} strokeWidth="2" opacity=".4" />
                <path d="M15,205 L265,205" stroke={accent} strokeWidth="1" opacity=".3" strokeDasharray="5,4" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">GRAND BOUBOU</text>
            </svg>
        ),

        kente: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* kente strip pattern background */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                    <rect key={i} x={0} y={i * 17} width="280" height="8" fill={["#D4A017", "#B22222", "#2D6A4F", "#1A1A1A"][i % 4]} opacity=".18" />
                ))}
                {/* top/kaba bodice */}
                <path d="M85,40 L195,40 L200,120 L80,120Z" fill="none" stroke={accent} strokeWidth="2" />
                {/* kente strips on bodice */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <line key={i} x1="85" y1={40 + i * 12} x2="195" y2={40 + i * 12} stroke={["#D4A017", "#B22222", "#2D6A4F"][i % 3]} strokeWidth="8" opacity=".35" />
                ))}
                {/* neckline */}
                <path d="M115,40 Q140,32 165,40" fill="none" stroke={accent} strokeWidth="2" />
                {/* short sleeves */}
                <path d="M85,40 L55,50 L58,85 L80,80" fill="none" stroke={accent} strokeWidth="1.5" />
                <path d="M195,40 L225,50 L222,85 L200,80" fill="none" stroke={accent} strokeWidth="1.5" />
                {/* slit skirt */}
                <path d="M80,120 L70,205 L140,205 L140,120" fill="none" stroke={accent} strokeWidth="1.5" />
                <path d="M200,120 L210,205 L140,205" fill="none" stroke={accent} strokeWidth="1.5" />
                {/* kente on skirt */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <line key={i} x1="70" y1={130 + i * 13} x2="210" y2="130+i*13" stroke={["#D4A017", "#B22222", "#2D6A4F"][i % 3]} strokeWidth="8" opacity=".28" />
                ))}
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">KENTE KABA</text>
            </svg>
        ),

        adire: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* indigo adire pattern - resist dye circles */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(row => (
                    [0, 1, 2, 3, 4].map(col => (
                        <circle key={`${row}-${col}`}
                            cx={30 + col * 50 + (row % 2) * 25} cy={20 + row * 22}
                            r="8" fill="none" stroke={accent} strokeWidth="1" opacity=".2" />
                    ))
                ))}
                {/* dress silhouette */}
                <path d="M88,38 L192,38 L205,205 L75,205Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.5" />
                {/* adire pattern on dress */}
                {[0, 1, 2, 3, 4, 5, 6].map(row => (
                    [0, 1, 2].map(col => (
                        <circle key={`d${row}-${col}`}
                            cx={105 + col * 35} cy={60 + row * 22}
                            r="6" fill="none" stroke={accent} strokeWidth="1" opacity=".4" />
                    ))
                ))}
                {/* scoop neck */}
                <path d="M113,38 Q140,50 167,38" fill="none" stroke={accent} strokeWidth="2" />
                {/* short sleeves */}
                <path d="M88,38 L55,48 L58,80 L88,75" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                <path d="M192,38 L225,48 L222,80 L192,75" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                {/* waistline */}
                <path d="M80,105 Q140,98 200,105" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity=".5" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">ADIRE</text>
            </svg>
        ),
        gele: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* gele headtie - dramatic sculptural shape */}
                <path d="M80,18 Q140,2 200,18 Q225,30 218,52 Q200,48 140,50 Q80,48 62,52 Q55,30 80,18Z" fill={accent} opacity=".35" stroke={accent} strokeWidth="1.5" />
                {/* gele folds */}
                <path d="M90,18 Q120,10 150,14 Q175,18 200,18" fill="none" stroke={accent} strokeWidth="1" opacity=".6" />
                <path d="M62,52 Q80,45 140,46 Q200,45 218,52" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
                {/* iro wrapper - wide rectangle */}
                <path d="M55,55 L225,55 L218,175 L62,175Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* buba blouse overlap */}
                <path d="M88,55 L192,55 L188,130 L92,130Z" fill={accent} opacity=".28" stroke={accent} strokeWidth="1.2" />
                {/* ipele shoulder cloth */}
                <path d="M70,60 L130,60 L115,120 L55,120Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
                {/* buba embroidery at neck */}
                {[0, 1, 2, 3].map(i => (
                    <path key={i} d={`M108,${58 + i * 8} Q140,${55 + i * 8} 172,${58 + i * 8}`} fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
                ))}
                {/* wrapper overlap line */}
                <line x1="140" y1="55" x2="140" y2="175" stroke={accent} strokeWidth="1" strokeDasharray="3,2" opacity=".4" />
                {/* aso-oke bottom */}
                <path d="M62,175 L218,175 L215,205 L65,205Z" fill={accent} opacity=".12" stroke={accent} strokeWidth="1" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">GELE SET</text>
            </svg>
        ),

        kaftan: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* velvet texture suggestion */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                    <line key={i} x1={i * 30} y1="0" x2={i * 30} y2="220" stroke={accent} strokeWidth=".3" opacity=".08" />
                ))}
                {/* long kaftan body */}
                <path d="M82,35 L198,35 L210,205 L70,205Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* center front sfifa braid */}
                <line x1="140" y1="48" x2="140" y2="205" stroke={accent} strokeWidth="3" opacity=".5" />
                <line x1="138" y1="48" x2="138" y2="205" stroke={accent} strokeWidth="1" opacity=".8" />
                <line x1="142" y1="48" x2="142" y2="205" stroke={accent} strokeWidth="1" opacity=".8" />
                {/* aakad clasp loops */}
                {[0, 1, 2, 3, 4].map(i => (
                    <path key={i} d={`M134,${62 + i * 22} Q128,${68 + i * 22} 134,${74 + i * 22}`} fill="none" stroke={accent} strokeWidth="1.5" opacity=".7" />
                ))}
                {/* elaborate round neckline */}
                <ellipse cx="140" cy="48" rx="30" ry="14" fill="none" stroke={accent} strokeWidth="2" />
                {/* sfifa braid at neckline */}
                <ellipse cx="140" cy="48" rx="34" ry="18" fill="none" stroke={accent} strokeWidth="1" opacity=".5" strokeDasharray="3,2" />
                {/* bell sleeves */}
                <path d="M82,35 L42,40 L30,140 L82,145" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                <path d="M198,35 L238,40 L250,140 L198,145" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.2" />
                {/* sfifa at cuffs */}
                <line x1="30" y1="136" x2="82" y2="142" stroke={accent} strokeWidth="2" opacity=".6" />
                <line x1="198" y1="142" x2="250" y2="136" stroke={accent} strokeWidth="2" opacity=".6" />
                {/* hem sfifa */}
                <line x1="70" y1="202" x2="210" y2="202" stroke={accent} strokeWidth="2.5" opacity=".5" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">MOROCCAN KAFTAN</text>
            </svg>
        ),

        isiagu: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* isiagu lion print pattern background */}
                {[0, 1, 2, 3, 4, 5, 6].map(row => (
                    [0, 1, 2, 3].map(col => (
                        <g key={`${row}-${col}`} transform={`translate(${18 + col * 62},${18 + row * 28})`}>
                            <ellipse cx="0" cy="0" rx="12" ry="8" fill="none" stroke={accent} strokeWidth=".8" opacity=".2" />
                            <line x1="-8" y1="0" x2="8" y2="0" stroke={accent} strokeWidth=".5" opacity=".15" />
                            <line x1="0" y1="-6" x2="0" y2="6" stroke={accent} strokeWidth=".5" opacity=".15" />
                        </g>
                    ))
                ))}
                {/* isiagu top body */}
                <path d="M90,40 L190,40 L195,180 L85,180Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* button placket CF */}
                <line x1="140" y1="50" x2="140" y2="180" stroke={accent} strokeWidth="1" strokeDasharray="3,2" opacity=".5" />
                {[0, 1, 2, 3, 4].map(i => (
                    <circle key={i} cx="140" cy={60 + i * 22} r="3" fill={accent} opacity=".7" />
                ))}
                {/* mandarin collar */}
                <path d="M115,40 L125,32 L155,32 L165,40 L165,50 Q140,44 115,50Z" fill={accent} opacity=".4" stroke={accent} strokeWidth="1.2" />
                {/* long sleeves */}
                <path d="M90,40 L55,48 L50,155 L85,160 L85,180" fill="none" stroke={accent} strokeWidth="1.2" opacity=".7" />
                <path d="M190,40 L225,48 L230,155 L195,160 L195,180" fill="none" stroke={accent} strokeWidth="1.2" opacity=".7" />
                {/* gold aguba cuff braids */}
                <line x1="50" y1="152" x2="85" y2="157" stroke="#D4A017" strokeWidth="2.5" opacity=".7" />
                <line x1="195" y1="157" x2="230" y2="152" stroke="#D4A017" strokeWidth="2.5" opacity=".7" />
                <text x="140" y="215" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">ISIAGU</text>
            </svg>
        ),

        wrapper: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* ankara wax print pattern */}
                {[0, 1, 2, 3, 4, 5].map(row => (
                    [0, 1, 2, 3, 4].map(col => (
                        <g key={`${row}-${col}`} transform={`translate(${20 + col * 52},${15 + row * 35})`}>
                            <circle cx="0" cy="0" r="9" fill="none" stroke={accent} strokeWidth="1" opacity=".2" />
                            <circle cx="0" cy="0" r="5" fill={accent} opacity=".12" />
                        </g>
                    ))
                ))}
                {/* peplum top */}
                <path d="M88,35 L192,35 L198,118 L82,118Z" fill={accent} opacity=".22" stroke={accent} strokeWidth="1.5" />
                {/* peplum flare */}
                <path d="M75,118 L82,118 L80,140 L65,145Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" />
                <path d="M198,118 L205,118 L215,140 L200,145Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1" />
                <path d="M82,118 L198,118 L205,140 L75,140Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.2" />
                {/* scoop neck */}
                <path d="M112,35 Q140,46 168,35" fill="none" stroke={accent} strokeWidth="2" />
                {/* wrapper skirt */}
                <path d="M72,145 L208,145 L215,205 L65,205Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.5" />
                {/* wrapper overlap */}
                <line x1="140" y1="145" x2="132" y2="205" stroke={accent} strokeWidth="1" strokeDasharray="3,2" opacity=".5" />
                {/* waistband */}
                <path d="M72,145 L208,145 L210,155 L70,155Z" fill={accent} opacity=".35" stroke={accent} strokeWidth="1" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">ANKARA SET</text>
            </svg>
        ),

        adress: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                <line x1="140" y1="0" x2="140" y2="220" stroke={accent} strokeWidth=".3" opacity=".12" />
                {/* fitted bodice */}
                <path d="M100,38 L180,38 L185,115 L95,115Z" fill={accent} opacity=".22" stroke={accent} strokeWidth="1.5" />
                {/* flared A-line skirt */}
                <path d="M95,115 L50,205 L230,205 L185,115Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.5" />
                {/* scoop neckline */}
                <path d="M113,38 Q140,50 167,38" fill="none" stroke={accent} strokeWidth="2" />
                {/* shoulder straps / sleeveless */}
                <path d="M100,38 L96,28 L115,28 L115,38" fill={accent} opacity=".25" stroke={accent} strokeWidth="1" />
                <path d="M180,38 L184,28 L165,28 L165,38" fill={accent} opacity=".25" stroke={accent} strokeWidth="1" />
                {/* waist seam */}
                <path d="M95,115 Q140,108 185,115" fill="none" stroke={accent} strokeWidth="1.5" />
                {/* dart lines */}
                <line x1="120" y1="50" x2="125" y2="95" stroke={accent} strokeWidth=".8" strokeDasharray="3,2" opacity=".5" />
                <line x1="160" y1="50" x2="155" y2="95" stroke={accent} strokeWidth=".8" strokeDasharray="3,2" opacity=".5" />
                {/* skirt godets / A flare lines */}
                <line x1="140" y1="115" x2="140" y2="205" stroke={accent} strokeWidth=".8" strokeDasharray="4,3" opacity=".35" />
                <line x1="140" y1="115" x2="95" y2="205" stroke={accent} strokeWidth=".8" strokeDasharray="4,3" opacity=".3" />
                <line x1="140" y1="115" x2="185" y2="205" stroke={accent} strokeWidth=".8" strokeDasharray="4,3" opacity=".3" />
                {/* hem */}
                <line x1="50" y1="205" x2="230" y2="205" stroke={accent} strokeWidth="2" opacity=".5" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">A-LINE DRESS</text>
            </svg>
        ),

        blazer: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* blazer body */}
                <path d="M85,38 L195,38 L205,200 L75,200Z" fill={accent} opacity=".18" stroke={accent} strokeWidth="1.5" />
                {/* left lapel */}
                <path d="M140,38 L115,38 L88,80 L120,85 L140,65Z" fill={accent} opacity=".32" stroke={accent} strokeWidth="1.2" />
                {/* right lapel */}
                <path d="M140,38 L165,38 L192,80 L160,85 L140,65Z" fill={accent} opacity=".32" stroke={accent} strokeWidth="1.2" />
                {/* notch */}
                <path d="M118,68 L127,75" fill="none" stroke={accent} strokeWidth="1.5" />
                <path d="M162,68 L153,75" fill="none" stroke={accent} strokeWidth="1.5" />
                {/* collar */}
                <path d="M115,38 Q140,32 165,38 L160,50 Q140,44 120,50Z" fill={accent} opacity=".4" stroke={accent} strokeWidth="1" />
                {/* set-in sleeves */}
                <path d="M85,38 L52,48 L48,165 L75,168 L75,200" fill="none" stroke={accent} strokeWidth="1.3" opacity=".7" />
                <path d="M195,38 L228,48 L232,165 L205,168 L205,200" fill="none" stroke={accent} strokeWidth="1.3" opacity=".7" />
                {/* welt pocket */}
                <path d="M92,130 L118,130 L118,138 L92,138Z" fill="none" stroke={accent} strokeWidth="1" opacity=".6" />
                {/* buttons */}
                {[0, 1].map(i => (
                    <circle key={i} cx="140" cy={108 + i * 22} r="4" fill="none" stroke={accent} strokeWidth="1.5" opacity=".8" />
                ))}
                {/* pocket square */}
                <path d="M158,85 L180,85 L178,102 L156,102Z" fill="none" stroke={accent} strokeWidth=".8" opacity=".5" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">BLAZER</text>
            </svg>
        ),

        trousers: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* high waist wide leg trousers */}
                {/* waistband */}
                <path d="M82,32 L198,32 L202,58 L78,58Z" fill={accent} opacity=".35" stroke={accent} strokeWidth="1.5" />
                {/* left leg - very wide */}
                <path d="M78,58 L140,58 L130,205 L40,205Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* right leg */}
                <path d="M140,58 L202,58 L240,205 L150,205Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* crease lines */}
                <line x1="78" y1="58" x2="62" y2="205" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity=".45" />
                <line x1="202" y1="58" x2="218" y2="205" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity=".45" />
                {/* belt loops */}
                {[0, 1, 2, 3].map(i => (
                    <rect key={i} x={92 + i * 26} y="30" width="6" height="12" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
                ))}
                {/* zipper fly */}
                <line x1="140" y1="40" x2="140" y2="65" stroke={accent} strokeWidth="1.5" opacity=".6" />
                {/* side pockets */}
                <path d="M88,62 Q94,80 90,92" fill="none" stroke={accent} strokeWidth="1.2" opacity=".5" />
                <path d="M192,62 Q186,80 190,92" fill="none" stroke={accent} strokeWidth="1.2" opacity=".5" />
                {/* hem lines */}
                <line x1="40" y1="202" x2="130" y2="202" stroke={accent} strokeWidth="2" opacity=".5" />
                <line x1="150" y1="202" x2="240" y2="202" stroke={accent} strokeWidth="2" opacity=".5" />
                <text x="140" y="218" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">WIDE-LEG</text>
            </svg>
        ),

        pblouse: (
            <svg viewBox="0 0 280 220" width={w} height={h}>
                <rect width="280" height="220" fill={bg} />
                {/* puff sleeve blouse */}
                {/* body */}
                <path d="M98,50 L182,50 L185,185 L95,185Z" fill={accent} opacity=".2" stroke={accent} strokeWidth="1.5" />
                {/* scoop neck */}
                <path d="M113,50 Q140,62 167,50" fill="none" stroke={accent} strokeWidth="2" />
                {/* button placket */}
                <line x1="140" y1="62" x2="140" y2="185" stroke={accent} strokeWidth="1" strokeDasharray="3,2" opacity=".4" />
                {[0, 1, 2, 3, 4].map(i => (
                    <circle key={i} cx="140" cy={70 + i * 20} r="2.5" fill={accent} opacity=".75" />
                ))}
                {/* LEFT puff sleeve — gathered ball shape */}
                <path d="M98,50 L72,44 Q38,42 35,70 Q32,98 58,105 L82,108 L98,100" fill={accent} opacity=".22" stroke={accent} strokeWidth="1.5" />
                <path d="M72,44 Q50,38 40,55 Q32,72 40,90 Q48,106 62,105" fill="none" stroke={accent} strokeWidth="1" opacity=".5" strokeDasharray="3,2" />
                {/* LEFT cuff gather */}
                <path d="M58,105 L82,108 L82,118 L58,116Z" fill={accent} opacity=".35" stroke={accent} strokeWidth="1" />
                {/* RIGHT puff sleeve */}
                <path d="M182,50 L208,44 Q242,42 245,70 Q248,98 222,105 L198,108 L182,100" fill={accent} opacity=".22" stroke={accent} strokeWidth="1.5" />
                <path d="M208,44 Q230,38 240,55 Q248,72 240,90 Q232,106 218,105" fill="none" stroke={accent} strokeWidth="1" opacity=".5" strokeDasharray="3,2" />
                {/* RIGHT cuff */}
                <path d="M198,108 L222,105 L222,118 L198,116Z" fill={accent} opacity=".35" stroke={accent} strokeWidth="1" />
                {/* gather lines on sleeves */}
                {[0, 1, 2].map(i => (
                    <path key={i} d={`M${42 + i * 8},${68 + i * 4} Q${52 + i * 6},${64 + i * 4} ${62 + i * 8},${68 + i * 4}`} fill="none" stroke={accent} strokeWidth=".8" opacity=".4" />
                ))}
                {[0, 1, 2].map(i => (
                    <path key={i} d={`M${218 - i * 8},${68 + i * 4} Q${228 - i * 6},${64 + i * 4} ${238 - i * 8},${68 + i * 4}`} fill="none" stroke={accent} strokeWidth=".8" opacity=".4" />
                ))}
                {/* hem */}
                <path d="M95,185 Q140,180 185,185" fill="none" stroke={accent} strokeWidth="1.5" opacity=".5" />
                <text x="140" y="215" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={accent} opacity=".5" letterSpacing="3">PUFF SLEEVE</text>
            </svg>
        ),
    };

    return (
        <div className="ill-float" style={{ width: "100%", height: "100%" }}>
            {illustrations[type] ?? illustrations.adress}
        </div>
    );
};
/* ═══════════════════════════════════════════
   PATTERN SVGs
═══════════════════════════════════════════ */
const PatSVG: FC<PatSVGProps> = ({ shape }): ReactElement => {
    const c = "#C14B1A", f = "rgba(193,75,26,0.07)", g = "#2D6A4F";
    const shapes: Record<PatternShape, ReactElement> = {
        front_bodice: (<svg viewBox="0 0 110 145" width="98" height="130"><path d="M18,10 L92,10 L100,28 L104,135 L6,135 L10,28Z" fill={f} stroke={c} strokeWidth="1.3" /><path d="M18,10 Q55,18 92,10" fill="none" stroke={c} strokeWidth=".8" strokeDasharray="3,2" /><line x1="6" y1="72" x2="104" y2="72" stroke={c} strokeWidth=".4" strokeDasharray="3,2" /><text x="55" y="90" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={c} opacity=".5">CF</text><line x1="55" y1="38" x2="55" y2="62" stroke={g} strokeWidth="1.2" /><text x="60" y="52" fontFamily="DM Mono" fontSize="5" fill={g}>GRAIN</text></svg>),
        back_bodice: (<svg viewBox="0 0 110 145" width="98" height="130"><path d="M14,8 L96,8 L104,26 L106,136 L4,136 L6,26Z" fill={f} stroke={c} strokeWidth="1.3" /><path d="M14,8 Q55,4 96,8" fill="none" stroke={c} strokeWidth=".8" strokeDasharray="4,2" /><line x1="4" y1="74" x2="106" y2="74" stroke={c} strokeWidth=".4" strokeDasharray="3,2" /><text x="55" y="94" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={c} opacity=".5">CB</text><line x1="55" y1="32" x2="55" y2="60" stroke={g} strokeWidth="1.2" /></svg>),
        sleeve: (<svg viewBox="0 0 120 158" width="106" height="140"><path d="M60,9 C88,9 110,26 110,46 L103,150 L17,150 L10,46 C10,26 32,9 60,9Z" fill={f} stroke={c} strokeWidth="1.3" /><line x1="17" y1="136" x2="103" y2="136" stroke={c} strokeWidth=".7" strokeDasharray="4,3" /><line x1="60" y1="36" x2="60" y2="68" stroke={g} strokeWidth="1.2" /></svg>),
        collar: (<svg viewBox="0 0 155 76" width="138" height="68"><path d="M8,58 L18,13 Q78,3 136,13 L146,58 Q78,70 8,58Z" fill={f} stroke={c} strokeWidth="1.3" /><line x1="78" y1="13" x2="78" y2="58" stroke={c} strokeWidth=".4" strokeDasharray="2,2" /><line x1="78" y1="22" x2="78" y2="46" stroke={g} strokeWidth="1.2" /></svg>),
        skirt_panel: (<svg viewBox="0 0 130 168" width="115" height="150"><path d="M28,10 L102,10 L125,160 L5,160Z" fill={f} stroke={c} strokeWidth="1.3" /><line x1="28" y1="10" x2="102" y2="10" stroke={c} strokeWidth="1.1" strokeDasharray="5,3" /><line x1="10" y1="145" x2="120" y2="145" stroke={c} strokeWidth=".7" strokeDasharray="4,3" /><line x1="65" y1="32" x2="65" y2="72" stroke={g} strokeWidth="1.2" /></svg>),
        trouser_front: (<svg viewBox="0 0 115 192" width="100" height="170"><path d="M18,10 L97,10 L100,95 L90,192 L58,192 L55,125 L22,192 L10,192 L14,95Z" fill={f} stroke={c} strokeWidth="1.3" /><line x1="14" y1="95" x2="100" y2="95" stroke={c} strokeWidth=".5" strokeDasharray="3,2" /><line x1="57" y1="38" x2="57" y2="75" stroke={g} strokeWidth="1.2" /></svg>),
        waistband: (<svg viewBox="0 0 190 55" width="170" height="49"><rect x="8" y="8" width="174" height="38" fill={f} stroke={c} strokeWidth="1.3" /><line x1="8" y1="27" x2="182" y2="27" stroke={c} strokeWidth=".5" strokeDasharray="4,3" /><line x1="95" y1="12" x2="95" y2="44" stroke={g} strokeWidth="1.2" /></svg>),
        agbada_outer: (<svg viewBox="0 0 200 140" width="178" height="124"><path d="M5,10 Q100,2 195,10 L190,130 L10,130Z" fill={f} stroke={c} strokeWidth="1.3" /><path d="M5,10 Q100,2 195,10" fill="none" stroke={c} strokeWidth="1.1" strokeDasharray="5,3" /><line x1="100" y1="25" x2="100" y2="60" stroke={g} strokeWidth="1.2" /><text x="100" y="88" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill={c} opacity=".5">OUTER ROBE</text></svg>),
        embroidery_panel: (<svg viewBox="0 0 60 120" width="52" height="105"><rect x="6" y="6" width="48" height="108" fill={f} stroke={c} strokeWidth="1.3" />{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M18,${16 + i * 16} Q30,${22 + i * 16} 42,${16 + i * 16}`} fill="none" stroke={c} strokeWidth=".9" opacity=".5" />)}<line x1="30" y1="20" x2="30" y2="55" stroke={g} strokeWidth="1.2" /></svg>),
        kente_strip: (<svg viewBox="0 0 45 160" width="38" height="142"><rect x="5" y="5" width="35" height="150" fill={f} stroke={c} strokeWidth="1.3" />{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x="5" y={5 + i * 19} width="35" height="9" fill={(["#D4A017", "#B22222", "#2D6A4F", "#0A0805"] as string[])[i % 4]} opacity=".25" />)}<line x1="22" y1="20" x2="22" y2="55" stroke={g} strokeWidth="1.2" /></svg>),
        pocket: (<svg viewBox="0 0 88 97" width="78" height="86"><path d="M9,9 L79,9 L82,88 L6,88Z" fill={f} stroke={c} strokeWidth="1.3" /><line x1="44" y1="28" x2="44" y2="55" stroke={g} strokeWidth="1.2" /></svg>),
    };
    return shapes[shape] ?? shapes.front_bodice;
};

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const STYLES: GarmentStyle[] = [
    {
        id: 1, name: "Grand Agbada", category: "Agbada", region: "West Africa", origin: "Yoruba",
        difficulty: "Advanced", fabric: "Brocade / Damask", tags: ["ceremonial", "royalty", "aso-ebi"], african: true,
        garmentType: "agbada", accent: "#D4A017", bg: "#0E0A04",
        desc: "The quintessential Yoruba ceremonial three-piece ensemble — outer robe, buba inner shirt, and sokoto trousers with heavy embroidery.",
        measurements: { "Chest": "96–104 cm", "Waist": "84–92 cm", "Hip": "102–110 cm", "Robe Len.": "150 cm", "Sleeve": "62 cm", "Seam Allow.": "2 cm" },
        pieces: [
            { id: "ag1", name: "Outer Agbada Robe", shape: "agbada_outer", dims: "280×150 cm", qty: 1, notes: ["Cut 1 full-width panel", "Mark center front opening", "5cm hem allowance all edges"], instructions: ["Hem all four edges first", "Reinforce CF opening with interfacing", "Apply embroidery before final pressing"] },
            { id: "ag2", name: "Buba Front", shape: "front_bodice", dims: "58×70 cm", qty: 1, notes: ["Cut 1 on fold", "Mark embroidery lines at collar and cuffs"], instructions: ["Embroider before assembly", "Interface collar edge", "Staystitch neckline at 1.2cm"] },
            { id: "ag3", name: "Buba Back", shape: "back_bodice", dims: "58×70 cm", qty: 2, notes: ["Cut 2 mirror", "CB seam or fold"], instructions: ["Join shoulders first", "Press seams open over tailor's ham"] },
            { id: "ag4", name: "Embroidery Panel", shape: "embroidery_panel", dims: "20×55 cm", qty: 2, notes: ["Cut 2", "Mark geometric placement", "Complete embroidery before cutting"], instructions: ["Slipstitch to garment over lining", "Press all edges under before applying"] },
            { id: "ag5", name: "Sokoto Trouser", shape: "trouser_front", dims: "58×110 cm", qty: 2, notes: ["Cut 2 mirror", "Very wide leg", "Maintain grain strictly"], instructions: ["Sew inseam with French seam", "Add 6cm elastic casing", "Hemstitch at 3cm"] },
        ]
    },
    {
        id: 2, name: "Senator Suit", category: "Senator", region: "West Africa", origin: "Pan-Nigerian",
        difficulty: "Intermediate", fabric: "Linen / Cotton", tags: ["formal", "everyday", "political"], african: true,
        garmentType: "senator", accent: "#4A8FD4", bg: "#040810",
        desc: "The modern Nigerian Senator suit — embroidered long shirt and straight trousers worn across all ethnic groups for formal occasions.",
        measurements: { "Chest": "90–98 cm", "Waist": "78–86 cm", "Hip": "96–104 cm", "Top Len.": "90 cm", "Trouser": "110 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "s1", name: "Senator Top Front", shape: "front_bodice", dims: "52×90 cm", qty: 2, notes: ["Cut 2 for button front", "Mark embroidery lines down CF", "Interface collar stand"], instructions: ["Construct collar stand first", "Embroider CF band before joining", "Buttonholes at 12cm spacing"] },
            { id: "s2", name: "Senator Top Back", shape: "back_bodice", dims: "52×90 cm", qty: 1, notes: ["Cut 1 on fold", "Optional back yoke"], instructions: ["Sew yoke seam if present", "Join to front at shoulders and sides"] },
            { id: "s3", name: "Long Sleeve", shape: "sleeve", dims: "40×66 cm", qty: 2, notes: ["Cut 2 mirror", "Embroidery at cuff"], instructions: ["Run ease stitches at cap", "Set from sleeve side", "Apply cuff embroidery before hemming"] },
            { id: "s4", name: "Trouser", shape: "trouser_front", dims: "55×112 cm", qty: 2, notes: ["Cut 2 mirror", "Press crease before cutting"], instructions: ["Sew inseam then outseam", "Apply waistband straight grain", "Add side pockets in seam"] },
            { id: "s5", name: "Waistband", shape: "waistband", dims: "84×9 cm", qty: 1, notes: ["Cut on straight grain", "Fuse interfacing inside"], instructions: ["Interface and press in half", "Attach RST", "Topstitch 2mm from edge"] },
        ]
    },
    {
        id: 3, name: "Dashiki Shirt", category: "Dashiki", region: "West Africa", origin: "Pan-African",
        difficulty: "Beginner", fabric: "Cotton / Ankara Print", tags: ["casual", "cultural", "vibrant"], african: true,
        garmentType: "dashiki", accent: "#C14B1A", bg: "#0A0402",
        desc: "The beloved Pan-African symbol — loose, brightly-patterned shirt with distinctive V-neck embroidery yoke worn across the continent and diaspora.",
        measurements: { "Chest": "88–100 cm", "Waist": "Free", "Length": "70 cm", "Sleeve": "30 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "d1", name: "Front Body", shape: "front_bodice", dims: "54×70 cm", qty: 1, notes: ["Cut 1 on fold", "V-neck opening at CF", "Mark yoke placement"], instructions: ["Staystitch V-neck at 1cm", "Apply yoke embroidery band", "Clip V-neck corners carefully"] },
            { id: "d2", name: "Back Body", shape: "back_bodice", dims: "54×70 cm", qty: 1, notes: ["Cut 1 on fold", "Slightly longer than front"], instructions: ["Join at shoulders and sides", "French seam recommended"] },
            { id: "d3", name: "Short Sleeve", shape: "sleeve", dims: "42×30 cm", qty: 2, notes: ["Cut 2", "Short band cuff"], instructions: ["Sew seam, press open", "Set into armhole", "Apply contrast cuff band"] },
        ]
    },
    {
        id: 4, name: "Grand Boubou", category: "Boubou", region: "West Africa", origin: "Senegalese",
        difficulty: "Intermediate", fabric: "Bazin Riche / Brocade", tags: ["ceremonial", "flowing", "majestic"], african: true,
        garmentType: "boubou", accent: "#9B59D4", bg: "#07030E",
        desc: "The majestic West African boubou — a voluminous flowing robe worn from Senegal to Mali, featuring elaborate embroidery at chest and hem.",
        measurements: { "Chest": "Free (108+)", "Length": "145 cm", "Width": "220 cm", "Seam Allow.": "2 cm" },
        pieces: [
            { id: "bo1", name: "Boubou Main Robe", shape: "agbada_outer", dims: "220×145 cm", qty: 1, notes: ["Full fabric width panel", "Mark center neck opening", "Fold at shoulders"], instructions: ["Hem all edges first", "Cut neck opening after hemming", "Apply embroidery at neck"] },
            { id: "bo2", name: "Neck Embroidery Band", shape: "collar", dims: "40×15 cm", qty: 1, notes: ["Matching or contrast fabric", "Complete embroidery first"], instructions: ["Interface lightly", "Slipstitch around neckline"] },
        ]
    },
    {
        id: 5, name: "Kente Kaba Set", category: "Kente", region: "West Africa", origin: "Ghanaian / Akan",
        difficulty: "Advanced", fabric: "Kente Woven Strips", tags: ["ceremonial", "royalty", "festival"], african: true,
        garmentType: "kente", accent: "#D4A017", bg: "#0A0800",
        desc: "Traditional Ghanaian Kaba and Slit set made from hand-woven Kente strips. Each strip woven separately then joined — precise alignment is essential.",
        measurements: { "Bust": "86–94 cm", "Waist": "70–78 cm", "Hip": "92–100 cm", "Top Len.": "52 cm", "Strip Width": "10 cm" },
        pieces: [
            { id: "k1", name: "Kente Strip ×12", shape: "kente_strip", dims: "10×160 cm", qty: 12, notes: ["Woven on traditional loom", "Align pattern repeats precisely", "Invisible ladder stitch"], instructions: ["Press each strip before joining", "Join without visible seam", "Press open carefully"] },
            { id: "k2", name: "Kaba Top Front", shape: "front_bodice", dims: "48×52 cm", qty: 1, notes: ["Cut from joined kente", "Align dominant color at CF", "Interface entire piece"], instructions: ["Wide stitch — kente frays", "Bind all seams", "No serger on kente"] },
            { id: "k3", name: "Slit Skirt Panel", shape: "skirt_panel", dims: "55×100 cm", qty: 2, notes: ["Cut 2 — align pattern", "Right side open for drape"], instructions: ["Sew right side seam only", "Apply waistband", "Button or hook closure"] },
        ]
    },
    {
        id: 6, name: "Adire Tie-Dye Dress", category: "Adire", region: "West Africa", origin: "Yoruba",
        difficulty: "Intermediate", fabric: "Hand-Dyed Cotton", tags: ["artistic", "indigo", "everyday"], african: true,
        garmentType: "adire", accent: "#5BA3C9", bg: "#030810",
        desc: "An adire eleko indigo resist-dye wrap dress featuring the distinctive blue-and-white patterns of Yoruba textile art. Pre-dye all fabric before cutting.",
        measurements: { "Bust": "86–94 cm", "Waist": "68–76 cm", "Hip": "90–98 cm", "Length": "105 cm", "Sleeve": "22 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "ad1", name: "Dress Front", shape: "front_bodice", dims: "48×105 cm", qty: 1, notes: ["Complete dyeing BEFORE cutting", "Cut 1 on fold"], instructions: ["Handle gently — no stretch", "Staystitch all edges immediately", "Use French seams"] },
            { id: "ad2", name: "Dress Back", shape: "back_bodice", dims: "48×105 cm", qty: 2, notes: ["Cut 2 mirror", "Add 2cm CB for zipper"], instructions: ["Install invisible zipper", "Join shoulders and sides"] },
            { id: "ad3", name: "Short Sleeve", shape: "sleeve", dims: "38×22 cm", qty: 2, notes: ["Cut 2", "Align pattern across sleeves"], instructions: ["Set with minimal ease", "Narrow hem at cuff"] },
        ]
    },
    {
        id: 7, name: "Gele & Iro Buba", category: "Gele Set", region: "West Africa", origin: "Yoruba",
        difficulty: "Expert", fabric: "Aso-Oke / Satin / Damask", tags: ["wedding", "ceremonial", "aso-ebi"], african: true,
        garmentType: "gele", accent: "#E8854A", bg: "#0A0402",
        desc: "The complete Yoruba women's ceremonial ensemble — iro wrapper, buba blouse, ipele shoulder cloth, and the elaborate gele headtie.",
        measurements: { "Bust": "86–92 cm", "Waist": "68–76 cm", "Hip": "96–108 cm", "Iro Len.": "120 cm", "Buba Len.": "52 cm", "Gele": "180×60 cm" },
        pieces: [
            { id: "g1", name: "Buba Front", shape: "front_bodice", dims: "48×52 cm", qty: 1, notes: ["Cut 1 on fold", "Interface neckline fully"], instructions: ["Apply all embroidery before assembling", "Staystitch neck immediately"] },
            { id: "g2", name: "Buba Back", shape: "back_bodice", dims: "48×52 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join shoulders first"] },
            { id: "g3", name: "Buba Sleeve", shape: "sleeve", dims: "36×55 cm", qty: 2, notes: ["Cut 2", "Cuff decoration"], instructions: ["Set with ease stitches", "Apply contrast cuff band"] },
            { id: "g4", name: "Iro Wrapper", shape: "skirt_panel", dims: "200×120 cm", qty: 1, notes: ["Large rectangle", "Hem all four sides"], instructions: ["Double-fold hem all edges", "Right side wraps over left"] },
            { id: "g5", name: "Ipele Shoulder Cloth", shape: "skirt_panel", dims: "80×60 cm", qty: 1, notes: ["Matching fabric", "Draped over left shoulder"], instructions: ["Hem all edges neatly", "Drape and pin — not sewn permanently"] },
        ]
    },
    {
        id: 8, name: "Moroccan Kaftan", category: "Kaftan", region: "North Africa", origin: "Moroccan",
        difficulty: "Intermediate", fabric: "Velvet / Brocade / Silk", tags: ["ceremonial", "elegant", "North Africa"], african: true,
        garmentType: "kaftan", accent: "#D4A017", bg: "#080402",
        desc: "The Moroccan kaftan — regal garment with center front closure, elaborate sfifa braid and aakad clasp embroidery.",
        measurements: { "Bust": "88–96 cm", "Waist": "72–82 cm", "Hip": "96–108 cm", "Length": "140 cm", "Sleeve": "58 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "kf1", name: "Kaftan Front", shape: "front_bodice", dims: "55×140 cm", qty: 2, notes: ["Cut 2 for tie opening", "Interface CF edge fully"], instructions: ["Apply sfifa braid to CF", "Hand-sew aakad clasp loops", "Interface all embroidered areas"] },
            { id: "kf2", name: "Kaftan Back", shape: "back_bodice", dims: "55×140 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join at shoulders and sides", "Hem at 2cm double fold"] },
            { id: "kf3", name: "Kaftan Sleeve", shape: "sleeve", dims: "42×60 cm", qty: 2, notes: ["Cut 2", "Sfifa at cuff edge"], instructions: ["Set with ease", "Apply sfifa at cuff"] },
        ]
    },
    {
        id: 9, name: "Isiagu Ceremonial Top", category: "Isiagu", region: "West Africa", origin: "Igbo",
        difficulty: "Intermediate", fabric: "Embossed Lion Print", tags: ["chieftaincy", "Igbo", "ceremonial"], african: true,
        garmentType: "isiagu", accent: "#C0392B", bg: "#0A0202",
        desc: "The Igbo isiagu — ceremonial top with embossed lion motifs, worn with george wrapper for traditional occasions.",
        measurements: { "Chest": "88–96 cm", "Waist": "Free", "Length": "72 cm", "Sleeve": "60 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "is1", name: "Front Body", shape: "front_bodice", dims: "50×72 cm", qty: 2, notes: ["Cut 2 — button front", "Align lion motifs symmetrically"], instructions: ["Match motif at CF seam", "Interface button band", "Buttonholes at 9cm spacing"] },
            { id: "is2", name: "Back Body", shape: "back_bodice", dims: "50×72 cm", qty: 1, notes: ["Centre lion at CB"], instructions: ["Join at shoulders and sides"] },
            { id: "is3", name: "Long Sleeve", shape: "sleeve", dims: "38×62 cm", qty: 2, notes: ["Align motif", "Gold aguba braid at cuff"], instructions: ["Set with standard ease", "Fell cuff hem by hand"] },
        ]
    },
    {
        id: 10, name: "Ankara Wrapper Set", category: "Wrapper Set", region: "West Africa", origin: "Pan-West African",
        difficulty: "Beginner", fabric: "Ankara / Wax Print", tags: ["casual", "ankara", "colourful"], african: true,
        garmentType: "wrapper", accent: "#8E44AD", bg: "#060208",
        desc: "The versatile two-piece wax print set — peplum top with matching wrapper skirt. Ankara fabric makes every piece unique.",
        measurements: { "Bust": "84–92 cm", "Waist": "68–76 cm", "Hip": "90–100 cm", "Top Len.": "55 cm", "Skirt Len.": "100 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "w1", name: "Top Front", shape: "front_bodice", dims: "46×55 cm", qty: 1, notes: ["Cut 1 on fold", "Align main motif at CF"], instructions: ["Staystitch neck and armhole", "Interface neckline facing"] },
            { id: "w2", name: "Top Back", shape: "back_bodice", dims: "46×55 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join at shoulder and sides", "Finish armholes with binding"] },
            { id: "w3", name: "Wrapper Skirt", shape: "skirt_panel", dims: "110×100 cm", qty: 2, notes: ["Cut 2", "Align print across panels"], instructions: ["Sew right side seam only", "Left side wrapped and tucked", "Apply waistband"] },
            { id: "w4", name: "Pocket Bag", shape: "pocket", dims: "18×20 cm", qty: 2, notes: ["Lining fabric"], instructions: ["Attach in side seam", "Reinforce openings"] },
        ]
    },
    {
        id: 11, name: "Classic A-Line Dress", category: "Dress", region: "International", origin: "Classic",
        difficulty: "Beginner", fabric: "Woven Cotton / Crepe", tags: ["everyday", "formal", "versatile"], african: false,
        garmentType: "adress", accent: "#2D6A4F", bg: "#020A06",
        desc: "A timeless A-line dress with fitted bodice, defined waist, and gracefully flared skirt.",
        measurements: { "Bust": "86–92 cm", "Waist": "68–74 cm", "Hip": "92–98 cm", "Length": "100 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "al1", name: "Front Bodice", shape: "front_bodice", dims: "42×38 cm", qty: 1, notes: ["Cut 1 on fold", "Mark dart positions"], instructions: ["Staystitch neckline 1.2cm", "Sew side darts first", "Interface facing"] },
            { id: "al2", name: "Back Bodice", shape: "back_bodice", dims: "42×37 cm", qty: 2, notes: ["Cut 2 mirror", "Add 3cm CB for zipper"], instructions: ["Install invisible zipper", "Sew shoulder seams"] },
            { id: "al3", name: "Front Skirt", shape: "skirt_panel", dims: "60×70 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Staystitch waist", "Ease to bodice", "Understitch facing"] },
            { id: "al4", name: "Back Skirt", shape: "skirt_panel", dims: "60×70 cm", qty: 2, notes: ["Leave CB 20cm open"], instructions: ["Sew side seams", "Hem at 2.5cm"] },
        ]
    },
    {
        id: 12, name: "Tailored Blazer", category: "Blazer", region: "International", origin: "Classic",
        difficulty: "Advanced", fabric: "Suiting / Wool Blend", tags: ["formal", "structured", "unisex"], african: false,
        garmentType: "blazer", accent: "#8899AA", bg: "#040608",
        desc: "Single-breasted notch lapel blazer with set-in sleeves and welt pockets — the definitive tailoring challenge.",
        measurements: { "Chest": "92–98 cm", "Waist": "78–84 cm", "Hip": "98–104 cm", "Length": "72 cm", "Sleeve": "62 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "bl1", name: "Front Panel", shape: "front_bodice", dims: "48×72 cm", qty: 2, notes: ["Cut 2 mirror", "Fuse interfacing full front"], instructions: ["Apply woven fusible first", "Mark all construction points"] },
            { id: "bl2", name: "Back Panel", shape: "back_bodice", dims: "45×72 cm", qty: 2, notes: ["Cut 2 mirror", "Interface upper back"], instructions: ["Sew back seam over seam roll", "Insert kick pleat if desired"] },
            { id: "bl3", name: "Set-In Sleeve", shape: "sleeve", dims: "36×65 cm", qty: 2, notes: ["Cut 2 mirror", "Ease cap between notches"], instructions: ["Two ease rows at 0.8 and 1.3cm", "Steam cap before setting", "Sew from sleeve side"] },
            { id: "bl4", name: "Notch Collar", shape: "collar", dims: "32×18 cm", qty: 2, notes: ["Interface upper only", "Clip corners diagonally"], instructions: ["Grade seams", "Press 1mm to under side"] },
        ]
    },
    {
        id: 13, name: "Wide-Leg Trousers", category: "Trousers", region: "International", origin: "Classic",
        difficulty: "Intermediate", fabric: "Crepe / Linen", tags: ["casual", "wide-leg", "comfortable"], african: false,
        garmentType: "trousers", accent: "#A8916A", bg: "#080604",
        desc: "High-waisted wide-leg trousers with side pockets and a clean front crease.",
        measurements: { "Waist": "70–76 cm", "Hip": "96–102 cm", "Rise": "28 cm", "Inseam": "80 cm", "Outseam": "108 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "tr1", name: "Front Leg", shape: "trouser_front", dims: "52×110 cm", qty: 2, notes: ["Cut 2 mirror", "Mark crease line"], instructions: ["Staystitch crotch 1cm", "Sew inseam then side", "Press crease damp cloth"] },
            { id: "tr2", name: "Back Leg", shape: "trouser_front", dims: "55×110 cm", qty: 2, notes: ["Cut 2 mirror", "Deeper back crotch"], instructions: ["Ease at seat", "French seam inseam"] },
            { id: "tr3", name: "Waistband", shape: "waistband", dims: "80×8 cm", qty: 1, notes: ["Straight grain", "Interface front half"], instructions: ["Attach RST", "Fold over, topstitch 2mm"] },
        ]
    },
    {
        id: 14, name: "Puff Sleeve Blouse", category: "Blouse", region: "International", origin: "Classic",
        difficulty: "Intermediate", fabric: "Lightweight Cotton / Chiffon", tags: ["romantic", "feminine", "blouse"], african: false,
        garmentType: "pblouse", accent: "#D45A7A", bg: "#0A0205",
        desc: "A romantic gathered puff-sleeve blouse with scoop neck and button-through placket.",
        measurements: { "Bust": "84–90 cm", "Waist": "70–76 cm", "Length": "60 cm", "Sleeve": "58 cm", "Seam Allow.": "1 cm" },
        pieces: [
            { id: "pb1", name: "Front Bodice", shape: "front_bodice", dims: "38×60 cm", qty: 1, notes: ["Cut 1 on fold", "Add 2cm placket"], instructions: ["Interface placket", "Staystitch neck 0.8cm"] },
            { id: "pb2", name: "Back Bodice", shape: "back_bodice", dims: "38×60 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["French seam at sides"] },
            { id: "pb3", name: "Puff Sleeve", shape: "sleeve", dims: "52×60 cm", qty: 2, notes: ["Gather both cap and cuff"], instructions: ["Gather cap to armhole", "Gather cuff to measurement"] },
        ]
    },
];

const CATS = ["All", "Agbada", "Senator", "Dashiki", "Boubou", "Kente", "Adire", "Gele Set", "Kaftan", "Isiagu", "Wrapper Set", "Dress", "Blazer", "Trousers", "Blouse"] as const;
const REGIONS = ["All Regions", "West Africa", "North Africa", "International"] as const;
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced", "Expert"] as const;
type FilterCat = typeof CATS[number];
type FilterRegion = typeof REGIONS[number];
type FilterLevel = typeof LEVELS[number];

/* ═══════════════════════════════════════════
   APP
═══════════════════════════════════════════ */
export default function AtelierApp(): ReactElement {
    const [cat, setCat] = useState<FilterCat>("All");
    const [region, setRegion] = useState<FilterRegion>("All Regions");
    const [level, setLevel] = useState<FilterLevel>("All Levels");
    const [sel, setSel] = useState<GarmentStyle | null>(null);
    const [openPiece, setOpenPiece] = useState<string | null>(null);
    const [printOpen, setPrintOpen] = useState(false);
    const [tab, setTab] = useState<"gallery" | "guide">("gallery");

    const filtered = STYLES.filter(s => {
        if (cat !== "All" && s.category !== cat) return false;
        if (region !== "All Regions" && s.region !== region) return false;
        if (level !== "All Levels" && s.difficulty !== level) return false;
        return true;
    });

    const heroStyles = STYLES.filter(s => ["agbada", "gele", "kaftan", "kente"].includes(s.garmentType)).slice(0, 4);

    return (
        <>
            <style>{CSS}</style>
            <div className="kente" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 400 }} />

            <header className="hdr" style={{ top: 3 }}>
                <div className="logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <polygon points="16,2 28,8 28,24 16,30 4,24 4,8" stroke="#D4A017" strokeWidth="1.2" fill="none" />
                        <polygon points="16,8 22,11 22,21 16,24 10,21 10,11" stroke="#D4A017" strokeWidth="0.8" fill="rgba(212,160,23,0.1)" />
                        <circle cx="16" cy="16" r="2.5" fill="#D4A017" opacity=".9" />
                    </svg>
                    <div>
                        <div className="logo-text">Atelier <span>African</span></div>
                        <span className="logo-sub">Pattern Studio · Professional Edition</span>
                    </div>
                </div>
                <nav className="nav">
                    <button className={tab === "gallery" ? "on" : ""} onClick={() => setTab("gallery")}>Library</button>
                    <button className={tab === "guide" ? "on" : ""} onClick={() => setTab("guide")}>Guide</button>
                </nav>
            </header>

            {tab === "guide" ? (
                <div style={{ paddingTop: 80, padding: "80px 3rem 3rem", maxWidth: 700, margin: "0 auto" }}>
                    <p style={{ fontFamily: "DM Mono", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "1rem" }}>Workflow</p>
                    <h2 style={{ fontFamily: "Playfair Display", fontWeight: 900, fontSize: "2.2rem", color: "var(--cream)", marginBottom: "1.5rem", lineHeight: 1.1 }}>From Style to Cut Fabric</h2>
                    {([
                        ["01 — Browse", "Filter by region, category, or skill level. 14 styles spanning West Africa, North Africa, and international fashion."],
                        ["02 — Inspect Illustration", "Each garment is rendered as a detailed technical illustration showing silhouette, construction details, and cultural embellishments."],
                        ["03 — Pattern Pieces", "Expand each piece for the flat pattern shape on a measurement grid, grain lines, cutting notes, and sewing order."],
                        ["04 — Print", "Generate a print-ready A4 layout for every piece with seam allowances, labels, and grid — ready to trace and cut."],
                    ] as [string, string][]).map(([t, d]) => (
                        <div key={t} style={{ borderLeft: "2px solid var(--rust)", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
                            <div style={{ fontFamily: "DM Mono", fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--rust)", marginBottom: ".3rem" }}>{t}</div>
                            <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--subtext)" }}>{d}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <section className="hero">
                        <div className="hero-left">
                            <div className="hero-eyebrow">✦ 14 Garment Styles · 10 African Traditions</div>
                            <h1 className="hero-h1">Where Craft<br />Meets <em>Culture.</em></h1>
                            <p className="hero-p">A professional pattern studio for tailors working with African and global fashion — from Grand Agbada to Moroccan Kaftan, every garment illustrated in detail.</p>
                            <div className="hero-btns">
                                <button className="btn-primary" onClick={() => document.querySelector(".gallery")?.scrollIntoView({ behavior: "smooth" })}>Explore Styles</button>
                                <button className="btn-outline" onClick={() => setTab("guide")}>How It Works</button>
                            </div>
                        </div>
                        <div className="hero-right">
                            {heroStyles.map((s, i) => (
                                <div key={i} className="hero-ill">
                                    <GarmentIllustration type={s.garmentType} accent={s.accent} bg={s.bg} size="card" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="fbar">
                        <span className="flabel">Style</span>
                        {CATS.map(c => (
                            <button key={c} className={`fchip${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>
                        ))}
                        <span className="flabel" style={{ marginLeft: ".8rem" }}>Region</span>
                        {REGIONS.map(r => (
                            <button key={r} className={`fchip${region === r ? " on" : ""}`} onClick={() => setRegion(r)}>{r}</button>
                        ))}
                        <span className="flabel" style={{ marginLeft: ".8rem" }}>Level</span>
                        {LEVELS.map(l => (
                            <button key={l} className={`fchip${level === l ? " on" : ""}`} onClick={() => setLevel(l as FilterLevel)}>{l}</button>
                        ))}
                    </div>

                    <div className="layout">
                        <div className="gallery">
                            {filtered.map((style, idx) => (
                                <div key={style.id} className={`card${sel?.id === style.id ? " sel" : ""}`}
                                    style={{ animationDelay: `${idx * .05}s` }}
                                    onClick={() => { setSel(style); setOpenPiece(null); }}>
                                    <div className="card-ill">
                                        <span className={`diff-pill ${style.difficulty}`}>{style.difficulty}</span>
                                        <span className="origin-pill">{style.origin}</span>
                                        <GarmentIllustration type={style.garmentType} accent={style.accent} bg={style.bg} size="card" />
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title">{style.name}</div>
                                        <div className="card-meta">{style.category} · {style.fabric} · {style.pieces.length} pieces</div>
                                        <div className="card-tags">
                                            {style.tags.map(t => <span key={t} className={`tag ${style.african ? "af" : "gl"}`}>{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filtered.length === 0 && (
                                <div style={{ gridColumn: "1/-1", padding: "3rem", textAlign: "center", fontFamily: "DM Mono", fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
                                    No styles match — try different filters
                                </div>
                            )}
                        </div>
                        <div className={`dpanel${sel ? " active" : ""}`}>
                            {sel ? (
                                <>
                                    <div className="dp-stage">
                                        <span className="stage-label">{sel.pieces.length} PIECES</span>
                                        <GarmentIllustration type={sel.garmentType} accent={sel.accent} bg={sel.bg} size="panel" />
                                    </div>
                                    <div className="dp-hdr">
                                        <div className="dp-eyebrow">{sel.category} · {sel.region}</div>
                                        <div className="dp-title">{sel.name}</div>
                                        <div className="dp-desc">"{sel.desc}"</div>
                                    </div>
                                    <div className="dp-sec">
                                        <div className="sec-hd">Measurements</div>
                                        <div className="mgrid">
                                            {Object.entries(sel.measurements).map(([k, v]) => (
                                                <div key={k} className="mitem">
                                                    <div className="mlbl">{k}</div>
                                                    <div className="mval">{v}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="dp-sec">
                                        <div className="sec-hd">Pattern Pieces</div>
                                        <div className="plist">
                                            {sel.pieces.map((p, idx) => (
                                                <div key={p.id} className={`pitem ${openPiece === p.id ? "open" : ""}`}>
                                                    <div className="phdr" onClick={() => setOpenPiece(openPiece === p.id ? null : p.id)}>
                                                        <div className="pnum">{idx + 1}</div>
                                                        <div className="pname">{p.name}</div>
                                                        <div className="pdim">×{p.qty} · {p.dims}</div>
                                                        <button className={`parr ${openPiece === p.id ? "open" : ""}`}>▼</button>
                                                    </div>
                                                    <div className={`pbody ${openPiece === p.id ? "show" : ""}`}>
                                                        <div className="patbox">
                                                            <div className="patgrid" />
                                                            <div style={{ position: "relative", zIndex: 2 }}><PatSVG shape={p.shape} /></div>
                                                        </div>
                                                        <div className="nlbl">Cutting Notes</div>
                                                        <ul className="nlist">{p.notes.map(n => <li key={n}>{n}</li>)}</ul>
                                                        <div className="slbl">Assembly Order</div>
                                                        <ul className="slist">{p.instructions.map(n => <li key={n}>{n}</li>)}</ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="dp-actions">
                                        <button className="bact out" onClick={() => setSel(null)}>Back to Gallery</button>
                                        <button className="bact sol" onClick={() => setPrintOpen(true)}>Print All Pieces (A4)</button>
                                    </div>
                                </>
                            ) : (
                                <div className="dp-empty">
                                    <div style={{ width: 60, height: 60, border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontFamily: "Playfair Display", fontSize: "1.5rem", fontWeight: 700 }}>A</div>
                                    <p>Select a garment from the library<br />to inspect its flat pattern pieces,<br />measurements, and construction<br />details.</p>
                                </div>
                            )}
                        </div>
                    </div >
                </>
            )}

            {
                printOpen && sel && (
                    <div className="pm-ov">
                        <div className="pm-box">
                            <div className="pm-hdr">
                                <div className="pm-title">Printing: {sel.name}</div>
                                <button className="pm-close" onClick={() => setPrintOpen(false)}>×</button>
                            </div>
                            <div className="pm-body">
                                <div style={{ fontFamily: "DM Mono", fontSize: ".55rem", color: "var(--subtext)", marginBottom: "1.5rem", lineHeight: 1.8 }}>
                                    <b>PRINT INSTRUCTIONS:</b> Select "Actual Size" or "100% Scale" in print settings.<br />
                                    Do not scale to fit. Assemble pages matching edge diamonds before cutting.<br />
                                    Fabric Requirements: {sel.fabric}
                                </div>
                                {sel.pieces.map((p, idx) => (
                                    <div key={p.id} className="pm-sheet">
                                        <div className="pm-slbl">Sheet {idx + 1} of {sel.pieces.length}</div>
                                        <div className="pm-stitle">{p.name}</div>
                                        <div className="pm-inner">
                                            <div className="pm-pat">
                                                <div className="pm-grid" />
                                                <div style={{ position: "relative", zIndex: 2, transform: "scale(1.3)", transformOrigin: "top left" }}><PatSVG shape={p.shape} /></div>
                                            </div>
                                            <div style={{ flex: 1, minWidth: 250 }}>
                                                <div className="nlbl">Notes</div>
                                                <ul className="nlist">{p.notes.map(n => <li key={n}>{n}</li>)}</ul>
                                                <div className="slbl">Instructions</div>
                                                <ul className="slist">{p.instructions.map(n => <li key={n}>{n}</li>)}</ul>
                                            </div>
                                        </div>
                                        <div className="pm-foot">
                                            <span>Atelier African Pattern Studio</span>
                                            <span>Piece: {p.id} ({p.dims}) — Cut {p.qty}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="pm-acts">
                                    <button className="bact out" onClick={() => setPrintOpen(false)}>Cancel</button>
                                    <button className="bact sol" onClick={() => window.print()}>Print to A4</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
