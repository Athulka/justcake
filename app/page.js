'use client'

/**
 * Just Cake & Cookie — Next.js Single Page Component
 * 
 * Setup commands:
 *   npx create-next-app@latest just-cake-cookie --js --tailwind=false --eslint --app --src-dir=false --import-alias="@/*"
 *   cd just-cake-cookie
 *   npm install framer-motion @react-three/fiber @react-three/drei three
 *
 * Then:
 *   1. Replace contents of app/page.js with this file (rename to page.jsx)
 *   2. Update app/layout.js as shown at the bottom of this file
 *   3. Run: npm run dev
 */

import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const PASTRIES = [
  { name: 'Death by Chocolate', sub: 'Chocolate', emoji: '🍫', bg: '#1A0A00', textDark: false },
  { name: 'Snow White', sub: 'Vanilla', emoji: '🤍', bg: '#F8F3E8', textDark: true },
  { name: 'Pretty in Pink', sub: 'Strawberry', emoji: '🍓', bg: '#F8C8D4', textDark: true },
  { name: 'Golden Wish', sub: 'Biscoff / Caramel', emoji: '✨', bg: '#C8860A', textDark: false },
  { name: 'Lost in Garden', sub: 'Fresh / Seasonal Fruits', emoji: '🍃', bg: '#3A6B3A', textDark: false },
  { name: 'Red Eve', sub: 'Red Velvet', emoji: '❤️', bg: '#7B0000', textDark: false },
]

const SIGNATURE = [
  { name: "Siren's Kiss", sub: 'Classic Vanilla Cake', desc: 'Soft vanilla sponge with smooth vanilla cream or buttercream', emoji: '🤍' },
  { name: 'Dark Spell', sub: 'Chocolate Truffle Cake', desc: 'Rich chocolate cake layered with silky ganache', emoji: '🍫' },
  { name: 'Velvet Temptation', sub: 'Red Velvet Cake', desc: 'Moist red velvet cake with cream cheese or buttercream frosting', emoji: '❤️' },
  { name: 'Fallen Forest', sub: 'Black Forest', desc: 'Chocolate sponge with cherries & fresh cream', emoji: '🍒' },
  { name: 'Mr Sunshine', sub: 'Butterscotch Cake', desc: 'Crunchy praline with caramel cream', emoji: '☀️' },
]

const BENTO = [
  { name: 'Just You', sub: 'Red Heart Cake', emoji: '❤️', bg: '#9B1B1B' },
  { name: 'Black Pearl', sub: 'Chocolate Cake', emoji: '🖤', bg: '#1A0A00' },
  { name: 'Handsome Jin', sub: 'Purple Cake', emoji: '💜', bg: '#4A1A6B' },
  { name: 'Pretty in Pink', sub: 'Strawberry / Pink', emoji: '🩷', bg: '#C8547A' },
]

const PREMIUM = [
  { name: 'Golden Crown', sub: 'Lotus Biscoff / Caramel', desc: 'Soft cake with Biscoff spread & cream', emoji: '👑' },
  { name: 'Racing Ferrero', sub: 'Ferrero Rocher Cake', desc: 'Chocolate cake with hazelnut crunch', emoji: '🌰' },
  { name: 'Oreo Cream Cake', sub: 'Chocolate + Oreo', desc: 'Chocolate + Oreo loaded cream', emoji: '🍪' },
  { name: 'Lost in Garden', sub: 'Fresh Fruit Cake', desc: 'Light sponge with seasonal fresh fruits', emoji: '🍓' },
]

const COOKIES = [
  { name: 'Classic Chocolate Chip', emoji: '🍪' },
  { name: 'Double Chocolate', emoji: '🍫' },
  { name: 'Butter Cookies', emoji: '🧈' },
  { name: 'Nutella Filled', emoji: '🫙' },
  { name: 'Lotus Biscoff', emoji: '🌟' },
  { name: 'Red Velvet', emoji: '❤️' },
  { name: 'Almond Crunch', emoji: '🥜' },
]

