'use client'

import { useEffect, useRef, useState } from 'react'

/* ── ALL IMAGES ─────────────────────────────────────────────── */
const IMG = {
  heroBaking:   '/products/hero-baking.jpg',
  chocolate:    '/products/chocolate.jpg',
  vanilla:      '/products/vanilla.jpg',
  strawberry:   '/products/strawberry.jpg',
  biscoff:      '/products/biscoff.jpg',
  freshFruit:   '/products/fresh-fruit.jpg',
  redVelvet:    '/products/red-velvet.jpg',
  heartCake:    '/products/heart-cake.jpg',
  blackForest:  '/products/black-forest.jpg',
  butterscotch: '/products/butterscotch.jpg',
  berryFruit:   '/products/fresh-fruit.jpg',
  chocTruffle:  '/products/choc-truffle.jpg',
  ferrero:      '/products/ferrero.jpg',
  biscoffSlice: '/products/biscoff.jpg',
  chipStack:    '/products/chip-stack.jpg',
  nutella:      '/products/nutella.jpg',
  almond:       '/products/almond.jpg',
  rvCookie:     '/products/red-velvet-cookie.jpg',
  almondSingle: '/products/almond-single.jpg',
  nutella2:     '/products/nutella-2.jpg',
  cheesecake:   '/products/cheesecake.jpg',
}

/* ── DATA ───────────────────────────────────────────────────── */
const PASTRIES = [
  { name: 'Death by Chocolate', sub: 'Chocolate',         img: IMG.chocolate   },
  { name: 'Snow White',         sub: 'Vanilla',           img: IMG.vanilla     },
  { name: 'Pretty in Pink',     sub: 'Strawberry',        img: IMG.strawberry  },
  { name: 'Golden Wish',        sub: 'Biscoff & Caramel', img: IMG.biscoff     },
  { name: 'Lost in Garden',     sub: 'Fresh Fruits',      img: IMG.freshFruit  },
  { name: 'Red Eve',            sub: 'Red Velvet',        img: IMG.redVelvet   },
]
const SIGNATURE = [
  { name: "Siren's Kiss",      sub: 'Classic Vanilla',   img: IMG.vanilla,      desc: 'Soft vanilla sponge with smooth vanilla cream or buttercream' },
  { name: 'Dark Spell',        sub: 'Chocolate Truffle', img: IMG.chocTruffle,  desc: 'Rich chocolate cake layered with silky ganache' },
  { name: 'Velvet Temptation', sub: 'Red Velvet',        img: IMG.redVelvet,    desc: 'Moist red velvet with cream cheese or buttercream frosting' },
  { name: 'Fallen Forest',     sub: 'Black Forest',      img: IMG.blackForest,  desc: 'Chocolate sponge with cherries and fresh cream' },
  { name: 'Mr Sunshine',       sub: 'Butterscotch',      img: IMG.butterscotch, desc: 'Crunchy praline with silky caramel cream' },
  { name: 'Lost in Garden',    sub: 'Fresh Fruit Cake',  img: IMG.berryFruit,   desc: 'Light sponge adorned with seasonal fresh fruits' },
]
const BENTO = [
  { name: 'Just You',       sub: 'Red Heart',  img: IMG.heartCake   },
  { name: 'Black Pearl',    sub: 'Chocolate',  img: IMG.chocTruffle },
  { name: 'Handsome Jin',   sub: 'Purple',     img: IMG.ferrero     },
  { name: 'Pretty in Pink', sub: 'Strawberry', img: IMG.strawberry  },
]
const PREMIUM = [
  { name: 'Golden Crown',    sub: 'Lotus Biscoff',    img: IMG.biscoffSlice, desc: 'Soft cake with Biscoff spread and cream'        },
  { name: 'Racing Ferrero',  sub: 'Ferrero Rocher',   img: IMG.ferrero,      desc: 'Chocolate cake with hazelnut crunch'            },
  { name: 'Oreo Cream Cake', sub: 'Chocolate & Oreo', img: IMG.chocTruffle,  desc: 'Chocolate and Oreo loaded cream'                },
  { name: 'Lost in Garden',  sub: 'Fresh Fruit',      img: IMG.freshFruit,   desc: 'Light sponge with seasonal fresh fruits'        },
]
const COOKIES = [
  { name: 'Classic Chocolate Chip', img: IMG.chipStack    },
  { name: 'Double Chocolate',       img: IMG.nutella2     },
  { name: 'Butter Cookies',         img: IMG.almondSingle },
  { name: 'Nutella Filled',         img: IMG.nutella      },
  { name: 'Lotus Biscoff',          img: IMG.biscoffSlice },
  { name: 'Red Velvet',             img: IMG.rvCookie     },
  { name: 'Almond Crunch',          img: IMG.almond       },
]

