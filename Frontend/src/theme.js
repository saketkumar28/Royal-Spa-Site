// src/theme.js — single source of truth for design tokens
// ─────────────────────────────────────────────────────────
// THEME UPDATE: Switched from dark (near-black) to warm ivory/cream
// for maximum readability while preserving the gold logo identity.
// Gold values are 100% unchanged — all buttons, borders, icons stay identical.
// ─────────────────────────────────────────────────────────

// ── GOLD (logo identity — DO NOT CHANGE) ──────────────────
export const GOLD = "#C9A84C";
export const GOLD_LIGHT = "#E8C97A";
export const GOLD_DARK = "#8B6914";

// ── BACKGROUNDS (was near-black, now warm ivory) ───────────
export const BLACK = "#FAF6EF"; // was #0A0A0A  → page base background
export const SURFACE = "#F2EBD9"; // was #111111  → cards, nav, elevated surfaces
export const SURFACE2 = "#EAE0CA"; // was #1A1A1A  → input fields, deep cards
export const SURFACE3 = "#E0D3B8"; // was #222222  → borders, subtle dividers

// ── TEXT (was off-white, now warm deep ink) ────────────────
export const WHITE = "#2A1E0F"; // was #F5F0E8  → primary text (renamed for compat)
export const MUTED = "#7A6A55"; // was #9A9080  → secondary / placeholder text

// ── DARK ACCENT (for footer, testimonials, marquee bands) ──
export const INK = "#1E1408"; // deep warm ink — replaces pure black sections
export const INK_LIGHT = "#2E2010"; // slightly lighter variant for dark cards

// ── SEMANTIC COLOURS (unchanged) ──────────────────────────
export const SUCCESS = "#3A9E6A";
export const WARNING = "#D4900A";
export const DANGER = "#D44040";
export const INFO = "#3A80C9";

// ── FONTS (unchanged) ─────────────────────────────────────
export const FONTS = {
  serif: "'Cormorant Garamond', serif",
  sans: "'Jost', sans-serif",
};

// ── GLOBAL CSS ────────────────────────────────────────────
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: #FAF6EF;
    color: #2A1E0F;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }

  a { text-decoration: none; color: inherit; }
  img { display: block; max-width: 100%; }
  button { cursor: pointer; font-family: 'Jost', sans-serif; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #FAF6EF; }
  ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

  /* ── Animations (unchanged) ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .fade-up { animation: fadeUp 0.9s ease forwards; }
  .fade-in { animation: fadeIn 0.8s ease forwards; }

  /* ── Gold shimmer text (unchanged) ── */
  .gold-text {
    background: linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A, #C9A84C);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* ── Section label ── */
  .section-label {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #8B6914;
    font-weight: 400;
    display: block;
    margin-bottom: 14px;
  }

  /* ── Buttons (gold identity fully preserved) ── */
  .btn-gold {
    background: transparent;
    border: 1px solid #C9A84C;
    color: #8B6914;
    padding: 14px 40px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
    z-index: 0;
  }
  .btn-gold::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #C9A84C;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: -1;
  }
  .btn-gold:hover { color: #FAF6EF; }
  .btn-gold:hover::before { transform: scaleX(1); }

  .btn-solid {
    background: #C9A84C;
    border: 1px solid #C9A84C;
    color: #FAF6EF;
    padding: 14px 40px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: all 0.3s;
  }
  .btn-solid:hover { background: #E8C97A; border-color: #E8C97A; color: #2A1E0F; }

  /* ── Card hover ── */
  .card-hover { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(139,105,20,0.10);
  }

  /* ── Nav links ── */
  .nav-link {
    color: #7A6A55;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s;
    cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { color: #8B6914; }

  /* ── Page hero ── */
  .page-hero {
    min-height: 55vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 140px 40px 80px;
    position: relative;
    background: radial-gradient(
      ellipse at 50% 60%,
      rgba(201,168,76,0.07) 0%,
      transparent 65%
    ), #FAF6EF;
  }

  /* ── Sections ── */
  .section    { padding: 100px 60px; }
  .section-sm { padding: 60px 60px; }
  .container  { max-width: 1200px; margin: 0 auto; }

  /* ── Form inputs ── */
  input, textarea, select {
    background: #FFFFFF;
    border: 1px solid rgba(201,168,76,0.30);
    color: #2A1E0F;
    padding: 14px 18px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    width: 100%;
    outline: none;
    transition: border-color 0.3s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: #C9A84C;
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
  }
  input::placeholder, textarea::placeholder { color: #7A6A55; }
  select option { background: #FFFFFF; color: #2A1E0F; }

  /* ── Dark band utility (footer / testimonials / marquee) ── */
  .dark-band {
    background: #1E1408;
    color: #EAD9B8;
  }
  .dark-band .section-label { color: #C9A84C; }
  .dark-band .nav-link { color: rgba(234,217,184,0.55); }
  .dark-band .nav-link:hover { color: #C9A84C; }

  /* ── Divider ornament ── */
  .gold-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 auto;
    width: fit-content;
  }
  .gold-divider::before,
  .gold-divider::after {
    content: '';
    width: 60px;
    height: 1px;
    background: #C9A84C;
    opacity: 0.45;
  }
  .gold-diamond {
    width: 8px;
    height: 8px;
    background: #C9A84C;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .section    { padding: 70px 24px !important; }
    .section-sm { padding: 40px 24px !important; }
    .hide-mobile { display: none !important; }

    div[style*="repeat(4, 1fr)"] {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-template-rows: auto !important;
    }
    div[style*="repeat(4, 1fr)"] > div {
      grid-column: span 1 !important;
      height: 180px !important;
    }

    .page-hero { min-height: 42vh !important; padding: 120px 24px 60px !important; }
  }

  @media (max-width: 600px) {
    .section { padding: 56px 18px !important; }

    .rh-bar svg { width: 80px !important; height: auto !important; }
    section svg[width="320"] { width: 240px !important; height: auto !important; }

    div[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
    }
    div[style*="minmax("] {
      grid-template-columns: 1fr !important;
    }

    h1[style*="clamp"] { word-break: break-word; }

    div[style*="grid-template-columns: 1fr 1fr"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="1fr 1.6fr"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="bottom: -2"] {
      position: static !important;
      margin-top: 16px !important;
    }
    div[style*="repeat(4, 1fr)"] {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-auto-rows: 160px !important;
    }
    div[style*="justifyContent: center"][style*="flexWrap: wrap"] button {
      padding: 8px 14px !important;
      font-size: 10px !important;
    }
  }
`;