/* ══════════════════════════════════════════════════════════════
   GLOBAL CSS (injected once on mount)
══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --y: #F9C800;
  --yd: #D4A000;
  --yl: #FFE44D;
  --brown: #2D1200;
  --brown2: #5C2E00;
  --brown3: #7A3B00;
  --cream: #FFFBF0;
  --cream2: #FFF5D6;
  --gold: #D4AF37;
  --fd: 'Playfair Display', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--fb);
  background: var(--cream);
  color: var(--brown);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
img, svg { display: block; max-width: 100%; }
::selection { background: rgba(249,200,0,.3); color: var(--brown); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--y); border-radius: 3px; }

.jcc-section { padding: clamp(3.5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem); }
.jcc-label {
  display: flex; align-items: center; gap: .65rem; margin-bottom: .65rem;
}
.jcc-label-line { width: 28px; height: 2px; background: var(--y); border-radius: 1px; flex-shrink: 0; }
.jcc-label-text {
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--brown3); font-weight: 600;
}
.jcc-label-text--light { color: rgba(249,200,0,.7); }
.jcc-h2 {
  font-family: var(--fd); font-size: clamp(2.1rem, 5vw, 3.6rem);
  line-height: 1.08; color: var(--brown); margin-bottom: .65rem;
}
.jcc-h2--light { color: #FFFBF0; }
.jcc-sub { color: var(--brown3); line-height: 1.75; max-width: 500px; margin-bottom: 2.75rem; font-size: 1rem; }
.jcc-sub--light { color: rgba(255,251,240,.58); }

/* Card grid */
.card-grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.4rem; }
.card-grid-4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1.2rem; }
.card-grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.4rem; }

