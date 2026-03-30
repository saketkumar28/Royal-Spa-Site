// src/pages/GalleryPage.jsx
import { useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { GOLD, WHITE, MUTED, SURFACE, BLACK } from "../theme.js";

const PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80",
    cat: "Treatments",
    caption: "Hot Stone Ritual",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    cat: "Treatments",
    caption: "Signature Facial",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    cat: "Ambience",
    caption: "Treatment Suite",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
    cat: "Treatments",
    caption: "Aromatherapy",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    cat: "Ambience",
    caption: "Relaxation Lounge",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
    cat: "Hair",
    caption: "Hair Spa Ritual",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
    cat: "Bridal",
    caption: "Bridal Transformation",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    cat: "Bridal",
    caption: "Bridal Glow",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
    cat: "Treatments",
    caption: "Body Wrap Ritual",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    cat: "Ambience",
    caption: "Gold Amenities",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80",
    cat: "Ambience",
    caption: "Entry Lobby",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80",
    cat: "Hair",
    caption: "Keratin Treatment",
  },
];

const CATS = ["All", "Treatments", "Ambience", "Hair", "Bridal"];

export default function GalleryPage() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = cat === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat);
  const idx = lightbox ? filtered.findIndex((p) => p.id === lightbox.id) : -1;

  const prev = () =>
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  const next = () => setLightbox(filtered[(idx + 1) % filtered.length]);

  return (
    <>
      <Header />

      <PageHero
        label="Visual Journey"
        title="Our Gallery"
        highlight="of Luxury"
        subtitle="A glimpse into the world of The Royal Salon & Spa"
        bg="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=80"
      />

      {/* Filter */}
      <section
        style={{
          padding: "36px 60px",
          background: SURFACE,
          position: "sticky",
          top: 76,
          zIndex: 50,
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                background: cat === c ? GOLD : "transparent",
                border: `1px solid ${cat === c ? GOLD : "rgba(201,168,76,0.3)"}`,
                color: cat === c ? "#0A0A0A" : MUTED,
                padding: "9px 24px",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="section" style={{ background: BLACK }}>
        <div className="container">
          <div
            style={{
              columns: "3 280px",
              columnGap: 12,
            }}
          >
            {filtered.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setLightbox(p)}
                style={{
                  breakInside: "avoid",
                  marginBottom: 12,
                  overflow: "hidden",
                  cursor: "zoom-in",
                  border: "1px solid rgba(201,168,76,0.08)",
                  position: "relative",
                  animation: `fadeIn ${0.3 + i * 0.05}s ease both`,
                }}
              >
                <img
                  src={p.url}
                  alt={p.caption}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.04)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)",
                    padding: "24px 16px 12px",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <p style={{ fontSize: 13, color: WHITE }}>{p.caption}</p>
                  <p
                    style={{
                      fontSize: 10,
                      color: GOLD,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {p.cat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.95)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              background: "none",
              border: "none",
              color: GOLD,
              fontSize: 26,
            }}
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            style={{
              position: "absolute",
              left: 24,
              background: "none",
              border: `1px solid rgba(201,168,76,0.4)`,
              color: GOLD,
              fontSize: 20,
              padding: "12px 18px",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "80vw", maxHeight: "85vh", textAlign: "center" }}
          >
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            />
            <div style={{ marginTop: 16 }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  color: WHITE,
                }}
              >
                {lightbox.caption}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: GOLD,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {lightbox.cat}
              </p>
            </div>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>
              {idx + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            style={{
              position: "absolute",
              right: 24,
              background: "none",
              border: `1px solid rgba(201,168,76,0.4)`,
              color: GOLD,
              fontSize: 20,
              padding: "12px 18px",
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* Instagram CTA */}
      <section
        style={{
          padding: "80px 40px",
          background: SURFACE,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 8 }}>
          Follow our journey on Instagram
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 36,
            color: WHITE,
            marginBottom: 28,
          }}
        >
          @TheRoyal<span className="gold-text">SalonSpa</span>
        </p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="btn-gold"
        >
          Follow on Instagram
        </a>
      </section>

      <Footer />
    </>
  );
}
