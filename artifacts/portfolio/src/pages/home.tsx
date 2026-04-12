import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Play, Pause, MessageCircle, Mail, Instagram, Youtube, ArrowDown,
  ArrowRight, Film, Zap, Clapperboard, ChevronRight, Eye,
  Star, Quote, VolumeX, Volume2, X, Twitter, Monitor
} from 'lucide-react';

import heroBg     from '../assets/hero-bg.png';
import project1   from '../assets/project-1.png';
import project2   from '../assets/project-2.png';
import project3   from '../assets/project-3.png';
import aboutImg   from '../assets/about-portrait.png';

/* ── Videos ── */
const REEL_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-working-on-video-editing-in-a-studio-with-multiple-screens-34738-large.mp4";
const PREVIEW: Record<string, string> = {
  YouTube:   "https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-camera-on-a-tripod-at-sunset-34386-large.mp4",
  Reels:     "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-a-neon-lit-corridor-4402-large.mp4",
  Cinematic: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-during-the-night-5178-large.mp4",
  Ads:       "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-clapper-board-943-large.mp4",
};
const WA = "https://wa.me/923000000000";

/* ── Data ── */
const WORKS = [
  { id:1, n:"01", title:"Brand Story Reel",     cat:"YouTube",   img:project1, dur:"2:45", desc:"A high-energy YouTube opener engineered to hook viewers in the first 3 seconds and keep them watching till the last frame.", tags:["Motion Graphics","Beat Sync","Colour Grade"] },
  { id:2, n:"02", title:"Night City Cinematic",  cat:"Cinematic", img:project2, dur:"3:47", desc:"Moody, atmospheric city documentary shot at night. Rich LUTs, immersive sound design, and an emotional narrative arc.", tags:["Film Grade","Sound Design","Storytelling"] },
  { id:3, n:"03", title:"Lifestyle Reel",        cat:"Reels",     img:project3, dur:"0:28", desc:"A 28-second lifestyle reel engineered for virality. Trend-driven cuts, audio sync, and a hook within the first 2 frames.", tags:["Viral Hook","CapCut","Platform-Native"] },
  { id:4, n:"04", title:"Product Launch Ad",     cat:"Ads",       img:project1, dur:"0:30", desc:"A punchy 30-second commercial that converts. Clean product shots, kinetic text, and a CTA you can't ignore.", tags:["Commercial","Premiere Pro","Conversion"] },
];

const SERVICES = [
  { icon:<Youtube className="w-7 h-7"/>,     title:"YouTube Editing",    desc:"Long-form content with retention-optimised pacing, custom graphics and immersive sound.",     col:"#8b5cf6" },
  { icon:<Zap className="w-7 h-7"/>,         title:"Reels & TikTok",     desc:"Trend-driven short clips built with viral hooks, tight cuts, and platform-native formats.",    col:"#06b6d4" },
  { icon:<Film className="w-7 h-7"/>,        title:"Cinematic Videos",   desc:"Film-grade productions with rich colour grading, atmospheric sound and emotional depth.",       col:"#8b5cf6" },
  { icon:<Clapperboard className="w-7 h-7"/>,title:"Ad Creatives",       desc:"High-converting commercial edits that capture attention and drive measurable client results.",   col:"#06b6d4" },
];

const REVIEWS = [
  { name:"Aryan Khan",  role:"YouTube Creator · 250K Subs", av:"AK", stars:5, text:"Shoaib didn't just edit my video — he completely transformed it. Watch time went up 40%, comments were full of people asking who edited it. Genuinely elite work." },
  { name:"Sara Malik",  role:"Fashion Brand Owner",          av:"SM", stars:5, text:"Needed a product reel on 24 hours notice. Not only did he deliver, the result tripled my Instagram engagement that week. Shocked by the quality at his level." },
  { name:"Usman Tariq", role:"Wedding Videographer",         av:"UT", stars:5, text:"I've worked with editors across three countries. Shoaib is instinctively the best. He understands pacing and emotion in a way you simply cannot teach." },
];