@media (max-width: 640px) {
  .card-grid-3, .card-grid-4, .card-grid-2 { grid-template-columns: 1fr 1fr; gap: 1rem; }
}
@media (max-width: 400px) {
  .card-grid-3, .card-grid-4, .card-grid-2 { grid-template-columns: 1fr; }
}
`

/* ══════════════════════════════════════════════════════════════
   3D SCENE — Floating Donuts
══════════════════════════════════════════════════════════════ */
const DONUTS = [
  { pos: [2.6,  0.6, -1.5], color: '#F9C800', r: 1.05, speed: 1.2, rs: 0.35 },
  { pos: [-2.9,-0.7, -2.5], color: '#3D1200', r: 0.82, speed: 0.85, rs: 0.55 },
  { pos: [ 0.6, 2.3, -3.5], color: '#D4AF37', r: 0.60, speed: 1.6, rs: 0.28 },
  { pos: [-1.6, 1.6, -1.8], color: '#FFFBF0', r: 0.48, speed: 1.1, rs: 0.65 },
  { pos: [ 3.6,-1.4, -4.0], color: '#C8860A', r: 1.25, speed: 0.95, rs: 0.20 },
  { pos: [-3.4, 0.4, -3.2], color: '#F9C800', r: 0.70, speed: 1.35, rs: 0.45 },
  { pos: [ 1.4,-2.1, -2.8], color: '#2D1200', r: 0.90, speed: 1.05, rs: 0.40 },
  { pos: [-0.5,-1.5, -1.2], color: '#FFE44D', r: 0.42, speed: 1.8,  rs: 0.70 },
]

function Donut({ pos, color, r, speed, rs }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * rs * 0.6
    ref.current.rotation.z = clock.elapsedTime * rs * 0.4
  })
  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.75}>
      <mesh ref={ref} position={pos}>
        <torusGeometry args={[r, r * 0.36, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.18} metalness={0.45} />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 4]} intensity={1.8} color="#FFE082" />
      <directionalLight position={[-4, -3, -4]} intensity={0.5} color="#FFF3E0" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#F9C800" />
      {DONUTS.map((d, i) => <Donut key={i} {...d} />)}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   MOTION HELPERS
══════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
})

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.86 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, type: 'spring', stiffness: 220, damping: 22, delay },
})

/* ══════════════════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════════════════ */
function Label({ text, light }) {
  return (
    <div className="jcc-label">
      <div className="jcc-label-line" />
      <span className={`jcc-label-text${light ? ' jcc-label-text--light' : ''}`}>{text}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Cakes', href: '#cakes' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Premium', href: '#premium' },
    { label: 'About', href: '#about' },
  ]

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '.85rem 2rem' : '1.25rem 2rem',
        background: scrolled ? 'rgba(249,200,0,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(1.6)' : 'none',
        boxShadow: scrolled ? '0 2px 28px rgba(45,18,0,.14)' : 'none',
        transition: 'all .45s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Brand */}
      <motion.a href="#home" whileHover={{ scale: 1.03 }}
        style={{ display:'flex', alignItems:'center', gap:'.65rem', textDecoration:'none', cursor:'pointer' }}>
        <div style={{
          width:42, height:42, borderRadius:'50%',
          background: scrolled ? '#2D1200' : '#F9C800',
          border: `2px solid ${scrolled ? '#F9C800' : '#2D1200'}`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
          transition:'all .4s',
        }}>🎂</div>
        <div>
          <div style={{
            fontFamily:'var(--fd)', fontWeight:700, fontSize:17, lineHeight:1.1,
            color: scrolled ? '#2D1200' : '#FFFBF0',
            transition:'color .4s',
          }}>Just Cake</div>
          <div style={{
            fontSize:10, letterSpacing:'2.5px', textTransform:'uppercase', fontWeight:500,
            color: scrolled ? '#7A3B00' : '#F9C800',
            transition:'color .4s',
          }}>& Cookie</div>
        </div>
      </motion.a>

      {/* Desktop links */}
      <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
        {links.map(l => (
          <motion.a key={l.label} href={l.href}
            style={{
              color: scrolled ? '#2D1200' : 'rgba(255,251,240,.85)',
              textDecoration:'none', fontWeight:500, fontSize:14, letterSpacing:'.4px',
              transition:'color .25s',
            }}
            whileHover={{ color: scrolled ? '#7A3B00' : '#F9C800', y: -1 }}
          >{l.label}</motion.a>
        ))}
        <motion.a href="#menu"
          style={{
            background: scrolled ? '#2D1200' : '#F9C800',
            color: scrolled ? '#F9C800' : '#2D1200',
            padding:'.55rem 1.4rem', borderRadius:999,
            textDecoration:'none', fontWeight:700, fontSize:13, letterSpacing:'.3px',
            transition:'background .4s, color .4s',
          }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
        >Order ✦</motion.a>
      </div>
    </motion.nav>
  )
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 500], [0, 130])
  const opText = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <section id="home" style={{ position:'relative', height:'100vh', minHeight:560, overflow:'hidden', display:'flex', alignItems:'center' }}>
      {/* Gradient bg */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(135deg, #1A0800 0%, #3D1A00 30%, #8B5010 60%, #D4A000 82%, #F9C800 100%)',
      }} />

      {/* Grain overlay */}
      <div style={{
        position:'absolute', inset:0, opacity:.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px',
      }} />

      {/* Animated particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div key={i}
          style={{
            position:'absolute',
            width: 5 + (i % 5) * 3, height: 5 + (i % 5) * 3,
            borderRadius:'50%',
            background: i % 3 === 0 ? '#F9C800' : i % 3 === 1 ? '#FFFBF0' : '#D4AF37',
            opacity: 0.15 + (i % 4) * 0.07,
            left:`${5 + i * 7}%`, top:`${8 + (i * 11) % 75}%`,
            pointerEvents:'none',
          }}
          animate={{ y:[0,-18,0], opacity:[0.1,0.4,0.1] }}
          transition={{ duration: 2.8 + i * 0.35, repeat:Infinity, ease:'easeInOut', delay: i * 0.22 }}
        />
      ))}

      {/* 3D Canvas */}
      <div style={{ position:'absolute', inset:0, opacity:.82 }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position:[0,0,5.5], fov:50 }} dpr={[1,2]}>
            <Scene3D />
          </Canvas>
        </Suspense>
      </div>

      {/* Text */}
      <motion.div style={{ position:'relative', zIndex:2, padding:'0 2rem 0 clamp(1.5rem,7vw,5.5rem)', y:yText, opacity:opText }}>
        <motion.p
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.3, duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ color:'#F9C800', fontSize:12, letterSpacing:'3.5px', textTransform:'uppercase', marginBottom:'1rem', fontWeight:600 }}
        >Handcrafted with love ✦</motion.p>

        <motion.h1
          initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.45, duration:1, ease:[0.16,1,0.3,1] }}
          style={{ fontFamily:'var(--fd)', fontSize:'clamp(3.2rem,9vw,7rem)', lineHeight:1.02, color:'#FFFBF0', marginBottom:'1.5rem' }}
        >
          Taste the<br />
          <em style={{ color:'#F9C800' }}>love</em> in<br />
          every crumb
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.65, duration:.85 }}
          style={{ color:'rgba(255,251,240,.72)', fontSize:17, lineHeight:1.75, maxWidth:460, marginBottom:'2.5rem' }}
        >
          Handcrafted cakes, cookies & pastries made with the finest ingredients. Every bite tells a story of warmth and care.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.82, duration:.8 }}
          style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}
        >
          <motion.a href="#menu"
            style={{ background:'#F9C800', color:'#2D1200', padding:'.9rem 2.4rem', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:15 }}
            whileHover={{ scale:1.05, background:'#FFE44D' }} whileTap={{ scale:.97 }}
          >Explore Menu →</motion.a>
          <motion.a href="#about"
            style={{ border:'2px solid rgba(249,200,0,.45)', color:'#FFFBF0', padding:'.9rem 2.4rem', borderRadius:999, textDecoration:'none', fontWeight:500, fontSize:15 }}
            whileHover={{ borderColor:'#F9C800', background:'rgba(249,200,0,.08)' }} whileTap={{ scale:.97 }}
          >Our Story</motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position:'absolute', bottom:32, left:'50%', x:'-50%', zIndex:2 }}
        animate={{ y:[0,9,0] }} transition={{ duration:1.9, repeat:Infinity, ease:'easeInOut' }}
      >
        <svg width="22" height="34" viewBox="0 0 22 34">
          <rect x="1" y="1" width="20" height="32" rx="10" fill="none" stroke="rgba(249,200,0,.5)" strokeWidth="1.5"/>
          <motion.circle cx="11" cy="9" r="3" fill="#F9C800"
            animate={{ cy:[9,23,9], opacity:[1,0,1] }}
            transition={{ duration:1.9, repeat:Infinity, ease:'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   HIGHLIGHTS STRIP
══════════════════════════════════════════════════════════════ */
function HighlightStrip() {
  const items = ['🎂 Signature Cakes', '🍪 Artisan Cookies', '🎁 Bento Cakes', '🍰 Cheesecakes', '🍓 Seasonal Pastries', '✨ Premium Creations']
  const doubled = [...items, ...items]
  return (
    <div style={{ background:'#2D1200', padding:'.9rem 0', overflow:'hidden', position:'relative' }}>
      <motion.div
        animate={{ x:['0%', '-50%'] }}
        transition={{ duration:22, repeat:Infinity, ease:'linear' }}
        style={{ display:'flex', gap:'3rem', width:'max-content', whiteSpace:'nowrap' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ color:'rgba(249,200,0,.75)', fontSize:13, fontWeight:500, letterSpacing:'.5px' }}>{item}</span>
        ))}
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PASTRIES SECTION
══════════════════════════════════════════════════════════════ */
function PastriesSection() {
  return (
    <section id="menu" className="jcc-section" style={{ background:'#FFFBF0' }}>
      <motion.div {...fadeUp()}>
        <Label text="Fresh Daily" />
        <h2 className="jcc-h2">Our Pastries</h2>
        <p className="jcc-sub">Individually crafted pastries — each one named for the feelings they inspire.</p>
      </motion.div>
      <div className="card-grid-3">
        {PASTRIES.map((p, i) => (
          <motion.div key={p.name} {...fadeUp(i * 0.09)}
            whileHover={{ y:-8, boxShadow:'0 24px 64px rgba(45,18,0,.18)' }}
            style={{
              background: p.bg, borderRadius:22, padding:'2rem 1.75rem',
              position:'relative', overflow:'hidden', cursor:'default',
              transition:'box-shadow .3s',
            }}
          >
            <div style={{ fontSize:38, marginBottom:'.85rem' }}>{p.emoji}</div>
            <h3 style={{ fontFamily:'var(--fd)', fontSize:21, fontWeight:700, color: p.textDark ? '#2D1200' : '#FFFBF0', marginBottom:'.3rem', lineHeight:1.2 }}>{p.name}</h3>
            <p style={{ color: p.textDark ? 'rgba(45,18,0,.6)' : 'rgba(255,251,240,.62)', fontSize:13, letterSpacing:'.3px' }}>{p.sub}</p>
            {/* Deco circle */}
            <div style={{ position:'absolute', right:-18, bottom:-18, width:72, height:72, borderRadius:'50%', background:'rgba(255,255,255,.07)' }} />
            <div style={{ position:'absolute', right:8, bottom:8, width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.04)' }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   SIGNATURE CAKES
══════════════════════════════════════════════════════════════ */
function SignatureSection() {
  return (
    <section id="cakes" className="jcc-section" style={{ background:'#2D1200' }}>
      <motion.div {...fadeUp()}>
        <Label text="Chef's Finest" light />
        <h2 className="jcc-h2 jcc-h2--light">Signature Cakes</h2>
        <p className="jcc-sub jcc-sub--light">Each cake is a narrative. Pull up a chair — there's a slice waiting for you.</p>
      </motion.div>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
        {SIGNATURE.map((c, i) => (
          <motion.div key={c.name} {...fadeLeft(i * 0.1)}
            whileHover={{ x:10, borderColor:'rgba(249,200,0,.35)' }}
            style={{
              background:'rgba(255,251,240,.05)',
              border:'1px solid rgba(249,200,0,.12)',
              borderRadius:18, padding:'1.5rem 2rem',
              display:'flex', alignItems:'center', gap:'1.4rem',
              cursor:'default', transition:'border-color .3s',
            }}
          >
            <div style={{ fontSize:38, flexShrink:0 }}>{c.emoji}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:'.65rem', marginBottom:'.3rem', flexWrap:'wrap' }}>
                <h3 style={{ fontFamily:'var(--fd)', fontSize:20, color:'#F9C800', fontStyle:'italic' }}>{c.name}</h3>
                <span style={{ fontSize:12, color:'rgba(249,200,0,.45)', fontWeight:500 }}>— {c.sub}</span>
              </div>
              <p style={{ color:'rgba(255,251,240,.5)', fontSize:14, lineHeight:1.65 }}>{c.desc}</p>
            </div>
            <motion.div style={{ color:'rgba(249,200,0,.35)', fontSize:18, flexShrink:0 }} whileHover={{ color:'#F9C800', x:3 }}>→</motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   BENTO CAKES
══════════════════════════════════════════════════════════════ */
function BentoSection() {
  return (
    <section className="jcc-section" style={{ background:'linear-gradient(150deg, #FFFBF0 0%, #FFF4CC 100%)' }}>
      <motion.div {...fadeUp()}>
        <Label text="Mini Masterpieces" />
        <h2 className="jcc-h2">Bento Cakes</h2>
        <p className="jcc-sub">Small cakes, big emotions. Perfect for intimate celebrations.</p>
      </motion.div>
      <div className="card-grid-4">
        {BENTO.map((b, i) => (
          <motion.div key={b.name} {...popIn(i * 0.14)}
            whileHover={{ y:-10, scale:1.04, boxShadow:'0 28px 60px rgba(45,18,0,.2)' }}
            style={{
              background: b.bg, borderRadius:26, padding:'2.5rem 1.25rem',
              display:'flex', flexDirection:'column', alignItems:'center', gap:'.7rem',
              cursor:'default', boxShadow:'0 6px 28px rgba(45,18,0,.14)',
            }}
          >
            <div style={{ fontSize:46 }}>{b.emoji}</div>
            <h3 style={{ fontFamily:'var(--fd)', fontSize:17, color:'#FFFBF0', textAlign:'center', lineHeight:1.25 }}>{b.name}</h3>
            <p style={{ color:'rgba(255,251,240,.58)', fontSize:12, textAlign:'center', letterSpacing:'.3px' }}>{b.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PREMIUM CAKES
══════════════════════════════════════════════════════════════ */
function PremiumSection() {
  return (
    <section id="premium" className="jcc-section" style={{ background:'#FFFBF0' }}>
      <motion.div {...fadeUp()}>
        <Label text="Top Tier" />
        <h2 className="jcc-h2">Premium Cakes</h2>
        <p className="jcc-sub">Crafted with the finest ingredients — for moments that deserve the very best.</p>
      </motion.div>
      <div className="card-grid-2">
        {PREMIUM.map((p, i) => (
          <motion.div key={p.name} {...fadeUp(i * 0.1)}
            whileHover={{ y:-6, boxShadow:'0 20px 56px rgba(45,18,0,.14)' }}
            style={{
              background:'#FFFFFF', border:'1px solid rgba(212,175,55,.22)',
              borderRadius:22, padding:'2rem', cursor:'default',
              boxShadow:'0 2px 18px rgba(45,18,0,.06)',
              position:'relative', overflow:'hidden',
              transition:'box-shadow .3s',
            }}
          >
            {/* Gold top bar */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg, #F9C800, #D4AF37, #C8860A)' }} />
            <div style={{ fontSize:38, marginBottom:'1rem' }}>{p.emoji}</div>
            <h3 style={{ fontFamily:'var(--fd)', fontSize:21, color:'#2D1200', marginBottom:'.3rem' }}>{p.name}</h3>
            <p style={{ fontSize:11, color:'#D4AF37', fontWeight:600, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'.7rem' }}>{p.sub}</p>
            <p style={{ color:'#7A3B00', fontSize:14, lineHeight:1.65 }}>{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   COOKIES SECTION
══════════════════════════════════════════════════════════════ */
function CookiesSection() {
  return (
    <section id="cookies" className="jcc-section" style={{ background:'#F9C800' }}>
      <motion.div {...fadeUp()}>
        <Label text="Freshly Baked" />
        <h2 className="jcc-h2">Our Cookies</h2>
        <p className="jcc-sub" style={{ color:'rgba(45,18,0,.65)' }}>
          Crispy edges, chewy centers, loaded with love — seven irresistible varieties.
        </p>
      </motion.div>
      <div className="card-grid-4" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {COOKIES.map((c, i) => (
          <motion.div key={c.name}
            initial={{ opacity:0, scale:0.82, rotate:-4 }}
            whileInView={{ opacity:1, scale:1, rotate:0 }}
            viewport={{ once:true }}
            transition={{ delay: i * 0.07, duration:.55, type:'spring', stiffness:240, damping:22 }}
            whileHover={{ scale:1.08, rotate:2, y:-5 }}
            style={{
              background:'#FFFBF0', borderRadius:20, padding:'1.5rem 1rem',
              display:'flex', flexDirection:'column', alignItems:'center', gap:'.6rem',
              cursor:'default', boxShadow:'0 4px 22px rgba(45,18,0,.14)',
            }}
          >
            <div style={{ fontSize:36 }}>{c.emoji}</div>
            <p style={{ fontFamily:'var(--fd)', fontSize:14, color:'#2D1200', textAlign:'center', lineHeight:1.3 }}>{c.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   CHEESECAKE SECTION
══════════════════════════════════════════════════════════════ */
function CheesecakeSection() {
  return (
    <section id="cheesecake" className="jcc-section" style={{ background:'#2D1200' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'3.5rem', alignItems:'center' }}>
        <motion.div {...fadeUp()}>
          <Label text="The Classic" light />
          <h2 className="jcc-h2 jcc-h2--light">Cheesecake</h2>
          <p className="jcc-sub jcc-sub--light">
            Velvety smooth cheesecakes baked fresh daily — a buttery crust with rich, creamy filling. Available in seasonal & classic flavours.
          </p>
          <motion.div
            style={{ display:'inline-flex', alignItems:'center', gap:'.75rem', background:'rgba(249,200,0,.1)', border:'1px solid rgba(249,200,0,.3)', borderRadius:999, padding:'.65rem 1.4rem', color:'rgba(249,200,0,.85)', fontSize:14, fontWeight:500 }}
            animate={{ boxShadow:['0 0 0 0 rgba(249,200,0,0)', '0 0 0 8px rgba(249,200,0,0)', '0 0 0 0 rgba(249,200,0,0)'] }}
            transition={{ duration:2.5, repeat:Infinity }}
          >
            <span>💬</span> Ask us about today's flavours
          </motion.div>
        </motion.div>

        <motion.div {...popIn(.15)}
          style={{ display:'flex', justifyContent:'center' }}
        >
          <motion.div
            animate={{ y:[0,-12,0] }}
            transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
            style={{
              width:240, height:240, borderRadius:'50%',
              background:'linear-gradient(135deg, rgba(249,200,0,.12), rgba(212,175,55,.08))',
              border:'1px solid rgba(249,200,0,.25)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'.75rem',
              boxShadow:'0 0 60px rgba(249,200,0,.12)',
            }}
          >
            <div style={{ fontSize:64 }}>🍰</div>
            <p style={{ fontFamily:'var(--fd)', fontSize:22, color:'#F9C800', fontStyle:'italic' }}>Cheesecake</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const stats = [
    { n:'50+', label:'Flavours', icon:'🎂' },
    { n:'7', label:'Cookie Types', icon:'🍪' },
    { n:'100%', label:'Handmade', icon:'✋' },
    { n:'♥', label:'Made with Love', icon:'💛' },
  ]
  return (
    <section id="about" className="jcc-section" style={{ background:'linear-gradient(150deg, #FFFBF0 0%, #FFF4CC 100%)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'4rem', alignItems:'center' }}>
        <motion.div {...fadeUp()}>
          <Label text="Our Story" />
          <h2 className="jcc-h2" style={{ marginBottom:'1.4rem' }}>
            Baked with heart,<br />
            <em style={{ fontStyle:'italic', color:'#C8860A' }}>served with soul</em>
          </h2>
          <p style={{ color:'#7A3B00', lineHeight:1.85, marginBottom:'1.1rem', maxWidth:460, fontSize:15.5 }}>
            Just Cake & Cookie was born from a simple belief — the best things in life should taste extraordinary. We use time-honored recipes and the freshest ingredients to bring joy to every celebration.
          </p>
          <p style={{ color:'#7A3B00', lineHeight:1.85, maxWidth:460, fontSize:15.5 }}>
            From intimate bento cakes to grand premium creations, every order is crafted personally — because you deserve nothing less than perfection.
          </p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} {...popIn(i * 0.14)}
              whileHover={{ y:-4, boxShadow:'0 16px 48px rgba(45,18,0,.12)' }}
              style={{
                background:'#FFFFFF', borderRadius:22, padding:'1.75rem 1.2rem',
                textAlign:'center', boxShadow:'0 4px 24px rgba(45,18,0,.07)',
                transition:'box-shadow .3s',
              }}
            >
              <div style={{ fontSize:28, marginBottom:'.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily:'var(--fd)', fontSize:30, fontWeight:700, color:'#2D1200', lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:13, color:'#7A3B00', fontWeight:500, marginTop:'.3rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:'#1A0800', padding:'3rem clamp(1.25rem,6vw,5rem) 1.75rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'2rem', marginBottom:'2rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
          <span style={{ fontSize:28 }}>🎂</span>
          <div>
            <div style={{ fontFamily:'var(--fd)', color:'#FFFBF0', fontWeight:700, fontSize:20, lineHeight:1.1 }}>Just Cake & Cookie</div>
            <div style={{ fontSize:10, color:'#F9C800', letterSpacing:'2.5px', textTransform:'uppercase', marginTop:2 }}>Taste the love in every crumb</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap' }}>
          {['Menu', 'Cakes', 'Cookies', 'Premium', 'About'].map(l => (
            <motion.a key={l} href={`#${l.toLowerCase()}`}
              style={{ color:'rgba(255,251,240,.45)', textDecoration:'none', fontSize:14, transition:'color .25s' }}
              whileHover={{ color:'#F9C800' }}
            >{l}</motion.a>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,251,240,.08)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <p style={{ fontSize:13, color:'rgba(255,251,240,.35)' }}>© 2026 Just Cake & Cookie. All rights reserved.</p>
        <p style={{ fontSize:13, color:'rgba(255,251,240,.35)' }}>Made with 💛 for every sweet craving</p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════════
   ROOT PAGE
══════════════════════════════════════════════════════════════ */
export default function Page() {
  useEffect(() => {
    const s = document.createElement('style')
    s.id = 'jcc-global'
    s.innerHTML = GLOBAL_CSS
    if (!document.getElementById('jcc-global')) document.head.appendChild(s)
    return () => { const el = document.getElementById('jcc-global'); if (el) el.remove() }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HighlightStrip />
        <PastriesSection />
        <SignatureSection />
        <BentoSection />
        <PremiumSection />
        <CookiesSection />
        <CheesecakeSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ALSO UPDATE: app/layout.js — paste this:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const metadata = {
  title: 'Just Cake & Cookie — Taste the love in every crumb',
  description: 'Handcrafted cakes, cookies & pastries. Made with love, served with soul.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SETUP COMMANDS (run in terminal):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  npx create-next-app@latest just-cake-cookie \
    --js --tailwind=false --eslint --app \
    --src-dir=false --import-alias="@/*"

  cd just-cake-cookie

  npm install framer-motion @react-three/fiber @react-three/drei three

  # Then copy page.jsx → app/page.js (or rename to page.jsx)
  # Update app/layout.js as shown above
  npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
