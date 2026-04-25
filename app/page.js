'use client'

/**
 * Just Cake & Cookie — v4
 * ─ No Three.js (removed) — real photos everywhere
 * ─ Hero: text left + floating food photo right
 * ─ All products: horizontal scroll rows
 * ─ Minimal contact section
 *
 * npm install framer-motion
 * Copy → app/page.js   •   Update app/layout.js (see bottom)
 *
 * LOGO: Put your logo image at  public/logo.png
 *       It will render as <img src="/logo.png" />
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ── ALL IMAGES ─────────────────────────────────────────────── */
const IMG = {
  // Hero
  heroCookies:  'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e92f3d1da3f6fadaa57d563127651ee268832138.jpg',
  // Pastries
  chocolate:    'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/afdbc324f0a3c891a841a2a4ce9e54398008ae60.jpg',
  vanilla:      'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/aaca0433a7e076130550cc3062d9a305355d111e.jpg',
  strawberry:   'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ae53f4c8bdf1a0ba830848aa13a260b9c82b9b59.jpg',
  biscoff:      'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d802ad5ae441e6d1a0fa86ca6530253d1a5b8544.jpg',
  freshFruit:   'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fb405f8e5593e70885ef02f1cf91a78bd00c261b.jpg',
  redVelvet:    'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/7ab0246ca057cee141cd40fd37f81d7a59966d35.jpg',
  // Cakes
  blackForest:  'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e5898be3bbbf556de4a00e6152483b5eba4897fc.jpg',
  butterscotch: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d35316277f83191a7ce56bd3bc0e606360a84ca0.jpg',
  berryFruit:   'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/75a786bd5d04bd088111bf46c88669381eba2e9d.jpg',
  chocTruffle:  'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/dc1795c6a69ee2c99fb50ecff3b709e2d81293b4.jpg',
  ferrero:      'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6f3dbd2d39b575c6a8d89de210a6fcfeb9cf6a7a.jpg',
  biscoffSlice: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2eca206fb3c22af49a80b1abe266caf8c576a0fc.jpg',
  // Cookies
  chipStack:    'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e92f3d1da3f6fadaa57d563127651ee268832138.jpg',
  nutella:      'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/51bae5a92e7d2a21839da7ba894549754c865075.jpg',
  almond:       'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a8adf336399cc0a435e1ab9815e99a62c0b4beb9.jpg',
  rvCookie:     'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c9e6d541493da52e623ae4b7df71c5b1d1de92bd.jpg',
  almondSingle: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d2267e8d2208fc40dc895fbf22e5f9e96e953106.jpg',
  nutella2:     'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/880ae3e27a9fcf86e1c219ceab8831482bfe274f.jpg',
  // Cheesecake
  cheesecake:   'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/95c2e4e51795b7f1651b5c52b28dfa708bb5207c.jpg',
}

