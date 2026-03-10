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

    // Fashion-flat style realistic paths
    const illustrations: Record<GarmentType, ReactElement> = {
        agbada: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 140 35 C 130 35 125 45 125 45 C 110 50 100 55 50 60 L 30 180 L 250 180 L 230 60 C 180 55 170 50 155 45 C 155 45 150 35 140 35 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 125 45 C 130 55 150 55 155 45" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
                <path d="M 115 65 C 120 75 160 75 165 65 L 140 95 Z" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="140" y1="95" x2="140" y2="150" stroke={accent} strokeWidth="1"/>
                <path d="M 80 65 L 80 160 M 200 65 L 200 160" stroke={accent} strokeWidth="0.8" strokeDasharray="3,3"/>
                <path d="M 100 30 C 120 20 160 20 180 30" fill="none" stroke={accent} strokeWidth="2" opacity="0.5"/>
            </svg>
        ),
        senator: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 40 L 155 40 L 160 45 L 195 55 L 205 130 L 190 135 L 185 100 L 180 185 L 100 185 L 95 100 L 90 135 L 75 130 L 85 55 L 120 45 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="135" y="45" width="10" height="70" fill={accent} opacity="0.2" stroke={accent} strokeWidth="0.5"/>
                <circle cx="140" cy="55" r="1.5" fill={accent}/><circle cx="140" cy="70" r="1.5" fill={accent}/><circle cx="140" cy="85" r="1.5" fill={accent}/>
                <path d="M 125 40 C 135 48 145 48 155 40" fill="none" stroke={accent} strokeWidth="1.5"/>
                <line x1="100" y1="185" x2="100" y2="210" stroke={accent} strokeWidth="1.5"/><line x1="180" y1="185" x2="180" y2="210" stroke={accent} strokeWidth="1.5"/>
                <line x1="140" y1="185" x2="140" y2="210" stroke={accent} strokeWidth="1.5"/>
                <line x1="105" y1="210" x2="135" y2="210" stroke={accent} strokeWidth="1.5"/><line x1="145" y1="210" x2="175" y2="210" stroke={accent} strokeWidth="1.5"/>
            </svg>
        ),
        dashiki: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 50 L 155 50 L 175 55 L 210 65 L 205 100 L 180 95 L 185 185 L 95 185 L 100 95 L 75 100 L 70 65 L 105 55 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 125 50 L 140 80 L 155 50" fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round"/>
                <rect x="115" y="55" width="50" height="40" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M 120 60 L 130 60 M 150 60 L 160 60 M 120 65 L 130 65 M 150 65 L 160 65" stroke={accent} strokeWidth="1"/>
                <line x1="95" y1="175" x2="185" y2="175" stroke={accent} strokeWidth="1" strokeDasharray="4,2"/>
                <line x1="95" y1="165" x2="185" y2="165" stroke={accent} strokeWidth="1"/>
            </svg>
        ),
        boubou: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 130 40 C 140 45 140 45 150 40 L 260 50 Q 255 100 240 190 L 40 190 Q 25 100 20 50 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 125 40 C 135 65 145 65 155 40" fill="none" stroke={accent} strokeWidth="2"/>
                <path d="M 115 50 C 115 90 140 120 165 50" fill="none" stroke={accent} strokeWidth="1" opacity="0.6"/>
                <circle cx="140" cy="80" r="15" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M 135 75 L 145 75 M 135 85 L 145 85" stroke={accent} strokeWidth="1"/>
                <line x1="40" y1="180" x2="240" y2="180" stroke={accent} strokeWidth="1" strokeDasharray="5,3"/>
                <path d="M 90 60 Q 95 120 90 190 M 190 60 Q 185 120 190 190" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
            </svg>
        ),
        kente: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 45 C 130 55 150 55 160 45 L 180 50 L 195 55 L 190 85 L 170 80 L 175 120 L 105 120 L 110 80 L 90 85 L 85 55 L 100 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 100 125 L 180 125 L 190 200 L 140 200 L 140 125 L 90 200 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="120" y1="45" x2="160" y2="45" stroke={accent} strokeWidth="1" opacity="0.5"/>
                <path d="M 115 60 L 165 60 M 110 75 L 170 75 M 110 90 L 170 90 M 110 105 L 170 105" stroke={accent} strokeWidth="2" opacity="0.4"/>
                <path d="M 105 140 L 175 140 M 100 160 L 185 160 M 95 180 L 175 180" stroke={accent} strokeWidth="2" opacity="0.4"/>
            </svg>
        ),
        adire: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 45 C 130 55 150 55 165 45 L 185 50 L 200 55 L 195 85 L 175 80 L 185 190 L 95 190 L 105 80 L 85 85 L 80 55 L 95 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <g fill="none" stroke={accent} strokeWidth="1" opacity="0.4">
                    <circle cx="140" cy="70" r="10"/><circle cx="140" cy="70" r="5"/>
                    <circle cx="115" cy="110" r="8"/><circle cx="115" cy="110" r="3"/>
                    <circle cx="165" cy="110" r="8"/><circle cx="165" cy="110" r="3"/>
                    <circle cx="140" cy="145" r="12"/><circle cx="140" cy="145" r="6"/>
                    <circle cx="120" cy="175" r="7"/><circle cx="160" cy="175" r="7"/>
                </g>
                <path d="M 115 45 C 130 55 150 55 165 45" fill="none" stroke={accent} strokeWidth="2"/>
            </svg>
        ),
        gele: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                {/* Gele Headtie */}
                <path d="M 100 40 C 110 20 170 20 180 40 C 210 30 220 50 190 60 C 170 65 110 65 90 60 C 60 50 70 30 100 40 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 110 45 C 130 35 150 35 170 45 M 105 55 C 130 45 150 45 175 55" fill="none" stroke={accent} strokeWidth="1" opacity="0.7"/>
                {/* Buba Blouse */}
                <path d="M 120 70 C 130 80 150 80 160 70 L 180 75 L 200 80 L 195 110 L 175 105 L 170 140 L 110 140 L 105 105 L 85 110 L 80 80 L 100 75 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                {/* Iro Wrapper */}
                <path d="M 105 130 L 180 130 L 170 200 L 95 200 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="140" y1="130" x2="135" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
                {/* Ipele Shoulder Sash */}
                <path d="M 165 75 L 150 75 L 130 160 L 145 160 Z" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1"/>
            </svg>
        ),
        kaftan: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 40 C 135 50 145 50 155 40 L 175 45 L 210 55 L 220 140 L 195 135 L 210 200 L 70 200 L 85 135 L 60 140 L 70 55 L 105 45 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="140" y1="50" x2="140" y2="200" stroke={accent} strokeWidth="3" opacity="0.6"/>
                <line x1="140" y1="50" x2="140" y2="200" stroke={bg} strokeWidth="1"/>
                <path d="M 125 40 C 135 55 145 55 155 40" fill="none" stroke={accent} strokeWidth="2"/>
                <path d="M 115 45 C 135 70 145 70 165 45" fill="none" stroke={accent} strokeWidth="1" opacity="0.5"/>
                <line x1="65" y1="135" x2="85" y2="130" stroke={accent} strokeWidth="2"/><line x1="215" y1="135" x2="195" y2="130" stroke={accent} strokeWidth="2"/>
                <line x1="75" y1="195" x2="205" y2="195" stroke={accent} strokeWidth="2"/>
            </svg>
        ),
        isiagu: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 L 160 40 L 175 45 L 210 55 L 205 130 L 180 125 L 185 180 L 95 180 L 100 125 L 75 130 L 70 55 L 105 45 Z" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="140" y1="45" x2="140" y2="130" stroke={accent} strokeWidth="1.5" strokeDasharray="4,2"/>
                <circle cx="140" cy="65" r="2" fill={accent}/><circle cx="140" cy="85" r="2" fill={accent}/><circle cx="140" cy="105" r="2" fill={accent}/>
                <path d="M 120 40 L 160 40 L 165 35 L 115 35 Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1"/>
                <path d="M 100 80 C 110 70 120 70 120 80 M 160 80 C 170 70 180 70 180 80" fill="none" stroke={accent} strokeWidth="1" opacity="0.5"/>
                <path d="M 100 120 C 110 110 120 110 120 120 M 160 120 C 170 110 180 110 180 120" fill="none" stroke={accent} strokeWidth="1" opacity="0.5"/>
                <path d="M 100 160 C 110 150 120 150 120 160 M 160 160 C 170 150 180 150 180 160" fill="none" stroke={accent} strokeWidth="1" opacity="0.5"/>
            </svg>
        ),
        wrapper: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 45 C 130 55 150 55 165 45 L 185 50 L 180 110 L 200 135 L 165 130 L 115 130 L 80 135 L 100 110 L 95 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 115 45 C 130 55 150 55 165 45" fill="none" stroke={accent} strokeWidth="2.5"/>
                <path d="M 105 130 L 180 130 L 190 200 L 90 200 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="140" y1="130" x2="135" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
                <g fill="none" stroke={accent} strokeWidth="0.8" opacity="0.3">
                    <circle cx="110" cy="70" r="4"/><circle cx="140" cy="80" r="4"/><circle cx="170" cy="70" r="4"/>
                    <circle cx="120" cy="150" r="4"/><circle cx="160" cy="150" r="4"/><circle cx="140" cy="175" r="4"/>
                </g>
                <path d="M 115 110 C 130 115 150 115 165 110" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
            </svg>
        ),
        adress: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 C 130 55 150 55 160 40 L 175 45 L 165 110 L 210 200 L 70 200 L 115 110 L 105 45 Z" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 120 40 C 130 55 150 55 160 40" fill="none" stroke={accent} strokeWidth="2"/>
                <path d="M 110 40 L 115 30 L 125 30 M 170 40 L 165 30 L 155 30" fill="none" stroke={accent} strokeWidth="4" opacity="0.3"/>
                <path d="M 115 110 C 130 115 150 115 165 110" fill="none" stroke={accent} strokeWidth="1.5"/>
                <line x1="125" y1="65" x2="130" y2="105" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="155" y1="65" x2="150" y2="105" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="140" y1="113" x2="140" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
                <line x1="125" y1="112" x2="100" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
                <line x1="155" y1="112" x2="180" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
                <line x1="75" y1="195" x2="205" y2="195" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
        ),
        blazer: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 L 160 40 L 175 45 L 210 50 L 205 150 L 180 145 L 185 190 L 95 190 L 100 145 L 75 150 L 70 50 L 105 45 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 140 40 L 120 40 L 105 85 L 125 90 L 140 130" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M 140 40 L 160 40 L 175 85 L 155 90 L 140 130" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M 115 70 L 122 75 M 165 70 L 158 75" stroke={accent} strokeWidth="1.5"/>
                <path d="M 120 40 C 130 35 150 35 160 40 L 155 50 C 145 45 135 45 125 50 Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1"/>
                <circle cx="140" cy="140" r="3" fill="none" stroke={accent} strokeWidth="1.5"/><circle cx="140" cy="160" r="3" fill="none" stroke={accent} strokeWidth="1.5"/>
                <rect x="105" y="140" width="20" height="5" fill="none" stroke={accent} strokeWidth="1" rx="1"/>
                <rect x="155" y="140" width="20" height="5" fill="none" stroke={accent} strokeWidth="1" rx="1"/>
                <path d="M 155 95 L 170 95 L 165 105 Z" fill="none" stroke={accent} strokeWidth="1"/>
                <line x1="140" y1="130" x2="140" y2="190" stroke={accent} strokeWidth="1.5"/>
            </svg>
        ),
        trousers: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 105 35 L 175 35 L 180 55 L 100 55 Z" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 100 55 L 140 55 L 135 190 L 60 190 L 80 120 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 140 55 L 180 55 L 200 120 L 220 190 L 145 190 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="95" y1="55" x2="85" y2="190" stroke={accent} strokeWidth="1" strokeDasharray="5,5"/>
                <line x1="185" y1="55" x2="195" y2="190" stroke={accent} strokeWidth="1" strokeDasharray="5,5"/>
                <path d="M 115 35 L 115 55 M 140 35 L 140 55 M 165 35 L 165 55" stroke={accent} strokeWidth="2"/>
                <line x1="140" y1="55" x2="140" y2="85" stroke={accent} strokeWidth="1.5"/>
                <path d="M 105 60 C 110 75 110 85 105 95 M 175 60 C 170 75 170 85 175 95" fill="none" stroke={accent} strokeWidth="1"/>
                <line x1="60" y1="185" x2="135" y2="185" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="145" y1="185" x2="220" y2="185" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
            </svg>
        ),
        pblouse: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 50 C 130 65 150 65 165 50 L 175 55 L 175 180 L 105 180 L 105 55 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 115 50 C 130 65 150 65 165 50" fill="none" stroke={accent} strokeWidth="2"/>
                <line x1="140" y1="60" x2="140" y2="180" stroke={accent} strokeWidth="1.5" strokeDasharray="4,2"/>
                <circle cx="140" cy="75" r="2" fill={accent}/><circle cx="140" cy="100" r="2" fill={accent}/>
                <circle cx="140" cy="125" r="2" fill={accent}/><circle cx="140" cy="150" r="2" fill={accent}/>
                {/* Left Sleeve */}
                <path d="M 105 55 C 65 50 50 80 60 115 C 80 120 100 115 105 105 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 60 115 C 70 125 90 125 105 105" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M 70 120 L 75 125 L 85 125 M 60 115 L 65 125 L 70 120" stroke={accent} strokeWidth="1" fill="none"/>
                <path d="M 100 65 C 85 75 80 95 85 105" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6"/>
                {/* Right Sleeve */}
                <path d="M 175 55 C 215 50 230 80 220 115 C 200 120 180 115 175 105 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 220 115 C 210 125 190 125 175 105" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M 210 120 L 205 125 L 195 125 M 220 115 L 215 125 L 210 120" stroke={accent} strokeWidth="1" fill="none"/>
                <path d="M 180 65 C 195 75 200 95 195 105" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6"/>
                <line x1="105" y1="175" x2="175" y2="175" stroke={accent} strokeWidth="1" strokeDasharray="3,3"/>
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
    const c = "#C14B1A", f = "rgba(255,255,255,1)", g = "#2D6A4F";
    // Technical-grade exact pattern shapes with notches and grainlines
    const shapes: Record<PatternShape, ReactElement> = {
        front_bodice: (<svg viewBox="0 0 120 160" width="100" height="135"><path d="M20,15 L75,15 C 85 15 95 25 100,40 L110,140 C 110 145 105 150 100 150 L15,150 L20,40 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M20,15 C 45 25 70 25 75,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2"/><text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CF FOLD</text><line x1="65" y1="50" x2="65" y2="120" stroke={g} strokeWidth="2"/><polygon points="61,55 65,45 69,55" fill={g}/><polygon points="61,115 65,125 69,115" fill={g}/><text x="70" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text><path d="M20,15 L20,150" stroke={c} strokeWidth="2.5"/></svg>),
        back_bodice: (<svg viewBox="0 0 120 160" width="100" height="135"><path d="M15,10 L80,10 C 90 10 100 20 105,35 L115,145 C 115 150 110 150 105 150 L10,150 L15,35 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M15,10 C 40 15 65 15 80,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2"/><text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CB FOLD</text><line x1="60" y1="45" x2="60" y2="115" stroke={g} strokeWidth="2"/><polygon points="56,50 60,40 64,50" fill={g}/><polygon points="56,110 60,120 64,110" fill={g}/><path d="M15,10 L10,150" stroke={c} strokeWidth="2.5"/><line x1="85" y1="18" x2="90" y2="18" stroke={c} strokeWidth="2"/></svg>),
        sleeve: (<svg viewBox="0 0 140 160" width="115" height="135"><path d="M70,10 C 110 10 135 30 135,55 L120,145 L20,145 L5,55 C 5 30 30 10 70,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><line x1="70" y1="35" x2="70" y2="125" stroke={g} strokeWidth="2"/><polygon points="66,40 70,30 74,40" fill={g}/><polygon points="66,120 70,130 74,120" fill={g}/><text x="75" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text><line x1="30" y1="28" x2="33" y2="33" stroke={c} strokeWidth="2"/><line x1="110" y1="28" x2="107" y2="33" stroke={c} strokeWidth="2"/><line x1="113" y1="26" x2="110" y2="31" stroke={c} strokeWidth="2"/></svg>),
        collar: (<svg viewBox="0 0 160 80" width="140" height="70"><path d="M10,65 L25,15 C 60 5 100 5 135,15 L150,65 C 100 75 60 75 10,65 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><line x1="80" y1="25" x2="80" y2="55" stroke={g} strokeWidth="2"/><polygon points="76,30 80,20 84,30" fill={g}/><text x="85" y="45" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text><path d="M80,8 L80,72" stroke={c} strokeWidth="1" strokeDasharray="3,2"/></svg>),
        skirt_panel: (<svg viewBox="0 0 140 180" width="115" height="150"><path d="M30,10 L110,10 L135,170 L5,170 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><line x1="30" y1="10" x2="110" y2="10" stroke={c} strokeWidth="1" strokeDasharray="5,3"/><line x1="70" y1="40" x2="70" y2="140" stroke={g} strokeWidth="2"/><polygon points="66,45 70,35 74,45" fill={g}/><polygon points="66,135 70,145 74,135" fill={g}/><text x="75" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text><line x1="15" y1="165" x2="125" y2="165" stroke={c} strokeWidth="1" strokeDasharray="4,2"/></svg>),
        trouser_front: (<svg viewBox="0 0 130 210" width="105" height="170"><path d="M20,10 L105,10 L110,100 C 110 110 105 120 95,200 L65,200 L60,135 L25,200 L10,200 L15,100 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><line x1="60" y1="30" x2="60" y2="150" stroke={g} strokeWidth="2"/><polygon points="56,35 60,25 64,35" fill={g}/><polygon points="56,145 60,155 64,145" fill={g}/><text x="65" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>CREASE/GRAIN</text><path d="M20,10 L15,100" stroke={c} strokeWidth="2.5"/><line x1="20" y1="40" x2="25" y2="40" stroke={c} strokeWidth="2"/><line x1="20" y1="80" x2="25" y2="80" stroke={c} strokeWidth="2"/></svg>),
        waistband: (<svg viewBox="0 0 190 55" width="170" height="49"><rect x="10" y="10" width="170" height="35" rx="2" fill={f} stroke={c} strokeWidth="2"/><line x1="10" y1="27.5" x2="180" y2="27.5" stroke={c} strokeWidth="1" strokeDasharray="5,3"/><line x1="95" y1="15" x2="95" y2="40" stroke={g} strokeWidth="2"/><polygon points="91,20 95,10 99,20" fill={g}/><text x="100" y="22" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text><line x1="45" y1="10" x2="45" y2="15" stroke={c} strokeWidth="2"/><line x1="145" y1="10" x2="145" y2="15" stroke={c} strokeWidth="2"/></svg>),
        agbada_outer: (<svg viewBox="0 0 210 150" width="180" height="130"><path d="M5,15 C 105 5 205 15 205,15 L195,140 L15,140 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M5,15 C 105 5 205 15 205,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="5,5"/><line x1="105" y1="30" x2="105" y2="90" stroke={g} strokeWidth="2"/><polygon points="101,35 105,25 109,35" fill={g}/><polygon points="101,85 105,95 109,85" fill={g}/><text x="110" y="65" fontFamily="DM Mono" fontSize="7" fill={g}>GRAIN FOLD</text><ellipse cx="105" cy="40" rx="20" ry="10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2"/></svg>),
        embroidery_panel: (<svg viewBox="0 0 60 130" width="50" height="110"><rect x="10" y="10" width="40" height="110" rx="3" fill={f} stroke={c} strokeWidth="2"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M20,${25+i*16} C 30,${35+i*16} 40,${25+i*16} 40,${25+i*16}`} fill="none" stroke={c} strokeWidth="1.2" opacity="0.6"/>)}<line x1="30" y1="20" x2="30" y2="110" stroke={g} strokeWidth="2"/><polygon points="26,25 30,15 34,25" fill={g}/><polygon points="26,105 30,115 34,105" fill={g}/></svg>),
        kente_strip: (<svg viewBox="0 0 45 180" width="35" height="150"><rect x="10" y="10" width="25" height="160" fill={f} stroke={c} strokeWidth="2"/>{[0,1,2,3,4,5,6,7,8].map(i=><rect key={i} x="10" y={10+i*17.7} width="25" height="10" fill={(["#D4A017","#B22222","#2D6A4F","#0A0805"] as string[])[i%4]} opacity="0.3"/>)}<line x1="22.5" y1="30" x2="22.5" y2="150" stroke={g} strokeWidth="2"/><polygon points="18.5,35 22.5,25 26.5,35" fill={g}/><polygon points="18.5,145 22.5,155 26.5,145" fill={g}/></svg>),
        pocket: (<svg viewBox="0 0 100 110" width="80" height="90"><path d="M15,15 L85,15 L90,80 C 90 95 70 100 50 100 C 30 100 10 95 10 80 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round"/><line x1="50" y1="35" x2="50" y2="75" stroke={g} strokeWidth="2"/><polygon points="46,40 50,30 54,40" fill={g}/><polygon points="46,70 50,80 54,70" fill={g}/><line x1="15" y1="15" x2="85" y2="15" stroke={c} strokeWidth="2.5"/><line x1="45" y1="15" x2="55" y2="15" stroke={c} strokeWidth="2"/></svg>),
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
