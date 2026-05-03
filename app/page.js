'use client'

import { useEffect, useRef, useState } from 'react'

/* ── ALL IMAGES ─────────────────────────────────────────────── */
const IMG = {
  almond:       '/pictures/cookies_almondcrunch.jpg',
  almondSingle: '/pictures/cookies_buttercookies.jpg',
  cookies_lotusbiscoff: '/pictures/cookies_lotusbiscoff.png',
  berryFruit:   '/pictures/signature_lostingarden.jpg',
  blackForest:  '/pictures/signature_blackforest.jpg',
  blackPearl:   '/pictures/bento_blackpearl.jpeg',
  butterscotch: '/pictures/flowers_buttercupbliss.jpg',
  casualRed:    '/pictures/bento_casualred.jpeg',
  cheesecake:   '/pictures/cheesecake_classic.jpeg',
  cheesecake2:  '/pictures/cheesecake_special.jpeg',
  chipStack:    '/pictures/cookies_classicchocolatechip.jpg',
  chocTruffle:  '/pictures/flowers_chocolatetrufflerose.jpg',
  chocolate:    '/pictures/pastries_deathbychocolate.jpeg',
  darkSpell:    '/pictures/signature_darkspell.jpeg',
  fallenForest: '/pictures/signature_fallenforest.jpeg',
  goldenCrown:  '/pictures/premium_goldencrown.png',
  goldenWish:   '/pictures/pastries_goldenwish.jpeg',
  gmail:        '/pictures/Gmail logo - United States.jpeg',
  handsomeJin:  '/pictures/bento_handsomejin.jpeg',
  heartCake:    '/pictures/flowers_heartpetalcake.jpg',
  hellon:       '/pictures/bento_hellon.jpeg',
  heroBaking:   '/products/main pic.png',
  insta:        '/pictures/insta logo.jpg',
  justYou:      '/pictures/bento_justyou.jpeg',
  lost:         '/pictures/pastries_lostingarden.png',
  lostInGarden: '/pictures/premium_lostingarden.png',
  mrSunshine:   '/pictures/signature_mrsunshine.jpeg',
  nutella:      '/pictures/cookies_nutellafilled.jpg',
  nutella2:     '/pictures/cookies_doublechocolate.jpg',
  oreoCreamCake: '/pictures/premium_oreocreamcake.jpeg',
  phonecalllogo:'/pictures/phonecall logo.jpeg',
  pinkLove:     '/pictures/bento_pinklove.jpeg',
  purpleWine:   '/pictures/bento_purplewine.jpeg',
  prettyInPink: '/pictures/bento_prettyinpink.jpeg',
  prettyInPinkNew: '/pictures/pastries_prettyinpink.png',
  racingFerrero: '/pictures/premium_racingferrero.png',
  redEve:       '/pictures/pastries_redeve.jpeg',
  redVelvet:    '/pictures/flowers_velvetrosebloom.jpg',
  rvCookie:     '/pictures/cookies_redvelvet.jpg',
  sirensKiss:   '/pictures/signature_sirenskiss.jpeg',
  strawberry:   '/pictures/flowers_rosegardendelight.jpg',
  vanilla:      '/pictures/pastries_snowwhite.jpeg',
  velvetTemptation: '/pictures/signature_velvettemptation.jpeg',
  whatsapplogo: '/pictures/whatsapplogo.jpg',
  yellonn:      '/pictures/bento_yellonn.jpeg',
  flowerCombo1: '/pictures/flowers_combo_1.jpg',
  flowerCombo2: '/pictures/flowers_combo_2.jpg',
  flowerCombo3: '/pictures/flowers_combo_3.jpg',
  flowerCombo4: '/pictures/flowers_combo_4.jpg',
  flowerCombo5: '/pictures/flowers_combo_5.jpg',
  flowerCombo6: '/pictures/flowers_combo_6.jpg',
  flowerCombo7: '/pictures/flowers_combo_7.jpg',
  flowerCombo8: '/pictures/flowers_combo_8.jpg',
}

