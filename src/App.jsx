import { useState, useEffect } from "react";

/* ─── Logo base64 ─── */
const LOGO_SRC = "data:image/png;base64,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";

/* ─── Images ─── */
const IMG = {
  heroBefore:  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  heroAfter:   "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  removebg:    "/tool-removebg.png",
  eraser:      "/tool-eraser.png",
  restyle:     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=512",
  retouch:     "/tool-retouch.png",
  upscale:     "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=512",
  textimg:     "/tool-textimg.png",
  fusion:      "/tool-fusion.png",
  interior:    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1024",
  portrait:    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=512",
  room:        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=512",
  face:        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=512",
  villa:       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=512",
};

/* ─── Icons ─── */
const Sparkle = ({ s = 16, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>);
const ChevDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>;
const Play = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ChevLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const CrossIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CreditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const ImageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const LogoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

function Img({ src, alt, style, ...rest }) {
  const [err, setErr] = useState(false);
  if (err) return (<div style={{ ...style, background: "linear-gradient(135deg, #f3f0ff, #fce7f3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", fontSize: 11, fontWeight: 500, textAlign: "center", padding: 8 }}>{alt}</div>);
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} {...rest} />;
}

/* ═══ NAVBAR ═══ */
function Navbar({ navigate, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 clamp(16px, 4vw, 48px)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)", backdropFilter: "blur(20px) saturate(1.3)", borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent", transition: "all 0.4s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("home")}><img src={LOGO_SRC} alt="Retouch" style={{ height: 32, width: "auto", objectFit: "contain" }} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <a onClick={() => navigate("pricing")} className="nav-link" style={{ cursor: "pointer" }}>Tarifs</a>
        {user ? (<><a onClick={() => navigate("dashboard")} className="nav-link" style={{ cursor: "pointer" }}>Dashboard</a><a onClick={onLogout} className="nav-link" style={{ cursor: "pointer" }}>Déconnexion</a></>) : (<><a onClick={() => navigate("login")} className="nav-link" style={{ cursor: "pointer" }}>Login</a><a onClick={() => navigate("signup")} className="nav-cta" style={{ cursor: "pointer" }}>Sign Up</a></>)}
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero({ navigate }) {
  return (
    <div style={{ background: "linear-gradient(180deg, #f3f0ff 0%, #ede9fe 25%, #f9f8ff 60%, #ffffff 100%)" }}>
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px clamp(16px,5vw,48px) 60px", position: "relative", overflow: "hidden", maxWidth: 1200, margin: "0 auto" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="hero-split">
        {/* Left - Text */}
        <div className="hero-left">
          <div className="anim-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 100, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", marginBottom: 32, color: "#8b5cf6" }}>
            <Sparkle s={14} c="#8b5cf6" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>#1 OUTIL IA</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>+10k utilisateurs actifs</span>
          </div>

          <h1 className="anim-2" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.08, color: "#1a1a2e", margin: "0 0 28px", letterSpacing: "-0.035em" }}>
            Transformez vos photos en visuel <span className="grad-text">professionnel,</span> automatiquement.
          </h1>

          <p className="anim-3" style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "#6b7280", maxWidth: 480, lineHeight: 1.75, margin: "0 0 36px" }}>
            Ajoutez une image et décrivez ce que vous souhaitez. Retouch génère un rendu studio prêt à être utilisé.
          </p>

          <div className="anim-4" style={{ display: "flex", gap: 14, marginBottom: 0, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("signup")}>Commencer gratuitement <Arrow /></button>
          </div>
        </div>

        {/* Right - Before/After */}
        <div className="hero-right anim-5">
          <div className="hero-img-box">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
              <div style={{ position: "relative" }}><Img src={IMG.heroBefore} alt="Photo avant" style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }} /><span className="img-label" style={{ left: 10, bottom: 10 }}>AVANT</span></div>
              <div style={{ position: "relative" }}><Img src={IMG.heroAfter} alt="Rendu IA après" style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }} /><span className="img-label img-label-ai" style={{ right: 10, bottom: 10 }}>APRÈS IA</span></div>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 3, background: "linear-gradient(180deg, #8b5cf6, #ec4899)", transform: "translateX(-50%)", zIndex: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