/* ── DATA ───────────────────────────────────────────────────── */
const PASTRIES = [
  { name:'Death by Chocolate', sub:'Chocolate',        img: IMG.chocolate   },
  { name:'Snow White',         sub:'Vanilla',          img: IMG.vanilla     },
  { name:'Pretty in Pink',     sub:'Strawberry',       img: IMG.strawberry  },
  { name:'Golden Wish',        sub:'Biscoff / Caramel',img: IMG.biscoff     },
  { name:'Lost in Garden',     sub:'Fresh Fruits',     img: IMG.freshFruit  },
  { name:'Red Eve',            sub:'Red Velvet',       img: IMG.redVelvet   },
]
const SIGNATURE = [
  { name:"Siren's Kiss",      sub:'Classic Vanilla',   img: IMG.vanilla,      desc:'Soft vanilla sponge with smooth vanilla cream or buttercream' },
  { name:'Dark Spell',        sub:'Chocolate Truffle', img: IMG.chocTruffle,  desc:'Rich chocolate cake layered with silky ganache' },
  { name:'Velvet Temptation', sub:'Red Velvet',        img: IMG.redVelvet,    desc:'Moist red velvet with cream cheese or buttercream frosting' },
  { name:'Fallen Forest',     sub:'Black Forest',      img: IMG.blackForest,  desc:'Chocolate sponge with cherries & fresh cream' },
  { name:'Mr Sunshine',       sub:'Butterscotch',      img: IMG.butterscotch, desc:'Crunchy praline with caramel cream' },
  { name:'Lost in Garden',    sub:'Fresh Fruit Cake',  img: IMG.berryFruit,   desc:'Light sponge with seasonal fresh fruits' },
]
const BENTO = [
  { name:'Just You',       sub:'Red Heart',   img: IMG.redVelvet   },
  { name:'Black Pearl',    sub:'Chocolate',   img: IMG.chocTruffle },
  { name:'Handsome Jin',   sub:'Purple',      img: IMG.vanilla     },
  { name:'Pretty in Pink', sub:'Strawberry',  img: IMG.strawberry  },
]
const PREMIUM = [
  { name:'Golden Crown',    sub:'Lotus Biscoff',    img: IMG.biscoff,     desc:'Soft cake with Biscoff spread & cream'        },
  { name:'Racing Ferrero',  sub:'Ferrero Rocher',   img: IMG.ferrero,     desc:'Chocolate cake with hazelnut crunch'           },
  { name:'Oreo Cream Cake', sub:'Chocolate + Oreo', img: IMG.chocTruffle, desc:'Chocolate + Oreo loaded cream'                 },
  { name:'Lost in Garden',  sub:'Fresh Fruit',      img: IMG.berryFruit,  desc:'Light sponge with seasonal fresh fruits'       },
]
const COOKIES = [
  { name:'Classic Chocolate Chip', img: IMG.chipStack    },
  { name:'Double Chocolate',       img: IMG.nutella2     },
  { name:'Butter Cookies',         img: IMG.almondSingle },
  { name:'Nutella Filled',         img: IMG.nutella      },
  { name:'Lotus Biscoff',          img: IMG.biscoffSlice },
  { name:'Red Velvet',             img: IMG.rvCookie     },
  { name:'Almond Crunch',          img: IMG.almond       },
]

/* ── GLOBAL CSS ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --y:#F9C800;--yd:#D4A000;--yp:#FFFAEA;--yl:#FFF8D6;
  --br:#3A1800;--bm:#7A4A20;--bl:#B8895A;
  --fd:'Playfair Display',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
}
html{scroll-behavior:smooth}
body{font-family:var(--fb);background:#FFFFFF;color:var(--br);overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:rgba(249,200,0,.3);color:var(--br)}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:var(--y);border-radius:2px}

.sec{padding:clamp(3rem,7vw,6rem) clamp(1.25rem,5vw,5rem)}
.lbl{display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem}
.lbl-line{width:22px;height:2px;background:var(--y);border-radius:1px;flex-shrink:0}
.lbl-text{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--bl);font-weight:600}
.h2{font-family:var(--fd);font-size:clamp(1.9rem,4vw,3rem);line-height:1.1;color:var(--br);margin-bottom:.55rem}
.sub{color:var(--bm);line-height:1.75;max-width:480px;margin-bottom:2.25rem;font-size:.96rem}
img{display:block;max-width:100%}

/* Horizontal scroll row */
.hscroll{
  display:flex;overflow-x:auto;gap:1.2rem;
  padding-bottom:.75rem;padding-top:.25rem;
  scrollbar-width:none;-ms-overflow-style:none;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
}
.hscroll::-webkit-scrollbar{display:none}

/* Fade edges on scroll row */
.hscroll-wrap{position:relative}
.hscroll-wrap::after{
  content:'';position:absolute;top:0;right:0;bottom:.75rem;
  width:60px;pointer-events:none;
  background:linear-gradient(to left,rgba(255,255,255,.95),transparent);
  z-index:2;
}

