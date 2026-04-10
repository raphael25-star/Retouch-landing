import { useState, useEffect } from "react";

/* ─── Logo base64 ─── */
const LOGO_SRC = "data:image/png;base64,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";

/* ─── Images ─── */
const IMG = {
  ecommBefore: "https://retouch-front-end.vercel.app/images/ecommerce-before.jpg",
  ecommAfter:  "https://retouch-front-end.vercel.app/images/ecommerce-after.jpg",
  restyle:     "https://retouch-front-end.vercel.app/images/restyle-demo.png",
  eraser:      "https://retouch-front-end.vercel.app/images/eraser-demo.png",
  removebg:    "https://retouch-front-end.vercel.app/images/removebg-demo.png",
  retouch:     "https://retouch-front-end.vercel.app/images/retouch-demo.png",
  upscale:     "https://retouch-front-end.vercel.app/images/upscale-demo.png",
  interior:    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1024",
  abstract:    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1024",
  retro:       "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1024",
  vase:        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=512",
  shoe:        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=512",
  plant:       "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=512",
  headphones:  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=512",
  cosmetic:    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=512",
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
              <div style={{ position: "relative" }}><Img src={IMG.ecommBefore} alt="Photo avant" style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }} /><span className="img-label" style={{ left: 10, bottom: 10 }}>AVANT</span></div>
              <div style={{ position: "relative" }}><Img src={IMG.ecommAfter} alt="Rendu IA après" style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }} /><span className="img-label img-label-ai" style={{ right: 10, bottom: 10 }}>APRÈS IA</span></div>
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
    { img: IMG.restyle, title: "Changement de style", desc: "Réinventez le style d'une pièce vide." },
    { img: IMG.eraser, title: "Gomme magique", desc: "Supprimez n'importe quel objet encombrant." },
    { img: IMG.removebg, title: "Suppression d'arrière-plan", desc: "Détourage net et automatique." },
    { img: IMG.retouch, title: "Retouche Pro", desc: "Retouches beauté et lumière parfaits." },
    { img: IMG.upscale, title: "Amélioration HD", desc: "Agrandissez en Ultra HD sans perte." },
  ];
  return (
    <section style={{ padding: "100px clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}><h2 className="section-title">Outils d'<span className="grad-text">Intelligence Artificielle</span></h2><p className="section-sub">Découvrez nos 5 outils spécialisés.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
        {tools.map((t, i) => (<div key={i} className="tool-card"><div style={{ position: "relative", overflow: "hidden" }}><Img src={t.img} alt={t.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.5s" }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.95) 100%)" }} /></div><div style={{ padding: "18px 18px 22px" }}><h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>{t.title}</h3><p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{t.desc}</p></div></div>))}
      </div>
    </section>
  );
}