/* ── DATA ───────────────────────────────────────────────────── */
const SIGNATURE = [
  { name: "Siren's Kiss",      sub: 'Classic Vanilla',   img: IMG.sirensKiss,      desc: 'Soft vanilla sponge with smooth vanilla cream or buttercream' },
  { name: 'Dark Spell',        sub: 'Chocolate Truffle', img: IMG.darkSpell,  desc: 'Rich chocolate cake layered with silky ganache' },
  { name: 'Velvet Temptation', sub: 'Red Velvet',        img: IMG.velvetTemptation,    desc: 'Moist red velvet with cream cheese or buttercream frosting' },
  { name: 'Fallen Forest',     sub: 'Black Forest',      img: IMG.fallenForest,  desc: 'Chocolate sponge with cherries and fresh cream' },
  { name: 'Mr Sunshine',       sub: 'Butterscotch',      img: IMG.mrSunshine, desc: 'Crunchy praline with silky caramel cream' },
  { name: 'Lost in Garden',    sub: 'Fresh Fruit Cake',  img: IMG.berryFruit,   desc: 'Light sponge adorned with seasonal fresh fruits' },
]
const PASTRIES = [
  { name: 'Death by Chocolate', sub: 'Chocolate',         img: IMG.chocolate,   desc: 'Deeply indulgent chocolate layers with velvety ganache frosting' },
  { name: 'Snow White',         sub: 'Vanilla',           img: IMG.vanilla,     desc: 'Delicate vanilla sponge with light cream and a dusting of sugar' },
  { name: 'Pretty in Pink',     sub: 'Strawberry',        img: IMG.prettyInPinkNew,  desc: 'Fluffy strawberry sponge with fresh berry compote filling' },
  { name: 'Golden Wish',        sub: 'Biscoff & Caramel', img: IMG.goldenWish,     desc: 'Buttery Biscoff crust with silky caramel cream layers' },
  { name: 'Lost in Garden',     sub: 'Fresh Fruits',      img: IMG.lost,  desc: 'Light sponge adorned with hand-picked seasonal fresh fruits' },
  { name: 'Red Eve',            sub: 'Red Velvet',        img: IMG.redEve,   desc: 'Moist red velvet with smooth cream cheese frosting' },
]
const BENTO = [
  { name: 'Just You',       sub: 'Red Heart',     img: IMG.justYou,     desc: 'Intimate heart-shaped bento with velvety buttercream' },
  { name: 'Black Pearl',    sub: 'Chocolate',     img: IMG.blackPearl,  desc: 'Mini chocolate cake with glossy dark ganache finish' },
  { name: 'Handsome Jin',   sub: 'Purple',        img: IMG.handsomeJin,  desc: 'Elegant purple-tinted cake with subtle berry notes' },
  { name: 'Pretty in Pink', sub: 'Strawberry',    img: IMG.prettyInPink, desc: 'Rosy strawberry bento with fresh berry topping' },
  { name: 'Hellon',         sub: 'Classic',       img: IMG.hellon,      desc: 'Delicate bento cake with smooth cream finish' },
  { name: 'Pink love',      sub: 'Strawberry',    img: IMG.pinkLove,    desc: 'Rosy pink bento with sweet strawberry notes' },
  { name: 'Purple wine',    sub: 'Berry',         img: IMG.purpleWine,  desc: 'Elegant purple bento with rich berry flavor' },
  { name: 'Yellonn',        sub: 'Vanilla',       img: IMG.yellonn,     desc: 'Golden yellow bento with creamy vanilla layers' },
  { name: 'Casual red',     sub: 'Red Velvet',    img: IMG.casualRed,   desc: 'Casual red bento with smooth velvet texture' },
]
const PREMIUM = [
  { name: 'Golden Crown',    sub: 'Lotus Biscoff',    img: IMG.goldenCrown,  desc: 'Soft cake with Biscoff spread and cream'   },
  { name: 'Racing Ferrero',  sub: 'Ferrero Rocher',   img: IMG.racingFerrero, desc: 'Chocolate cake with hazelnut crunch'       },
  { name: 'Oreo Cream Cake', sub: 'Chocolate & Oreo', img: IMG.oreoCreamCake,  desc: 'Chocolate and Oreo loaded cream'           },
  { name: 'Lost in Garden',  sub: 'Fresh Fruit',      img: IMG.lostInGarden,  desc: 'Light sponge with seasonal fresh fruits'   },
]
const COOKIES = [
  { name: 'Classic Chocolate Chip', img: IMG.chipStack,    desc: 'Golden-edged, chewy centre with premium chocolate chips' },
  { name: 'Double Chocolate',       img: IMG.nutella2,     desc: 'Rich cocoa dough loaded with dark chocolate chunks' },
  { name: 'Butter Cookies',         img: IMG.almondSingle, desc: 'Crumbly, melt-in-your-mouth classic buttery rounds' },
  { name: 'Nutella Filled',         img: IMG.nutella,      desc: 'Soft cookie with a warm Nutella surprise inside' },
  { name: 'Lotus Biscoff',          img: IMG.cookies_lotusbiscoff, desc: 'Crisp Biscoff-spiced cookie with caramelised edge' },
  { name: 'Red Velvet',             img: IMG.rvCookie,     desc: 'Velvety red cookies with a cream cheese drizzle' },
  { name: 'Almond Crunch',          img: IMG.almond,       desc: 'Toasted almond cookies with a satisfying crunch' },
]