/* Product card */
.pcard{
  flex-shrink:0;width:210px;
  scroll-snap-align:start;
  background:#FFFFFF;border-radius:18px;overflow:hidden;
  box-shadow:0 3px 18px rgba(58,24,0,.08);
  border:1px solid rgba(249,200,0,.15);
  cursor:default;
  transition:transform .25s cubic-bezier(0.16,1,0.3,1),box-shadow .25s;
}
.pcard:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(58,24,0,.14)}
.pcard-img{width:100%;aspect-ratio:1;overflow:hidden}
.pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(0.16,1,0.3,1)}
.pcard:hover .pcard-img img{transform:scale(1.07)}
.pcard-body{padding:.9rem 1rem 1.1rem}
.pcard-name{font-family:var(--fd);font-size:15px;color:var(--br);line-height:1.3;margin-bottom:.3rem;font-style:italic}
.pcard-sub{font-size:11px;color:var(--bl);text-transform:uppercase;letter-spacing:1.2px;font-weight:600}

/* Scroll arrows */
.scroll-btn{
  background:var(--y);border:none;border-radius:50%;
  width:38px;height:38px;cursor:pointer;font-size:16px;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 3px 14px rgba(58,24,0,.15);
  transition:background .2s,transform .2s;flex-shrink:0;
}
.scroll-btn:hover{background:var(--yd);transform:scale(1.08)}

