import React, { useEffect, useState, useCallback } from "react";

export default function ImagemETudoMidia() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const whatsLink = `https://wa.me/5543998282173?text=${encodeURIComponent(
    "Olá! Cheguei pelo site da Imagem é Tudo Mídia e quero saber mais."
  )}`;

  useEffect(() => {
    // Smoke test básico
    console.assert(whatsLink.startsWith("https://wa.me/"), "WhatsApp link inválido");
  }, []);

  const styles = getStyles();

  return (
    <div style={styles.page}>
      <Header whatsLink={whatsLink} />
      <Hero whatsLink={whatsLink} />
      <Servicos />
      <Galeria />
      <Planos />
      <Contato
        whatsLink={whatsLink}
        name={name}
        email={email}
        message={message}
        setName={setName}
        setEmail={setEmail}
        setMessage={setMessage}
      />
      <Footer />
    </div>
  );
}

function Header({ whatsLink }) {
  const s = getStyles();
  return (
    <header style={s.header}>
      <div style={s.headerInner}>
        <a href="#home" style={s.brand}>
          <div style={s.brandMark}>IM</div>
          <div>
            <div style={s.brandTitle}>Imagem é Tudo Mídia</div>
            <div style={s.brandSub}>Tecnologia que Conecta, Comunica e Monetiza</div>
          </div>
        </a>
        <nav style={s.nav}>
          <a href="#servicos" style={s.navLink}>Serviços</a>
          <a href="#galeria" style={s.navLink}>Portfólio</a>
          <a href="#planos" style={s.navLink}>Planos</a>
          <a href="#contato" style={s.navLink}>Contato</a>
        </nav>
        <a href={whatsLink} target="_blank" rel="noreferrer" style={s.ctaPrimary}>💬 WhatsApp</a>
      </div>
    </header>
  );
}