const CONTACTS = [
  { label: 'WhatsApp',  sub: 'Chat with us directly',         icon: '💬', color: '#25D366', href: 'https://wa.me/918888888888'                    },
  { label: 'Instagram', sub: '@justcakeandcookie',            icon: '📸', color: '#E1306C', href: 'https://instagram.com/justcakeandcookie'       },
  { label: 'Email',     sub: 'hello@justcakeandcookie.com',   icon: '✉️', color: '#c8860a', href: 'mailto:hello@justcakeandcookie.com'            },
  { label: 'Call',      sub: '+91 88888 88888',               icon: '📞', color: '#3A1800', href: 'tel:+918888888888'                             },
]

const MARQUEE = ['Handcrafted Daily', '✦', 'Premium Ingredients', '✦', 'Made With Love', '✦', 'Bespoke Cakes', '✦', 'Artisan Cookies', '✦', 'Same-Day Delivery', '✦']

/* ── REVEAL HOOK (replaces framer-motion) ──────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          io.unobserve(el)
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return ref
}

/* ── SCROLL PROGRESS ────────────────────────────────────────── */
function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      ref.current.style.transform = `scaleX(${Math.min(pct, 1)})`
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" ref={ref} />
}

/* ── COUNT UP ──────────────────────────────────────────────── */
function CountUp({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(to * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: .4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── LABEL ─────────────────────────────────────────────────── */
function Label({ t }) {
  return (
    <div className="lpill">
      <span className="ldot" />
      <span>{t}</span>
    </div>
  )
}

/* ── SECTION HEAD ───────────────────────────────────────────── */
function SectionHead({ label, title, sub }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal" style={{ marginBottom: '2.2rem' }}>
      <Label t={label} />
      <h2 className="h2" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="flourish">
        <span className="flourish-line" />
        <span className="flourish-medallion" />
        <span className="flourish-line right" />
      </div>
      {sub && <p className="sub">{sub}</p>}
    </div>
  )
}

/* ── SECTION SHELL ───────────────────────────────────────────── */
function SectionShell({ children }) {
  const ref = useReveal()
  return (
    <div className="sec-inner">
      <div ref={ref} className="shell reveal">
        {children}
      </div>
    </div>
  )
}

/* ── SCROLL ROW ─────────────────────────────────────────────── */
function ScrollRow({ items, renderCard }) {
  return (
    <div className="hscroll-wrap">
      <div className="hscroll">
        {items.map((item, i) => renderCard(item, i))}
      </div>
    </div>
  )
}

/* ── PRODUCT CARD ──────────────────────────────────────────── */
function PCard({ item, i }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`pcard reveal reveal-d${Math.min(i + 1, 5)}`}>
      <div className="pcard-badge">✨</div>
      <div className="pcard-img">
        <img src={item.img} alt={item.name} width={230} height={202} loading="lazy" decoding="async" />
      </div>
      <div className="pcard-body">
        <div className="pcard-name">{item.name}</div>
        {item.sub  && <div className="pcard-sub">{item.sub}</div>}
        {item.desc && <p className="pcard-desc">{item.desc}</p>}
      </div>
    </div>
  )
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 55)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['Menu','#menu'],['Cakes','#cakes'],['Cookies','#cookies'],['About','#about'],['Contact','#contact']]

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: sc ? '.7rem clamp(1rem,3vw,2.2rem)' : '1.1rem clamp(1rem,3vw,2.2rem)',
        background: sc ? 'rgba(255,253,180,.85)' : 'transparent',
        backdropFilter: sc ? 'blur(18px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: sc ? 'blur(18px) saturate(1.3)' : 'none',
        boxShadow: sc ? '0 1px 32px rgba(184,134,11,.10)' : 'none',
        borderBottom: sc ? '1px solid rgba(184,134,11,.14)' : '1px solid transparent',
        transition: 'all .42s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <a
        href="#home"
        style={{ display: 'flex', alignItems: 'center', gap: '.7rem', textDecoration: 'none' }}
      >
        <div
          style={{
            width: 48, height: 48, borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(184,134,11,.35), 0 0 0 2px rgba(255,255,255,.6), 0 0 0 3px rgba(184,134,11,.30)',
            background: '#fff',
          }}
        >
          <img src="/logo.jpg" alt="Just Cake & Cookie" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 18, lineHeight: 1.05, color: 'var(--ink)', letterSpacing: '-.01em' }}>
            Just Cake
          </div>
          <div style={{ fontSize: 9, letterSpacing: '2.4px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--gold)', marginTop: 2 }}>
            &amp; Cookie
          </div>
        </div>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.7rem' }}>
        <div style={{ display: 'flex', gap: '1.7rem' }} className="nav-links-row">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="nav-link">{l}</a>
          ))}
        </div>
        <a
          href="#contact"
          className="btn-dark"
          style={{ height: 44, padding: '0 1.3rem', fontSize: 13 }}
        >
          Order Now <span style={{ fontSize: 14 }}>→</span>
        </a>
      </div>
    </nav>
  )
}

/* ── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [entered, setEntered] = useState(false)
  useEffect(() => { setEntered(true) }, [])

  const cls = entered ? 'hero-enter entered' : 'hero-enter'

  return (
    <section id="home">
      <div className="hero">
        <div>
          <div className={`${cls} hero-enter-d1`}>
            <span className="hero-kicker">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold-3)' }} />
              Fine handmade patisserie
            </span>
          </div>

          <h1 className="hero-title">
            <span className={`${cls} hero-enter-d2`} style={{ display: 'inline-block' }}>Crafted for</span>
            <br />
            <em className={`${cls} hero-enter-d3`} style={{ display: 'inline-block' }}>elegant cravings</em>
          </h1>

          <p className={`hero-copy ${cls} hero-enter-d3`}>
            Signature cakes, delicate pastries, and artisan cookies — each made to feel intimate, indulgent, and beautifully memorable.
          </p>

          <div className={`hero-actions ${cls} hero-enter-d4`}>
            <a href="#cakes" className="btn-dark">
              View Collection <span style={{ fontSize: 16 }}>→</span>
            </a>
            <a href="#contact" className="btn-light">
              Place an Order
            </a>
          </div>

          <div className={`hero-stats ${cls} hero-enter-d5`}>
            <div className="hero-stat"><strong><CountUp to={50} suffix="+" /></strong><span>Signature flavours</span></div>
            <div className="hero-stat"><strong><CountUp to={7} /></strong><span>Cookie varieties</span></div>
            <div className="hero-stat"><strong><CountUp to={100} suffix="%" /></strong><span>Hand-finished</span></div>
          </div>
        </div>

        <div className={entered ? 'hero-visual hero-visual-enter entered' : 'hero-visual hero-visual-enter'}>
          <div className="hero-orb" />
          <div className="hero-ring" />
          <div className="hero-ring-2" />

          <div className="hero-photo">
            <img src={IMG.heroBaking} alt="Artisan cakes and cookies beautifully arranged" width={400} height={400} decoding="async" />
          </div>

          <span className="hero-sparkle" style={{ top: '12%',  right: '10%' }}>✦</span>
          <span className="hero-sparkle" style={{ bottom: '18%', left: '4%'  }}>✧</span>
          <span className="hero-sparkle" style={{ top: '46%', left: '-2%' }}>✦</span>

          <div className={`hero-chip a ${cls} hero-enter-d5`}>
            <small>Signature</small>
            Bespoke celebration cakes
          </div>

          <div className={`hero-chip b ${cls} hero-enter-d5`}>
            <small>Fresh daily</small>
            Artisan cookies &amp; pastries
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2.2rem' }}>
        <svg width="22" height="34" viewBox="0 0 22 34">
          <rect x="1" y="1" width="20" height="32" rx="10" fill="none" stroke="rgba(184,134,11,.40)" strokeWidth="1.5"/>
          <circle cx="11" cy="9" r="3" fill="var(--gold)" />
        </svg>
      </div>
    </section>
  )
}

/* ── MARQUEE STRIP ──────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  )
}

/* ── PASTRIES ───────────────────────────────────────────────── */
function Pastries() {
  return (
    <section id="menu" className="sec">
      <SectionShell>
        <SectionHead
          label="Fresh Daily"
          title='Our <em>Pastries</em>'
          sub="Individually crafted, each named for the feeling it stirs. Made fresh every morning."
        />
        <ScrollRow items={PASTRIES} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
      </SectionShell>
    </section>
  )
}