/* ═══ STUDIO ═══ */
function Studio() {
  const features = [
    { title: "Restyle IA", desc: "Transformez le style de vos photos en décrivant ce que vous souhaitez.", img: IMG.interior },
    { title: "Haute Résolution", desc: "Images restituées sans perte, prêtes pour l'impression ou le web.", img: IMG.abstract },
    { title: "Génération Rapide", desc: "Infrastructure cloud surpuissante pour des résultats en secondes.", img: IMG.retro },
  ];
  return (
    <section style={{ padding: "100px clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}><h2 className="section-title">Un studio complet dans votre navigateur</h2><p className="section-sub">Tout ce dont vous avez besoin pour vos créations visuelles.</p></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {features.map((f, i) => (<div key={i} className="bento-row" style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}><div className="bento-text"><h3 style={{ fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 700, color: "#1a1a2e", margin: "0 0 16px" }}>{f.title}</h3><p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{f.desc}</p></div><div className="bento-img"><Img src={f.img} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div></div>))}
      </div>
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function MarqueeSection() {
  const items = [IMG.removebg, IMG.vase, IMG.shoe, IMG.plant, IMG.headphones, IMG.cosmetic];
  return (
    <section style={{ padding: "100px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 50, padding: "0 24px" }}><h2 className="section-title">Résultats Précis et Transparents</h2><p className="section-sub" style={{ maxWidth: 620, margin: "0 auto" }}>Chaque élément isolé avec une finesse extrême.</p></div>
      <div style={{ position: "relative" }}><div className="mq-fade mq-fade-l" /><div className="mq-fade mq-fade-r" /><div className="mq-track">{[...items, ...items, ...items, ...items].map((src, i) => (<div key={i} className="mq-item"><Img src={src} alt={`Objet ${i}`} style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }} /></div>))}</div></div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const data = [
    { q: "Retouch IA a divisé notre temps de post-production par 10.", i: "SL", n: "Sarah Lopez", r: "Directrice Artistique" },
    { q: "L'outil Upscale 8k : des visuels ultra-hd premium.", i: "MT", n: "Marc T.", r: "Photographe E-commerce" },
    { q: "Le Restyle IA a transformé mon salon en studio. Magique.", i: "JR", n: "Julie Renard", r: "Créatrice de Contenu" },
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
  return (<><Hero navigate={navigate} /><MarqueeSection /><Tools /><Studio /><Testimonials /><FAQ /><Footer /></>);
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
function DashboardPage({ user, navigate, onLogout, apiKey, setApiKey }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTool, setActiveTool] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  if (!user) { navigate("login"); return null; }

  const tools = [
    { name: "Suppression d'arrière-plan", model: "google/nano-banana-edit", promptTemplate: "Remove the background from this image completely, leaving only the main subject on a transparent/white background.", type: "edit", premium: false },
    { name: "Gomme magique", model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Changement de style", model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Retouche Pro", model: "google/nano-banana-edit", promptTemplate: "", type: "edit", premium: false },
    { name: "Amélioration HD", model: "google/nano-banana-edit", promptTemplate: "Upscale this image to higher resolution with enhanced details, sharpness and clarity.", type: "edit", premium: false },
    { name: "Texte dans image", model: "nano-banana-2", promptTemplate: "", type: "edit", premium: true },
    { name: "Fusion multi-images", model: "nano-banana-2", promptTemplate: "", type: "edit", premium: true },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImages(prev => [...prev, { name: file.name, base64: ev.target.result.split(",")[1], preview: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => setUploadedImages(prev => prev.filter((_, i) => i !== idx));

  const handleGenerate = async () => {
    if (!apiKey) { setError("Veuillez entrer votre clé API dans les Paramètres."); return; }
    if (!prompt && activeTool?.name !== "Suppression d'arrière-plan" && activeTool?.name !== "Upscale HD") { setError("Veuillez entrer un prompt."); return; }
    if (uploadedImages.length === 0 && activeTool?.type === "edit") { setError("Veuillez uploader au moins une image."); return; }

    setLoading(true);
    setError("");
    setResultImage(null);

    const finalPrompt = activeTool.promptTemplate || prompt;
    const model = activeTool.model;

    try {
      let requestBody;
      if (activeTool.name === "Fusion multi-images" && uploadedImages.length > 1) {
        requestBody = {
          model: model,
          input: {
            prompt: prompt || "Blend these images into one coherent composition with consistent lighting and perspective.",
            image_input: uploadedImages.map(img => img.base64),
            output_format: "png",
            resolution: "1K"
          }
        };
      } else if (uploadedImages.length > 0) {
        requestBody = {
          model: model,
          input: {
            prompt: finalPrompt + (prompt && activeTool.promptTemplate ? " " + prompt : ""),
            image_urls: uploadedImages.map(img => "data:image/png;base64," + img.base64),
            output_format: "png"
          }
        };
      } else {
        requestBody = {
          model: model,
          input: {
            prompt: prompt,
            output_format: "png",
            image_size: "1:1"
          }
        };
      }

      // Appel vers VOTRE serveur backend (pas directement Kie.ai)
      // Remplacez cette URL par l'URL de votre backend Vercel
      const API_URL = apiKey || "https://retouch-api.vercel.app";
      const response = await fetch(API_URL + "/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.image_url) {
        setResultImage(data.image_url);
        setHistory(prev => [{ name: activeTool.name, prompt: prompt.slice(0, 40), date: "À l'instant", url: data.image_url }, ...prev]);
      } else {
        throw new Error(data.error || "Erreur lors de la génération.");
      }
    } catch (err) {
      setError(err.message || "Erreur de connexion à l'API.");
    } finally {
      setLoading(false);
    }
  };

  const closeTool = () => { setActiveTool(null); setPrompt(""); setUploadedImages([]); setResultImage(null); setError(""); };

  /* ── Tool workspace ── */
  if (activeTool) {
    const maxImages = activeTool.name === "Fusion multi-images" ? 8 : 1;
    return (
      <section style={{ padding: "80px clamp(16px,5vw,48px) 60px", maxWidth: 900, margin: "0 auto" }}>
        <button onClick={closeTool} className="back-btn"><ChevLeft /> Retour au dashboard</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div className="dash-stat-icon"><Sparkle s={20} c="#8b5cf6" /></div>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{activeTool.name}</h2>
            <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Modèle : {activeTool.model === "google/nano-banana" ? "Nano Banana (Standard)" : "Nano Banana 2 (Premium)"}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: resultImage ? "1fr 1fr" : "1fr", gap: 24 }}>
          {/* Input side */}
          <div>
            {/* Upload */}
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Image{maxImages > 1 ? "s" : ""} ({uploadedImages.length}/{maxImages})</label>
              <div className="upload-zone" onClick={() => document.getElementById("file-input").click()}>
                <input id="file-input" type="file" accept="image/*" multiple={maxImages > 1} onChange={handleFileUpload} style={{ display: "none" }} />
                <ImageIcon /><span style={{ fontSize: 13, color: "#9ca3af", marginTop: 8 }}>Cliquez ou glissez une image ici</span>
              </div>
              {uploadedImages.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  {uploadedImages.map((img, i) => (
                    <div key={i} style={{ position: "relative", width: 72, height: 72, borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                      <img src={img.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button onClick={() => removeImage(i)} style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt */}
            {!activeTool.promptTemplate && (
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Décrivez ce que vous souhaitez</label>
                <textarea className="form-input" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={
                  activeTool.name === "Magic Eraser" ? "Ex: Supprime la personne à droite de l'image" :
                  activeTool.name === "Restyle IA" ? "Ex: Transforme cette pièce en style scandinave minimaliste" :
                  activeTool.name === "Retouch Pro" ? "Ex: Améliore la luminosité et lisse la peau" :
                  activeTool.name === "Texte dans image" ? "Ex: Ajoute le texte 'SOLDES -50%' en gros au centre" :
                  activeTool.name === "Fusion multi-images" ? "Ex: Fusionne ces images en un seul visuel cohérent" :
                  "Décrivez votre modification..."
                } rows={4} style={{ resize: "vertical", minHeight: 100 }} />
              </div>
            )}

            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>{error}</p>}

            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Génération en cours...</>
              ) : (
                <><Sparkle s={16} c="#fff" /> Générer — 10 crédits</>
              )}
            </button>
          </div>

          {/* Result side */}
          {resultImage && (
            <div>
              <label className="form-label">Résultat</label>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb", background: "#faf9ff" }}>
                <img src={resultImage} alt="Résultat IA" style={{ width: "100%", display: "block" }} />
              </div>
              <a href={resultImage} download="retouch-result.png" className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 13, textDecoration: "none" }}>Télécharger l'image</a>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ── Main dashboard ── */
  return (
    <section style={{ padding: "80px clamp(16px,5vw,48px) 60px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
        <div><h1 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Bonjour, <span className="grad-text">{user.username}</span></h1><p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>Bienvenue sur votre espace Retouch IA</p></div>
        <button className="btn-secondary" style={{ fontSize: 13 }} onClick={onLogout}><LogoutIcon /> Déconnexion</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginBottom: 40 }}>
        {[{ icon: <CreditIcon />, val: user.credits, label: "Crédits restants" }, { icon: <ImageIcon />, val: user.images + history.length, label: "Images générées" }, { icon: <UserIcon />, val: user.plan, label: "Plan actuel" }].map((s, i) => (
          <div key={i} className="dash-stat"><div className="dash-stat-icon">{s.icon}</div><div><p style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{s.val}</p><p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>{s.label}</p></div></div>
        ))}
      </div>
      {!apiKey && (
        <div style={{ padding: 20, borderRadius: 14, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, color: "#ef4444" }}>⚠️ Serveur non configuré — allez dans <strong>Paramètres</strong> pour entrer l'URL de votre backend</span>
        </div>
      )}
      <div className="tab-bar" style={{ marginBottom: 32, display: "inline-flex" }}>
        {[["overview", "Vue d'ensemble"], ["history", "Historique"], ["settings", "Paramètres"]].map(([k, l]) => (<button key={k} className={activeTab === k ? "tab tab-active" : "tab"} onClick={() => setActiveTab(k)}>{l}</button>))}
      </div>
      {activeTab === "overview" && (<div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Outils Standard</h3>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 18px" }}>Nano Banana — ~0,02€/image</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
          {tools.filter(t => !t.premium).map(t => (<div key={t.name} className="dash-tool-card"><Sparkle s={18} c="#8b5cf6" /><span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{t.name}</span><button className="dash-tool-btn" onClick={() => setActiveTool(t)}>Utiliser</button></div>))}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Outils Premium</h3>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 18px" }}>Nano Banana 2 — ~0,04€/image</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 40 }}>
          {tools.filter(t => t.premium).map(t => (<div key={t.name} className="dash-tool-card" style={{ borderColor: "#c4b5fd" }}><Sparkle s={18} c="#ec4899" /><span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{t.name}</span><span style={{ fontSize: 10, fontWeight: 600, color: "#ec4899", background: "rgba(236,72,153,0.08)", padding: "2px 8px", borderRadius: 10 }}>PREMIUM</span><button className="dash-tool-btn" onClick={() => setActiveTool(t)}>Utiliser</button></div>))}
        </div>
        {history.length > 0 && (<>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 18px" }}>Dernières générations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.slice(0, 5).map((img, i) => (<div key={i} className="dash-history-row"><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden" }}><img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div><div><p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{img.name}</p><p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{img.prompt || "—"}</p></div></div><span style={{ fontSize: 12, color: "#9ca3af" }}>{img.date}</span></div>))}
          </div>
        </>)}
      </div>)}
      {activeTab === "history" && (<div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 18px" }}>Historique complet</h3>
        {history.length === 0 ? <p style={{ color: "#9ca3af", fontSize: 14 }}>Aucune génération pour le moment.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map((img, i) => (<div key={i} className="dash-history-row"><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden" }}><img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div><div><p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{img.name}</p><p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{img.prompt || "—"}</p></div></div><span style={{ fontSize: 12, color: "#9ca3af" }}>{img.date}</span></div>))}
          </div>
        )}
      </div>)}
      {activeTab === "settings" && (<div style={{ maxWidth: 500 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 24px" }}>Paramètres du compte</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="form-label">Nom d'utilisateur</label><input className="form-input" defaultValue={user.username} /></div>
          <div><label className="form-label">Email</label><input className="form-input" defaultValue="user@retouch.ai" /></div>
          <div><label className="form-label">Plan actuel</label><div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{user.plan}</span><button className="btn-secondary" style={{ fontSize: 12, padding: "6px 16px" }} onClick={() => navigate("pricing")}>Changer</button></div></div>
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginTop: 8 }}>
            <label className="form-label">URL du serveur API</label>
            <input className="form-input" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="https://retouch-api.vercel.app" />
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>L'URL de votre backend Vercel (sans /api/generate à la fin)</p>
            {apiKey && <p style={{ fontSize: 12, color: "#22c55e", marginTop: 4 }}>✓ Serveur configuré</p>}
          </div>
          <button className="btn-primary" style={{ marginTop: 8, alignSelf: "flex-start" }}>Sauvegarder</button>
        </div>
      </div>)}
    </section>
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
