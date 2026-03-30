// src/theme.js — single source of truth for design tokens

export const GOLD       = "#C9A84C";
export const GOLD_LIGHT = "#E8C97A";
export const GOLD_DARK  = "#8B6914";
export const BLACK      = "#0A0A0A";
export const SURFACE    = "#111111";
export const SURFACE2   = "#1A1A1A";
export const SURFACE3   = "#222222";
export const WHITE      = "#F5F0E8";
export const MUTED      = "#9A9080";
export const SUCCESS    = "#4CAF7D";
export const WARNING    = "#E8A020";
export const DANGER     = "#E05050";
export const INFO       = "#4A90D9";

export const FONTS = {
  serif: "'Cormorant Garamond', serif",
  sans:  "'Jost', sans-serif",
};

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #0A0A0A;
    color: #F5F0E8;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  img { display: block; max-width: 100%; }
  button { cursor: pointer; font-family: 'Jost', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #8B6914; border-radius: 2px; }

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

  .gold-text {
    background: linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A, #C9A84C);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .btn-gold {
    background: transparent;
    border: 1px solid #C9A84C;
    color: #C9A84C;
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
  .btn-gold:hover { color: #0A0A0A; }
  .btn-gold:hover::before { transform: scaleX(1); }

  .btn-solid {
    background: #C9A84C;
    border: 1px solid #C9A84C;
    color: #0A0A0A;
    padding: 14px 40px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: all 0.3s;
  }
  .btn-solid:hover { background: #E8C97A; border-color: #E8C97A; }

  .card-hover { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(201,168,76,0.12);
  }

  .nav-link {
    color: #9A9080;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s;
    cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { color: #C9A84C; }

  .page-hero {
    min-height: 55vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 140px 40px 80px;
    position: relative;
  }

  .section { padding: 100px 60px; }
  .section-sm { padding: 60px 60px; }
  .container { max-width: 1200px; margin: 0 auto; }

  input, textarea, select {
    background: #1A1A1A;
    border: 1px solid rgba(201,168,76,0.25);
    color: #F5F0E8;
    padding: 14px 18px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    width: 100%;
    outline: none;
    transition: border-color 0.3s;
  }
  input:focus, textarea:focus, select:focus { border-color: #C9A84C; }
  input::placeholder, textarea::placeholder { color: #9A9080; }
  select option { background: #1A1A1A; }

  @media (max-width: 900px) {
    .section { padding: 70px 28px; }
    .section-sm { padding: 40px 28px; }
    .hide-mobile { display: none !important; }
  }
  @media (max-width: 600px) {
    .section { padding: 60px 20px; }
    .grid-2, .grid-3 { grid-template-columns: 1fr !important; }
  }
`;
