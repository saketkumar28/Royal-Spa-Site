// src/pages/JournalPage.jsx
import { useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { GOLD, WHITE, MUTED, SURFACE, SURFACE2, BLACK } from "../theme.js";

const POSTS = [
  {
    id: 1,
    tag: "Skincare",
    date: "March 20, 2026",
    readTime: "5 min read",
    title: "The Ancient Art of 24K Gold Facial Therapy",
    excerpt:
      "Gold has been revered for its beautifying properties since Cleopatra's era. Modern science now confirms what ancient cultures knew intuitively — gold nanoparticles penetrate deeply, stimulating collagen and reducing inflammation.",
    body: `Gold has been revered for thousands of years, from the gilded treatments of Cleopatra to the royal rituals of ancient Japan. At The Royal, our 24K Gold Facial is not a gimmick — it is science meeting luxury.

Gold nanoparticles, when applied to the skin, penetrate the dermal layer and trigger a cascade of cellular responses. Collagen synthesis increases. Inflammation decreases. Cell turnover accelerates. The result? Skin that is visibly firmer, more radiant, and deeply nourished.

Our treatment begins with a thorough double cleanse followed by a gentle enzyme exfoliation. A gold-infused massage serum is then applied and worked deep into the tissue using our proprietary kneading technique. The 24K gold masque is left on for 20 minutes while you rest under warm towels infused with calming chamomile.

LED light therapy follows — red light to stimulate collagen, near-infrared to reduce inflammation. The final step is our signature diamond-dust moisturiser, which polishes skin to a literal glow.

Regular monthly treatments over six months produce measurable improvements in skin elasticity, hydration, and overall luminosity. Many of our clients report that strangers have asked if they've "had something done" — the answer is simply: gold.`,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
  },
  {
    id: 2,
    tag: "Wellness",
    date: "March 14, 2026",
    readTime: "7 min read",
    title: "Ayurvedic Rituals for Modern Stress Relief",
    excerpt:
      "The ancient wisdom of Ayurveda offers profound tools for navigating the chaos of contemporary life. From daily abhyanga to herbal steam therapy, these practices have survived millennia for a reason.",
    body: `In Sanskrit, Ayurveda translates as 'the science of life.' Developed over 5,000 years in the Indian subcontinent, it remains one of the world's most comprehensive systems of holistic health — and it has never been more relevant.

Modern stress manifests in the body as accumulated 'ama' — toxins that impair circulation, cloud the mind, and dull the skin. Ayurveda's approach is not to suppress symptoms but to restore the body's innate intelligence.

Abhyanga — daily warm oil self-massage — is the cornerstone of Ayurvedic self-care. When performed with sesame oil (warming) or coconut oil (cooling), it nourishes the nervous system, supports lymphatic drainage, and creates a profound sense of groundedness. At The Royal, our therapists adapt the technique to your dosha — your unique constitution.

Shirodhara — the gentle, continuous pouring of warm oil over the forehead — is among the most deeply relaxing experiences known to Ayurvedic medicine. It stills the sympathetic nervous system and induces a state akin to deep meditation within minutes.

Swedana, or herbal steam therapy, follows many of our treatments. A custom herbal blend — chosen for your constitution — infuses the steam, opening pores, relaxing muscles, and aiding the release of ama.

The beauty of Ayurveda is that its wisdom extends beyond the treatment room. We offer wellness consultations where our practitioner Sunita Prasad helps you understand your dosha and build simple daily rituals for lasting wellbeing.`,
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  },
  {
    id: 3,
    tag: "Beauty",
    date: "March 7, 2026",
    readTime: "6 min read",
    title: "Pre-Bridal Skin Prep: The 30-Day Royal Ritual",
    excerpt:
      "Your wedding day deserves radiant skin. Our expert aestheticians reveal the month-long regimen that has transformed hundreds of brides — and the mistakes most brides make in the week before the big day.",
    body: `We have prepared over 600 brides at The Royal, and in our experience, the most common mistake is starting too late. Great bridal skin requires at minimum 30 days of dedicated preparation — ideally 90. Here is our tried-and-tested 30-day programme.

**Days 1–7: Deep Cleanse & Assessment**
The journey begins with a consultation with our bridal aesthetician. We assess your skin type, identify concerns (pigmentation, dehydration, congestion, sensitivity), and begin a deep cleanse programme. Our Hydra Glow Facial in week one removes accumulated buildup and resets the skin barrier.

**Days 8–14: Targeted Treatment**
Based on your concerns, we deploy targeted protocols. Pigmentation responds to our Vitamin C brightening peel. Congestion clears with our enzyme + salicylic treatment. Dehydration is addressed with intensive hyaluronic infusion therapy.

**Days 15–21: Gold & Glow**
This is where the magic happens. Two Royal Signature Gold Facials in this window — spaced 5 days apart — flood the skin with collagen-stimulating gold and peptides. Most brides see visible transformation in this phase.

**Days 22–28: Lock In the Glow**
We focus on maintaining and enhancing results. LED light therapy twice in this week. Lymphatic facial massage to reduce puffiness. Final hair masque treatment.

**Days 29–30: The Final Touch**
A gentle brightening masque, brow grooming, lash tinting, and a full body polish. No new treatments — only what your skin already knows and loves.

**The One Rule:** Nothing new in the 7 days before your wedding. No new products, no new treatments, no experimenting. Your skin should be in a perfectly calibrated state of calm radiance.`,
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
  },
  {
    id: 4,
    tag: "Hair",
    date: "February 28, 2026",
    readTime: "4 min read",
    title: "Keratin vs Smoothing: What's Right for Your Hair?",
    excerpt:
      "The hair smoothing market is crowded and confusing. We break down the real differences between Brazilian keratin, Japanese straightening, and our signature Royal Smoothing System.",
    body: `Not all smoothing treatments are created equal. Here is an honest breakdown from our hair specialists.

Brazilian Keratin (BKT) deposits a coating of keratin protein around the hair shaft, sealing the cuticle and eliminating frizz. It works with your natural hair pattern — wavy hair becomes smoother waves, curly hair becomes looser curls. Results last 3–5 months and it is semi-permanent.

Japanese Straightening (also called thermal reconditioning) chemically alters the hair's internal bonds, permanently straightening it. The results are dramatic but the commitment is total — as your hair grows, you'll see the line between treated and untreated hair. Requires very careful maintenance.

Our Royal Smoothing System is a formaldehyde-free, protein-rich treatment that dramatically reduces frizz and drying time without harsh chemicals. It is ideal for colour-treated hair, sensitive scalps, or those who want smooth hair without committing to permanent straightening.

Which is right for you? It depends on your hair texture, your lifestyle, and your goals. We always recommend a consultation before any chemical service — our specialists will assess your hair under magnification, discuss your expectations, and recommend the safest, most effective option for your specific situation.`,
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  },
  {
    id: 5,
    tag: "Wellness",
    date: "February 20, 2026",
    readTime: "5 min read",
    title: "The Science of Massage: Why Your Body Needs It Monthly",
    excerpt:
      "Most people see massage as a treat. Science suggests it should be a non-negotiable part of your healthcare routine. Here's what happens to your body during and after a professional therapeutic massage.",
    body: `Within the first 10 minutes of massage, your body begins to shift from a state of sympathetic activation (fight-or-flight) to parasympathetic dominance (rest-and-digest). Cortisol levels drop. Serotonin and dopamine increase. Your heart rate slows.

This isn't relaxation as a side effect — it is a clinically measurable physiological shift with lasting consequences. Studies published in the Journal of Alternative and Complementary Medicine have shown that a single 45-minute massage session can reduce cortisol by up to 31% and increase serotonin by 28%.

Regular massage — defined as monthly or more frequent — produces cumulative benefits. Chronic muscle tension, which causes the postural imbalances and pain patterns most of us experience, requires consistent treatment to address. A single session provides relief; monthly sessions over six months can correct long-standing dysfunction.

For our clients who sit at desks for long hours, we particularly recommend alternating between our Aromatherapy Massage (for nervous system reset) and our Deep Tissue Massage (for targeted structural work). The two work synergistically — deep tissue work goes deeper when the nervous system is already in a relaxed state.

Think of monthly massage not as a luxury, but as maintenance for your most important machine.`,
    img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
  },
  {
    id: 6,
    tag: "Skincare",
    date: "February 10, 2026",
    readTime: "4 min read",
    title: "Understanding Your Skin Type: A Guide to Reading Your Skin",
    excerpt:
      "Most people are using the wrong products for their actual skin type. The mismatch between perceived type and actual type is the single most common cause of skincare frustration.",
    body: `Here is a simple truth: most people are using the wrong skincare for their skin type. And in many cases, their products are actively making their skin worse.

The most common mismatch we see: oily skin being treated with harsh, stripping cleansers and heavy mattifying products. The skin — now stripped of its natural oils — compensates by producing even more sebum. The result: breakouts, enlarged pores, and perpetually oily skin. The solution is almost always the opposite of what the person is doing: lighter, gentler, more hydrating.

True oily skin needs hydration — just in the right form. Gel-based moisturisers with hyaluronic acid, niacinamide toners, and gentle enzyme exfoliants are often the missing pieces.

Combination skin — the most common skin type — is frequently misidentified as oily. The T-zone (forehead, nose, chin) may be oily while cheeks are normal or even dry. A unified approach rarely works; instead, treat each zone according to its needs.

Dry skin craves oil-based hydration: ceramide-rich creams, facial oils (rosehip, jojoba), and gentle milk or cream cleansers that don't strip the skin's natural lipid barrier.

Sensitive skin requires a minimal approach. Fewer ingredients, fragrance-free formulas, and the patience to introduce one product at a time.

At The Royal, every facial begins with a thorough skin analysis. Understanding your skin is the foundation of everything we do — because great results begin with accurate diagnosis.`,
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
];

export default function JournalPage() {
  const [activePost, setActivePost] = useState(null);
  const [activeCat, setActiveCat] = useState("All");

  const cats = ["All", ...new Set(POSTS.map((p) => p.tag))];
  const filtered =
    activeCat === "All" ? POSTS : POSTS.filter((p) => p.tag === activeCat);

  if (activePost) {
    return (
      <>
        <Header />
        <article
          style={{
            paddingTop: 120,
            maxWidth: 780,
            margin: "0 auto",
            padding: "120px 40px 80px",
          }}
        >
          <button
            onClick={() => setActivePost(null)}
            style={{
              background: "none",
              border: "none",
              color: GOLD,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 40,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ← Back to Journal
          </button>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {activePost.tag}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 300,
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {activePost.title}
          </h1>
          <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
            <span style={{ fontSize: 13, color: MUTED }}>
              {activePost.date}
            </span>
            <span style={{ color: MUTED }}>·</span>
            <span style={{ fontSize: 13, color: MUTED }}>
              {activePost.readTime}
            </span>
          </div>
          <img
            src={activePost.img}
            alt={activePost.title}
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              marginBottom: 48,
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          />
          <div
            style={{
              borderLeft: `2px solid ${GOLD}`,
              paddingLeft: 24,
              marginBottom: 40,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 21,
                fontStyle: "italic",
                color: WHITE,
                lineHeight: 1.7,
              }}
            >
              {activePost.excerpt}
            </p>
          </div>
          {activePost.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 16,
                color: MUTED,
                lineHeight: 1.95,
                marginBottom: 24,
                color: para.startsWith("**") ? WHITE : MUTED,
                fontWeight: para.startsWith("**") ? 500 : 300,
              }}
            >
              {para.replace(/\*\*/g, "")}
            </p>
          ))}
          <div
            style={{
              borderTop: "1px solid rgba(201,168,76,0.15)",
              paddingTop: 40,
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                color: WHITE,
              }}
            >
              Enjoyed this article?
            </p>
            <button onClick={() => setActivePost(null)} className="btn-gold">
              More from the Journal
            </button>
          </div>
        </article>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PageHero
        label="Wellness Journal"
        title="Insights &"
        highlight="Rituals"
        subtitle="Expert wisdom on beauty, wellness, and the art of self-care"
        bg="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
      />

      {/* Category filter */}
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
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              style={{
                background: activeCat === c ? GOLD : "transparent",
                border: `1px solid ${activeCat === c ? GOLD : "rgba(201,168,76,0.3)"}`,
                color: activeCat === c ? "#0A0A0A" : MUTED,
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

      {/* Featured post */}
      <section className="section" style={{ background: BLACK }}>
        <div className="container">
          {filtered[0] && (
            <div
              onClick={() => setActivePost(filtered[0])}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                border: "1px solid rgba(201,168,76,0.12)",
                cursor: "pointer",
                marginBottom: 40,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 440, overflow: "hidden" }}>
                <img
                  src={filtered[0].img}
                  alt={filtered[0].title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.04)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
              <div
                style={{
                  padding: "52px 48px",
                  background: SURFACE,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 4,
                    color: GOLD,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Featured · {filtered[0].tag}
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 3vw, 38px)",
                    fontWeight: 300,
                    color: WHITE,
                    lineHeight: 1.25,
                    marginBottom: 20,
                  }}
                >
                  {filtered[0].title}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: MUTED,
                    lineHeight: 1.8,
                    marginBottom: 32,
                  }}
                >
                  {filtered[0].excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: MUTED }}>
                    {filtered[0].date} · {filtered[0].readTime}
                  </span>
                  <span style={{ color: GOLD, fontSize: 13, letterSpacing: 1 }}>
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Rest of posts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {filtered.slice(1).map((p, i) => (
              <article
                key={p.id}
                onClick={() => setActivePost(p)}
                className="card-hover"
                style={{
                  background: SURFACE,
                  border: "1px solid rgba(201,168,76,0.1)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "28px 24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: 3,
                        color: GOLD,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.tag}
                    </span>
                    <span style={{ fontSize: 11, color: MUTED }}>
                      {p.readTime}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: WHITE,
                      lineHeight: 1.35,
                      marginBottom: 12,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: MUTED,
                      lineHeight: 1.8,
                      marginBottom: 20,
                    }}
                  >
                    {p.excerpt.substring(0, 120)}...
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 11, color: MUTED }}>{p.date}</span>
                    <span style={{ color: GOLD, fontSize: 12 }}>Read →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