const FLOWERS = [
  { id: 'combo-1', img: IMG.flowerCombo1 },
  { id: 'combo-2', img: IMG.flowerCombo2 },
  { id: 'combo-3', img: IMG.flowerCombo3 },
  { id: 'combo-4', img: IMG.flowerCombo4 },
  { id: 'combo-5', img: IMG.flowerCombo5 },
  { id: 'combo-6', img: IMG.flowerCombo6 },
  { id: 'combo-7', img: IMG.flowerCombo7 },
  { id: 'combo-8', img: IMG.flowerCombo8 },
]

const CONTACTS = [
  { label: 'WhatsApp',  sub: 'Chat with us directly',           icon: IMG.whatsapplogo, color: '#25D366', href: 'https://wa.me/971506929524'                  },
  { label: 'Instagram', sub: '@justcakeandcookie',              icon: IMG.insta, color: '#E1306C', href: 'https://instagram.com/justcakeandcookie'     },
  { label: 'Email',     sub: 'justcakeandcookie@gmail.com',     icon: IMG.gmail, color: '#c8860a', href: 'mailto:justcakeandcookie@gmail.com'          },
  { label: 'Call',      sub: '+971 50 692 9524',                icon: IMG.phonecalllogo, color: '#3A1800', href: 'tel:+971506929524'                           },
]

const MARQUEE = ['Handcrafted Daily', '✦', 'Premium Ingredients', '✦', 'Made With Love', '✦', 'Bespoke Cakes', '✦', 'Artisan Cookies', '✦', 'Same-Day Delivery', '✦']

/* ── REVEAL HOOK ──────────────────────────────────────────────── */
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

/* ── COUNT UP — FIX: wrapper span owns font-size as inline style, outside gradient-clip child ── */
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
  return (
    <span ref={ref} style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', display: 'block' }}>
      <span className="stat-num">{val}{suffix}</span>
    </span>
  )
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
      <h2 className="h2" style={{ fontSize: '44.8px', fontFamily: 'Taviraj, georgia, serif' }} dangerouslySetInnerHTML={{ __html: title }} />
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

/* ── SCROLL ROW — FIX: translateZ(0) promotes to own GPU layer, stops vertical jitter on page scroll ── */
function ScrollRow({ items, renderCard }) {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    let intervalId
    
    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        const cardWidth = scrollContainer.firstChild?.offsetWidth || 250
        const scrollAmount = cardWidth + 16
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        
        if (scrollContainer.scrollLeft >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }
    
    intervalId = setInterval(autoScroll, 3000)
    
    return () => clearInterval(intervalId)
  }, [isPaused])
  
  const handleInteractionStart = () => setIsPaused(true)
  const handleInteractionEnd = () => setIsPaused(false)
  
  return (
    <div 
      className="hscroll-wrap" 
      style={{ transform: 'translateZ(0)' }}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      <div ref={scrollRef} className="hscroll">
        {items.map((item, i) => renderCard(item, i))}
      </div>
    </div>
  )
}

