import React, { useState } from "react";
import "./index.css";
import type { StyleData } from "./types";
import { STYLES, CATS, REGIONS, LEVELS } from "./data";
import { PatternSVG } from "./components/PatternSVG";
import { G } from "./components/Garments";

export default function AtelierApp() {
  const [cat, setCat] = useState<string>("All");
  const [region, setRegion] = useState<string>("All Regions");
  const [level, setLevel] = useState<string>("All Levels");
  const [selected, setSelected] = useState<StyleData | null>(null);
  const [openPiece, setOpenPiece] = useState<string | null>(null);
  const [printOpen, setPrintOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("gallery");

  const filtered = STYLES.filter(s => {
    if (cat !== "All" && s.category !== cat) return false;
    if (region !== "All Regions" && s.region !== region) return false;
    if (level !== "All Levels" && s.difficulty !== level) return false;
    return true;
  });

  const GarmentCard = ({ style, size = 115 }: { style: StyleData, size?: number }) => {
    const Comp = G[style.garmentKey];
    if (!Comp) return null;
    return <Comp {...style.colors} sz={size} />;
  };

  return (
    <div>
      {/* kente accent */}
      <div className="kente-strip" />

      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#D4A017" strokeWidth="1.5" fill="none" />
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" stroke="#D4A017" strokeWidth="1" fill="rgba(212,160,23,0.15)" />
            <circle cx="14" cy="14" r="3" fill="#D4A017" opacity=".8" />
          </svg>
          <div>
            <span>Atelier<span> ✦ African</span></span>
            <span className="hdr-sub">Pattern Studio for Tailors</span>
          </div>
        </div>
        <nav className="hdr-nav">
          <button className={tab === "gallery" ? "on" : ""} onClick={() => setTab("gallery")}>Style Library</button>
          <button className={tab === "guide" ? "on" : ""} onClick={() => setTab("guide")}>Tailor's Guide</button>
        </nav>
      </header>

      {tab === "guide" ? (
        <div style={{ padding: "3rem 2.5rem", maxWidth: 720 }}>
          <p style={{ fontFamily: "DM Mono", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "1rem" }}>Workflow</p>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "2rem", color: "var(--ink)", marginBottom: "1.4rem", lineHeight: 1.15 }}>From Style to Cut Fabric</h2>
          {[
            ["01 — Browse", "Filter by category, region, or difficulty. The library covers West African, North African, and international styles."],
            ["02 — Inspect", "Click any style to see the full pattern breakdown — measurements, piece count, and 3D garment preview."],
            ["03 — Expand Pieces", "Each pattern piece shows the shape on a grid, grain lines, cutting notes, and sewing order."],
            ["04 — Print", "Hit 'Print Patterns' for a print-ready A4 sheet per piece, with seam allowances and labels — ready to trace and cut."],
          ].map(([t, d]) => (
            <div key={t} style={{ borderLeft: "2px solid var(--rust)", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "DM Mono", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "0.3rem" }}>{t}</div>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--ink)" }}>{d}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* HERO */}
          <section className="hero">
            <div className="hero-text">
              <p className="hero-eyebrow">✦ 14 Garment Styles · African & International</p>
              <h1 className="hero-h1">Every Stitch<br />Has a <em>Story.</em></h1>
              <p className="hero-p">From Grand Agbada to Moroccan Kaftan — a professional pattern library for tailors who create across the full spectrum of African and global fashion.</p>
              <div className="hero-btns">
                <button className="btn-gold" onClick={() => { const el = document.querySelector('.gallery'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Explore Library</button>
                <button className="btn-ghost" onClick={() => setTab("guide")}>How It Works</button>
              </div>
            </div>
            <div className="hero-grid">
              {[
                { k: "agbada", c: { c1: "#2D6A4F", c2: "#C14B1A", c3: "#D4A017" } },
                { k: "senator", c: { c1: "#1A3A5C", c2: "#D4A017", c3: "#F7F2E8" } },
                { k: "gele_iro", c: { c1: "#C14B1A", c2: "#D4A017", c3: "#1A3A5C" } },
                { k: "kaftan", c: { c1: "#5A1F1F", c2: "#D4A017", c3: "#C14B1A" } }
              ].map((item, i) => {
                const Comp = G[item.k];
                return (
                  <div key={i} className="hero-mini">
                    {Comp && <Comp {...item.c} sz={78} />}
                  </div>
                );
              })}
            </div>
          </section>

          {/* FILTERS */}
          <div className="fbar">
            <span className="flabel">Style</span>
            {CATS.map(c => (
              <button key={c} className={`fchip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>
            ))}
            <span className="flabel" style={{ marginLeft: "1rem" }}>Region</span>
            {REGIONS.map(r => (
              <button key={r} className={`fchip ${region === r ? "on" : ""}`} onClick={() => setRegion(r)}>{r}</button>
            ))}
            <span className="flabel" style={{ marginLeft: "1rem" }}>Level</span>
            {LEVELS.map(l => (
              <button key={l} className={`fchip ${level === l ? "on" : ""}`} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>

          {/* LAYOUT */}
          <div className="layout">
            {/* GALLERY */}
            <div className="gallery">
              {filtered.map((style, idx) => (
                <div
                  key={style.id}
                  className={`card ${selected?.id === style.id ? "sel" : ""}`}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                  onClick={() => { setSelected(style); setOpenPiece(null); }}
                >
                  <div className="card-3d">
                    <span className={`diff-badge ${style.difficulty}`}>{style.difficulty}</span>
                    <span className="region-badge">{style.origin}</span>
                    <div className="garment-3d">
                      <GarmentCard style={style} size={108} />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title">{style.name}</div>
                    <div className="card-meta">{style.category} · {style.fabric} · {style.pieces.length} pieces</div>
                    <div className="card-tags">
                      {style.tags.map(t => <span key={t} className={`tag ${style.african ? "africa" : ""}`}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1/-1", padding: "3rem", textAlign: "center", fontFamily: "DM Mono", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                  No styles match — try different filters
                </div>
              )}
            </div>

            {/* DETAIL PANEL */}
            <aside className="dpanel">
              {!selected ? (
                <div className="dp-empty">
                  <div className="dp-empty-icon">✂</div>
                  <p>Select a garment style<br />to see pattern breakdown<br />and printable pieces</p>
                </div>
              ) : (
                <>
                  {/* 3D PREVIEW */}
                  <div className="dp-preview">
                    <div className="dp-garment-lg">
                      <GarmentCard style={selected} size={155} />
                    </div>
                  </div>

                  {/* HEADER */}
                  <div className="dp-hdr">
                    <div className="dp-eyebrow">✦ {selected.region} · {selected.origin}</div>
                    <div className="dp-title">{selected.name}</div>
                    <div className="dp-desc">{selected.desc}</div>
                  </div>

                  {/* MEASUREMENTS */}
                  <div className="dp-section">
                    <div className="sec-title">Base Measurements</div>
                    <div className="meas-grid">
                      {Object.entries(selected.measurements).map(([k, v]) => (
                        <div key={k} className="meas-item">
                          <div className="meas-lbl">{k}</div>
                          <div className="meas-val">{v as React.ReactNode}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PIECES */}
                  <div className="dp-section">
                    <div className="sec-title">Pattern Pieces ({selected.pieces.length})</div>
                    <div className="pieces">
                      {selected.pieces.map((piece, idx) => (
                        <div key={piece.id} className={`piece ${openPiece === piece.id ? "open" : ""}`}>
                          <div className="piece-hdr" onClick={() => setOpenPiece(openPiece === piece.id ? null : piece.id)}>
                            <div className="piece-num">{idx + 1}</div>
                            <div>
                              <div className="piece-name">{piece.name}</div>
                              <div className="piece-dim">Qty {piece.qty} · {piece.dims}</div>
                            </div>
                            <button className={`piece-arr ${openPiece === piece.id ? "open" : ""}`}>▾</button>
                          </div>
                          <div className={`piece-body ${openPiece === piece.id ? "show" : ""}`}>
                            <div className="pat-box">
                              <div className="pat-grid" />
                              <PatternSVG shape={piece.shape} />
                            </div>
                            <div style={{ fontSize: "0.72rem", fontFamily: "DM Mono", color: "var(--muted)", textAlign: "center", marginBottom: "8px" }}>↔ 1.5cm seam allowance included</div>
                            <div className="note-lbl">Cutting Notes</div>
                            <ul className="cut-notes">{piece.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
                            <div className="sew-lbl">Sewing Order</div>
                            <ul className="sew-steps">{piece.instructions.map((n, i) => <li key={i}>{n}</li>)}</ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="dp-actions">
                    <button className="btn-act solid" onClick={() => setPrintOpen(true)}>⊡ Print Patterns</button>
                    <button className="btn-act" onClick={() => {
                      if (openPiece) setOpenPiece(null);
                      else setOpenPiece(selected.pieces[0]?.id);
                    }}>
                      {openPiece ? "Collapse" : "Expand First Piece"}
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        </>
      )}

      {/* PRINT MODAL */}
      {printOpen && selected && (
        <div className="pm-overlay" onClick={e => { if (e.target === e.currentTarget) setPrintOpen(false); }}>
          <div className="pm-box">
            <div className="pm-hdr">
              <div className="pm-title">Print Patterns — {selected.name}</div>
              <button className="pm-close" onClick={() => setPrintOpen(false)}>✕</button>
            </div>
            <div className="pm-body">
              <div style={{ fontFamily: "DM Mono", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.2rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                {selected.pieces.length} pattern pieces · {selected.origin} · Seam allowance 1.5–2cm included
              </div>
              {selected.pieces.map((piece, idx) => (
                <div key={piece.id} className="pm-sheet">
                  <div className="pm-sheet-lbl">Sheet {idx + 1} of {selected.pieces.length}</div>
                  <div className="pm-sheet-title">{piece.name} <span style={{ fontFamily: "DM Mono", fontSize: "0.68rem", color: "var(--muted)", fontWeight: 300 }}>— Cut {piece.qty}</span></div>
                  <div className="pm-inner">
                    <div className="pm-pat">
                      <div className="pm-grid" />
                      <PatternSVG shape={piece.shape} />
                    </div>
                    <div className="pm-meta">
                      <div className="pm-dim-lbl">Dimensions</div>
                      <div className="pm-dim-val">{piece.dims}</div>
                      <div className="pm-dim-lbl">Instructions</div>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {piece.notes.map((n, i) => (
                          <li key={i} style={{ fontFamily: "Cormorant Garamond", fontSize: "0.88rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.55, paddingLeft: "1rem", position: "relative", marginBottom: "2px" }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--rust)", fontSize: "0.65rem" }}>—</span>{n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pm-footer-row">
                    <span>ATELIER AFRICAN PATTERN STUDIO</span>
                    <span>{selected.name} · {piece.name}</span>
                    <span>Sheet {idx + 1}/{selected.pieces.length}</span>
                  </div>
                </div>
              ))}
              <div className="pm-actions">
                <button className="btn-act" onClick={() => setPrintOpen(false)}>Close</button>
                <button className="btn-act solid" onClick={() => window.print()}>⊡ Print / Save PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