const TICKER_ITEMS = ["CINEMATIC EDITING","COLOUR GRADING","MOTION GRAPHICS","PREMIERE PRO","CAPCUT","SHORT FORM","LONG FORM","REEL CREATION","STORY FIRST","BEAT SYNC","SOUND DESIGN","CREATIVE DIRECTION"];

/* ── Helper: Clip-reveal per letter ── */
function RevealTitle({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ display:"inline-block", overflow:"hidden" }}>
          <motion.span
            style={{ display:"inline-block" }}
            initial={{ y:"110%" }}
            animate={{ y:"0%" }}
            transition={{ duration:0.9, delay: delay + i * 0.06, ease:[0.16,1,0.3,1] }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Helper: Scroll-trigger fade ── */
function Reveal({ children, className="", delay=0, dir="up" }:{
  children:React.ReactNode; className?:string; delay?:number; dir?:"up"|"left"|"right"|"none";
}) {
  const ref = useRef(null);
  const visible = useInView(ref, { once:true, margin:"-80px" });
  const init = dir==="up"?{opacity:0,y:40}:dir==="left"?{opacity:0,x:-40}:dir==="right"?{opacity:0,x:40}:{opacity:0};
  return (
    <motion.div ref={ref} initial={init} animate={visible?{opacity:1,y:0,x:0}:{}}
      transition={{ duration:0.85, delay, ease:[0.16,1,0.3,1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Helper: Animated counter ── */
function Count({ to, suffix="" }:{ to:number; suffix?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const vis = useInView(ref, { once:true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let n=0; const step=to/55;
    const t=setInterval(()=>{ n+=step; if(n>=to){setV(to);clearInterval(t);}else setV(Math.floor(n)); },16);
    return ()=>clearInterval(t);
  },[vis,to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ── Work piece: editorial alternating layout ── */
function WorkPiece({ w, flip }:{ w:typeof WORKS[0]; flip:boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [hov, setHov] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef(null);
  const vis = useInView(ref, { once:true, margin:"-100px" });

  const enter=()=>{ setHov(true); vidRef.current?.play().catch(()=>{}); };
  const leave=()=>{ setHov(false); if(vidRef.current){vidRef.current.pause();vidRef.current.currentTime=0;} };

  return (
    <motion.div ref={ref}
      initial={{ opacity:0 }} animate={vis?{opacity:1}:{}}
      transition={{ duration:0.6 }}
      className={`flex flex-col ${flip?"lg:flex-row-reverse":"lg:flex-row"} items-stretch min-h-[480px] border-b`}
      style={{ borderColor:"rgba(255,255,255,0.05)" }}
    >
      {/* Media */}
      <div className="w-full lg:w-3/5 relative overflow-hidden cursor-pointer bg-black"
        onMouseEnter={enter} onMouseLeave={leave}>
        <motion.img src={w.img} alt={w.title}
          className="w-full h-full object-cover absolute inset-0"
          style={{ filter:"brightness(0.6) saturate(1.1)" }}
          animate={{ opacity:hov&&ready?0:1, scale:hov?1.05:1 }}
          transition={{ duration:0.7 }}/>
        <video ref={vidRef} src={PREVIEW[w.cat]} muted loop playsInline preload="none"
          onLoadedData={()=>setReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity:hov&&ready?1:0, transition:"opacity 0.6s ease" }}/>
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: flip
            ? "linear-gradient(to right, rgba(5,5,7,0.9) 0%, rgba(5,5,7,0.2) 40%, transparent 100%)"
            : "linear-gradient(to left,  rgba(5,5,7,0.9) 0%, rgba(5,5,7,0.2) 40%, transparent 100%)"
          }}/>
        {/* Play indicator */}
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity:hov?1:0 }} transition={{ duration:0.25 }}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background:"linear-gradient(135deg,#8b5cf6,#06b6d4)" }}
              animate={hov?{scale:[1,1.8,1],opacity:[0.6,0,0.6]}:{}}
              transition={{ repeat:Infinity, duration:1.6 }}/>
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center glow-purple"
              style={{ background:"linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
              <Play className="w-6 h-6 fill-white text-white ml-1"/>
            </div>
          </div>
        </motion.div>
        {/* Duration badge */}
        <div className="absolute top-5 right-5 text-xs font-bold font-mono text-white/50 glass px-2.5 py-1.5 rounded">
          {w.dur}
        </div>
      </div>

      {/* Text */}
      <div className={`w-full lg:w-2/5 flex flex-col justify-center px-8 md:px-12 py-12 relative ${flip?"lg:pr-16":"lg:pl-16"}`}>
        {/* Ghost number */}
        <div className="absolute -top-4 right-4 font-black text-[8rem] leading-none pointer-events-none select-none"
          style={{ color:"rgba(255,255,255,0.03)", fontFamily:"Space Grotesk" }}>
          {w.n}
        </div>
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3">
            <span className="label-text">{w.n}</span>
            <div className="flex-1 h-px" style={{ background:"rgba(255,255,255,0.1)" }}/>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background:"rgba(139,92,246,0.12)", border:"1px solid rgba(139,92,246,0.3)", color:"#a78bfa" }}>
              {w.cat}
            </span>
          </div>
          <h3 className="display-text text-white" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>{w.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.45)" }}>{w.desc}</p>
          <div className="flex flex-wrap gap-2">
            {w.tags.map(t=>(
              <span key={t} className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.45)" }}>
                {t}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-grad hover:gap-4 transition-all duration-300"
              whileHover={{ x:4 }}>
              Commission this style <ArrowRight className="w-4 h-4 text-cyan-400"/>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
const NAV_ITEMS = [
  { href:"#work",         label:"Work"      },
  { href:"#services",     label:"Services"  },
  { href:"#about",        label:"About"     },
  { href:"#testimonials", label:"Reviews"   },
  { href:"#contact",      label:"Contact"   },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVid = useRef<HTMLVideoElement>(null);
  const [menu,  setMenu]  = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused,setPaused] = useState(false);

  /* Parallax */
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY  = useTransform(scrollYProgress,[0,1],[0,180]);
  const heroOp = useTransform(scrollYProgress,[0,0.75],[1,0]);
  const heroSc = useTransform(scrollYProgress,[0,1],[1,1.1]);

  /* Custom cursor glow */
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const cx = useSpring(mx, { stiffness:150, damping:20 });
  const cy = useSpring(my, { stiffness:150, damping:20 });
  useEffect(()=>{
    const fn=(e:MouseEvent)=>{ mx.set(e.clientX-200); my.set(e.clientY-200); };
    window.addEventListener("mousemove",fn);
    return ()=>window.removeEventListener("mousemove",fn);
  },[mx,my]);

  const toggleMute=()=>{ if(heroVid.current){heroVid.current.muted=!muted;setMuted(m=>!m);} };
  const togglePlay=()=>{ if(heroVid.current){paused?heroVid.current.play():heroVid.current.pause();setPaused(p=>!p);} };

  return (
    <div className="bg-[#050507] text-white min-h-screen overflow-x-hidden" style={{ fontFamily:"'Space Grotesk',sans-serif" }}>

      {/* ── Cursor glow ── */}
      <motion.div className="fixed pointer-events-none z-[9999] rounded-full"
        style={{ left:cx, top:cy, width:400, height:400,
          background:"radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }}/>

      {/* ── NAV ── */}
      <motion.header
        initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 h-[70px] flex items-center justify-between glass-dark border-b"
        style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded flex items-center justify-center font-black text-sm text-white grad-main">S</div>
          <span className="font-black text-base uppercase tracking-tight text-white">
            Shoaib<span className="text-grad">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-white/40">
          {NAV_ITEMS.map(n=>(
            <a key={n.href} href={n.href}
              className="hover:text-white transition-colors duration-300 relative group py-1">
              {n.label}
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background:"linear-gradient(to right,#8b5cf6,#06b6d4)" }}/>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white glow-purple hover:scale-105 transition-all duration-300 grad-main">
            <MessageCircle className="w-4 h-4"/> Hire Me
          </a>
          <button onClick={()=>setMenu(v=>!v)} className="md:hidden p-2 text-white/50 hover:text-white transition-colors">
            {menu ? <X className="w-6 h-6"/> :
              <div className="space-y-1.5 w-6">
                <div className="h-0.5 bg-current rounded-full"/>
                <div className="h-0.5 bg-current w-3/4 rounded-full"/>
                <div className="h-0.5 bg-current rounded-full"/>
              </div>
            }
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            className="fixed top-[70px] inset-x-0 z-40 px-6 py-5 flex flex-col"
            style={{ background:"rgba(5,5,7,0.97)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            {NAV_ITEMS.map(n=>(
              <a key={n.href} href={n.href} onClick={()=>setMenu(false)}
                className="py-4 border-b text-white/50 hover:text-white font-semibold transition-colors"
                style={{ borderColor:"rgba(255,255,255,0.04)" }}>
                {n.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white grad-main">
              <MessageCircle className="w-4 h-4"/> Hire Me on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-end pb-16 overflow-hidden scanlines">
        {/* BG video */}
        <motion.div style={{ y:heroY, scale:heroSc }} className="absolute inset-0 z-0">
          <video ref={heroVid} autoPlay muted loop playsInline poster={heroBg}
            className="w-full h-full object-cover" style={{ filter:"brightness(0.35) saturate(1.2)" }}>
            <source src={REEL_VIDEO} type="video/mp4"/>
            <img src={heroBg} alt="" className="w-full h-full object-cover"/>
          </video>
          {/* Overlays */}
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top, #050507 0%, rgba(5,5,7,0.6) 35%, rgba(5,5,7,0.1) 65%, rgba(5,5,7,0.4) 100%)" }}/>
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 90% 60% at 15% 80%, rgba(139,92,246,0.1), transparent 60%)" }}/>
        </motion.div>

        {/* Left accent bar */}
        <motion.div className="absolute left-6 top-1/4 bottom-1/4 w-px z-20 pointer-events-none"
          initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:1, opacity:1 }}
          transition={{ duration:1.2, delay:1.5, ease:[0.16,1,0.3,1] }}
          style={{ background:"linear-gradient(to bottom, transparent, #8b5cf6, #06b6d4, transparent)", transformOrigin:"top" }}/>

        {/* Vertical label */}
        <motion.div className="absolute left-9 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}>
          <span className="label-text" style={{ writingMode:"vertical-rl", transform:"rotate(180deg)" }}>
            Cinematic Video Editor
          </span>
        </motion.div>

        {/* Hero text content */}
        <motion.div style={{ opacity:heroOp }} className="relative z-20 px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto w-full">
          {/* Open badge */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}
            className="inline-flex items-center gap-2.5 mb-6 glass px-4 py-2 rounded-full">
            <motion.span animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity, duration:2 }}
              className="w-2 h-2 rounded-full bg-green-400 inline-block"/>
            <span className="label-text" style={{ color:"rgba(134,239,172,0.8)", letterSpacing:"0.2em" }}>Open for new projects</span>
          </motion.div>

          {/* Main title */}
          <h1 className="display-text mb-4" style={{ fontSize:"clamp(4rem,14vw,13rem)", lineHeight:0.9 }}>
            <RevealTitle text="SHOAIB" delay={0.3}/>
          </h1>

          {/* Divider line */}
          <motion.div className="h-px mb-5 max-w-lg"
            initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ duration:0.9, delay:1.1, ease:[0.16,1,0.3,1] }}
            style={{ background:"linear-gradient(to right,#8b5cf6,#06b6d4,transparent)", transformOrigin:"left" }}/>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}>
            <p className="text-xl md:text-2xl font-light italic mb-2" style={{ color:"rgba(255,255,255,0.5)" }}>
              "I don't just edit videos,{" "}
              <span className="not-italic font-semibold text-grad">I create emotions.</span>"
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.4 }}
            className="flex flex-wrap gap-4 mt-8 items-center">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base glow-purple hover:scale-105 transition-all duration-300 grad-main">
              <MessageCircle className="w-5 h-5"/>
              Hire Me on WhatsApp
              <motion.span animate={{ x:[0,5,0] }} transition={{ repeat:Infinity, duration:1.3 }}>
                <ArrowRight className="w-4 h-4"/>
              </motion.span>
            </a>
            <a href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white/70 hover:text-white text-base glass hover:scale-105 transition-all duration-300">
              <Play className="w-5 h-5 text-purple-400 fill-purple-400"/> Watch My Work
            </a>
          </motion.div>
        </motion.div>

        {/* Video controls */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
          className="absolute bottom-6 right-8 z-30 flex gap-2">
          <button onClick={toggleMute}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/35 hover:text-white transition-colors">
            {muted?<VolumeX className="w-4 h-4"/>:<Volume2 className="w-4 h-4"/>}
          </button>
          <button onClick={togglePlay}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/35 hover:text-white transition-colors">
            {paused?<Play className="w-4 h-4"/>:<Pause className="w-4 h-4"/>}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ color:"rgba(255,255,255,0.18)" }}>
          <span className="label-text" style={{ fontSize:"8px", letterSpacing:"0.35em" }}>Scroll</span>
          <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:1.9 }}>
            <ArrowDown className="w-4 h-4"/>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-3 ticker-wrap relative overflow-hidden"
        style={{ background:"linear-gradient(90deg,rgba(139,92,246,0.1),rgba(6,182,212,0.08),rgba(139,92,246,0.1))", borderTop:"1px solid rgba(139,92,246,0.2)", borderBottom:"1px solid rgba(6,182,212,0.15)" }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS].map((t,i)=>(
            <span key={i} className="inline-flex items-center gap-3 mx-5"
              style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.22em", color:i%2===0?"rgba(167,139,250,0.65)":"rgba(34,211,238,0.45)" }}>
              {t} <span style={{ color:"rgba(255,255,255,0.12)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS strip ── */}
      <div className="py-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y-0 md:divide-x"
          style={{ borderColor:"rgba(255,255,255,0.06)" }}>
          {[
            {v:20,sfx:"+",lbl:"Projects Delivered"},
            {v:15,sfx:"+",lbl:"Happy Clients"},
            {v:1, sfx:"+",lbl:"Year Experience"},
            {v:100,sfx:"%",lbl:"Client Satisfaction"},
          ].map((s,i)=>(
            <Reveal key={s.lbl} delay={i*0.08} className="flex flex-col items-center md:items-start md:px-10 gap-2 text-center md:text-left">
              <div className="display-text text-grad" style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)" }}>
                <Count to={s.v} suffix={s.sfx}/>
              </div>
              <div className="label-text">{s.lbl}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section id="work" className="mt-8" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="px-6 md:px-16 max-w-[1400px] mx-auto py-16">
          <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="label-text">02</span>
                <div className="w-16 h-px" style={{ background:"rgba(255,255,255,0.12)" }}/>
              </div>
              <h2 className="display-text text-white" style={{ fontSize:"clamp(2rem,5vw,4rem)" }}>
                Selected Work
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color:"rgba(255,255,255,0.35)" }}>
              Hover any piece to see a live preview reel.
            </p>
          </Reveal>
        </div>

        {WORKS.map((w,i)=>(
          <WorkPiece key={w.id} w={w} flip={i%2===1}/>
        ))}

        <div className="py-12 flex justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white glow-purple hover:scale-105 transition-all duration-300 grad-main">
            <MessageCircle className="w-5 h-5"/> Commission Your Project
          </a>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="label-text">03</span>
            <div className="w-16 h-px" style={{ background:"rgba(255,255,255,0.12)" }}/>
            <span className="label-text">About</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Photo */}
            <Reveal dir="left" className="relative">
              <div className="relative max-w-sm">
                <div className="absolute inset-0 rounded-2xl opacity-15 blur-3xl"
                  style={{ background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", transform:"translate(24px,24px)" }}/>
                <div className="absolute translate-x-6 translate-y-6 inset-0 rounded-2xl"
                  style={{ border:"1px solid rgba(139,92,246,0.2)" }}/>
                <img src={aboutImg} alt="Shoaib"
                  className="relative w-full rounded-2xl object-cover aspect-[3/4] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"/>
                <div className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl font-black text-sm text-white uppercase tracking-wider glow-purple"
                  style={{ background:"linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
                  Based in Pakistan
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div className="space-y-8">
              <Reveal delay={0.1}>
                {/* Big pull quote */}
                <blockquote className="display-text leading-tight mb-8"
                  style={{ fontSize:"clamp(1.8rem,3.5vw,3rem)" }}>
                  <span className="text-grad">"</span>
                  <span className="text-white">Every frame I cut is a</span>{" "}
                  <span className="text-grad-shimmer">deliberate choice.</span>
                  <span className="text-grad">"</span>
                </blockquote>
              </Reveal>

              <Reveal delay={0.15} className="space-y-4 text-[15px] leading-relaxed"
                style={{ color:"rgba(255,255,255,0.48)" }}>
                <p>I'm Shoaib — a cinematic video editor specialising in Adobe Premiere Pro and CapCut. With 1 year of intense, focused experience, I've built a reputation for edits that don't just look good — they make people feel something.</p>
                <p>Whether it's a 28-second viral reel or a 12-minute documentary, I bring the same obsessive attention to pacing, colour, and emotion to every single frame.</p>
              </Reveal>

              <Reveal delay={0.2} className="grid grid-cols-2 gap-3">
                {[
                  { tool:"Adobe Premiere Pro", col:"#8b5cf6" },
                  { tool:"CapCut",             col:"#06b6d4" },
                  { tool:"Colour Grading",     col:"#8b5cf6" },
                  { tool:"Motion Graphics",    col:"#06b6d4" },
                  { tool:"Sound Design",       col:"#8b5cf6" },
                  { tool:"Beat Syncing",       col:"#06b6d4" },
                ].map(t=>(
                  <div key={t.tool} className="flex items-center gap-3 text-sm" style={{ color:"rgba(255,255,255,0.6)" }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:t.col }}/>
                    {t.tool}
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.25}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-white glow-purple hover:scale-105 transition-all duration-300 grad-main">
                  <MessageCircle className="w-4 h-4"/> Let's Work Together
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24" style={{ background:"#030305", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
        <div className="px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="label-text">04</span>
            <div className="w-16 h-px" style={{ background:"rgba(255,255,255,0.12)" }}/>
            <span className="label-text">Services</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border:"1px solid rgba(255,255,255,0.05)" }}>
            {SERVICES.map((s,i)=>(
              <Reveal key={s.title} delay={i*0.08}>
                <div className="group p-10 relative overflow-hidden transition-all duration-400 cursor-default h-full"
                  style={{ background:"#030305", borderColor:"rgba(255,255,255,0.04)" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#0a0a10";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#030305";}}>
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-0.5 transition-all duration-400"
                    style={{ background:`linear-gradient(to bottom,transparent,${s.col},transparent)`, opacity:0.5 }}/>
                  <div className="absolute left-0 top-8 bottom-8 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background:`linear-gradient(to bottom,transparent,${s.col},transparent)`, filter:"blur(4px)" }}/>

                  {/* Background ghost number */}
                  <div className="absolute -top-2 -right-2 font-black text-[5rem] leading-none pointer-events-none select-none"
                    style={{ color:"rgba(255,255,255,0.02)", fontFamily:"Space Grotesk" }}>0{i+1}</div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                      style={{ background:`${s.col}14`, border:`1px solid ${s.col}30`, color:s.col }}>
                      {s.icon}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3 tracking-tight group-hover:text-grad transition-all duration-300">{s.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color:"rgba(255,255,255,0.38)" }}>{s.desc}</p>
                    <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all duration-300"
                      style={{ color:s.col }}>
                      Get Started <ChevronRight className="w-3.5 h-3.5"/>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
        <div className="px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="label-text">05</span>
            <div className="w-16 h-px" style={{ background:"rgba(255,255,255,0.12)" }}/>
            <span className="label-text">Client Reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r,i)=>(
              <Reveal key={r.name} delay={i*0.1}>
                <div className="group p-8 rounded-xl h-full flex flex-col gap-6 transition-all duration-400 hover:scale-[1.02] cursor-default"
                  style={{ background:"#0a0a10", border:"1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(139,92,246,0.3)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
                  <div className="flex items-start justify-between">
                    <Quote className="w-8 h-8 text-purple-500/25 group-hover:text-purple-500/55 transition-colors"/>
                    <div className="flex gap-0.5">
                      {Array.from({length:r.stars}).map((_,j)=>(
                        <Star key={j} className="w-3.5 h-3.5 fill-purple-400 text-purple-400"/>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 italic" style={{ color:"rgba(255,255,255,0.45)" }}>"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0 grad-main">
                      {r.av}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{r.name}</div>
                      <div className="text-[11px] mt-0.5" style={{ color:"rgba(255,255,255,0.28)" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-6 px-6 md:px-16" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl py-24 px-10 md:px-20 text-center"
            style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.12) 0%,rgba(6,182,212,0.08) 50%,rgba(139,92,246,0.06) 100%)", border:"1px solid rgba(139,92,246,0.2)" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:"radial-gradient(ellipse 80% 80% at 50% 100%,rgba(139,92,246,0.08),transparent)" }}/>
            {/* Ghost text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="display-text font-black text-grad opacity-[0.04]" style={{ fontSize:"clamp(5rem,18vw,14rem)", whiteSpace:"nowrap" }}>HIRE ME</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="label-text">06</span>
                <div className="w-10 h-px" style={{ background:"rgba(255,255,255,0.15)" }}/>
                <span className="label-text">Let's Create</span>
              </div>
              <h2 className="display-text text-white mb-4" style={{ fontSize:"clamp(2.2rem,6vw,5rem)" }}>
                Ready to Make <span className="text-grad">Something Unforgettable?</span>
              </h2>
              <p className="text-base mb-10 max-w-lg mx-auto" style={{ color:"rgba(255,255,255,0.38)" }}>
                One message away. Fast delivery, obsessive quality, zero compromise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg hover:scale-105 transition-all duration-300 glow-green"
                  style={{ background:"linear-gradient(135deg,#16a34a,#22c55e)" }}>
                  <MessageCircle className="w-6 h-6"/> Message on WhatsApp
                </a>
                <a href="mailto:shoaib@email.com"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg glass hover:scale-105 transition-all duration-300">
                  <Mail className="w-6 h-6"/> Send an Email
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 px-6 md:px-16">
        <Reveal className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon:<Mail className="w-5 h-5"/>,            lbl:"Email",     sub:"shoaib@email.com",  href:"mailto:shoaib@email.com", col:"#8b5cf6" },
              { icon:<MessageCircle className="w-5 h-5"/>,   lbl:"WhatsApp",  sub:"Chat now",           href:WA,                        col:"#22c55e" },
              { icon:<Instagram className="w-5 h-5"/>,       lbl:"Instagram", sub:"@shoaib.edits",      href:"#",                       col:"#ec4899" },
            ].map(c=>(
              <a key={c.lbl} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2.5 p-5 rounded-xl glass transition-all duration-300 hover:scale-105 text-center"
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${c.col}40`; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
                <div style={{ color:c.col }} className="group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                <div className="font-bold text-sm text-white">{c.lbl}</div>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"11px" }}>{c.sub}</div>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[{icon:<Youtube className="w-4 h-4"/>,lbl:"YouTube",c:"#ef4444"},{icon:<Twitter className="w-4 h-4"/>,lbl:"Twitter",c:"#38bdf8"}].map(s=>(
              <a key={s.lbl} href="#"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm hover:scale-105 transition-all duration-300"
                style={{ color:s.c }}>
                {s.icon} {s.lbl}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-16" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-black text-lg uppercase tracking-tight" style={{ color:"rgba(255,255,255,0.4)" }}>
            Shoaib<span className="text-grad">.</span>
          </div>
          <div style={{ color:"rgba(255,255,255,0.18)", fontSize:"12px" }}>
            © {new Date().getFullYear()} Shoaib. All rights reserved. Crafted frame by frame.
          </div>
          <div className="flex gap-5" style={{ color:"rgba(255,255,255,0.18)", fontSize:"12px" }}>
            {["Instagram","YouTube","WhatsApp"].map(l=>(
              <a key={l} href="#" className="hover:text-purple-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