/* ── FULL-IMAGE FLOWER CARD ────────────────────────────────────── */
function FlowerCard({ item, i }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`pcard pcard--full-img reveal reveal-d${Math.min(i + 1, 5)}`}>
      <div className="pcard-badge">✨</div>
      <img src={item.img} alt="Flower Combo" width={230} height={280} loading="lazy" decoding="async" className="pcard-full-img" />
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

/* ── TOP BRAND HEADER ── */
function TopBrand() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 210,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.7rem clamp(1.2rem,3vw,2.5rem)',
      background: 'linear-gradient(135deg, #fff8dc, #fdf0c4)',
      borderBottom: '1px solid rgba(184,134,11,.15)',
      boxShadow: '0 3px 14px rgba(184,134,11,.10)',
    }}>
      {/* Logo + Brand */}
      <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(184,134,11,.30), 0 0 0 2.5px rgba(255,255,255,.8), 0 0 0 4px rgba(184,134,11,.25)',
          background: '#fff',
          flexShrink: 0,
        }}>
          <img src="/logo.jpg" alt="Just Cake & Cookie" width={64} height={64} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 28, lineHeight: 1.05,
            color: '#3A1800',
          }}>
            Just Cake
          </div>
          <div style={{
            fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase',
            fontWeight: 800, marginTop: 2, color: '#b8860b',
          }}>
            &amp; Cookie
          </div>
        </div>
      </a>

      {/* Contact info on right */}
      <div className="topbrand-right" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
        <a href="tel:+971506929524" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none' }}>
          <img src={IMG.phonecalllogo} alt="Call" width={28} height={28} style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Call Us</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#3A1800' }}>+971 506929524</div>
          </div>
        </a>
        <a href="https://wa.me/971506929524" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none' }}>
          <img src={IMG.whatsapplogo} alt="WhatsApp" width={28} height={28} style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#25D366' }}>Chat with us</div>
          </div>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .topbrand-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ── NAVBAR ── */
