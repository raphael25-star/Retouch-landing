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
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("home")}><img src={LOGO_SRC} alt="Retouch" style={{ height: 44, width: "auto", objectFit: "contain" }} /></div>
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
            Ajoutez une image et décrivez ce que vous souhaitez. Retouch génère un rendu professionnel prêt à être utilisé.
          </p>

          <div className="anim-4" style={{ display: "flex", gap: 14, marginBottom: 0, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("signup")}>Tester gratuitement <Arrow /></button>
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
        <h2 className="section-title">Générez vos images en <span className="grad-text">quelques secondes</span></h2>
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
          <img src={LOGO_SRC} alt="Retouch" style={{ height: 40 }} />
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
                      <div style={{ borderRadius: 14, overflow: "hidden", border: "2px solid #ede9fe", background: "#fff", cursor: "pointer" }} onClick={() => { const overlay = document.createElement("div"); overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:40px;"; overlay.onclick = () => document.body.removeChild(overlay); const img = document.createElement("img"); img.src = resultImage; img.style.cssText = "max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);"; overlay.appendChild(img); document.body.appendChild(overlay); }}>
                        <img src={resultImage} alt="Résultat" style={{ width: "100%", display: "block" }} />
                      </div>
                      <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 13, padding: "10px 20px" }} onClick={async () => { try { const response = await fetch(resultImage); const blob = await response.blob(); const url = window.URL.createObjectURL(blob); const link = document.createElement("a"); link.style.display = "none"; link.href = url; link.setAttribute("download", "retouch-result.png"); document.body.appendChild(link); link.click(); window.URL.revokeObjectURL(url); document.body.removeChild(link); } catch(err) { const link = document.createElement("a"); link.href = resultImage; link.setAttribute("download", "retouch-result.png"); link.setAttribute("target", "_blank"); document.body.appendChild(link); link.click(); document.body.removeChild(link); } }}>Télécharger l'image</button>
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
