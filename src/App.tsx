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
    | "agbada_outer" | "embroidery_panel" | "kente_strip" | "pocket"
    | "trouser_back" | "sleeve_cuff" | "yoke_back"
    | "front_facing" | "back_facing" | "undercollar" | "top_collar"
    | "fly_shield" | "pocket_bag" | "pocket_welt" | "pocket_flap"
    | "upper_sleeve" | "under_sleeve" | "agbada_inner" | "gele_tie"
    | "wrapper_panel" | "lapel_facing" | "placket" | "buba_sleeve"
    | "side_panel";

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
                <path d="M 140 35 C 130 35 125 45 125 45 C 110 50 100 55 50 60 L 30 180 L 250 180 L 230 60 C 180 55 170 50 155 45 C 155 45 150 35 140 35 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 125 45 C 130 55 150 55 155 45" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
                <path d="M 115 65 C 120 75 160 75 165 65 L 140 95 Z" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="140" y1="95" x2="140" y2="150" stroke={accent} strokeWidth="1" />
                <path d="M 80 65 L 80 160 M 200 65 L 200 160" stroke={accent} strokeWidth="0.8" strokeDasharray="3,3" />
                <path d="M 100 30 C 120 20 160 20 180 30" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
            </svg>
        ),
        senator: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 40 L 155 40 L 160 45 L 195 55 L 205 130 L 190 135 L 185 100 L 180 185 L 100 185 L 95 100 L 90 135 L 75 130 L 85 55 L 120 45 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="135" y="45" width="10" height="70" fill={accent} opacity="0.2" stroke={accent} strokeWidth="0.5" />
                <circle cx="140" cy="55" r="1.5" fill={accent} /><circle cx="140" cy="70" r="1.5" fill={accent} /><circle cx="140" cy="85" r="1.5" fill={accent} />
                <path d="M 125 40 C 135 48 145 48 155 40" fill="none" stroke={accent} strokeWidth="1.5" />
                <line x1="100" y1="185" x2="100" y2="210" stroke={accent} strokeWidth="1.5" /><line x1="180" y1="185" x2="180" y2="210" stroke={accent} strokeWidth="1.5" />
                <line x1="140" y1="185" x2="140" y2="210" stroke={accent} strokeWidth="1.5" />
                <line x1="105" y1="210" x2="135" y2="210" stroke={accent} strokeWidth="1.5" /><line x1="145" y1="210" x2="175" y2="210" stroke={accent} strokeWidth="1.5" />
            </svg>
        ),
        dashiki: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 50 L 155 50 L 175 55 L 210 65 L 205 100 L 180 95 L 185 185 L 95 185 L 100 95 L 75 100 L 70 65 L 105 55 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 125 50 L 140 80 L 155 50" fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" />
                <rect x="115" y="55" width="50" height="40" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 120 60 L 130 60 M 150 60 L 160 60 M 120 65 L 130 65 M 150 65 L 160 65" stroke={accent} strokeWidth="1" />
                <line x1="95" y1="175" x2="185" y2="175" stroke={accent} strokeWidth="1" strokeDasharray="4,2" />
                <line x1="95" y1="165" x2="185" y2="165" stroke={accent} strokeWidth="1" />
            </svg>
        ),
        boubou: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 130 40 C 140 45 140 45 150 40 L 260 50 Q 255 100 240 190 L 40 190 Q 25 100 20 50 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 125 40 C 135 65 145 65 155 40" fill="none" stroke={accent} strokeWidth="2" />
                <path d="M 115 50 C 115 90 140 120 165 50" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
                <circle cx="140" cy="80" r="15" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 135 75 L 145 75 M 135 85 L 145 85" stroke={accent} strokeWidth="1" />
                <line x1="40" y1="180" x2="240" y2="180" stroke={accent} strokeWidth="1" strokeDasharray="5,3" />
                <path d="M 90 60 Q 95 120 90 190 M 190 60 Q 185 120 190 190" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
            </svg>
        ),
        kente: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 45 C 130 55 150 55 160 45 L 180 50 L 195 55 L 190 85 L 170 80 L 175 120 L 105 120 L 110 80 L 90 85 L 85 55 L 100 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 100 125 L 180 125 L 190 200 L 140 200 L 140 125 L 90 200 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="120" y1="45" x2="160" y2="45" stroke={accent} strokeWidth="1" opacity="0.5" />
                <path d="M 115 60 L 165 60 M 110 75 L 170 75 M 110 90 L 170 90 M 110 105 L 170 105" stroke={accent} strokeWidth="2" opacity="0.4" />
                <path d="M 105 140 L 175 140 M 100 160 L 185 160 M 95 180 L 175 180" stroke={accent} strokeWidth="2" opacity="0.4" />
            </svg>
        ),
        adire: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 45 C 130 55 150 55 165 45 L 185 50 L 200 55 L 195 85 L 175 80 L 185 190 L 95 190 L 105 80 L 85 85 L 80 55 L 95 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <g fill="none" stroke={accent} strokeWidth="1" opacity="0.4">
                    <circle cx="140" cy="70" r="10" /><circle cx="140" cy="70" r="5" />
                    <circle cx="115" cy="110" r="8" /><circle cx="115" cy="110" r="3" />
                    <circle cx="165" cy="110" r="8" /><circle cx="165" cy="110" r="3" />
                    <circle cx="140" cy="145" r="12" /><circle cx="140" cy="145" r="6" />
                    <circle cx="120" cy="175" r="7" /><circle cx="160" cy="175" r="7" />
                </g>
                <path d="M 115 45 C 130 55 150 55 165 45" fill="none" stroke={accent} strokeWidth="2" />
            </svg>
        ),
        gele: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                {/* Gele Headtie */}
                <path d="M 100 40 C 110 20 170 20 180 40 C 210 30 220 50 190 60 C 170 65 110 65 90 60 C 60 50 70 30 100 40 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 110 45 C 130 35 150 35 170 45 M 105 55 C 130 45 150 45 175 55" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
                {/* Buba Blouse */}
                <path d="M 120 70 C 130 80 150 80 160 70 L 180 75 L 200 80 L 195 110 L 175 105 L 170 140 L 110 140 L 105 105 L 85 110 L 80 80 L 100 75 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                {/* Iro Wrapper */}
                <path d="M 105 130 L 180 130 L 170 200 L 95 200 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="140" y1="130" x2="135" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
                {/* Ipele Shoulder Sash */}
                <path d="M 165 75 L 150 75 L 130 160 L 145 160 Z" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1" />
            </svg>
        ),
        kaftan: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 125 40 C 135 50 145 50 155 40 L 175 45 L 210 55 L 220 140 L 195 135 L 210 200 L 70 200 L 85 135 L 60 140 L 70 55 L 105 45 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="140" y1="50" x2="140" y2="200" stroke={accent} strokeWidth="3" opacity="0.6" />
                <line x1="140" y1="50" x2="140" y2="200" stroke={bg} strokeWidth="1" />
                <path d="M 125 40 C 135 55 145 55 155 40" fill="none" stroke={accent} strokeWidth="2" />
                <path d="M 115 45 C 135 70 145 70 165 45" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
                <line x1="65" y1="135" x2="85" y2="130" stroke={accent} strokeWidth="2" /><line x1="215" y1="135" x2="195" y2="130" stroke={accent} strokeWidth="2" />
                <line x1="75" y1="195" x2="205" y2="195" stroke={accent} strokeWidth="2" />
            </svg>
        ),
        isiagu: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 L 160 40 L 175 45 L 210 55 L 205 130 L 180 125 L 185 180 L 95 180 L 100 125 L 75 130 L 70 55 L 105 45 Z" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="140" y1="45" x2="140" y2="130" stroke={accent} strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="140" cy="65" r="2" fill={accent} /><circle cx="140" cy="85" r="2" fill={accent} /><circle cx="140" cy="105" r="2" fill={accent} />
                <path d="M 120 40 L 160 40 L 165 35 L 115 35 Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1" />
                <path d="M 100 80 C 110 70 120 70 120 80 M 160 80 C 170 70 180 70 180 80" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
                <path d="M 100 120 C 110 110 120 110 120 120 M 160 120 C 170 110 180 110 180 120" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
                <path d="M 100 160 C 110 150 120 150 120 160 M 160 160 C 170 150 180 150 180 160" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
            </svg>
        ),
        wrapper: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 45 C 130 55 150 55 165 45 L 185 50 L 180 110 L 200 135 L 165 130 L 115 130 L 80 135 L 100 110 L 95 50 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 115 45 C 130 55 150 55 165 45" fill="none" stroke={accent} strokeWidth="2.5" />
                <path d="M 105 130 L 180 130 L 190 200 L 90 200 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="140" y1="130" x2="135" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
                <g fill="none" stroke={accent} strokeWidth="0.8" opacity="0.3">
                    <circle cx="110" cy="70" r="4" /><circle cx="140" cy="80" r="4" /><circle cx="170" cy="70" r="4" />
                    <circle cx="120" cy="150" r="4" /><circle cx="160" cy="150" r="4" /><circle cx="140" cy="175" r="4" />
                </g>
                <path d="M 115 110 C 130 115 150 115 165 110" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
            </svg>
        ),
        adress: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 C 130 55 150 55 160 40 L 175 45 L 165 110 L 210 200 L 70 200 L 115 110 L 105 45 Z" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 120 40 C 130 55 150 55 160 40" fill="none" stroke={accent} strokeWidth="2" />
                <path d="M 110 40 L 115 30 L 125 30 M 170 40 L 165 30 L 155 30" fill="none" stroke={accent} strokeWidth="4" opacity="0.3" />
                <path d="M 115 110 C 130 115 150 115 165 110" fill="none" stroke={accent} strokeWidth="1.5" />
                <line x1="125" y1="65" x2="130" y2="105" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="155" y1="65" x2="150" y2="105" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="140" y1="113" x2="140" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                <line x1="125" y1="112" x2="100" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                <line x1="155" y1="112" x2="180" y2="200" stroke={accent} strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                <line x1="75" y1="195" x2="205" y2="195" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        blazer: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 120 40 L 160 40 L 175 45 L 210 50 L 205 150 L 180 145 L 185 190 L 95 190 L 100 145 L 75 150 L 70 50 L 105 45 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 140 40 L 120 40 L 105 85 L 125 90 L 140 130" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M 140 40 L 160 40 L 175 85 L 155 90 L 140 130" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M 115 70 L 122 75 M 165 70 L 158 75" stroke={accent} strokeWidth="1.5" />
                <path d="M 120 40 C 130 35 150 35 160 40 L 155 50 C 145 45 135 45 125 50 Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1" />
                <circle cx="140" cy="140" r="3" fill="none" stroke={accent} strokeWidth="1.5" /><circle cx="140" cy="160" r="3" fill="none" stroke={accent} strokeWidth="1.5" />
                <rect x="105" y="140" width="20" height="5" fill="none" stroke={accent} strokeWidth="1" rx="1" />
                <rect x="155" y="140" width="20" height="5" fill="none" stroke={accent} strokeWidth="1" rx="1" />
                <path d="M 155 95 L 170 95 L 165 105 Z" fill="none" stroke={accent} strokeWidth="1" />
                <line x1="140" y1="130" x2="140" y2="190" stroke={accent} strokeWidth="1.5" />
            </svg>
        ),
        trousers: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 105 35 L 175 35 L 180 55 L 100 55 Z" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 100 55 L 140 55 L 135 190 L 60 190 L 80 120 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 140 55 L 180 55 L 200 120 L 220 190 L 145 190 Z" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="95" y1="55" x2="85" y2="190" stroke={accent} strokeWidth="1" strokeDasharray="5,5" />
                <line x1="185" y1="55" x2="195" y2="190" stroke={accent} strokeWidth="1" strokeDasharray="5,5" />
                <path d="M 115 35 L 115 55 M 140 35 L 140 55 M 165 35 L 165 55" stroke={accent} strokeWidth="2" />
                <line x1="140" y1="55" x2="140" y2="85" stroke={accent} strokeWidth="1.5" />
                <path d="M 105 60 C 110 75 110 85 105 95 M 175 60 C 170 75 170 85 175 95" fill="none" stroke={accent} strokeWidth="1" />
                <line x1="60" y1="185" x2="135" y2="185" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="145" y1="185" x2="220" y2="185" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
            </svg>
        ),
        pblouse: (
            <svg viewBox="0 0 280 220" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="220" fill="var(--card)" />
                <path d="M 115 50 C 130 65 150 65 165 50 L 175 55 L 175 180 L 105 180 L 105 55 Z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 115 50 C 130 65 150 65 165 50" fill="none" stroke={accent} strokeWidth="2" />
                <line x1="140" y1="60" x2="140" y2="180" stroke={accent} strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="140" cy="75" r="2" fill={accent} /><circle cx="140" cy="100" r="2" fill={accent} />
                <circle cx="140" cy="125" r="2" fill={accent} /><circle cx="140" cy="150" r="2" fill={accent} />
                {/* Left Sleeve */}
                <path d="M 105 55 C 65 50 50 80 60 115 C 80 120 100 115 105 105 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 60 115 C 70 125 90 125 105 105" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 70 120 L 75 125 L 85 125 M 60 115 L 65 125 L 70 120" stroke={accent} strokeWidth="1" fill="none" />
                <path d="M 100 65 C 85 75 80 95 85 105" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
                {/* Right Sleeve */}
                <path d="M 175 55 C 215 50 230 80 220 115 C 200 120 180 115 175 105 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 220 115 C 210 125 190 125 175 105" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 210 120 L 205 125 L 195 125 M 220 115 L 215 125 L 210 120" stroke={accent} strokeWidth="1" fill="none" />
                <path d="M 180 65 C 195 75 200 95 195 105" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
                <line x1="105" y1="175" x2="175" y2="175" stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
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
    // Technical-grade exact pattern shapes with seam allowances, notches, drill holes, and grainlines
    const N = (x: number, y: number) => <polygon points={`${x},${y} ${x - 2},${y - 3} ${x + 2},${y - 3}`} fill={c} />; // Top notch
    const NR = (x: number, y: number) => <polygon points={`${x},${y} ${x + 3},${y - 2} ${x + 3},${y + 2}`} fill={c} />; // Right notch
    const NL = (x: number, y: number) => <polygon points={`${x},${y} ${x - 3},${y - 2} ${x - 3},${y + 2}`} fill={c} />; // Left notch
    const NB = (x: number, y: number) => <polygon points={`${x},${y} ${x - 2},${y + 3} ${x + 2},${y + 3}`} fill={c} />; // Bottom notch
    const DH = (x: number, y: number) => <circle cx={x} cy={y} r="1.5" fill="none" stroke={c} strokeWidth="1" />; // Drill hole

    const shapes: Record<PatternShape, ReactElement> = {
        front_bodice: (
            <svg viewBox="0 0 120 160" width="100" height="135">
                <path d="M20,15 L75,15 C 85 15 95 25 100,40 L110,140 C 110 145 105 150 100 150 L15,150 L20,40 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <path d="M20,15 C 45 25 70 25 75,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2" />
                <text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CF FOLD</text>
                <line x1="65" y1="50" x2="65" y2="120" stroke={g} strokeWidth="1.5" /><polygon points="61,55 65,45 69,55" fill={g} /><polygon points="61,115 65,125 69,115" fill={g} /><text x="70" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                <path d="M20,15 L20,150" stroke={c} strokeWidth="2.5" strokeDasharray="8,4" />
                {N(45, 15)} {NR(108, 120)} {DH(80, 110)} {DH(50, 130)}
                <path d="M80,110 L85,150 M50,130 L50,150 M20,105 L50,95 L50,130" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        back_bodice: (
            <svg viewBox="0 0 120 160" width="100" height="135">
                <path d="M15,10 L80,10 C 90 10 100 20 105,35 L115,145 C 115 150 110 150 105 150 L10,150 L15,35 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <path d="M15,10 C 40 15 65 15 80,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,2" />
                <text x="45" y="100" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={c} opacity="0.6">CB SEAM</text>
                <line x1="60" y1="45" x2="60" y2="115" stroke={g} strokeWidth="1.5" /><polygon points="56,50 60,40 64,50" fill={g} /><polygon points="56,110 60,120 64,110" fill={g} />
                <path d="M15,10 L10,150" stroke={c} strokeWidth="2" /><line x1="85" y1="18" x2="90" y2="18" stroke={c} strokeWidth="2" />
                {NL(12, 60)} {NL(11.5, 90)} {N(40, 10)} {DH(70, 90)}
                <path d="M70,90 L75,150" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        side_panel: (
            <svg viewBox="0 0 80 160" width="65" height="135">
                <path d="M10,25 C 20 20 30 15 50,15 C 60 40 70 80 65,150 L15,150 C 5 90 0 50 10,25 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="35" y1="40" x2="35" y2="130" stroke={g} strokeWidth="1.5" /><polygon points="31,45 35,35 39,45" fill={g} /><polygon points="31,125 35,135 39,125" fill={g} />
                {NL(7.5, 75)} {NR(67.5, 90)}
            </svg>
        ),
        sleeve: (
            <svg viewBox="0 0 140 160" width="115" height="135">
                <path d="M70,10 C 110 10 135 30 135,55 L120,145 L20,145 L5,55 C 5 30 30 10 70,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="70" y1="35" x2="70" y2="125" stroke={g} strokeWidth="1.5" /><polygon points="66,40 70,30 74,40" fill={g} /><polygon points="66,120 70,130 74,120" fill={g} /><text x="75" y="85" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                {N(70, 10)} {NL(20, 40)} {NR(120, 40)} {NR(115, 35)}
            </svg>
        ),
        upper_sleeve: (
            <svg viewBox="0 0 110 180" width="90" height="150">
                <path d="M55,10 C 85 10 105 30 105,50 C 105 90 95 130 85,170 L25,170 C 15 130 5 90 5,60 C 5 25 30 10 55,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="55" y1="40" x2="50" y2="140" stroke={g} strokeWidth="1.5" /><polygon points="51,45 55,35 59,45" fill={g} />
                {N(55, 10)} {NR(105, 50)} {NL(5, 60)} {NL(6, 65)}
            </svg>
        ),
        under_sleeve: (
            <svg viewBox="0 0 80 160" width="65" height="135">
                <path d="M40,25 C 60 25 75 35 75,50 C 70 80 60 120 55,150 L15,150 C 10 120 5 80 5,50 C 15 35 25 25 40,25 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <path d="M5,50 C 40 70 75 50 75,50" fill="none" stroke={c} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="35" y1="60" x2="35" y2="130" stroke={g} strokeWidth="1.5" /><polygon points="31,65 35,55 39,65" fill={g} />
                {NR(75, 50)} {NL(5, 50)} {NL(6, 55)}
            </svg>
        ),
        sleeve_cuff: (
            <svg viewBox="0 0 140 60" width="115" height="50">
                <rect x="10" y="10" width="120" height="40" fill={f} stroke={c} strokeWidth="2" />
                <line x1="10" y1="30" x2="130" y2="30" stroke={c} strokeWidth="1" strokeDasharray="5,3" />
                <line x1="70" y1="15" x2="70" y2="45" stroke={g} strokeWidth="1.5" /><polygon points="66,20 70,10 74,20" fill={g} />
                {N(70, 10)} {NB(70, 50)}
            </svg>
        ),
        collar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M10,65 L25,15 C 60 5 100 5 135,15 L150,65 C 100 75 60 75 10,65 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="80" y1="25" x2="80" y2="55" stroke={g} strokeWidth="1.5" /><polygon points="76,30 80,20 84,30" fill={g} /><text x="85" y="45" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN FOLD</text>
                <path d="M80,8 L80,72" stroke={c} strokeWidth="1.5" strokeDasharray="6,4" />
                {N(40, 11)} {N(120, 11)} {NB(40, 68)} {NB(120, 68)} {NB(80, 72)}
            </svg>
        ),
        undercollar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M12,65 L27,15 C 60 5 100 5 133,15 L148,65 C 100 73 60 73 12,65 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="40" y1="20" x2="70" y2="60" stroke={g} strokeWidth="1.5" /><polygon points="41,25 37,17 48,22" fill={g} />
                <path d="M80,8 L80,70" stroke={c} strokeWidth="2" /><text x="82" y="35" fontFamily="DM Mono" fontSize="6" fill={c}>CB SEAM</text>
                {N(40, 11)} {N(120, 11)} {NB(40, 68)} {NB(120, 68)}
            </svg>
        ),
        top_collar: (
            <svg viewBox="0 0 160 80" width="140" height="70">
                <path d="M8,67 L23,13 C 60 3 100 3 137,13 L152,67 C 100 77 60 77 8,67 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="80" y1="25" x2="80" y2="55" stroke={g} strokeWidth="1.5" /><polygon points="76,30 80,20 84,30" fill={g} />
                <path d="M80,6 L80,74" stroke={c} strokeWidth="1.5" strokeDasharray="6,4" /><text x="82" y="35" fontFamily="DM Mono" fontSize="6" fill={c}>CB FOLD</text>
            </svg>
        ),
        skirt_panel: (
            <svg viewBox="0 0 140 180" width="115" height="150">
                <path d="M30,10 L110,10 L135,170 L5,170 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="30" y1="10" x2="110" y2="10" stroke={c} strokeWidth="1" strokeDasharray="5,3" />
                <line x1="70" y1="40" x2="70" y2="140" stroke={g} strokeWidth="1.5" /><polygon points="66,45 70,35 74,45" fill={g} /><polygon points="66,135 70,145 74,135" fill={g} /><text x="75" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>GRAIN</text>
                <line x1="15" y1="165" x2="125" y2="165" stroke={c} strokeWidth="1" strokeDasharray="4,2" />
                {N(70, 10)} {DH(50, 50)} {DH(90, 50)}
                <path d="M50,10 L50,50 L55,10 M90,10 L90,50 L85,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        trouser_front: (
            <svg viewBox="0 0 130 210" width="105" height="170">
                <path d="M20,10 L105,10 L110,100 C 110 110 105 120 95,200 L65,200 L60,135 L25,200 L10,200 L15,100 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="60" y1="30" x2="60" y2="150" stroke={g} strokeWidth="1.5" /><polygon points="56,35 60,25 64,35" fill={g} />
                <text x="65" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>CREASE/GRAIN</text>
                <path d="M20,10 L15,100" stroke={c} strokeWidth="2.5" /><path d="M105,10 L95,60" fill="none" stroke={c} strokeWidth="1" strokeDasharray="4,4" />
                {N(17, 80)} {N(18, 50)} {NR(108, 80)} {DH(60, 40)}
                <path d="M60,10 L60,40 L65,10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        trouser_back: (
            <svg viewBox="0 0 140 210" width="115" height="170">
                <path d="M30,5 L115,15 L125,100 C 120 120 110 150 105,200 L75,200 L70,130 L20,200 L5,200 L10,105 C 10 70 20 40 30,5 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="65" y1="35" x2="60" y2="160" stroke={g} strokeWidth="1.5" /><polygon points="61,40 65,30 69,40" fill={g} />
                <text x="70" y="90" fontFamily="DM Mono" fontSize="6" fill={g}>CREASE/GRAIN</text>
                <path d="M30,5 L10,105" stroke={c} strokeWidth="2.5" />
                {N(20, 60)} {N(21, 65)} {NR(120, 70)} {DH(75, 45)} {DH(55, 40)}
                <path d="M75,10 L75,45 L80,11 M55,8 L55,40 L60,9" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        ),
        waistband: (
            <svg viewBox="0 0 190 55" width="170" height="49">
                <rect x="10" y="10" width="170" height="35" rx="2" fill={f} stroke={c} strokeWidth="2" />
                <line x1="10" y1="27.5" x2="180" y2="27.5" stroke={c} strokeWidth="1" strokeDasharray="5,3" />
                <line x1="95" y1="15" x2="95" y2="40" stroke={g} strokeWidth="1.5" /><polygon points="91,20 95,10 99,20" fill={g} />
                {N(50, 10)} {N(95, 10)} {N(140, 10)} {NB(50, 45)} {NB(95, 45)} {NB(140, 45)}
            </svg>
        ),
        fly_shield: (
            <svg viewBox="0 0 60 120" width="45" height="90">
                <path d="M15,15 L45,15 L45,95 C 45 105 35 110 25 110 C 15 110 15 100 15,95 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="30" y1="30" x2="30" y2="90" stroke={g} strokeWidth="1.5" /><polygon points="26,35 30,25 34,35" fill={g} />
                <text x="20" y="60" fontFamily="DM Mono" fontSize="5" fill={g} style={{ writingMode: "vertical-rl" }}>GRAIN FOLD</text>
                <path d="M15,15 L15,95" stroke={c} strokeWidth="1.5" strokeDasharray="4,4" />
            </svg>
        ),
        yoke_back: (
            <svg viewBox="0 0 140 70" width="115" height="60">
                <path d="M20,15 L60,25 L120,15 L115,55 L70,60 L25,55 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="70" y1="25" x2="70" y2="50" stroke={g} strokeWidth="1.5" /><polygon points="66,30 70,20 74,30" fill={g} />
                {N(70, 25)} {NB(70, 60)} {NL(22, 35)} {NR(117, 35)}
                <path d="M70,25 L70,60" stroke={c} strokeWidth="1" strokeDasharray="3,3" /><text x="75" y="45" fontFamily="DM Mono" fontSize="5" fill={c}>CB FOLD</text>
            </svg>
        ),
        front_facing: (
            <svg viewBox="0 0 70 170" width="55" height="140">
                <path d="M20,10 L50,10 C 60 20 60 40 50,60 C 40 80 40 120 45,160 L15,160 C 10 100 15 50 20,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="30" y1="30" x2="30" y2="130" stroke={g} strokeWidth="1.5" /><polygon points="26,35 30,25 34,35" fill={g} />
                {NR(55, 50)} {NR(46, 120)}
            </svg>
        ),
        back_facing: (
            <svg viewBox="0 0 120 60" width="100" height="50">
                <path d="M15,15 C 45 25 75 25 105,15 L115,45 C 80 55 40 55 5,45 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="60" y1="23" x2="60" y2="48" stroke={g} strokeWidth="1.5" /><polygon points="56,28 60,18 64,28" fill={g} />
                <path d="M60,23 L60,48" stroke={c} strokeWidth="1" strokeDasharray="4,4" /><text x="65" y="40" fontFamily="DM Mono" fontSize="5" fill={c}>CB FOLD</text>
            </svg>
        ),
        lapel_facing: (
            <svg viewBox="0 0 80 180" width="65" height="150">
                <path d="M25,10 L60,10 C 70 30 75 60 65,100 C 55 140 50 160 55,170 L15,170 C 15 120 20 60 25,10 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="35" y1="30" x2="35" y2="140" stroke={g} strokeWidth="1.5" /><polygon points="31,35 35,25 39,35" fill={g} />
                {N(45, 10)} {NR(69, 70)} {NL(18, 70)}
            </svg>
        ),
        placket: (
            <svg viewBox="0 0 50 160" width="40" height="135">
                <rect x="15" y="10" width="20" height="140" fill={f} stroke={c} strokeWidth="2" />
                <line x1="25" y1="10" x2="25" y2="150" stroke={c} strokeWidth="1" strokeDasharray="5,3" />
                <line x1="20" y1="30" x2="20" y2="130" stroke={g} strokeWidth="1.5" /><polygon points="16,35 20,25 24,35" fill={g} />
                {N(25, 10)} {NB(25, 150)}
            </svg>
        ),
        pocket_bag: (
            <svg viewBox="0 0 100 130" width="80" height="105">
                <path d="M20,15 L80,15 L85,60 C 90 90 70 115 50 115 C 30 115 10 90 15,60 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="50" y1="30" x2="50" y2="90" stroke={g} strokeWidth="1.5" /><polygon points="46,35 50,25 54,35" fill={g} />
                {N(40, 15)} {N(60, 15)}
            </svg>
        ),
        pocket_welt: (
            <svg viewBox="0 0 90 50" width="75" height="42">
                <rect x="15" y="15" width="60" height="20" fill={f} stroke={c} strokeWidth="2" />
                <line x1="15" y1="25" x2="75" y2="25" stroke={c} strokeWidth="1" strokeDasharray="4,2" />
                <line x1="45" y1="18" x2="45" y2="32" stroke={g} strokeWidth="1.5" /><polygon points="41,20 45,16 49,20" fill={g} />
            </svg>
        ),
        pocket_flap: (
            <svg viewBox="0 0 90 60" width="75" height="50">
                <path d="M15,15 L75,15 L70,45 L20,45 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="45" y1="20" x2="45" y2="40" stroke={g} strokeWidth="1.5" /><polygon points="41,25 45,15 49,25" fill={g} />
                {N(30, 15)} {N(60, 15)}
            </svg>
        ),
        agbada_outer: (
            <svg viewBox="0 0 210 150" width="180" height="130">
                <path d="M5,15 C 105 5 205 15 205,15 L195,140 L15,140 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <path d="M5,15 C 105 5 205 15 205,15" fill="none" stroke={c} strokeWidth="1" strokeDasharray="5,5" />
                <line x1="105" y1="30" x2="105" y2="90" stroke={g} strokeWidth="1.5" /><polygon points="101,35 105,25 109,35" fill={g} /><polygon points="101,85 105,95 109,85" fill={g} /><text x="110" y="65" fontFamily="DM Mono" fontSize="7" fill={g}>GRAIN FOLD</text>
                <ellipse cx="105" cy="40" rx="20" ry="10" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2,2" />
                {N(105, 15)} {NB(105, 140)} {DH(50, 50)} {DH(160, 50)}
            </svg>
        ),
        agbada_inner: (
            <svg viewBox="0 0 140 160" width="115" height="135">
                <path d="M20,15 L120,15 L125,70 L80,150 L60,150 L15,70 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <ellipse cx="70" cy="15" rx="15" ry="8" fill="none" stroke={c} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="70" y1="40" x2="70" y2="120" stroke={g} strokeWidth="1.5" /><polygon points="66,45 70,35 74,45" fill={g} />
                {NL(18, 40)} {NR(122, 40)}
            </svg>
        ),
        buba_sleeve: (
            <svg viewBox="0 0 160 120" width="135" height="100">
                <rect x="20" y="20" width="120" height="80" fill={f} stroke={c} strokeWidth="2" />
                <line x1="80" y1="35" x2="80" y2="85" stroke={g} strokeWidth="1.5" /><polygon points="76,40 80,30 84,40" fill={g} />
                {N(80, 20)} {NB(80, 100)}
            </svg>
        ),
        gele_tie: (
            <svg viewBox="0 0 250 60" width="210" height="50">
                <path d="M10,30 C 50 10 200 10 240,30 C 200 50 50 50 10,30 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="125" y1="20" x2="125" y2="40" stroke={g} strokeWidth="1.5" /><polygon points="121,25 125,15 129,25" fill={g} /><text x="130" y="32" fontFamily="DM Mono" fontSize="5" fill={g}>BIAS GRAIN</text>
                {N(125, 13)} {NB(125, 47)}
            </svg>
        ),
        wrapper_panel: (
            <svg viewBox="0 0 180 120" width="150" height="100">
                <rect x="10" y="10" width="160" height="100" fill={f} stroke={c} strokeWidth="2" />
                <path d="M10,10 L170,10 M10,110 L170,110" stroke={c} strokeWidth="3" />
                <line x1="90" y1="30" x2="90" y2="90" stroke={g} strokeWidth="1.5" /><polygon points="86,35 90,25 94,35" fill={g} />
                <text x="95" y="60" fontFamily="DM Mono" fontSize="7" fill={c}>SELVAGE TO SELVAGE</text>
            </svg>
        ),
        embroidery_panel: (
            <svg viewBox="0 0 60 130" width="50" height="110">
                <rect x="10" y="10" width="40" height="110" rx="3" fill={f} stroke={c} strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M20,${25 + i * 16} C 30,${35 + i * 16} 40,${25 + i * 16} 40,${25 + i * 16}`} fill="none" stroke={c} strokeWidth="1.2" opacity="0.6" />)}
                <line x1="30" y1="20" x2="30" y2="110" stroke={g} strokeWidth="1.5" /><polygon points="26,25 30,15 34,25" fill={g} /><polygon points="26,105 30,115 34,105" fill={g} />
                {N(30, 10)} {NB(30, 120)}
            </svg>
        ),
        kente_strip: (
            <svg viewBox="0 0 45 180" width="35" height="150">
                <rect x="10" y="10" width="25" height="160" fill={f} stroke={c} strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <rect key={i} x="10" y={10 + i * 17.7} width="25" height="10" fill={(["#D4A017", "#B22222", "#2D6A4F", "#0A0805"] as string[])[i % 4]} opacity="0.3" />)}
                <line x1="22.5" y1="30" x2="22.5" y2="150" stroke={g} strokeWidth="1.5" /><polygon points="18.5,35 22.5,25 26.5,35" fill={g} /><polygon points="18.5,145 22.5,155 26.5,145" fill={g} />
            </svg>
        ),
        pocket: (
            <svg viewBox="0 0 100 110" width="80" height="90">
                <path d="M15,15 L85,15 L90,80 C 90 95 70 100 50 100 C 30 100 10 95 10 80 Z" fill={f} stroke={c} strokeWidth="2" strokeLinejoin="round" />
                <line x1="50" y1="35" x2="50" y2="75" stroke={g} strokeWidth="1.5" /><polygon points="46,40 50,30 54,40" fill={g} /><polygon points="46,70 50,80 54,70" fill={g} />
                <line x1="15" y1="15" x2="85" y2="15" stroke={c} strokeWidth="3" /><line x1="45" y1="15" x2="55" y2="15" stroke={c} strokeWidth="1.5" />
                <path d="M15,25 L85,25" stroke={c} strokeWidth="1.5" strokeDasharray="4,2" />
                {N(50, 15)} {DH(30, 70)} {DH(70, 70)}
            </svg>
        ),
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
            { id: "ag1", name: "Outer Agbada Robe", shape: "agbada_outer", dims: "280×150 cm", qty: 1, notes: ["Cut 1 full width on grain", "Mark center front opening", "Allow 5cm at hem"], instructions: ["Hem all four edges first", "Reinforce CF opening with interfacing", "Apply embroidery before final pressing"] },
            { id: "ag2", name: "Inner Agbada Facing", shape: "agbada_inner", dims: "50×140 cm", qty: 1, notes: ["Cut 1 on fold", "Heavy interfacing required"], instructions: ["Staystitch neck opening", "Attach to outer robe right sides together"] },
            { id: "ag3", name: "Buba Front Bodice", shape: "front_bodice", dims: "58×70 cm", qty: 1, notes: ["Cut 1 on fold", "Mark embroidery lines at collar and cuffs"], instructions: ["Embroider before assembly", "Interface collar edge", "Staystitch neckline at 1.2cm"] },
            { id: "ag4", name: "Buba Back Bodice", shape: "back_bodice", dims: "58×70 cm", qty: 2, notes: ["Cut 2 mirror", "CB seam or fold"], instructions: ["Join shoulders first", "Press seams open over tailor's ham"] },
            { id: "ag5", name: "Buba Sleeve", shape: "buba_sleeve", dims: "65×40 cm", qty: 2, notes: ["Cut 2", "Wide straight sleeve"], instructions: ["Set sleeve flat", "Sew underarm and side seam in one pass"] },
            { id: "ag6", name: "Embroidery Panel", shape: "embroidery_panel", dims: "20×55 cm", qty: 2, notes: ["Cut 2 from contrasting fabric", "Complete embroidery before cutting"], instructions: ["Slipstitch to garment over lining", "Press all edges under"] },
            { id: "ag7", name: "Sokoto Trouser Front", shape: "trouser_front", dims: "58×110 cm", qty: 2, notes: ["Cut 2 mirror", "Very wide leg", "Maintain grain strictly"], instructions: ["Sew inseam with French seam", "Add 6cm elastic casing", "Hemstitch at 3cm"] },
            { id: "ag8", name: "Sokoto Trouser Back", shape: "trouser_back", dims: "62×112 cm", qty: 2, notes: ["Cut 2 mirror", "Deeper crotch curve"], instructions: ["Join to front at side seams", "Sew crotch seam twice for strength"] }
        ]
    },
    {
        id: 2, name: "Senator Suit", category: "Senator", region: "West Africa", origin: "Pan-Nigerian",
        difficulty: "Intermediate", fabric: "Linen / Cotton", tags: ["formal", "everyday", "political"], african: true,
        garmentType: "senator", accent: "#4A8FD4", bg: "#040810",
        desc: "The modern Nigerian Senator suit — structured tunic top and straight trousers heavily influenced by minimalist tailoring.",
        measurements: { "Chest": "90–98 cm", "Waist": "78–86 cm", "Hip": "96–104 cm", "Top Len.": "90 cm", "Trouser": "110 cm", "Seam Allow.": "1.5 cm" },
        pieces: [
            { id: "se1", name: "Top Front", shape: "front_bodice", dims: "55×95 cm", qty: 1, notes: ["Cut 1 on fold", "Notch CF slit", "Block fuse CF placket area"], instructions: ["Construct hidden placket", "Attach breast welt pocket"] },
            { id: "se2", name: "Top Back", shape: "back_bodice", dims: "55×95 cm", qty: 1, notes: ["Cut 1 on fold", "Dart shaping at waist optional"], instructions: ["Sew shoulder seams to front", "Add back darts if preferred"] },
            { id: "se3", name: "Hidden Placket", shape: "placket", dims: "15×45 cm", qty: 2, notes: ["Cut 2", "Apply stiff interfacing"], instructions: ["Sew hidden buttonholes", "Edgestitch to CF"] },
            { id: "se4", name: "Senator Collar", shape: "collar", dims: "42×8 cm", qty: 2, notes: ["Cut 2", "Mandarin style collar", "Heavy interfacing"], instructions: ["Sew collar points", "Turn, press, and topstitch at 2mm"] },
            { id: "se5", name: "Long Sleeve", shape: "sleeve", dims: "35×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match cap notches to armhole"], instructions: ["Ease sleeve cap", "Insert into armscye", "Finish cuff with placket"] },
            { id: "se6", name: "Sleeve Cuff", shape: "sleeve_cuff", dims: "28×12 cm", qty: 2, notes: ["Cut 2", "Block fuse"], instructions: ["Attach to sleeve hem", "Add buttonholes"] },
            { id: "se7", name: "Trouser Front", shape: "trouser_front", dims: "40×115 cm", qty: 2, notes: ["Cut 2 mirror", "Mark pleats and pocket placement"], instructions: ["Sew front pleats", "Insert side pockets", "Assemble zip fly"] },
            { id: "se8", name: "Trouser Back", shape: "trouser_back", dims: "45×115 cm", qty: 2, notes: ["Cut 2 mirror", "Mark back darts"], instructions: ["Sew back darts", "Join inseams and outseams"] },
            { id: "se9", name: "Fly Shield", shape: "fly_shield", dims: "8×22 cm", qty: 1, notes: ["Cut 1", "Fold in half and interface"], instructions: ["Attach to zipper flat", "Sew to left trouser front"] },
            { id: "se10", name: "Waistband", shape: "waistband", dims: "105×10 cm", qty: 1, notes: ["Cut 1", "Use trouser waistband interfacing"], instructions: ["Attach continuously to waist", "Finish ends cleanly"] },
            { id: "se11", name: "Pocket Bag", shape: "pocket_bag", dims: "20×30 cm", qty: 4, notes: ["Cut 4 from pocketing cotton"], instructions: ["Attach to trouser side seam", "Bag out and topstitch"] }
        ]
    },
    {
        id: 3, name: "Dashiki Tunic", category: "Dashiki", region: "West Africa", origin: "Yoruba",
        difficulty: "Beginner", fabric: "Angelina Print / Cotton", tags: ["casual", "streetwear", "pan-african"], african: true,
        garmentType: "dashiki", accent: "#C14B1A", bg: "#0A0402",
        desc: "A loose-fitting pull-over tunic characterized by its V-neckline and ornate printed or embroidered central positioning.",
        measurements: { "Chest": "110–120 cm", "Waist": "110–120 cm", "Len.": "80 cm", "Sleeve": "25 cm" },
        pieces: [
            { id: "da1", name: "Tunic Front", shape: "front_bodice", dims: "65×85 cm", qty: 1, notes: ["Cut 1 on fold", "Center the print motif perfectly", "Mark V-neck plunge"], instructions: ["Interface V-neck facing", "Apply front pocket bags"] },
            { id: "da2", name: "Tunic Back", shape: "back_bodice", dims: "65×85 cm", qty: 1, notes: ["Cut 1 on fold", "Match print across side seams if possible"], instructions: ["Sew shoulder seams", "Sew side seams leaving hem splits"] },
            { id: "da3", name: "Front Facing", shape: "front_facing", dims: "30×40 cm", qty: 1, notes: ["Cut 1 on fold", "Light interfacing"], instructions: ["Pin right sides to V-neck", "Sew, clip corners, turn inside and press"] },
            { id: "da4", name: "Back Neck Facing", shape: "back_facing", dims: "30×12 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Attach to back neckline", "Join to front facing at shoulders"] },
            { id: "da5", name: "Short Sleeve", shape: "sleeve", dims: "40×35 cm", qty: 2, notes: ["Cut 2", "Wide straight drop-shoulder sleeve"], instructions: ["Sew flat into armhole before side seams", "Hem 3cm"] },
            { id: "da6", name: "Patch Pocket", shape: "pocket", dims: "20×22 cm", qty: 2, notes: ["Cut 2", "Center print motif on pocket identical to underlying fabric"], instructions: ["Turn top edge twice and stitch", "Press remaining edges and topstitch to front bodices"] }
        ]
    },
    {
        id: 4, name: "Grand Boubou", category: "Boubou", region: "West Africa", origin: "Senegal / Mali",
        difficulty: "Advanced", fabric: "Bazin Riche", tags: ["formal", "voluminous", "embroidery"], african: true,
        garmentType: "boubou", accent: "#5C3A8A", bg: "#07030E",
        desc: "A flowing, floor-length wide-sleeved robe worn across the Sahel, defined by heavy starching and intricate chest embroidery.",
        measurements: { "Total Width": "150 cm", "Len.": "160 cm", "Neck Drop": "22 cm", "Seam Allow.": "none (selvage)" },
        pieces: [
            { id: "bo1", name: "Main Body Panel", shape: "agbada_outer", dims: "150×320 cm", qty: 1, notes: ["Cut 1 continuous piece (front to back)", "Fold at shoulders", "Do not cut neck opening until embroidery layout is confirmed"], instructions: ["Fold fabric in half", "Mark center front and neck opening"] },
            { id: "bo2", name: "Neck Opening", shape: "embroidery_panel", dims: "30×45 cm", qty: 1, notes: ["Cut 1 template for embroidery placing"], instructions: ["Draw embroidery motif directly on fabric", "Send for machine embroidery"] },
            { id: "bo3", name: "Neck Facing", shape: "front_facing", dims: "30×50 cm", qty: 1, notes: ["Cut 1", "Heavy interfacing"], instructions: ["Apply facing to neck hole", "Turn and catch stitch blindly under embroidery"] },
            { id: "bo4", name: "Side Gussets", shape: "side_panel", dims: "15×40 cm", qty: 2, notes: ["Cut 2", "Optional for extra drape"], instructions: ["Insert into side seams at hem level"] }
        ]
    },
    {
        id: 5, name: "Kente Kaba & Slit", category: "Kente", region: "West Africa", origin: "Ashanti / Ghana",
        difficulty: "Expert", fabric: "Woven Kente Cloth", tags: ["bridal", "traditional", "woven"], african: true,
        garmentType: "kente", accent: "#E5A910", bg: "#0A0800",
        desc: "A traditional Ghanaian two-piece consisting of a tailored kaba (blouse) and long slit (skirt), meticulously matching hand-woven strips.",
        measurements: { "Bust": "92–100 cm", "Waist": "74–82 cm", "Hip": "100–108 cm", "Skirt Len.": "115 cm" },
        pieces: [
            { id: "ke1", name: "Kaba Front", shape: "front_bodice", dims: "55×65 cm", qty: 1, notes: ["Cut 1", "Center Kente motif PERFECTLY", "Block fuse"], instructions: ["Sew princess seams", "Apply rigid boning to seams"] },
            { id: "ke2", name: "Kaba Side Front", shape: "side_panel", dims: "25×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match horizontal stripes to Center Front"], instructions: ["Join to front bodice", "Press seams open"] },
            { id: "ke3", name: "Kaba Back", shape: "back_bodice", dims: "35×65 cm", qty: 2, notes: ["Cut 2 mirror", "Match stripes at CB zipper"], instructions: ["Insert invisible zipper at CB", "Join to side front"] },
            { id: "ke4", name: "Peplum Flare", shape: "skirt_panel", dims: "40×30 cm", qty: 3, notes: ["Cut 3", "Ensure weave runs vertically"], instructions: ["Gather or pleat", "Attach to Kaba waist"] },
            { id: "ke5", name: "Puff Sleeve", shape: "buba_sleeve", dims: "45×40 cm", qty: 2, notes: ["Cut 2", "Use stiff organza inside for volume"], instructions: ["Gather sleeve head heavily", "Set into armhole"] },
            { id: "ke6", name: "Skirt Front", shape: "trouser_front", dims: "55×120 cm", qty: 1, notes: ["Cut 1 on fold", "Line fully with cotton"], instructions: ["Sew waist darts", "Attach to back pieces"] },
            { id: "ke7", name: "Skirt Back", shape: "trouser_back", dims: "32×120 cm", qty: 2, notes: ["Cut 2", "Leave 45cm slit at bottom center back"], instructions: ["Sew CB seam down to slit notch", "Insert zip"] },
            { id: "ke8", name: "Waistband", shape: "waistband", dims: "90×8 cm", qty: 1, notes: ["Cut 1", "Interface heavily"], instructions: ["Attach to skirt", "Add hook and bar closure"] }
        ]
    },
    {
        id: 6, name: "Adire Maxi Dress", category: "Adire", region: "West Africa", origin: "Nigeria",
        difficulty: "Beginner", fabric: "Indigo Dyed Cotton", tags: ["resort", "dyed", "flowing"], african: true,
        garmentType: "adire", accent: "#1A3B8A", bg: "#030810",
        desc: "A free-flowing, A-line maxi dress showcasing the beauty of indigo resist-dye patterns with minimal seam disruption.",
        measurements: { "Bust": "100–110 cm", "Waist": "Free", "Len.": "145 cm", "Sweep": "240 cm" },
        pieces: [
            { id: "ad1", name: "Dress Front", shape: "front_bodice", dims: "80×155 cm", qty: 1, notes: ["Cut 1 on fold", "Position favored dye motif across chest"], instructions: ["Sew bust darts if needed", "Finish neckline with bias binding"] },
            { id: "ad2", name: "Dress Back", shape: "back_bodice", dims: "80×155 cm", qty: 1, notes: ["Cut 1 on fold", "Optional CB seam for shaping"], instructions: ["Join shoulders to front", "Join side seams"] },
            { id: "ad3", name: "Inseam Pocket", shape: "pocket_bag", dims: "20×30 cm", qty: 4, notes: ["Cut 4"], instructions: ["Attach to side seams at waist mark", "Sew around pocket bag while doing side seam"] },
            { id: "ad4", name: "Neck Binding", shape: "kente_strip", dims: "70×4 cm", qty: 1, notes: ["Cut 1 on true bias"], instructions: ["Fold and press", "Apply to neckline for clean finish"] }
        ]
    },
    {
        id: 7, name: "Iro & Buba (Gele Set)", category: "Aso-Oke", region: "West Africa", origin: "Yoruba",
        difficulty: "Intermediate", fabric: "Aso-Oke / Lace", tags: ["wedding", "traditional", "intricate"], african: true,
        garmentType: "gele", accent: "#8A2B3D", bg: "#080402",
        desc: "The classic four-piece Yoruba womenswear: Iro (wrapper), Buba (blouse), Gele (headtie), and Ipele (shoulder sash).",
        measurements: { "Wrapper Wrap": "200 cm", "Bust": "104 cm", "Gele Len.": "250 cm" },
        pieces: [
            { id: "ge1", name: "Buba Front", shape: "front_bodice", dims: "65×70 cm", qty: 1, notes: ["Cut 1", "Round or sweetheart neck"], instructions: ["Line with skin-tone sweetheart lining", "Sew shoulder seams"] },
            { id: "ge2", name: "Buba Back", shape: "back_bodice", dims: "35×70 cm", qty: 2, notes: ["Cut 2", "CB zip"], instructions: ["Insert zipper", "Sew side seams"] },
            { id: "ge3", name: "Buba Sleeve", shape: "buba_sleeve", dims: "45×60 cm", qty: 2, notes: ["Cut 2", "Wide sleeves (3/4 length)"], instructions: ["Gather slightly at cap", "Sew into armhole"] },
            { id: "ge4", name: "Iro (Wrapper)", shape: "wrapper_panel", dims: "200×115 cm", qty: 1, notes: ["Cut 1 large rectangle", "Use Aso-Oke strips sewn together"], instructions: ["Hem all edges", "Add wrapper ties if desired"] },
            { id: "ge5", name: "Gele (Headtie)", shape: "gele_tie", dims: "250×50 cm", qty: 1, notes: ["Cut 1 from stiff Aso-Oke"], instructions: ["Hem edges", "Pleat while tying on head"] },
            { id: "ge6", name: "Ipele (Sash)", shape: "gele_tie", dims: "150×30 cm", qty: 1, notes: ["Cut 1"], instructions: ["Hem and embellish edges with fringe"] }
        ]
    },
    {
        id: 8, name: "Moroccan Kaftan", category: "Kaftan", region: "North Africa", origin: "Morocco",
        difficulty: "Advanced", fabric: "Silk Crepe / Velvet", tags: ["bridal", "embellished", "sfifa"], african: true,
        garmentType: "kaftan", accent: "#8B0000", bg: "#0A0202",
        desc: "An exquisite single or double-layered gown featuring intricate sfifa braiding, aakad (knotted buttons), and luxurious drape.",
        measurements: { "Bust": "96 cm", "Waist": "80 cm", "Hip": "104 cm", "Len.": "165 cm", "Sleeve": "60 cm" },
        pieces: [
            { id: "ka1", name: "Front Panel", shape: "front_bodice", dims: "45×170 cm", qty: 2, notes: ["Cut 2 mirror", "Deep V or scoop neck", "CF open to hem"], instructions: ["Apply sfifa braid entirely down CF edge", "Attach aakad buttons"] },
            { id: "ka2", name: "Back Panel", shape: "back_bodice", dims: "90×170 cm", qty: 1, notes: ["Cut 1 on fold", "Add godet slit at CB if needed"], instructions: ["Sew shoulder seams to front", "Sew side seams"] },
            { id: "ka3", name: "Bell Sleeve", shape: "sleeve", dims: "40×65 cm", qty: 2, notes: ["Cut 2", "Widens significantly at cuff"], instructions: ["Apply sfifa to cuff", "Set sleeve into armhole"] },
            { id: "ka4", name: "Side Godet", shape: "side_panel", dims: "30×80 cm", qty: 2, notes: ["Cut 2", "For extra hem sweep"], instructions: ["Insert into lower side seams"] },
            { id: "ka5", name: "Belt (Mdamma)", shape: "waistband", dims: "90×12 cm", qty: 1, notes: ["Cut 1", "Use stiff buckram inner"], instructions: ["Cover with fabric", "Embroider heavily", "Attach hooks"] }
        ]
    },
    {
        id: 9, name: "Isiagu Tunic", category: "Isiagu", region: "West Africa", origin: "Igbo",
        difficulty: "Intermediate", fabric: "Velvet Isiagu Print", tags: ["chieftaincy", "traditional", "lion-head"], african: true,
        garmentType: "isiagu", accent: "#9B1B30", bg: "#060208",
        desc: "A pullover shirt often made of velvet patterned with lion heads, featuring a breast pocket, gold buttons linked by chains, and a mandarin collar.",
        measurements: { "Chest": "105–115 cm", "Len.": "85 cm", "Sleeve": "63 cm", "Cross-Back": "46 cm" },
        pieces: [
            { id: "is1", name: "Tunic Front", shape: "front_bodice", dims: "60×90 cm", qty: 1, notes: ["Cut 1 on fold", "Match lion heads at CF fold"], instructions: ["Cut CF slit for placket", "Attach breast pocket matching print"] },
            { id: "is2", name: "Tunic Back", shape: "back_bodice", dims: "60×90 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Join shoulders to front"] },
            { id: "is3", name: "Front Placket", shape: "placket", dims: "10×35 cm", qty: 2, notes: ["Cut 2", "Heavy interfacing"], instructions: ["Attach to CF slit", "Add gold chain buttons"] },
            { id: "is4", name: "Mandarin Collar", shape: "collar", dims: "45×6 cm", qty: 2, notes: ["Cut 2", "Shape curves gently"], instructions: ["Sew and turn", "Attach to neckline"] },
            { id: "is5", name: "Long Sleeve", shape: "sleeve", dims: "45×68 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew into armhole", "Finish with hem or cuff"] },
            { id: "is6", name: "Breast Pocket", shape: "pocket", dims: "14×16 cm", qty: 1, notes: ["Cut 1", "Must pattern-match to front body perfectly"], instructions: ["Fold top edge", "Topstitch to left chest"] }
        ]
    },
    {
        id: 10, name: "Ankara Matching Set", category: "Coordinates", region: "West Africa", origin: "Contemporary",
        difficulty: "Intermediate", fabric: "Ankara Wax Print", tags: ["casual", "vibrant", "two-piece"], african: true,
        garmentType: "wrapper", accent: "#2A7B5C", bg: "#020A06",
        desc: "A modern two-piece utilizing colorful wax prints, consisting of a tailored peplum blouse and a matching wrap skirt or trousers.",
        measurements: { "Bust": "92 cm", "Waist": "72 cm", "Hip": "98 cm", "Top Len.": "60 cm", "Skirt Len.": "105 cm" },
        pieces: [
            { id: "an1", name: "Peplum Front Bodice", shape: "front_bodice", dims: "30×45 cm", qty: 2, notes: ["Cut 2", "Center front seam or zipper"], instructions: ["Sew princess darts", "Line bodice"] },
            { id: "an2", name: "Peplum Side Front", shape: "side_panel", dims: "20×45 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Attach to front bodice"] },
            { id: "an3", name: "Peplum Back Bodice", shape: "back_bodice", dims: "30×45 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Sew back darts", "Join to front at sides"] },
            { id: "an4", name: "Peplum Circle Flare", shape: "skirt_panel", dims: "80×80 cm", qty: 1, notes: ["Cut 1 full circle or 2 half circles"], instructions: ["Hem outer edge first", "Attach inner circle to bodice waist"] },
            { id: "an5", name: "Wrap Skirt Panel", shape: "wrapper_panel", dims: "140×110 cm", qty: 1, notes: ["Cut 1 wide rectangle", "Wrap style"], instructions: ["Create angled wrap at one end", "Hem entire perimeter"] },
            { id: "an6", name: "Skirt Waistband", shape: "waistband", dims: "200×8 cm", qty: 1, notes: ["Cut 1 long tie"], instructions: ["Attach to skirt top edge", "Leave long ends for tying around waist"] }
        ]
    },
    {
        id: 11, name: "Classic A-Line Dress", category: "Dresses", region: "International", origin: "Global",
        difficulty: "Beginner", fabric: "Cotton / Rayon", tags: ["everyday", "simple", "fitted"], african: false,
        garmentType: "adress", accent: "#4A5A7A", bg: "#040608",
        desc: "A simple, timeless A-Line dress fitted at the bodice and softly flared at the hem, suitable for endless modifications.",
        measurements: { "Bust": "90 cm", "Waist": "70 cm", "Hip": "98 cm", "Len.": "95 cm" },
        pieces: [
            { id: "al1", name: "Dress Front", shape: "front_bodice", dims: "65×100 cm", qty: 1, notes: ["Cut 1 on fold", "Mark bust and waist darts"], instructions: ["Sew bust darts", "Sew front waist darts", "Press darts downwards and towards center"] },
            { id: "al2", name: "Dress Back", shape: "back_bodice", dims: "35×100 cm", qty: 2, notes: ["Cut 2", "CB seam for zipper"], instructions: ["Sew back waist darts", "Insert 50cm invisible zipper at CB"] },
            { id: "al3", name: "Front Neck Facing", shape: "front_facing", dims: "30×15 cm", qty: 1, notes: ["Cut 1 on fold", "Interface"], instructions: ["Attach and understitch to front neckline"] },
            { id: "al4", name: "Back Neck Facing", shape: "back_facing", dims: "18×15 cm", qty: 2, notes: ["Cut 2", "Interface"], instructions: ["Join to front facing at shoulder", "Attach to back neckline"] }
        ]
    },
    {
        id: 12, name: "Tailored Blazer", category: "Jackets", region: "International", origin: "Global",
        difficulty: "Expert", fabric: "Wool / Tweed", tags: ["tailoring", "formal", "structured"], african: false,
        garmentType: "blazer", accent: "#8A6B4E", bg: "#080604",
        desc: "A highly complex tailored jacket featuring notched lapels, two-piece sleeves, welt pockets, and full lining.",
        measurements: { "Chest": "96 cm", "Waist": "84 cm", "Len.": "74 cm", "Shoulder": "44 cm", "Sleeve": "64 cm" },
        pieces: [
            { id: "bl1", name: "Jacket Front", shape: "front_bodice", dims: "40×80 cm", qty: 2, notes: ["Cut 2 mirror", "Apply hair canvas/fusible interfacing entirely", "Mark roll line"], instructions: ["Pad stitch lapel", "Create front darts", "Cut welt pocket slit"] },
            { id: "bl2", name: "Side Panel", shape: "side_panel", dims: "25×75 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Join to front panel", "Join to back panel"] },
            { id: "bl3", name: "Jacket Back", shape: "back_bodice", dims: "35×80 cm", qty: 2, notes: ["Cut 2 mirror", "CB seam with vent allowance"], instructions: ["Sew CB seam", "Construct back vent"] },
            { id: "bl4", name: "Front Facing", shape: "lapel_facing", dims: "20×80 cm", qty: 2, notes: ["Cut 2 mirror", "Interface fully as this forms the lapel top"], instructions: ["Sew to front jacket edge along lapel and CF", "Turn and press impeccably"] },
            { id: "bl5", name: "Top Collar", shape: "top_collar", dims: "45×10 cm", qty: 1, notes: ["Cut 1 on fold", "Fabric cut slightly larger (2mm) than undercollar to hide seam"], instructions: ["Attach to front facings"] },
            { id: "bl6", name: "Undercollar", shape: "undercollar", dims: "25×10 cm", qty: 2, notes: ["Cut 2 on bias", "Cut from melton wool", "CB seam"], instructions: ["Sew CB seam", "Attach to jacket neckline", "Join to top collar"] },
            { id: "bl7", name: "Upper Sleeve", shape: "upper_sleeve", dims: "35×70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Ease sleeve cap heavily", "Join inseam to under sleeve"] },
            { id: "bl8", name: "Under Sleeve", shape: "under_sleeve", dims: "20×70 cm", qty: 2, notes: ["Cut 2 mirror"], instructions: ["Join outseam to upper sleeve", "Construct sleeve vent with buttons"] },
            { id: "bl9", name: "Welt Pocket Flap", shape: "pocket_flap", dims: "18×8 cm", qty: 4, notes: ["Cut 4", "Interface 2"], instructions: ["Sew, turn, and press", "Base into pocket opening"] },
            { id: "bl10", name: "Pocket Bag", shape: "pocket_bag", dims: "20×25 cm", qty: 4, notes: ["Cut 4 from lining"], instructions: ["Attach to welt seams inside", "Sew bag closed"] },
            { id: "bl11", name: "Breast Welt", shape: "pocket_welt", dims: "15×6 cm", qty: 1, notes: ["Cut 1", "Cut on slight bias for effect"], instructions: ["Fold and press", "Construct welt opening on left chest"] }
        ]
    },
    {
        id: 13, name: "Wide-Leg Trousers", category: "Trousers", region: "International", origin: "Global",
        difficulty: "Advanced", fabric: "Gabardine / Twill", tags: ["tailoring", "bottoms", "pleated"], african: false,
        garmentType: "trousers", accent: "#7A3B46", bg: "#0A0205",
        desc: "High-waisted tailored trousers featuring deep front pleats, slant pockets, a zippered fly shield, and wide hems.",
        measurements: { "Waist": "76 cm", "Hip": "102 cm", "Outseam": "112 cm", "Inseam": "82 cm" },
        pieces: [
            { id: "tr1", name: "Trouser Front", shape: "trouser_front", dims: "45×120 cm", qty: 2, notes: ["Cut 2 mirror", "Mark crease lines firmly", "Mark pleat lines"], instructions: ["Fold and baste pleats", "Sew front darts if applicable"] },
            { id: "tr2", name: "Trouser Back", shape: "trouser_back", dims: "50×120 cm", qty: 2, notes: ["Cut 2 mirror", "Mark back darts and welt pocket placement"], instructions: ["Sew back waist darts", "Construct back welt pocket"] },
            { id: "tr3", name: "Curved Waistband", shape: "waistband", dims: "90×10 cm", qty: 2, notes: ["Cut 2", "Use ban-roll or stiff interfacing"], instructions: ["Attach to waist after fly is constructed", "Add belt loops"] },
            { id: "tr4", name: "Fly Shield", shape: "fly_shield", dims: "10×25 cm", qty: 1, notes: ["Cut 1 out of fashion fabric", "Fold in half"], instructions: ["Sew to left front crotch curve", "Attach zipper tape"] },
            { id: "tr5", name: "Fly Facing", shape: "fly_shield", dims: "8×25 cm", qty: 1, notes: ["Cut 1", "Interface fully"], instructions: ["Attach to right front crotch", "Topstitch J-curve"] },
            { id: "tr6", name: "Front Pocket Bag", shape: "pocket_bag", dims: "25×35 cm", qty: 4, notes: ["Cut 4 from pocketing"], instructions: ["Attach to slant pocket opening", "Understitch", "Sew bag closed"] },
            { id: "tr7", name: "Back Yoke (Optional)", shape: "yoke_back", dims: "45×15 cm", qty: 2, notes: ["Cut 2 mirror if modifying back for jeans-style"], instructions: ["Join to back leg", "Topstitch seam"] }
        ]
    },
    {
        id: 14, name: "Puff Sleeve Blouse", category: "Tops", region: "International", origin: "Global",
        difficulty: "Intermediate", fabric: "Organza / Poplin", tags: ["feminine", "statement", "blouse"], african: false,
        garmentType: "pblouse", accent: "#3B7A68", bg: "#020A06",
        desc: "A romantic button-down blouse dominated by extreme voluminous puff sleeves gathered tightly at the shoulder and cuff.",
        measurements: { "Bust": "94 cm", "Waist": "76 cm", "Top Len.": "60 cm", "Bicep": "Volume +30 cm" },
        pieces: [
            { id: "pb1", name: "Blouse Front", shape: "front_bodice", dims: "35×65 cm", qty: 2, notes: ["Cut 2 logitudinal", "Add 3cm for button placket fold"], instructions: ["Fold CF placket twice and topstitch", "Sew bust darts"] },
            { id: "pb2", name: "Blouse Back", shape: "back_bodice", dims: "60×65 cm", qty: 1, notes: ["Cut 1 on fold"], instructions: ["Sew shoulder and side seams to front"] },
            { id: "pb3", name: "Exaggerated Sleeve", shape: "buba_sleeve", dims: "70×60 cm", qty: 2, notes: ["Cut 2", "Extremely wide sleeve cap", "Notch heavily for gathering"], instructions: ["Run 2 rows of gathering stitches at cap", "Gather to fit armscye exactly"] },
            { id: "pb4", name: "Fitted Cuff", shape: "sleeve_cuff", dims: "25×15 cm", qty: 2, notes: ["Cut 2", "Heavy interface"], instructions: ["Gather sleeve hem into cuff", "Attach buttons"] },
            { id: "pb5", name: "Flat Collar", shape: "collar", dims: "45×12 cm", qty: 2, notes: ["Cut 2", "Peter pan or pointed style"], instructions: ["Sew, clip curves, turn and press", "Baste to neckline", "Finish with bias tape"] }
        ]
    }
];

const CATS = ["All", "Agbada", "Senator", "Dashiki", "Boubou", "Kente", "Adire", "Gele Set", "Kaftan", "Isiagu", "Wrapper Set", "Dresses", "Jackets", "Trousers", "Tops", "Coordinates"] as const;
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