function Navbar() {
  const desktopLinks = [['Pastries','#menu'],['Signature','#cakes'],['Bento','#bento'],['Premium','#premium'],['Cookies','#cookies'],['About','#about'],['Contact','#contact']]

  return (
    <nav
      style={{
        position: 'fixed', top: 80, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '.55rem clamp(1rem,3vw,2.2rem)',
        background: 'linear-gradient(135deg, #f5e6a0, #e8d48b)',
        borderBottom: '1px solid rgba(184,134,11,.18)',
        boxShadow: '0 3px 12px rgba(184,134,11,.12)',
        gap: '1.5rem',
      }}
    >

      {/* Desktop nav */}
      <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {desktopLinks.map(([l, h]) => (
          <a key={l} href={h} style={{
            color: '#3A1800', textDecoration: 'none', fontSize: 12, fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color .25s',
          }}>{l}</a>
        ))}
        <a href="#contact" style={{
          color: '#fff', background: '#3A1800',
          padding: '.45rem 1.4rem', borderRadius: 0, fontSize: 11, fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          textDecoration: 'none', border: '2px solid #3A1800', transition: 'background .3s, color .3s',
        }}>
          Order Now
        </a>
      </div>

      {/* Mobile nav */}
      <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: '.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[['Pastries','#menu'],['Cakes','#cakes'],['Bento','#bento'],['Cookies','#cookies'],['About','#about']].map(([l, h]) => (
          <a key={l} href={h} style={{ color: '#3A1800', textDecoration: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{l}</a>
        ))}
        <a href="#contact" style={{
          color: '#fff', background: '#3A1800',
          padding: '.35rem 1rem', borderRadius: 0, fontSize: 10, fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          textDecoration: 'none', border: '2px solid #3A1800',
        }}>
          Order Now
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

/* ── HERO SHOWCASE (auto-advancing featured carousel) ─────── */
const SHOWCASE_ITEMS = [
  { img: IMG.sirensKiss,       label: 'Signature Cakes', sub: 'Bespoke Celebrations' },
  { img: IMG.goldenWish,       label: 'Pastries',        sub: 'Freshly Baked Daily'  },
  { img: IMG.chipStack,        label: 'Cookies',         sub: 'Hand-Baked, Crisp'    },
  { img: IMG.velvetTemptation, label: 'Bento Cakes',     sub: 'Mini Masterpieces'    },
  { img: IMG.cheesecake,       label: 'Cheesecake',      sub: 'Velvet Smooth'        },
]

const LEAD_POOL = [IMG.darkSpell, IMG.sirensKiss, IMG.goldenCrown, IMG.velvetTemptation, IMG.fallenForest, IMG.flowerCombo1, IMG.flowerCombo3, IMG.flowerCombo5]
const CARD_A_POOL = [IMG.goldenWish, IMG.prettyInPink, IMG.justYou, IMG.redEve, IMG.flowerCombo2, IMG.flowerCombo4]
const CARD_B_POOL = [IMG.chipStack, IMG.almond, IMG.nutella, IMG.rvCookie, IMG.flowerCombo6, IMG.flowerCombo7, IMG.flowerCombo8]

function HeroShowcase() {
  const [leadIdx, setLeadIdx] = useState(0)
  const [cardA, setCardA]     = useState(0)
  const [cardB, setCardB]     = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setLeadIdx(i => (i + 1) % LEAD_POOL.length), 4500)
    const t2 = setInterval(() => setCardA(i => (i + 1) % CARD_A_POOL.length), 3200)
    const t3 = setInterval(() => setCardB(i => (i + 1) % CARD_B_POOL.length), 3800)
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3) }
  }, [])

  return (
    <div className="hero-visual">
      <div className="hstage">
        <div className="hstage-glow" />

        {/* Featured product — large, no frame, with 3D flip cycling */}
        <div className="hstage-lead">
          <img key={leadIdx} src={LEAD_POOL[leadIdx]} alt="" loading="eager" className="hstage-img-flip" />
          <div className="hstage-lead-shadow" />
        </div>

        {/* Two smaller product cards beneath */}
        <div className="hstage-card hstage-card--a">
          <img key={`a-${cardA}`} src={CARD_A_POOL[cardA]} alt="" loading="eager" className="hstage-img-flip" />
        </div>

        <div className="hstage-card hstage-card--b">
          <img key={`b-${cardB}`} src={CARD_B_POOL[cardB]} alt="" loading="eager" className="hstage-img-flip" />
        </div>
      </div>
    </div>
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
            <em className={`${cls} hero-enter-d3`} style={{ display: 'inline-block', color: '#b8860b', background: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: '#1A1208', fontSize: '44.8px', fontFamily: 'Taviraj, georgia, serif', fontStyle: 'normal' }}>elegant cravings</em>
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

          {/* <div className={`hero-stats ${cls} hero-enter-d5`}>
            <div className="hero-stat"><strong><CountUp to={50} suffix="+" /></strong><span>Signature flavours</span></div>
            <div className="hero-stat"><strong><CountUp to={7} /></strong><span>Cookie varieties</span></div>
            <div className="hero-stat"><strong><CountUp to={100} suffix="%" /></strong><span>Hand-finished</span></div>
          </div> */}
        </div>

        <HeroShowcase />
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
          title='Our <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Pastries</em>'
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
          title='Signature <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Cakes</em>'
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
    <section id="bento" className="sec">
      <SectionShell>
        <SectionHead
          label="Mini Masterpieces"
          title='Bento <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Cakes</em>'
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
          title='Premium <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Selection</em>'
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
          title='Artisan <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Cookies</em>'
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
            <h2 className="h2" style={{ fontSize: '44.8px', fontFamily: 'Taviraj, georgia, serif' }}>The <em style={{ display:'inline-block',color:'#b8860b',background:'none',WebkitBackgroundClip:'initial',WebkitTextFillColor:'#1A1208',fontStyle:'normal' }}>Cheesecake</em></h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, maxWidth: 460, fontSize: '1.02rem', marginTop: '.7rem' }}>
              Velvety smooth cheesecakes baked fresh daily — a buttery crust beneath rich, silken filling. Ask us about today&apos;s flavour selection.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href="#contact" className="btn-gold">Order Today <span style={{ fontSize: 16 }}>→</span></a>
            </div>
          </div>
          <div ref={ref2} className="reveal from-scale reveal-d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ borderRadius: 0, overflow: 'hidden', boxShadow: '0 30px 80px -16px rgba(184,134,11,.32), 0 0 0 1px rgba(184,134,11,.18)', cursor: 'default' }}>
              <img src={IMG.cheesecake} alt="Cheesecake" width={280} height={280}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} loading="lazy" decoding="async" />
            </div>
            <div style={{ borderRadius: 0, overflow: 'hidden', boxShadow: '0 30px 80px -16px rgba(184,134,11,.32), 0 0 0 1px rgba(184,134,11,.18)', cursor: 'default' }}>
              <img src={IMG.cheesecake2} alt="Cheesecake" width={280} height={280}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}