function Hero({ whatsLink }) {
  const s = getStyles();
  return (
    <section id="home" style={s.heroSection}>
      <div style={s.container}>
        <h1 style={s.h1}>DOOH sem complicação: totens, elevadores e TVs que vendem por você</h1>
        <p style={s.lead}>Mídia digital inteligente em pontos de grande circulação: Londrina, Maringá e região.</p>
        <div style={s.rowGap}>
          <a href="#servicos" style={s.btnSolid}>Ver soluções →</a>
          <a href={whatsLink} target="_blank" rel="noreferrer" style={s.btnGhost}>Falar com especialista</a>
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  const s = getStyles();
  return (
    <section id="servicos" style={s.section}>
      <div style={s.container}>
        <h2 style={s.h2}>Soluções</h2>
        <div style={s.cardGrid3}>
          <Card
            icon="🖥️"
            title="Totem Imagem Pro"
            desc="Totens de 50” com base sólida e design premium, ideais para PDVs e recepções."
            bullets={['23.8" a 65"','Base sólida, dupla face opcional','Instalação limpa']}
          />
          <Card
            icon="🏢"
            title="ElevUp (Elevadores)"
            desc={'Telas 23.8" pretas com fixação 3M, sem furos. Conexão via rádio IP do condomínio.'}
            bullets={['Instala em ~30 min','Switch 8 portas + régua smart','Relatórios e suporte']}
          />
          <Card
            icon="⚙️"
            title="TV+ Box / Monitor Corporativo"
            desc="Transforme qualquer TV em ponto de mídia. Instalação rápida, login individual e suporte."
            bullets={['Locação mensal','Suporte e garantia','Login individual']}
          />
        </div>
      </div>
    </section>
  );
}

function Galeria() {
  const s = getStyles();
  // Substitua essas URLs pelas imagens tratadas quando fizer o upload
  const images = [
    { src: 'https://picsum.photos/id/1011/1200/800', cat: 'ElevUp 23.8' },
    { src: 'https://picsum.photos/id/1015/1200/800', cat: 'Totem 50' },
    { src: 'httpsum.photos/id/1039/1200/800', cat: 'Ambiente' },
    { src: 'https://picsum.photos/id/1040/1200/800', cat: 'ElevUp 23.8' },
    { src: 'https://picsum.photos/id/1041/1200/800', cat: 'Totem 50' },
    { src: 'https://picsum.photos/id/1042/1200/800', cat: 'Ambiente' },
  ];

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const openAt = (idx) => setLightbox({ open: true, index: idx });
  const close = () => setLightbox({ open: false, index: 0 });
  const prev = useCallback(() => setLightbox(v => ({ open: true, index: (v.index - 1 + images.length) % images.length })), [images.length]);
  const next = useCallback(() => setLightbox(v => ({ open: true, index: (v.index + 1) % images.length })), [images.length]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, prev, next]);

  return (
    <section id="galeria" style={{ ...s.section, background: '#f7f7f8' }}>
      <div style={s.container}>
        <h2 style={s.h2}>Portfólio & Casos Reais</h2>
        <p style={s.muted}>Exemplos de instalações reais tratadas profissionalmente — telas 23.8″ pretas e totens 50″ em sua cor original.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => openAt(i)} style={s.thumbBtn} aria-label={`Abrir imagem ${i+1}`}> 
              <img src={img.src} alt={img.cat} style={s.thumbImg} />
              <div style={s.thumbCaption}>{img.cat}</div>
            </button>
          ))}
        </div>
      </div>

      {lightbox.open && (
        <div role="dialog" aria-modal="true" style={s.lbOverlay} onClick={close}>
          <div style={s.lbInner} onClick={(e)=>e.stopPropagation()}>
            <img src={images[lightbox.index].src} alt={images[lightbox.index].cat} style={s.lbImg} />
            <div style={s.lbControls}>
              <button onClick={prev} style={s.lbBtn} aria-label="Anterior">←</button>
              <div style={s.lbTag}>{images[lightbox.index].cat}</div>
              <button onClick={next} style={s.lbBtn} aria-label="Próxima">→</button>
            </div>
            <button onClick={close} style={s.lbClose} aria-label="Fechar">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Planos() {
  const s = getStyles();
  return (
    <section id="planos" style={s.section}>
      <div style={s.container}>
        <h2 style={s.h2}>Planos de Locação</h2>
        <div style={s.cardGrid3}>
          <PlanCard
            destaque
            title="ElevUp – por tela"
            price="R$ 580/mês"
            note="Instalação, suporte e manutenção inclusos"
            items={['Tela 23.8" IPS Full HD','Fixação 3M sem furos','Switch + régua smart + roteador','Relatórios mensais']}
          />
          <PlanCard
            title="TV+ Box / Monitor Corporativo"
            price="R$ 300/mês"
            note="Android/mini‑PC + plataforma"
            items={['Instalação inclusa','Suporte e garantia','Login individual','Conteúdo por conta do cliente']}
          />
          <PlanCard
            title="Totem Imagem Pro"
            price="Sob consulta"
            note="Diferentes tamanhos e acabamentos"
            items={['23.8" a 65"','Base sólida, dupla face opcional','Design minimalista','Projeto e implantação']}
          />
        </div>
      </div>
    </section>
  );
}

function Contato({ whatsLink, name, email, message, setName, setEmail, setMessage }) {
  const s = getStyles();
  return (
    <section id="contato" style={{ padding: '64px 0', background: '#0a0a0b', color: '#fff' }}>
      <div style={s.containerGrid2}>
        <div>
          <h3 style={{ fontSize: 24, margin: 0 }}>Pronto para colocar sua marca em evidência?</h3>
          <p style={{ opacity: 0.8, marginTop: 8 }}>Envie uma mensagem e retornamos com um orçamento sob medida.</p>
          <div style={s.rowGap}>
            <a href={whatsLink} target="_blank" rel="noreferrer" style={s.btnPrimaryDark}>💬 WhatsApp</a>
            <a href="mailto:imagemetudomidia@gmail.com" style={s.btnGhostDark}>✉️ Enviar e‑mail</a>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `mailto:imagemetudomidia@gmail.com?subject=${encodeURIComponent('Novo contato pelo site')}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`)}`;
          }}
          style={s.form}
        >
          <div style={s.formField}>
            <label style={s.label}>Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" style={s.input} />
          </div>
          <div style={s.formField}>
            <label style={s.label}>E‑mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" style={s.input} />
          </div>
          <div style={s.formField}>
            <label style={s.label}>Mensagem</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Conte um pouco do seu projeto" style={{ ...s.input, height: 120 }} />
          </div>
          <button style={s.btnSubmit}>Enviar</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const s = getStyles();
  return (
    <footer style={s.footerWrap}>
      <div style={s.containerGrid3Sm}>
        <div>
          <div style={{ fontWeight: 600 }}>Imagem é Tudo Mídia</div>
          <div style={{ color: '#5f6368', marginTop: 4 }}>Tecnologia que Conecta, Comunica e Monetiza</div>
          <div style={{ marginTop: 8 }}><a href="https://www.instagram.com/prazertj_____" target="_blank" rel="noreferrer" style={s.navLink}>📸 @prazertj_____</a></div>
        </div>
        <div style={{ color: '#2f3437' }}>
          <div>📍 Rua Maria Quitéria, 188 – PR</div>
          <div>📞 (43) 99828‑2173</div>
          <div>✉️ imagemetudomidia@gmail.com</div>
          <div>🧾 CNPJ: 32.254.943/0001-37</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Links rápidos</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><a href="#servicos" style={s.navLink}>Soluções</a></li>
            <li><a href="#galeria" style={s.navLink}>Portfólio</a></li>
            <li><a href="#planos" style={s.navLink}>Planos</a></li>
            <li><a href="#contato" style={s.navLink}>Contato</a></li>
          </ul>
        </div>
      </div>
      <div style={s.copy}>© {new Date().getFullYear()} Imagem é Tudo Mídia. Todos os direitos reservados.</div>
    </footer>
  );
}

function Card({ icon, title, desc, bullets }) {
  const s = getStyles();
  return (
    <div style={s.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={s.iconBadge}>{icon}</div>
        <div style={{ fontWeight: 600 }}>{title}</div>
      </div>
      <p style={s.cardDesc}>{desc}</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>{bullets.map((b, i) => (<li key={i}>✅ {b}</li>))}</ul>
    </div>
  );
}

function PlanCard({ title, price, note, items, destaque }) {
  const s = getStyles();
  const wrap = destaque ? { ...s.planCard, background: '#0a0a0b', color: '#fff' } : s.planCard;
  const btn = destaque ? s.btnLight : s.btnDark;
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>{title}</div>
        {destaque && <span style={s.badgeOutline}>Mais escolhido</span>}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>{price}</div>
      <div style={{ opacity: 0.8, marginTop: 4 }}>{note}</div>
      <ul style={{ margin: '12px 0 0 18px' }}>{items.map((b, i) => (<li key={i}>✅ {b}</li>))}</ul>
      <a href="#contato" style={{ ...btn, marginTop: 16, display: 'inline-flex' }}>Solicitar proposta →</a>
    </div>
  );
}

function getStyles() {
  return {
    page: { fontFamily: 'Inter,system-ui', background: '#fff', color: '#0b0b0e' },
    container: { maxWidth: 1120, margin: '0 auto', padding: '0 20px' },
    header: { position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.9)', borderBottom: '1px solid #eee' },
    headerInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 20px' },
    brand: { display: 'flex', alignItems: 'center', gap: 10, color: 'inherit', textDecoration: 'none' },
    brandMark: { height: 36, width: 36, borderRadius: 12, background: 'linear-gradient(135deg,#000,#444)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 },
    brandTitle: { fontWeight: 600 },
    brandSub: { fontSize: 12, color: '#6b7280' },
    nav: { display: 'flex', gap: 16 },
    navLink: { color: '#374151', textDecoration: 'none' },
    ctaPrimary: { background: '#059669', color: '#fff', padding: '10px 14px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 },

    heroSection: { background: '#0a0a0b', color: '#fff', padding: '72px 0' },
    h1: { fontSize: 36, margin: 0, fontWeight: 700 },
    lead: { opacity: 0.85, marginTop: 12, maxWidth: 640 },
    rowGap: { display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' },
    btnSolid: { background: '#fff', color: '#0b0b0e', padding: '12px 16px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 },
    btnGhost: { border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '12px 16px', borderRadius: 12, textDecoration: 'none' },

    section: { padding: '64px 0' },
    h2: { fontSize: 28, margin: 0, fontWeight: 700 },
    muted: { color: '#6b7280', marginTop: 6 },
    cardGrid3: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' },

    card: { background: '#fff', border: '1px solid #eee', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
    iconBadge: { height: 36, width: 36, borderRadius: 12, background: '#111827', color: '#fff', display: 'grid', placeItems: 'center' },
    cardDesc: { color: '#4b5563', fontSize: 14, margin: '8px 0 12px' },

    # Galeria
    thumbBtn: { padding: 0, border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer' },
    thumbImg: { width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, display: 'block' },
    thumbCaption: { padding: 10, fontWeight: 600, fontSize: 14 },

    # Lightbox
    lbOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', display: 'grid', placeItems: 'center', zIndex: 100 },
    lbInner: { position: 'relative', maxWidth: '90vw', maxHeight: '90vh' },
    lbImg: { maxWidth: '90vw', maxHeight: '80vh', borderRadius: 12, display: 'block' },
    lbControls: { marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
    lbBtn: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 12px', cursor: 'pointer' },
    lbTag: { color: '#fff', fontWeight: 600 },
    lbClose: { position: 'absolute', top: -10, right: -10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 999, width: 36, height: 36, cursor: 'pointer' },

    caseCard: { background: '#fff', border: '1px solid #eee', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,.04)' },

    planCard: { background: '#fff', border: '1px solid #eee', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
    btnLight: { background: '#fff', color: '#0b0b0e', padding: '10px 14px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 },
    btnDark: { background: '#0b0b0e', color: '#fff', padding: '10px 14px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 },
    badgeOutline: { fontSize: 12, padding: '4px 8px', border: '1px solid rgba(255,255,255,.3)', borderRadius: 999 },

    containerGrid2: { maxWidth: 1120, margin: '0 auto', padding: '0 20px', display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' },
    form: { background: '#fff', color: '#0b0b0e', borderRadius: 16, padding: 16 },
    formField: { marginBottom: 10 },
    label: { fontSize: 13, fontWeight: 600 },
    input: { marginTop: 6, width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '10px 12px', fontSize: 14 },
    btnPrimaryDark: { background: '#10b981', color: '#0b0b0e', padding: '12px 16px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 },
    btnGhostDark: { border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '12px 16px', borderRadius: 12, textDecoration: 'none' },
    btnSubmit: { width: '100%', background: '#0b0b0e', color: '#fff', border: 0, borderRadius: 12, padding: 12, fontWeight: 600 },

    footerWrap: { padding: '40px 0', background: '#fff', borderTop: '1px solid #eee' },
    containerGrid3Sm: { maxWidth: 1120, margin: '0 auto', padding: '0 20px', display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' },
    copy: { maxWidth: 1120, margin: '16px auto 0', padding: '0 20px', fontSize: 12, color: '#6b7280' },
  };
}