/* ── SIGNATURE CAKES ─────────────────────────────────────────── */
function SignatureCakes() {
  return (
    <section id="cakes" className="sec">
      <SectionShell>
        <SectionHead
          label="Chef's Finest"
          title='Signature <em>Cakes</em>'
          sub="Each cake is a narrative — pull up a chair, there's a slice with your name on it."
        />
        <ScrollRow items={SIGNATURE} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
      </SectionShell>
    </section>
  )
}

/* ── BENTO CAKES ─────────────────────────────────────────────── */
function BentoCakes() {
  return (
    <section className="sec">
      <SectionShell>
        <SectionHead
          label="Mini Masterpieces"
          title='Bento <em>Cakes</em>'
          sub="Small cakes, big emotions. Perfectly portioned for personal, intimate moments."
        />
        <ScrollRow items={BENTO} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
      </SectionShell>
    </section>
  )
}

/* ── PREMIUM ─────────────────────────────────────────────────── */
function PremiumCakes() {
  return (
    <section id="premium" className="sec">
      <SectionShell>
        <SectionHead
          label="Top Tier"
          title='Premium <em>Selection</em>'
          sub="Crafted with the finest ingredients — reserved for moments that deserve the very best."
        />
        <ScrollRow items={PREMIUM} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
      </SectionShell>
    </section>
  )
}

/* ── COOKIES ─────────────────────────────────────────────────── */
function Cookies() {
  return (
    <section id="cookies" className="sec">
      <SectionShell>
        <SectionHead
          label="Freshly Baked"
          title='Artisan <em>Cookies</em>'
          sub="Crispy golden edges, chewy centres — seven irresistible varieties baked fresh daily."
        />
        <ScrollRow items={COOKIES} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
      </SectionShell>
    </section>
  )
}

/* ── CHEESECAKE ──────────────────────────────────────────────── */
function Cheesecake() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  return (
    <section className="sec">
      <SectionShell>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3.2rem', alignItems: 'center' }}>
          <div ref={ref1} className="reveal">
            <Label t="The Classic" />
            <h2 className="h2">The <em>Cheesecake</em></h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, maxWidth: 460, fontSize: '1.02rem', marginTop: '.7rem' }}>
              Velvety smooth cheesecakes baked fresh daily — a buttery crust beneath rich, silken filling. Ask us about today&apos;s flavour selection.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href="#contact" className="btn-gold">Order Today <span style={{ fontSize: 16 }}>→</span></a>
            </div>
          </div>
          <div ref={ref2} className="reveal from-scale reveal-d2"
            style={{ borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 80px -16px rgba(184,134,11,.32), 0 0 0 1px rgba(184,134,11,.18)', cursor: 'default', position: 'relative' }}
          >
            <img src={IMG.cheesecake} alt="Cheesecake" width={560} height={560}
              style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} loading="lazy" decoding="async" />
            <div
              style={{
                position: 'absolute', top: 16, right: 16,
                padding: '.5rem .9rem', borderRadius: 999,
                background: 'rgba(255,254,249,.94)',
                fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--gold)', border: '1px solid rgba(184,134,11,.18)',
              }}
            >
              ✨ Chef&apos;s Pick
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function Contact() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  return (
    <section id="contact" className="sec">
      <SectionShell>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div ref={ref1} className="reveal">
            <Label t="Get in Touch" />
            <h2 className="h2">Reserve <em>your order</em></h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, maxWidth: 420, fontSize: '1.02rem', marginTop: '.7rem' }}>
              For custom cakes, gifting boxes, and daily bakes — reach out and we&apos;ll help curate the perfect order.
            </p>
          </div>

          <div ref={ref2} className="contact-list reveal reveal-d2">
            {CONTACTS.map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-tile"
              >
                <div className="contact-icon" style={{ background: `${c.color}1a`, boxShadow: `inset 0 0 0 1px ${c.color}30` }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 18, lineHeight: 1.2, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted-2)', marginTop: 3 }}>{c.sub}</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  )
}