/* ── FLOWERS ─────────────────────────────────────────────────── */
function Flowers() {
  return (
    <section id="flowers" className="sec">
      <SectionShell>
        <SectionHead
          label="Floral Collection"
          title='JCC Blooms & <em style="display:inline-block;color:#b8860b;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:#1A1208;font-style:normal">Combos</em>'
          sub="Delicate floral-inspired creations, each crafted with the beauty of nature in mind."
        />
        <ScrollRow items={FLOWERS} renderCard={(item, i) => <FlowerCard key={item.id} item={item} i={i} />} />
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
            <h2 className="h2" style={{ fontSize: '44.8px', fontFamily: 'Taviraj, georgia, serif' }}>Reserve <em style={{ display:'inline-block',color:'#b8860b',background:'none',WebkitBackgroundClip:'initial',WebkitTextFillColor:'#1A1208',fontStyle:'normal' }}>your order</em></h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, maxWidth: 420, fontSize: '1.02rem', marginTop: '.7rem' }}>
              For custom cakes, gifting boxes, and daily bakes — reach out and we&apos;ll help curate the perfect order.
            </p>
          </div>

          <div ref={ref2} className="contact-list reveal reveal-d2">
            {CONTACTS.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-tile">
                <div className="contact-icon" style={{ background: `${c.color}1a`, boxShadow: `inset 0 0 0 1px ${c.color}30` }}>
                  <img src={c.icon} alt={c.label} width={36} height={36} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 4 }} />
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
            <h2 className="h2" style={{ fontSize: '44.8px', fontFamily: 'Taviraj, georgia, serif', marginBottom: '1.3rem' }}>
              Baked with heart,<br />
              <em style={{ display:'inline-block',color:'#b8860b',background:'none',WebkitBackgroundClip:'initial',WebkitTextFillColor:'#1A1208',fontStyle:'normal' }}>served with soul</em>
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

/* ── ABOUT STAT ────────────────────────────────────────────── */
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
              { href: 'https://wa.me/971506929524',              icon: IMG.whatsapplogo, bg: '#25D366', label: 'WhatsApp' },
              { href: 'https://instagram.com/justcakeandcookie', icon: IMG.insta, bg: '#E1306C', label: 'Instagram' },
              { href: 'mailto:justcakeandcookie@gmail.com',      icon: IMG.gmail, bg: '#c8860a', label: 'Email' },
              { href: 'tel:+971506929524',                       icon: IMG.phonecalllogo, bg: '#3A1800', label: 'Call' },
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
              ><img src={s.icon} alt={s.label} width={28} height={28} style={{ width: 28, height: 28, objectFit: 'contain', borderRadius: 4 }} /></a>
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
      <TopBrand />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <SignatureCakes />
        <Pastries />
        <BentoCakes />
        <PremiumCakes />
        <Cookies />
        <Flowers />
        <Cheesecake />
        <Contact />
        <About />
      </main>
      <Footer />
    </>
  )
}