/* Contact minimal */
.contact-row{
  display:flex;align-items:center;gap:1rem;
  padding:1rem 0;border-bottom:1px solid rgba(249,200,0,.2);
  text-decoration:none;color:var(--br);
  transition:color .2s,padding-left .2s;
}
.contact-row:hover{color:var(--yd);padding-left:.5rem}
.contact-icon{
  width:44px;height:44px;border-radius:50%;
  background:var(--yl);display:flex;align-items:center;
  justify-content:center;font-size:18px;flex-shrink:0;
}
`

/* ── MOTION HELPERS ─────────────────────────────────────────── */
const up  = (d=0) => ({ initial:{opacity:0,y:28}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:'-60px'}, transition:{duration:.7,ease:[0.16,1,0.3,1],delay:d} })
const pop = (d=0) => ({ initial:{opacity:0,scale:.9}, whileInView:{opacity:1,scale:1}, viewport:{once:true}, transition:{type:'spring',stiffness:200,damping:22,delay:d} })

function Label({t}){ return <div className="lbl"><div className="lbl-line"/><span className="lbl-text">{t}</span></div> }

/* ── SCROLL ROW COMPONENT ──────────────────────────────────── */
function ScrollRow({ items, renderCard }) {
  const ref = useRef()
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 260, behavior:'smooth' })
  return (
    <div>
      <div style={{display:'flex',justifyContent:'flex-end',gap:'.5rem',marginBottom:'.75rem'}}>
        <button className="scroll-btn" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
        <button className="scroll-btn" onClick={() => scroll(1)}  aria-label="Scroll right">→</button>
      </div>
      <div className="hscroll-wrap">
        <div className="hscroll" ref={ref}>
          {items.map((item, i) => renderCard(item, i))}
        </div>
      </div>
    </div>
  )
}

/* ── PRODUCT CARD ───────────────────────────────────────────── */
function PCard({ item, i }) {
  return (
    <motion.div className="pcard"
      initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}} transition={{delay:i*.06,duration:.55,ease:[0.16,1,0.3,1]}}
    >
      <div className="pcard-img">
        <img src={item.img} alt={item.name} width={210} height={210} loading="lazy" />
      </div>
      <div className="pcard-body">
        <div className="pcard-name">{item.name}</div>
        <div className="pcard-sub">{item.sub}</div>
        {item.desc && <p style={{fontSize:12.5,color:'var(--bm)',lineHeight:1.55,marginTop:'.4rem'}}>{item.desc}</p>}
      </div>
    </motion.div>
  )
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 55)
    window.addEventListener('scroll', fn, {passive:true})
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [['Menu','#menu'],['Cakes','#cakes'],['Cookies','#cookies'],['Contact','#contact']]
  return (
    <motion.nav initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.7,delay:.15,ease:[0.16,1,0.3,1]}}
      style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding: sc ? '.7rem 2.5rem' : '1.1rem 2.5rem',
        background: sc ? 'rgba(255,255,255,.96)' : 'rgba(255,255,255,0)',
        backdropFilter: sc ? 'blur(20px)' : 'none',
        boxShadow: sc ? '0 1px 22px rgba(58,24,0,.08)' : 'none',
        borderBottom: sc ? '1px solid rgba(249,200,0,.2)' : '1px solid transparent',
        transition:'all .38s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Logo — put your logo.png in the /public folder */}
      <motion.a href="#home" whileHover={{scale:1.02}} style={{display:'flex',alignItems:'center',gap:'.65rem',textDecoration:'none'}}>
        <img
          src="/logo.jpg" alt="Just Cake & Cookie"
          style={{height:38,width:'auto',display:'block',borderRadius:'50%'}}
          onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }}
        />
        {/* Fallback text logo (hidden when image loads) */}
        <div style={{display:'flex',alignItems:'center',gap:'.55rem'}}>
          {/* <div style={{width:38,height:38,borderRadius:'50%',background:'#F9C800',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 2px 12px rgba(249,200,0,.4)',flexShrink:0}}>🎂</div> */}
          <div>
            <div style={{fontFamily:'var(--fd)',fontWeight:700,fontSize:16,lineHeight:1.1,color:'#3A1800'}}>Just Cake</div>
            <div style={{fontSize:9.5,letterSpacing:'2px',textTransform:'uppercase',fontWeight:600,color:'#C8860A'}}>&amp; Cookie</div>
          </div>
        </div>
      </motion.a>
      <div style={{display:'flex',alignItems:'center',gap:'1.75rem'}}>
        {links.map(([l,h]) => (
          <motion.a key={l} href={h}
            style={{color:'#7A4A20',textDecoration:'none',fontWeight:500,fontSize:14,transition:'color .2s'}}
            whileHover={{color:'#C8860A'}}
          >{l}</motion.a>
        ))}
        <motion.a href="#contact"
          style={{background:'#F9C800',color:'#3A1800',padding:'.5rem 1.35rem',borderRadius:999,textDecoration:'none',fontWeight:700,fontSize:13}}
          whileHover={{background:'#FFE44D',scale:1.05}} whileTap={{scale:.97}}
        >Order ✦</motion.a>
      </div>
    </motion.nav>
  )
}

/* ── HERO ───────────────────────────────────────────────────── */
const FLOATERS = [
  { emoji:'🍪', top:'12%', right:'10%', size:34 },
  { emoji:'✦',  top:'22%', right:'46%', size:18 },
  { emoji:'🍓', bottom:'22%', right:'6%', size:28 },
  { emoji:'✦',  bottom:'35%', right:'42%', size:14 },
  { emoji:'🌟', top:'55%', right:'48%', size:20 },
]

function Hero() {
  const { scrollY } = useScroll()
  const yT = useTransform(scrollY, [0,440], [0,100])
  const oT = useTransform(scrollY, [0,340], [1,0])
  return (
    <section id="home" style={{
      minHeight:'100vh', display:'grid',
      gridTemplateColumns:'55fr 45fr', alignItems:'center',
      background:'linear-gradient(160deg, #FFFFFF 0%, #FFF8D6 55%, #FFFAEA 100%)',
      overflow:'hidden', position:'relative',
    }}>
      {/* Left — text */}
      <motion.div style={{padding:'clamp(7rem,12vh,9rem) clamp(1.5rem,6vw,5.5rem) 4rem', y:yT, opacity:oT}}>
        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.7}}
          style={{color:'#C8860A',fontSize:11.5,letterSpacing:'4px',textTransform:'uppercase',marginBottom:'.9rem',fontWeight:600}}
        >Handcrafted with love ✦</motion.p>

        <motion.h1 initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{delay:.42,duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:'var(--fd)',fontSize:'clamp(3rem,7.5vw,6.5rem)',lineHeight:1.03,color:'#3A1800',marginBottom:'1.4rem'}}
        >
          Taste the<br/>
          <em style={{color:'#C8860A'}}>love</em> in<br/>
          every crumb
        </motion.h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.8}}
          style={{color:'#7A4A20',fontSize:16,lineHeight:1.8,maxWidth:380,marginBottom:'2.2rem'}}
        >
          Handcrafted cakes, cookies & pastries made with the finest ingredients. Every bite tells a story.
        </motion.p>

        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.75,duration:.8}}
          style={{display:'flex',gap:'.9rem',flexWrap:'wrap',marginBottom:'3rem'}}
        >
          <motion.a href="#cakes"
            style={{background:'#3A1800',color:'#F9C800',padding:'.85rem 2.2rem',borderRadius:999,textDecoration:'none',fontWeight:700,fontSize:15}}
            whileHover={{background:'#5C2E00',scale:1.04}} whileTap={{scale:.97}}
          >Explore Cakes →</motion.a>
          <motion.a href="#contact"
            style={{border:'1.5px solid rgba(58,24,0,.2)',color:'#3A1800',padding:'.85rem 2.2rem',borderRadius:999,textDecoration:'none',fontWeight:500,fontSize:15,background:'rgba(255,255,255,.7)'}}
            whileHover={{borderColor:'#C8860A',background:'rgba(255,255,255,.95)'}} whileTap={{scale:.97}}
          >Get in Touch</motion.a>
        </motion.div>

        {/* Mini stats */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.95,duration:.8}}
          style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}
        >
          {[['50+','Flavours'],['7','Cookie Types'],['100%','Handmade']].map(([n,l]) => (
            <div key={l}>
              <div style={{fontFamily:'var(--fd)',fontSize:24,fontWeight:700,color:'#3A1800',lineHeight:1}}>{n}</div>
              <div style={{fontSize:12,color:'#B8895A',fontWeight:500,letterSpacing:'.5px',marginTop:2}}>{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right — floating food image */}
      <motion.div
        initial={{opacity:0,x:60}} animate={{opacity:1,x:0}}
        transition={{delay:.5,duration:1.1,ease:[0.16,1,0.3,1]}}
        style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',height:'100%',paddingRight:'clamp(0px,3vw,2rem)',paddingTop:'6rem'}}
      >
        {/* Yellow blob */}
        <motion.div
          animate={{scale:[1,1.04,1],rotate:[0,4,0]}}
          transition={{duration:9,repeat:Infinity,ease:'easeInOut'}}
          style={{
            position:'absolute',
            width:'75%',paddingBottom:'75%',
            borderRadius:'60% 40% 55% 45% / 46% 60% 42% 56%',
            background:'#F9C800',
            opacity:.9, zIndex:0,
          }}
        />
        {/* Shadow ring */}
        <div style={{
          position:'absolute',
          width:'74%',paddingBottom:'74%',
          borderRadius:'60% 40% 55% 45% / 46% 60% 42% 56%',
          boxShadow:'0 32px 80px rgba(200,134,10,.3)',
          zIndex:0,
        }} />
        {/* Food photo */}
        <motion.div
          animate={{y:[0,-16,0]}}
          transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
          style={{
            position:'relative',zIndex:1,
            width:'68%',aspectRatio:'1',
            borderRadius:'50%',overflow:'hidden',
            boxShadow:'0 24px 64px rgba(58,24,0,.22)',
          }}
        >
          <img src={IMG.heroCookies} alt="Freshly baked cookies"
            width={480} height={480}
            style={{width:'100%',height:'100%',objectFit:'cover'}}
          />
        </motion.div>
        {/* Floating decorations */}
        {FLOATERS.map((f, i) => (
          <motion.div key={i}
            animate={{y:[0,-(8+i*3),0],rotate:[0,10,0]}}
            transition={{duration:3+i*.7,repeat:Infinity,ease:'easeInOut',delay:i*.45}}
            style={{
              position:'absolute',fontSize:f.size,
              zIndex:3,filter:'drop-shadow(0 4px 8px rgba(58,24,0,.15))',
              ...Object.fromEntries(Object.entries(f).filter(([k])=>['top','bottom','left','right'].includes(k))),
            }}
          >{f.emoji}</motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div style={{position:'absolute',bottom:28,left:'50%',x:'-50%',zIndex:2}}
        animate={{y:[0,7,0]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}>
        <svg width="20" height="32" viewBox="0 0 20 32">
          <rect x="1" y="1" width="18" height="30" rx="9" fill="none" stroke="rgba(58,24,0,.22)" strokeWidth="1.5"/>
          <motion.circle cx="10" cy="8" r="3" fill="#C8860A"
            animate={{cy:[8,22,8],opacity:[1,0,1]}} transition={{duration:2,repeat:Infinity}}/>
        </svg>
      </motion.div>
    </section>
  )
}

/* ── TICKER ─────────────────────────────────────────────────── */
function Ticker() {
  const items = ['🎂 Signature Cakes','🍪 Artisan Cookies','🎁 Bento Cakes','🍰 Cheesecakes','🍓 Seasonal Pastries','✨ Premium Creations']
  const rep = [...items,...items,...items]
  return (
    <div style={{background:'#F9C800',padding:'.75rem 0',overflow:'hidden'}}>
      <motion.div animate={{x:['0%','-33.33%']}} transition={{duration:20,repeat:Infinity,ease:'linear'}}
        style={{display:'flex',gap:'2.5rem',width:'max-content'}}>
        {rep.map((it,i) => <span key={i} style={{color:'#3A1800',fontSize:13,fontWeight:600,letterSpacing:'.5px',whiteSpace:'nowrap'}}>{it}</span>)}
      </motion.div>
    </div>
  )
}

/* ── SECTION HEADER ─────────────────────────────────────────── */
function SectionHead({ label, title, sub, light }) {
  return (
    <motion.div {...up()} style={{marginBottom:'2rem'}}>
      <Label t={label} />
      <h2 className="h2" style={light ? {color:'#FFFBF0'} : {}}>{title}</h2>
      {sub && <p className="sub" style={light ? {color:'rgba(255,251,240,.6)'} : {}}>{sub}</p>}
    </motion.div>
  )
}

/* ── PASTRIES ───────────────────────────────────────────────── */
function Pastries() {
  return (
    <section id="menu" className="sec" style={{background:'#FFFFFF'}}>
      <SectionHead label="Fresh Daily" title="Our Pastries" sub="Individually crafted, each named for the feeling it stirs." />
      <ScrollRow items={PASTRIES} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
    </section>
  )
}

/* ── SIGNATURE CAKES ─────────────────────────────────────────── */
function SignatureCakes() {
  return (
    <section id="cakes" className="sec" style={{background:'var(--yp)'}}>
      <SectionHead label="Chef's Finest" title="Signature Cakes" sub="Each cake is a narrative — pull up a chair, there's a slice waiting for you." />
      <ScrollRow items={SIGNATURE} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
    </section>
  )
}

/* ── BENTO CAKES ─────────────────────────────────────────────── */
function BentoCakes() {
  return (
    <section className="sec" style={{background:'#FFFFFF'}}>
      <SectionHead label="Mini Masterpieces" title="Bento Cakes" sub="Small cakes, big emotions. Perfect for personal moments." />
      <ScrollRow items={BENTO} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
    </section>
  )
}

/* ── PREMIUM ─────────────────────────────────────────────────── */
function PremiumCakes() {
  return (
    <section id="premium" className="sec" style={{background:'var(--yl)'}}>
      <SectionHead label="Top Tier" title="Premium Cakes" sub="Crafted with the finest ingredients — for moments that deserve the very best." />
      <ScrollRow items={PREMIUM} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
    </section>
  )
}

/* ── COOKIES ─────────────────────────────────────────────────── */
function Cookies() {
  return (
    <section id="cookies" className="sec" style={{background:'#FFFFFF'}}>
      <SectionHead label="Freshly Baked" title="Our Cookies" sub="Crispy edges, chewy centers — seven irresistible varieties." />
      <ScrollRow items={COOKIES} renderCard={(item, i) => <PCard key={item.name} item={item} i={i} />} />
    </section>
  )
}

/* ── CHEESECAKE ──────────────────────────────────────────────── */
function Cheesecake() {
  return (
    <section className="sec" style={{background:'var(--yp)'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'3rem',alignItems:'center'}}>
        <motion.div {...up()}>
          <Label t="The Classic" />
          <h2 className="h2">Cheesecake</h2>
          <p style={{color:'var(--bm)',lineHeight:1.8,maxWidth:440,fontSize:15.5}}>
            Velvety smooth cheesecakes baked fresh daily — a buttery crust with rich, creamy filling. Ask us about today's flavours.
          </p>
        </motion.div>
        <motion.div {...pop(.12)}
          whileHover={{scale:1.03}}
          style={{borderRadius:22,overflow:'hidden',boxShadow:'0 12px 48px rgba(58,24,0,.14)',cursor:'default'}}
        >
          <img src={IMG.cheesecake} alt="Cheesecake" width={540} height={540}
            style={{width:'100%',aspectRatio:'1',objectFit:'cover'}} loading="lazy" />
        </motion.div>
      </div>
    </section>
  )
}

/* ── CONTACT — minimal ───────────────────────────────────────── */
const CONTACTS = [
  { label:'WhatsApp', sub:'Chat with us', icon:'💬', color:'#25D366', href:'https://wa.me/918888888888'  },
  { label:'Instagram',sub:'@justcakeandcookie', icon:'📸', color:'#E1306C', href:'https://instagram.com/justcakeandcookie' },
  { label:'Email',   sub:'hello@justcakeandcookie.com', icon:'✉️', color:'#EA4335', href:'mailto:hello@justcakeandcookie.com' },
  { label:'Call',    sub:'+91 88888 88888', icon:'📞', color:'#3A1800', href:'tel:+918888888888' },
]

function Contact() {
  return (
    <section id="contact" className="sec" style={{background:'#FFFFFF'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'4rem',alignItems:'flex-start'}}>
        <motion.div {...up()}>
          <Label t="Get in Touch" />
          <h2 className="h2">We'd love<br/>to hear from you</h2>
          <p style={{color:'var(--bm)',lineHeight:1.8,maxWidth:360,fontSize:15.5}}>
            Ready to order, or just curious about today's menu? Reach out — we're always happy to chat.
          </p>
        </motion.div>
        <motion.div {...up(.1)}>
          {CONTACTS.map((c, i) => (
            <motion.a key={c.label} href={c.href}
              target="_blank" rel="noopener noreferrer"
              className="contact-row"
              whileHover={{ x:6 }}
            >
              <div className="contact-icon" style={{background:`${c.color}18`}}>
                <span style={{fontSize:20}}>{c.icon}</span>
              </div>
              <div>
                <div style={{fontFamily:'var(--fd)',fontSize:17,fontWeight:600,fontStyle:'italic',lineHeight:1.2}}>{c.label}</div>
                <div style={{fontSize:13,color:'var(--bl)',marginTop:2}}>{c.sub}</div>
              </div>
              <div style={{marginLeft:'auto',color:'rgba(58,24,0,.2)',fontSize:16,transition:'color .2s,transform .2s'}}>→</div>
            </motion.a>
          ))}
          {/* Replace note */}
          <p style={{fontSize:11.5,color:'var(--bl)',marginTop:'1.25rem',lineHeight:1.6}}>
            * Replace the phone number, email, and Instagram handle above with your actual contact details.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ── ABOUT ───────────────────────────────────────────────────── */
function About() {
  const stats = [{n:'50+',l:'Flavours',e:'🎂'},{n:'7',l:'Cookie Kinds',e:'🍪'},{n:'100%',l:'Handmade',e:'✋'},{n:'♥',l:'With Love',e:'💛'}]
  return (
    <section id="about" className="sec" style={{background:'var(--yp)'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'4rem',alignItems:'center'}}>
        <motion.div {...up()}>
          <Label t="Our Story" />
          <h2 className="h2" style={{marginBottom:'1.35rem'}}>
            Baked with heart,<br/>
            <em style={{color:'#C8860A'}}>served with soul</em>
          </h2>
          <p style={{color:'var(--bm)',lineHeight:1.85,marginBottom:'1rem',maxWidth:440,fontSize:15.5}}>
            Just Cake & Cookie was born from a simple belief — the best things in life should taste extraordinary. We use time-honored recipes and the freshest ingredients to bring joy to every celebration.
          </p>
          <p style={{color:'var(--bm)',lineHeight:1.85,maxWidth:440,fontSize:15.5}}>
            From intimate bento cakes to grand premium creations, every order is crafted personally.
          </p>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.9rem'}}>
          {stats.map((s,i) => (
            <motion.div key={s.l} {...pop(i*.12)}
              whileHover={{y:-4}}
              style={{background:'#FFFFFF',borderRadius:20,padding:'1.6rem 1rem',textAlign:'center',boxShadow:'0 3px 18px rgba(58,24,0,.07)',cursor:'default',transition:'transform .25s'}}
            >
              <div style={{fontSize:24,marginBottom:'.4rem'}}>{s.e}</div>
              <div style={{fontFamily:'var(--fd)',fontSize:28,fontWeight:700,color:'#3A1800',lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:12,color:'var(--bm)',fontWeight:500,marginTop:'.3rem'}}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{background:'#FFF8D6',borderTop:'1px solid rgba(249,200,0,.3)',padding:'2.25rem clamp(1.25rem,5.5vw,5rem) 1.75rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem',marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'.65rem'}}>
          <span style={{fontSize:24}}>🎂</span>
          <div>
            <div style={{fontFamily:'var(--fd)',color:'#3A1800',fontWeight:700,fontSize:17,lineHeight:1.1}}>Just Cake & Cookie</div>
            <div style={{fontSize:9.5,color:'#C8860A',letterSpacing:'2px',textTransform:'uppercase',fontWeight:600,marginTop:2}}>Taste the love in every crumb</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
          {[['Menu','#menu'],['Cakes','#cakes'],['Cookies','#cookies'],['Contact','#contact'],['About','#about']].map(([l,h]) => (
            <motion.a key={l} href={h} style={{color:'var(--bl)',textDecoration:'none',fontSize:13.5,fontWeight:500}} whileHover={{color:'#C8860A'}}>{l}</motion.a>
          ))}
        </div>
        <div style={{display:'flex',gap:'.75rem'}}>
          {[
            {href:'https://wa.me/918888888888',icon:'💬',col:'#25D366',label:'WhatsApp'},
            {href:'https://instagram.com/justcakeandcookie',icon:'📸',col:'#E1306C',label:'Instagram'},
            {href:'mailto:hello@justcakeandcookie.com',icon:'✉️',col:'#EA4335',label:'Email'},
            {href:'tel:+918888888888',icon:'📞',col:'#3A1800',label:'Call'},
          ].map(s => (
            <motion.a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              whileHover={{scale:1.15,y:-2}}
              style={{width:36,height:36,borderRadius:'50%',background:s.col,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,textDecoration:'none',boxShadow:'0 3px 10px rgba(58,24,0,.15)'}}
            >{s.icon}</motion.a>
          ))}
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(249,200,0,.2)',paddingTop:'1.1rem',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.75rem'}}>
        <p style={{fontSize:12.5,color:'var(--bl)'}}>© 2026 Just Cake & Cookie. All rights reserved.</p>
        <p style={{fontSize:12.5,color:'var(--bl)'}}>Made with 💛 for every sweet craving</p>
      </div>
    </footer>
  )
}

/* ── ROOT ────────────────────────────────────────────────────── */
export default function Page() {
  useEffect(() => {
    const s = document.createElement('style')
    s.id = 'jcc-css'
    s.innerHTML = CSS
    if (!document.getElementById('jcc-css')) document.head.appendChild(s)
    return () => document.getElementById('jcc-css')?.remove()
  }, [])
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
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

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LOGO — Where to put your image file:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  just-cake-cookie/
  ├── public/
  │   └── logo.png  ← Put your logo here
  ├── app/
  │   ├── page.js   ← This file
  │   └── layout.js

  The navbar uses <img src="/logo.png" /> — Next.js
  automatically serves files from /public at the root URL.
  If the image fails to load, a text+emoji fallback shows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  app/layout.js:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  export const metadata = {
    title: 'Just Cake & Cookie — Taste the love in every crumb',
    description: 'Handcrafted cakes, cookies & pastries.',
  }
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ margin: 0 }}>{children}</body>
      </html>
    )
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  npm install — only needs framer-motion now:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  npm install framer-motion

  (three, @react-three/fiber, @react-three/drei no longer needed)
*/