/* ── ABOUT ───────────────────────────────────────────────────── */
function About() {
  const ref1 = useReveal()
  const stats = [
    { n: '50+',  count: 50,  suffix: '+', l: 'Flavours',     e: '🎂' },
    { n: '7',    count: 7,                l: 'Cookie Kinds', e: '🍪' },
    { n: '100%', count: 100, suffix: '%', l: 'Handmade',     e: '✋' },
    { n: '∞',                              l: 'With Love',    e: '💛' },
  ]
  return (
    <section id="about" className="sec" style={{ paddingBottom: 'clamp(1.2rem,2vw,2rem)' }}>
      <SectionShell>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div ref={ref1} className="reveal">
            <Label t="Our Story" />
            <h2 className="h2" style={{ marginBottom: '1.3rem' }}>
              Baked with heart,<br />
              <em>served with soul</em>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.88, maxWidth: 440, fontSize: '1.02rem', marginBottom: '1rem' }}>
              Just Cake &amp; Cookie was born from a simple belief — the finest things in life should taste extraordinary. We use time-honoured recipes and the freshest ingredients to bring joy to every celebration.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.88, maxWidth: 440, fontSize: '1.02rem' }}>
              From intimate bento cakes to grand premium creations, every order is crafted personally, with care and intention.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {stats.map((s, i) => (
              <AboutStat key={s.l} s={s} i={i} />
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  )
}

/* ── ABOUT STAT (extracted to avoid hook-in-loop) ────────────── */
function AboutStat({ s, i }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`about-stat reveal from-scale reveal-d${Math.min(i + 1, 5)}`}>
      <div style={{ fontSize: 26, marginBottom: '.6rem' }}>{s.e}</div>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 32, fontWeight: 700, color: 'var(--ink)', lineHeight: 1, background: 'linear-gradient(135deg, var(--ink), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {s.count != null ? <CountUp to={s.count} suffix={s.suffix || ''} /> : s.n}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--muted-2)', fontWeight: 600, marginTop: '.45rem', letterSpacing: '.6px', textTransform: 'uppercase' }}>{s.l}</div>
    </div>
  )
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '0 clamp(1rem,3vw,2.5rem) clamp(1.2rem,2.5vw,2rem)' }}>
      <div className="footer-shell">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.4rem', marginBottom: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(184,134,11,.45), 0 0 0 2px rgba(245,223,160,.4)',
            }}>
              <img src="/logo.jpg" alt="Just Cake & Cookie" width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 17, lineHeight: 1.1, color: '#f5e7b0' }}>
                Just Cake &amp; Cookie
              </div>
              <div style={{ fontSize: 9.5, color: '#c9993d', letterSpacing: '2.2px', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>
                Taste the love in every crumb
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[['Menu','#menu'],['Cakes','#cakes'],['Cookies','#cookies'],['Contact','#contact'],['About','#about']].map(([l, h]) => (
              <a key={l} href={h} className="footer-link">{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '.7rem' }}>
            {[
              { href: 'https://wa.me/918888888888',              icon: '💬', bg: '#25D366', label: 'WhatsApp' },
              { href: 'https://instagram.com/justcakeandcookie', icon: '📸', bg: '#E1306C', label: 'Instagram' },
              { href: 'mailto:hello@justcakeandcookie.com',      icon: '✉️', bg: '#c8860a', label: 'Email' },
              { href: 'tel:+918888888888',                       icon: '📞', bg: '#3A1800', label: 'Call' },
            ].map(s => (
              <a
                key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{
                  width: 38, height: 38, borderRadius: '50%', background: s.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 6px 16px rgba(0,0,0,.30)',
                  border: '1px solid rgba(255,255,255,.10)',
                  transition: 'transform .3s ease',
                }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(245,223,160,.16)', paddingTop: '1.1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.7rem' }}>
          <p style={{ fontSize: 12, color: '#a88a50' }}>
            © {new Date().getFullYear()} Just Cake &amp; Cookie. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: '#7a6040', fontStyle: 'italic', fontFamily: 'var(--fd)' }}>
            Made with 💛 for every sweet moment
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── ROOT ────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Pastries />
        <SignatureCakes />
        <BentoCakes />
        <PremiumCakes />
        <Cookies />
        <Cheesecake />
        <Contact />
        <About />
      </main>
      <Footer />
    </>
  )
}