/* ═══ TOOLS ═══ */
function Tools() {
  const tools = [
    { img: IMG.removebg, title: "Suppression d'arrière-plan", tag: "Standard" },
    { img: IMG.eraser, title: "Gomme magique", tag: "Standard" },
    { img: IMG.restyle, title: "Changement de style", tag: "Standard" },
    { img: IMG.retouch, title: "Retouche pro", tag: "Standard" },
    { img: IMG.upscale, title: "Amélioration HD", tag: "Standard" },
    { img: IMG.textimg, title: "Texte dans image", tag: "Premium" },
    { img: IMG.fusion, title: "Fusion multi-images", tag: "Premium" },
  ];
  const offsets = [
    { rotate: -4, y: 20, z: 1 },
    { rotate: -2, y: 0, z: 2 },
    { rotate: 1, y: -10, z: 3 },
    { rotate: 3, y: 5, z: 4 },
    { rotate: -1, y: -5, z: 3 },
    { rotate: 2, y: 15, z: 2 },
    { rotate: -3, y: 10, z: 1 },
  ];
  return (
    <section style={{ padding: "100px clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 className="section-title">7 outils d'<span className="grad-text">Intelligence Artificielle</span></h2>
        <p className="section-sub">Tout ce dont vous avez besoin pour transformer vos images.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: 420, marginBottom: 20 }}>
        {tools.map((t, i) => {
          const o = offsets[i];
          const leftPct = 6 + i * 13;
          return (
            <div key={i} style={{ position: "absolute", left: `${leftPct}%`, top: "50%", transform: `translateY(calc(-50% + ${o.y}px)) rotate(${o.rotate}deg)`, zIndex: o.z, transition: "transform 0.4s, box-shadow 0.4s", cursor: "pointer", width: "clamp(140px, 18vw, 200px)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = `translateY(calc(-50% + ${o.y - 20}px)) rotate(0deg) scale(1.08)`; e.currentTarget.style.zIndex = 10; e.currentTarget.style.boxShadow = "0 20px 60px rgba(139,92,246,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = `translateY(calc(-50% + ${o.y}px)) rotate(${o.rotate}deg) scale(1)`; e.currentTarget.style.zIndex = o.z; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; }}
            >
              <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: t.tag === "Premium" ? "2px solid #8b5cf6" : "2px solid rgba(255,255,255,0.8)", background: "#fff" }}>
                <div style={{ position: "relative" }}>
                  <Img src={t.img} alt={t.title} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />
                  {t.tag === "Premium" && <span style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff", letterSpacing: 0.5 }}>PREMIUM</span>}
                  <span style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700, color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,0.5)", padding: "0 8px" }}>{t.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function MarqueeSection() {
  const items = [IMG.interior, IMG.portrait, IMG.room, IMG.face, IMG.villa, IMG.fusion];
  return (
    <section style={{ padding: "100px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 50, padding: "0 24px" }}><h2 className="section-title">Des résultats <span className="grad-text">impressionnants</span></h2><p className="section-sub" style={{ maxWidth: 620, margin: "0 auto" }}>Immobilier, portrait, retouche... l'IA s'adapte à tous vos besoins.</p></div>
      <div style={{ position: "relative" }}><div className="mq-fade mq-fade-l" /><div className="mq-fade mq-fade-r" /><div className="mq-track">{[...items, ...items, ...items, ...items].map((src, i) => (<div key={i} className="mq-item"><Img src={src} alt={`Résultat ${i}`} style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "cover", borderRadius: 12 }} /></div>))}</div></div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const data = [
    { q: "Retouch IA a divisé notre temps de post-production par 10.", i: "SL", n: "Sarah Lopez", r: "Directrice Artistique" },
    { q: "L'Amélioration HD : des visuels ultra-hd premium.", i: "MT", n: "Marc T.", r: "Photographe E-commerce" },
    { q: "Le changement de style a transformé mon salon en studio. Magique.", i: "JR", n: "Julie Renard", r: "Créatrice de Contenu" },
    { q: "Home-staging virtuel en 1 clic. Conversion +30%.", i: "DC", n: "David Chen", r: "Agent Immobilier" },
    { q: "Interface d'une fluidité rare. Tout est pensé.", i: "SM", n: "Sophie Martin", r: "Designer Indépendante" },
    { q: "La gomme magique ne laisse aucune trace.", i: "LD", n: "Lucas Dubois", r: "Fondateur Startup" },
  ];
  return (
    <section style={{ padding: "100px clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ background: "#faf9ff", borderRadius: 28, padding: "60px clamp(20px,4vw,48px)" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 48 }}>Rejoignez nos milliers de créateurs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {data.map((t, idx) => (<div key={idx} className="testi-card"><p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8, margin: "0 0 24px", fontStyle: "italic" }}>"{t.q}"</p><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div className="avatar">{t.i}</div><div><div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{t.n}</div><div style={{ fontSize: 12, color: "#9ca3af" }}>{t.r}</div></div></div></div>))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "Comment fonctionnent les crédits ?", a: "Chaque génération consomme 1 crédit. Rechargez via pack ou abonnement." },
    { q: "Les images sont-elles libres de droits ?", a: "Oui, avec un plan payant elles vous appartiennent pour usage commercial." },
    { q: "Précision du détourage automatique ?", a: "Notre IA détecte cheveux fins, fourrure et reflets avec un masque alpha parfait." },
    { q: "Stockez-vous mes photos ?", a: "Non, les médias sont purgés automatiquement pour votre confidentialité." },
  ];
  return (
    <section style={{ padding: "100px clamp(16px,5vw,48px)", maxWidth: 740, margin: "0 auto" }}>
      <h2 className="section-title" style={{ textAlign: "center" }}>Questions Fréquentes</h2>
      <p className="section-sub" style={{ textAlign: "center", marginBottom: 48 }}>Tout sur Retouch IA.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((f, i) => (<div key={i} className={open === i ? "faq-item faq-open" : "faq-item"}><button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}><span>{f.q}</span><span style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0, color: "#9ca3af" }}><ChevDown /></span></button><div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s" }}><p style={{ padding: "0 24px 20px", margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.75 }}>{f.a}</p></div></div>))}
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (<footer style={{ padding: "36px clamp(16px,5vw,48px)", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto", flexWrap: "wrap", gap: 16 }}><span style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 Retouch AI. Tous droits réservés.</span><div style={{ display: "flex", gap: 24 }}>{["Confidentialité", "Conditions", "Contact"].map(l => <a key={l} href="#" className="footer-link">{l}</a>)}</div></footer>);
}

/* ═══ PAGE: HOME ═══ */
function HomePage({ navigate }) {
  return (<><Hero navigate={navigate} /><MarqueeSection /><Tools /><Testimonials /><FAQ /><Footer /></>);
}

/* ═══ PAGE: PRICING ═══ */
function PricingPage({ navigate }) {
  const [annual, setAnnual] = useState(true);
  const proPrice = annual ? 10 : 15;
  const premPrice = annual ? 29 : 49;

  const allFeatures = [
    { label: "HD", pro: true },
    { label: "Ajout / suppression d'éléments", pro: true },
    { label: "Modificateur arrière plan", pro: true },
    { label: "Ultra HD", pro: false },
    { label: "Texte dans image", pro: false },
    { label: "Fusion multi-images", pro: false },
    { label: "Traitement prioritaire", pro: false },
  ];

  return (
    <section style={{ padding: "120px clamp(16px,5vw,48px) 80px", maxWidth: 1000, margin: "0 auto" }}>
      <button onClick={() => navigate("home")} className="back-btn"><ChevLeft /> Retour</button>
      <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#1a1a2e", textAlign: "center", margin: "0 0 16px", letterSpacing: "-0.03em" }}>Choisissez le plan parfait pour vos créations</h1>
      <p style={{ textAlign: "center", color: "#6b7280", fontSize: 15, margin: "0 auto 40px", maxWidth: 600 }}>*10 crédits = génération d'une image</p>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}><div className="tab-bar"><button className={!annual ? "tab tab-active" : "tab"} onClick={() => setAnnual(false)}>Mensuel</button><button className={annual ? "tab tab-active" : "tab"} onClick={() => setAnnual(true)}>Annuel -40%</button></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 80 }}>
        <div className="pricing-card pricing-card-recommended">
          <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg,#8b5cf6,#ec4899)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>Le plus populaire</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Pro</h3>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px" }}>Pour les créateurs réguliers</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}><span style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e" }}>{proPrice}€</span><span style={{ fontSize: 14, color: "#9ca3af" }}>/ mois</span></div>
          <p style={{ fontSize: 13, color: "#8b5cf6", fontWeight: 500, margin: "0 0 24px" }}>500 crédits / mois</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>{allFeatures.map(f => (<div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: f.pro ? "#374151" : "#d1d5db" }}>{f.pro ? <CheckIcon /> : <CrossIcon />} {f.label}</div>))}</div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => navigate("signup")}>S'abonner</button>
        </div>
        <div className="pricing-card">
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Premium</h3>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px" }}>Pour les professionnels intensifs</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}><span style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e" }}>{premPrice}€</span><span style={{ fontSize: 14, color: "#9ca3af" }}>/ mois</span></div>
          <p style={{ fontSize: 13, color: "#8b5cf6", fontWeight: 500, margin: "0 0 24px" }}>Crédits Illimités</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>{allFeatures.map(f => (<div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151" }}><CheckIcon /> {f.label}</div>))}</div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => navigate("signup")}>S'abonner</button>
        </div>
      </div>
      <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#1a1a2e", textAlign: "center", margin: "0 0 10px" }}>Packs de crédits ponctuels</h2>
      <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, margin: "0 0 40px" }}>Vos crédits ne périment jamais.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
        {[{ name: "Pack Basique", credits: 200, price: "10€", badge: null }, { name: "Pack Avancé", credits: 1000, price: "40€", badge: "Le plus courant" }, { name: "Pack Studio", credits: 5000, price: "150€", badge: null }].map((p, i) => (
          <div key={i} className="pack-card">{p.badge && <span style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", background: "rgba(139,92,246,0.08)", padding: "3px 10px", borderRadius: 20, marginBottom: 10, display: "inline-block" }}>{p.badge}</span>}<h4 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>{p.name}</h4><p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px" }}>{p.credits} crédits</p><p style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: "0 0 16px" }}>{p.price}</p><button className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>Acheter</button></div>
        ))}
      </div>
      <Footer />
    </section>
  );
}

/* ═══ PAGE: LOGIN ═══ */
function LoginPage({ navigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => { if (email.trim()) { const name = email.trim().split("@")[0]; onLogin({ username: name, credits: 47, plan: "Pro", images: 128 }); navigate("dashboard"); } };
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}><img src={LOGO_SRC} alt="Retouch" style={{ height: 36, marginBottom: 20 }} /><h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Connexion</h1></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="form-label">Adresse email</label><input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemple.com" /></div>
          <div><label className="form-label">Mot de passe</label><input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>Se connecter</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>Pas encore de compte ? <a onClick={() => navigate("signup")} style={{ color: "#8b5cf6", fontWeight: 600, cursor: "pointer" }}>S'inscrire</a></p>
      </div>
    </section>
  );
}

/* ═══ PAGE: SIGNUP ═══ */
function SignupPage({ navigate, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => { if (username.trim() && email.trim()) { onLogin({ username: username.trim(), credits: 50, plan: "Gratuit", images: 0 }); navigate("dashboard"); } };
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}><img src={LOGO_SRC} alt="Retouch" style={{ height: 36, marginBottom: 20 }} /><h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Créer un compte</h1></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="form-label">Nom d'utilisateur</label><input className="form-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="votre-nom" /></div>
          <div><label className="form-label">Adresse email</label><input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemple.com" /></div>
          <div><label className="form-label">Mot de passe</label><input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>S'inscrire</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>Déjà un compte ? <a onClick={() => navigate("login")} style={{ color: "#8b5cf6", fontWeight: 600, cursor: "pointer" }}>Se connecter</a></p>
      </div>
    </section>
  );
}

/* ═══ PAGE: DASHBOARD ═══ */
/* ── Dashboard Icons ── */
const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const HistoryIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const SettingsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const EraserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H7L3 16l9-9 8 8-4 4z"/><line x1="6" y1="11" x2="13" y2="4"/></svg>;
const WandIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2L11 5"/></svg>;
const LayersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const TypeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
const MergeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>;
const ZapIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const PaletteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;

function DashboardPage({ user, navigate, onLogout, apiKey, setApiKey }) {
  const [activeSection, setActiveSection] = useState("workspace");
  const [activeTool, setActiveTool] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  if (!user) { navigate("login"); return null; }

  const tools = [
    { name: "Suppression d'arrière-plan", icon: <ImageIcon />, model: "google/nano-banana-edit", promptTemplate: "Remove the background from this image completely, leaving only the main subject on a transparent/white background.", type: "edit", premium: false },
    { name: "Gomme magique", icon: <EraserIcon />, model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Changement de style", icon: <PaletteIcon />, model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Retouche pro", icon: <WandIcon />, model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Amélioration HD", icon: <ZapIcon />, model: "google/nano-banana-edit", promptTemplate: "Transform this image into an ultra-detailed 4K photograph. Enhance all details: textures, sharpness, contrast. For portraits, enhance skin details (pores, natural texture, imperfections), hair, and facial structure without artificial smoothing. For landscapes or objects, enhance textures, depth, and clarity. Keep natural lighting, realistic contrast, slight natural grain. The result must look like a real high-resolution photograph, not AI-generated. Keep the exact same subject, pose, expression, and background.", type: "edit", premium: false },
    { name: "Texte dans image", icon: <TypeIcon />, model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: true },
    { name: "Fusion multi-images", icon: <MergeIcon />, model: "nano-banana-2", promptTemplate: "", type: "edit", premium: true },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => { setUploadedImages(prev => [...prev, { name: file.name, base64: ev.target.result.split(",")[1], preview: ev.target.result }]); };
      reader.readAsDataURL(file);
    });
  };
  const removeImage = (idx) => setUploadedImages(prev => prev.filter((_, i) => i !== idx));

  const handleGenerate = async () => {
    if (!prompt && activeTool?.name !== "Suppression d'arrière-plan" && activeTool?.name !== "Amélioration HD") { setError("Veuillez entrer une instruction."); return; }
    if (uploadedImages.length === 0 && activeTool?.type === "edit") { setError("Veuillez uploader au moins une image."); return; }
    setLoading(true); setError(""); setResultImage(null);
    const finalPrompt = activeTool.promptTemplate || prompt;
    try {
      let requestBody;
      if (activeTool.name === "Fusion multi-images" && uploadedImages.length > 1) {
        requestBody = { model: activeTool.model, input: { prompt: prompt || "Blend these images into one coherent composition with consistent lighting and perspective.", image_input: uploadedImages.map(img => "data:image/png;base64," + img.base64), output_format: "png", resolution: "1K" } };
      } else if (uploadedImages.length > 0) {
        requestBody = { model: activeTool.model, input: { prompt: (activeTool.name === "Texte dans image" ? "IMPORTANT: Do NOT change, modify, or regenerate the original image in any way. Keep every single pixel of the original photo exactly as it is. Your ONLY task is to overlay text on top of the existing image. The text to add is: " + prompt : finalPrompt + (prompt && activeTool.promptTemplate ? " " + prompt : "")), image_urls: uploadedImages.map(img => "data:image/png;base64," + img.base64), output_format: "png" } };
      } else {
        requestBody = { model: activeTool.model, input: { prompt, output_format: "png", image_size: "1:1" } };
      }
      const response = await fetch("https://retouch-backend.vercel.app/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestBody) });
      const data = await response.json();
      if (data.image_url) { setResultImage(data.image_url); setHistory(prev => [{ name: activeTool.name, prompt: prompt.slice(0, 40), date: "À l'instant", url: data.image_url }, ...prev]); }
      else { throw new Error(data.error || "Erreur lors de la génération."); }
    } catch (err) { setError(err.message || "Erreur de connexion."); }
    finally { setLoading(false); }
  };

  const selectTool = (t) => { setActiveTool(t); setActiveSection("workspace"); setPrompt(""); setUploadedImages([]); setResultImage(null); setError(""); };
  const maxImages = activeTool?.name === "Fusion multi-images" ? 8 : 1;

  /* ── Sidebar ── */
  const sidebarStyle = { width: 260, minHeight: "100vh", background: "#faf9ff", borderRight: "1px solid #ede9fe", padding: "24px 16px", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, zIndex: 100, overflowY: "auto" };
  const sideItemStyle = (active) => ({ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "#8b5cf6" : "#6b7280", background: active ? "rgba(139,92,246,0.08)" : "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left", fontFamily: "inherit", transition: "all 0.2s", marginBottom: 2 });
  const sectionLabel = { fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", padding: "16px 14px 6px", margin: 0 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f7fc" }}>
      {/* ── Sidebar ── */}
      <aside style={sidebarStyle}>
        <div style={{ padding: "4px 8px 28px", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_SRC} alt="Retouch" style={{ height: 28 }} />
        </div>
        <p style={sectionLabel}>Navigation</p>
        <button style={sideItemStyle(activeSection === "workspace" && !activeTool)} onClick={() => { setActiveSection("workspace"); setActiveTool(null); setResultImage(null); }}><HomeIcon /> Workspace</button>
        <button style={sideItemStyle(activeSection === "history")} onClick={() => { setActiveSection("history"); setActiveTool(null); }}><HistoryIcon /> Historique</button>
        <button style={sideItemStyle(activeSection === "settings")} onClick={() => { setActiveSection("settings"); setActiveTool(null); }}><SettingsIcon /> Paramètres</button>

        <p style={{ ...sectionLabel, marginTop: 8 }}>Outils IA</p>
        {tools.filter(t => !t.premium).map(t => (
          <button key={t.name} style={sideItemStyle(activeTool?.name === t.name)} onClick={() => selectTool(t)}>{t.icon} {t.name}</button>
        ))}

        <p style={{ ...sectionLabel, marginTop: 8 }}>Premium</p>
        {tools.filter(t => t.premium).map(t => (
          <button key={t.name} style={sideItemStyle(activeTool?.name === t.name)} onClick={() => selectTool(t)}>
            {t.icon} {t.name}
            <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "linear-gradient(135deg,#8b5cf6,#ec4899)", color: "#fff" }}>PRO</span>
          </button>
        ))}

        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #ede9fe" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#8b5cf6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>{user.username[0]?.toUpperCase()}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.username}</p>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{user.credits} crédits</p>
            </div>
          </div>
          <button style={{ ...sideItemStyle(false), color: "#ef4444", fontSize: 12, marginTop: 4 }} onClick={onLogout}><LogoutIcon /> Déconnexion</button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ marginLeft: 260, flex: 1, minHeight: "100vh" }}>
        {/* Top bar */}
        <header style={{ height: 56, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ede9fe", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{activeTool ? activeTool.name : activeSection === "workspace" ? "Workspace" : activeSection === "history" ? "Historique" : "Paramètres"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "#f3f0ff", border: "1px solid #ede9fe" }}>
              <CreditIcon /><span style={{ fontSize: 13, fontWeight: 600, color: "#8b5cf6" }}>{user.credits} crédits</span>
            </div>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{user.plan}</span>
          </div>
        </header>

        <div style={{ display: "flex", flex: 1 }}>
          {/* ── Center content ── */}
          <div style={{ flex: 1, padding: "32px 32px 60px" }}>

            {/* WORKSPACE VIEW */}
            {activeSection === "workspace" && !activeTool && (
              <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: "0 0 8px" }}>Bienvenue, <span className="grad-text">{user.username}</span></h1>
                <p style={{ fontSize: 14, color: "#9ca3af", margin: "0 0 40px" }}>Sélectionnez un outil dans le menu pour commencer</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                  {tools.map(t => (
                    <div key={t.name} onClick={() => selectTool(t)} style={{ padding: "24px 16px", borderRadius: 14, background: "#fff", border: "1px solid #ede9fe", cursor: "pointer", transition: "all 0.25s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,92,246,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#ede9fe"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#ede9fe,#fce7f3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>{t.icon}</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{t.name}</span>
                      {t.premium && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "linear-gradient(135deg,#8b5cf6,#ec4899)", color: "#fff" }}>PREMIUM</span>}
                    </div>
                  ))}
                </div>
                {history.length > 0 && (
                  <div style={{ marginTop: 40, textAlign: "left" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" }}>Dernières générations</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {history.slice(0, 4).map((img, i) => (<div key={i} className="dash-history-row"><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden" }}><img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div><div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{img.name}</p><p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{img.prompt || "—"}</p></div></div><span style={{ fontSize: 11, color: "#9ca3af" }}>{img.date}</span></div>))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TOOL WORKSPACE VIEW */}
            {activeSection === "workspace" && activeTool && (
              <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: resultImage ? "1fr 1fr" : "1fr", gap: 28 }}>
                  <div>
                    {/* Upload zone */}
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 8, display: "block" }}>Image{maxImages > 1 ? "s" : ""} ({uploadedImages.length}/{maxImages})</label>
                      <div className="upload-zone" onClick={() => document.getElementById("file-input").click()} style={{ minHeight: 180, borderColor: "#ddd6fe" }}>
                        <input id="file-input" type="file" accept="image/*" multiple={maxImages > 1} onChange={handleFileUpload} style={{ display: "none" }} />
                        <ImageIcon />
                        <span style={{ fontSize: 13, color: "#9ca3af", marginTop: 10 }}>Glissez-déposez une image ici</span>
                        <span style={{ fontSize: 11, color: "#c4b5fd", marginTop: 4 }}>PNG, JPG, WEBP</span>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                          {uploadedImages.map((img, i) => (
                            <div key={i} style={{ position: "relative", width: 64, height: 64, borderRadius: 10, overflow: "hidden", border: "2px solid #ede9fe" }}>
                              <img src={img.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              <button onClick={() => removeImage(i)} style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Prompt */}
                    {!activeTool.promptTemplate && (
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 8, display: "block" }}>Instruction</label>
                        <textarea className="form-input" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={
                          activeTool.name === "Gomme magique" ? "Ex: Supprime la personne à droite" :
                          activeTool.name === "Changement de style" ? "Ex: Style scandinave minimaliste" :
                          activeTool.name === "Retouche pro" ? "Ex: Améliore la luminosité" :
                          activeTool.name === "Texte dans image" ? "Ex: Ajoute 'SOLDES -50%' en gros" :
                          activeTool.name === "Fusion multi-images" ? "Ex: Fusionne en un seul visuel" :
                          "Décrivez votre modification..."
                        } rows={3} style={{ resize: "vertical", minHeight: 80, borderColor: "#ddd6fe" }} />
                      </div>
                    )}
                    {error && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 12, padding: "8px 12px", background: "rgba(239,68,68,0.06)", borderRadius: 8 }}>{error}</p>}
                    <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 24px", fontSize: 14 }} onClick={handleGenerate} disabled={loading}>
                      {loading ? <><span className="spinner" /> Génération en cours...</> : <><Sparkle s={14} c="#fff" /> Générer — 10 crédits</>}
                    </button>
                  </div>
                  {/* Result */}
                  {resultImage && (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 8, display: "block" }}>Résultat</label>
                      <div style={{ borderRadius: 14, overflow: "hidden", border: "2px solid #ede9fe", background: "#fff" }}>
                        <img src={resultImage} alt="Résultat" style={{ width: "100%", display: "block" }} />
                      </div>
                      <a href={resultImage} download="retouch-result.png" className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 13, textDecoration: "none", padding: "10px 20px" }}>Télécharger l'image</a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* HISTORY VIEW */}
            {activeSection === "history" && (
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 20px" }}>Historique complet</h3>
                {history.length === 0 ? <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}><HistoryIcon /><p style={{ marginTop: 12, fontSize: 14 }}>Aucune génération pour le moment</p></div> : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {history.map((img, i) => (<div key={i} className="dash-history-row"><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden" }}><img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div><div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{img.name}</p><p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{img.prompt || "—"}</p></div></div><span style={{ fontSize: 11, color: "#9ca3af" }}>{img.date}</span></div>))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS VIEW */}
            {activeSection === "settings" && (
              <div style={{ maxWidth: 500, margin: "0 auto" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 24px" }}>Paramètres du compte</h3>
                <div style={{ padding: 28, borderRadius: 16, background: "#fff", border: "1px solid #ede9fe" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div><label className="form-label">Nom d'utilisateur</label><input className="form-input" defaultValue={user.username} /></div>
                    <div><label className="form-label">Email</label><input className="form-input" defaultValue="user@retouch.ai" /></div>
                    <div><label className="form-label">Plan actuel</label><div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{user.plan}</span><button className="btn-secondary" style={{ fontSize: 12, padding: "6px 16px" }} onClick={() => navigate("pricing")}>Changer de plan</button></div></div>
                    <button className="btn-primary" style={{ alignSelf: "flex-start", padding: "10px 24px", fontSize: 13 }}>Sauvegarder</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Panel ── */}
          {activeSection === "workspace" && activeTool && (
            <aside style={{ width: 240, padding: "24px 16px", borderLeft: "1px solid #ede9fe", background: "#faf9ff" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>Outil actif</p>
              <div style={{ padding: "16px", borderRadius: 12, background: "#fff", border: "1px solid #ede9fe", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ color: "#8b5cf6" }}>{activeTool.icon}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{activeTool.name}</span>
                </div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: activeTool.premium ? "linear-gradient(135deg,#8b5cf6,#ec4899)" : "#ede9fe", color: activeTool.premium ? "#fff" : "#8b5cf6", fontWeight: 600 }}>{activeTool.premium ? "Premium" : "Standard"}</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Conseils</p>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7, padding: "12px", borderRadius: 10, background: "#fff", border: "1px solid #ede9fe" }}>
                {activeTool.name === "Suppression d'arrière-plan" && "Uploadez une image avec un sujet bien défini. L'IA isolera automatiquement le sujet principal."}
                {activeTool.name === "Gomme magique" && "Décrivez précisément l'élément à supprimer. Ex: \"Supprime le poteau à gauche\"."}
                {activeTool.name === "Changement de style" && "Décrivez le style souhaité. Ex: \"Style scandinave\", \"Ambiance coucher de soleil\"."}
                {activeTool.name === "Retouche pro" && "Décrivez les retouches souhaitées: luminosité, couleurs, netteté, peau..."}
                {activeTool.name === "Amélioration HD" && "Aucune instruction nécessaire. L'IA améliore automatiquement la qualité en 4K."}
                {activeTool.name === "Texte dans image" && "Indiquez le texte, sa position, sa couleur et sa taille. L'image originale sera préservée."}
                {activeTool.name === "Fusion multi-images" && "Uploadez 2 à 8 images et décrivez comment les combiner en un seul visuel."}
              </div>
              {history.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Récent</p>
                  {history.slice(0, 3).map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px", borderRadius: 8, marginBottom: 4 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}><img src={h.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                      <span style={{ fontSize: 11, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const handleLogin = (u) => setUser(u);
  const handleLogout = () => { setUser(null); navigate("home"); };

  return (
    <div style={{ background: "#ffffff", color: "#1a1a2e", minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        .grad-text{background:linear-gradient(135deg,#8b5cf6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .anim-1{animation:fadeUp .7s cubic-bezier(.4,0,.2,1) .05s both}.anim-2{animation:fadeUp .7s cubic-bezier(.4,0,.2,1) .15s both}.anim-3{animation:fadeUp .7s cubic-bezier(.4,0,.2,1) .25s both}.anim-4{animation:fadeUp .7s cubic-bezier(.4,0,.2,1) .35s both}.anim-5{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .45s both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}@keyframes mqScroll{0%{transform:translateX(0)}100%{transform:translateX(-25%)}}
        .nav-link{color:#6b7280;text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}.nav-link:hover{color:#1a1a2e}
        .nav-cta{padding:8px 20px;border-radius:9px;font-size:14px;font-weight:600;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;box-shadow:0 4px 16px rgba(139,92,246,0.25);transition:box-shadow .3s,transform .2s}.nav-cta:hover{box-shadow:0 6px 24px rgba(139,92,246,0.4);transform:translateY(-1px)}
        .btn-primary{padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 6px 24px rgba(139,92,246,0.3);transition:transform .2s,box-shadow .3s;font-family:inherit}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(139,92,246,0.4)}
        .btn-secondary{padding:14px 28px;border-radius:12px;font-size:15px;font-weight:600;background:#fff;color:#374151;border:1px solid #e5e7eb;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .2s;font-family:inherit}.btn-secondary:hover{background:#f9fafb;border-color:#d1d5db}
        .hero-split{display:flex;align-items:center;gap:clamp(32px,5vw,64px);width:100%}.hero-left{flex:1;min-width:0}.hero-right{flex:1;min-width:0;display:flex;justify-content:center}
        .hero-img-box{position:relative;width:100%;max-width:480px;border-radius:20px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 24px 64px rgba(139,92,246,0.12),0 0 0 1px rgba(139,92,246,0.04)}
        .img-label{position:absolute;padding:4px 12px;background:rgba(0,0,0,0.5);border-radius:6px;font-size:11px;color:rgba(255,255,255,0.9);font-weight:600;backdrop-filter:blur(8px);letter-spacing:0.06em}.img-label-ai{background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff}
        .tab-bar{display:flex;gap:4px;padding:4px;border-radius:12px;background:#f3f4f6;border:1px solid #e5e7eb}
        .tab{padding:8px 22px;border-radius:9px;font-size:13px;font-weight:500;background:transparent;color:#9ca3af;border:none;cursor:pointer;transition:all .25s;font-family:inherit}.tab:hover{color:#6b7280}.tab-active{background:linear-gradient(135deg,#8b5cf6,#ec4899)!important;color:#fff!important;box-shadow:0 2px 10px rgba(139,92,246,0.3)}
        .section-title{font-size:clamp(26px,3.5vw,44px);font-weight:800;color:#1a1a2e;letter-spacing:-0.03em;margin:0 0 14px}.section-sub{color:#6b7280;font-size:15px;margin:0}
        .tool-card{border-radius:16px;overflow:hidden;background:#fff;border:1px solid #e5e7eb;transition:border-color .35s,transform .35s,box-shadow .35s;cursor:pointer}.tool-card:hover{border-color:#c4b5fd;transform:translateY(-4px);box-shadow:0 12px 32px rgba(139,92,246,0.1)}.tool-card:hover img{transform:scale(1.06)}
        .bento-row{display:flex;border-radius:20px;overflow:hidden;background:#fff;border:1px solid #e5e7eb;min-height:320px;transition:border-color .3s,box-shadow .3s}.bento-row:hover{border-color:#c4b5fd;box-shadow:0 12px 40px rgba(139,92,246,0.08)}.bento-text{flex:1;display:flex;flex-direction:column;justify-content:center;padding:clamp(28px,4vw,48px) clamp(24px,4vw,44px)}.bento-img{flex:1.2;overflow:hidden}.bento-img img{transition:transform .6s}.bento-row:hover .bento-img img{transform:scale(1.04)}
        .mq-fade{position:absolute;top:0;bottom:0;width:140px;z-index:2;pointer-events:none}.mq-fade-l{left:0;background:linear-gradient(90deg,#fff,transparent)}.mq-fade-r{right:0;background:linear-gradient(-90deg,#fff,transparent)}.mq-track{display:flex;gap:22px;animation:mqScroll 30s linear infinite;width:fit-content}.mq-item{width:175px;height:175px;border-radius:16px;flex-shrink:0;background:#faf9ff;border:1px solid #ede9fe;display:flex;align-items:center;justify-content:center;padding:16px;transition:border-color .3s}.mq-item:hover{border-color:#c4b5fd;box-shadow:0 4px 16px rgba(139,92,246,0.1)}
        .testi-card{padding:28px;border-radius:16px;background:#fff;border:1px solid #e5e7eb;transition:border-color .3s,transform .3s,box-shadow .3s}.testi-card:hover{border-color:#c4b5fd;transform:translateY(-3px);box-shadow:0 8px 24px rgba(139,92,246,0.08)}.avatar{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#ede9fe,#fce7f3);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#8b5cf6;border:1px solid #ddd6fe}
        .faq-item{border-radius:14px;overflow:hidden;background:#fff;border:1px solid #e5e7eb;transition:border-color .3s}.faq-item:hover{border-color:#c4b5fd}.faq-open{border-color:#c4b5fd;box-shadow:0 4px 16px rgba(139,92,246,0.06)}.faq-btn{width:100%;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;color:#1a1a2e;font-size:15px;font-weight:600;text-align:left;gap:16px;font-family:inherit}
        .footer-link{font-size:13px;color:#9ca3af;text-decoration:none;transition:color .2s}.footer-link:hover{color:#6b7280}
        .back-btn{display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:#8b5cf6;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:32px;font-family:inherit;transition:color .2s}.back-btn:hover{color:#7c3aed}
        .pricing-card{position:relative;padding:36px 32px;border-radius:20px;background:#fff;border:1px solid #e5e7eb;transition:border-color .3s,box-shadow .3s,transform .3s}.pricing-card:hover{border-color:#c4b5fd;box-shadow:0 12px 40px rgba(139,92,246,0.1);transform:translateY(-4px)}.pricing-card-recommended{border:2px solid transparent;background-image:linear-gradient(#fff,#fff),linear-gradient(135deg,#8b5cf6,#ec4899);background-origin:border-box;background-clip:padding-box,border-box;box-shadow:0 12px 40px rgba(139,92,246,0.15);transform:translateY(-4px)}.pricing-card-recommended:hover{box-shadow:0 16px 48px rgba(139,92,246,0.22);transform:translateY(-6px)}
        .pack-card{padding:28px;border-radius:16px;background:#fff;border:1px solid #e5e7eb;text-align:center;transition:border-color .3s,box-shadow .3s}.pack-card:hover{border-color:#c4b5fd;box-shadow:0 8px 24px rgba(139,92,246,0.08)}
        .auth-card{width:100%;max-width:400px;padding:40px 36px;border-radius:24px;background:#fff;border:1px solid #e5e7eb;box-shadow:0 20px 60px rgba(0,0,0,0.06)}
        .form-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px}
        .form-input{width:100%;padding:12px 16px;border-radius:10px;border:1px solid #e5e7eb;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s;background:#fafafa}.form-input:focus{border-color:#8b5cf6;background:#fff}
        .dash-stat{padding:24px;border-radius:16px;background:#fff;border:1px solid #e5e7eb;display:flex;align-items:center;gap:16;transition:border-color .3s}.dash-stat:hover{border-color:#c4b5fd}
        .dash-stat-icon{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#ede9fe,#fce7f3);display:flex;align-items:center;justify-content:center;color:#8b5cf6;flex-shrink:0}
        .dash-tool-card{padding:20px;border-radius:14px;background:#faf9ff;border:1px solid #ede9fe;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;transition:border-color .3s,box-shadow .3s}.dash-tool-card:hover{border-color:#c4b5fd;box-shadow:0 6px 20px rgba(139,92,246,0.08)}
        .dash-tool-btn{padding:6px 18px;border-radius:8px;font-size:12px;font-weight:600;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;border:none;cursor:pointer;font-family:inherit;transition:transform .2s}.dash-tool-btn:hover{transform:translateY(-1px)}
        .dash-history-row{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-radius:12px;background:#faf9ff;border:1px solid #f3f0ff;transition:background .2s}.dash-history-row:hover{background:#f3f0ff}
        .upload-zone{border:2px dashed #e5e7eb;border-radius:14px;padding:32px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:border-color .3s,background .3s;background:#fafafa}.upload-zone:hover{border-color:#c4b5fd;background:#faf9ff}
        .spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
        textarea.form-input{font-family:inherit;line-height:1.6}
        @media(max-width:768px){.bento-row{flex-direction:column!important;min-height:auto}.bento-img{min-height:220px}.bento-text{padding:28px 24px}.hero-split{flex-direction:column;text-align:center}.hero-left{align-items:center;display:flex;flex-direction:column}.hero-right{width:100%}}
      `}</style>
      <Navbar navigate={navigate} user={user} onLogout={handleLogout} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "pricing" && <PricingPage navigate={navigate} />}
      {page === "login" && <LoginPage navigate={navigate} onLogin={handleLogin} />}
      {page === "signup" && <SignupPage navigate={navigate} onLogin={handleLogin} />}
      {page === "dashboard" && <DashboardPage user={user} navigate={navigate} onLogout={handleLogout} apiKey={apiKey} setApiKey={setApiKey} />}
    </div>
  );
}
