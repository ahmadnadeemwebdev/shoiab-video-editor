import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Mail, MessageCircle, Instagram, Youtube, Twitter,
  Scissors, Film, Palette, Zap, Monitor, ArrowDown, ChevronRight,
  Star, Quote, CheckCircle, X, Trophy, Clock, Smile, TrendingUp,
  Clapperboard, Eye, Volume2, VolumeX, MoveRight
} from 'lucide-react';

import heroBg      from "../assets/hero-bg.png";
import project1    from "../assets/project-1.png";
import project2    from "../assets/project-2.png";
import project3    from "../assets/project-3.png";
import aboutImg    from "../assets/about-portrait.png";

/* ────────────────────────────── VIDEO URLs ────────────────────────────── */
const HERO_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-working-on-video-editing-in-a-studio-with-multiple-screens-34738-large.mp4";

const PREVIEW: Record<string, string> = {
  YouTube:   "https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-camera-on-a-tripod-at-sunset-34386-large.mp4",
  Reels:     "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-a-neon-lit-corridor-4402-large.mp4",
  Cinematic: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-during-the-night-5178-large.mp4",
  Ads:       "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-clapper-board-943-large.mp4",
};

const WHATSAPP = "https://wa.me/923000000000";

/* ────────────────────────────── DATA ──────────────────────────────────── */
const CATS = ["All", "YouTube", "Reels", "Cinematic", "Ads"];

const PROJECTS = [
  { id:1, title:"Brand Story Reel",    cat:"YouTube",   img:project1, dur:"2:45", views:"42K", desc:"High-energy brand video with dynamic cuts and impactful motion graphics." },
  { id:2, title:"Night City Cinematic",cat:"Cinematic", img:project2, dur:"3:47", views:"89K", desc:"Film-grade city documentary with moody LUTs and atmospheric sound design." },
  { id:3, title:"Wedding Ceremony",    cat:"Cinematic", img:project3, dur:"8:15", views:"31K", desc:"Emotional highlight reel capturing every precious wedding moment." },
  { id:4, title:"Product Drop Ad",     cat:"Ads",       img:project1, dur:"0:30", views:"215K",desc:"Punchy product reveal ad built for maximum conversion and attention." },
  { id:5, title:"Lifestyle Reel",      cat:"Reels",     img:project2, dur:"0:28", views:"176K",desc:"Trendy vertical short synced to viral audio for maximum reach." },
  { id:6, title:"Travel Vlog Series",  cat:"YouTube",   img:project3, dur:"12:00",views:"58K", desc:"Cinematic travel documentary series with natural color grading." },
];

const STATS = [
  { icon:<Trophy className="w-7 h-7"/>,   val:20,  sfx:"+", lbl:"Projects Done"      },
  { icon:<Smile className="w-7 h-7"/>,    val:15,  sfx:"+", lbl:"Happy Clients"      },
  { icon:<Clock className="w-7 h-7"/>,    val:1,   sfx:" yr",lbl:"Experience"        },
  { icon:<TrendingUp className="w-7 h-7"/>,val:100,sfx:"%", lbl:"Client Satisfaction"},
];

const SERVICES = [
  { icon:<Youtube className="w-8 h-8"/>, title:"YouTube Editing",   desc:"Long-form storytelling with retention-boosting pacing, graphics, and sound design.", col:"#ef4444", tag:"Long-form" },
  { icon:<Zap className="w-8 h-8"/>,     title:"Reels & TikTok",   desc:"Viral short clips with trend-driven hooks, tight edits, and platform-native formats.", col:"#a855f7", tag:"Short-form" },
  { icon:<Film className="w-8 h-8"/>,    title:"Cinematic Videos", desc:"Premium film-grade productions with rich color grading and emotional depth.", col:"#3b82f6", tag:"Premium" },
  { icon:<Clapperboard className="w-8 h-8"/>,title:"Ad Creatives", desc:"High-converting ad videos built to capture attention and drive measurable results.", col:"#f59e0b", tag:"Commercial" },
];

const TESTIMONIALS = [
  { name:"Aryan Khan",  role:"YouTube Creator • 250K Subs", av:"AK", rating:5, text:"Shoaib completely transformed my channel. The pacing, color work, transitions — everything just hits different. My watch time jumped 40% after his first edit." },
  { name:"Sara Malik",  role:"Fashion Brand Owner",         av:"SM", rating:5, text:"Needed a product reel on short notice and Shoaib delivered in 24 hours. The quality was insane. My Instagram engagement literally tripled that week." },
  { name:"Usman Tariq", role:"Wedding Videographer",        av:"UT", rating:5, text:"I've worked with many editors and Shoaib is on another level. He understands emotion and timing instinctively. Every client cries watching the final film." },
];

const MARQUEE_TEXT = ["VIDEO EDITING","COLOR GRADING","REEL CUTS","CINEMATIC FILMS","YOUTUBE","AD CREATIVES","STORYTELLING","TRANSITIONS","PREMIERE PRO","CAPCUT"];

/* ────────────────────────────── HELPERS ───────────────────────────────── */
function FadeIn({ children, delay=0, className="", dir="up" }:{
  children:React.ReactNode; delay?:number; className?:string; dir?:"up"|"left"|"right"|"none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-70px" });
  const init = dir==="up"?{opacity:0,y:50}:dir==="left"?{opacity:0,x:-50}:dir==="right"?{opacity:0,x:50}:{opacity:0};
  return (
    <motion.div ref={ref} initial={init}
      animate={inView?{opacity:1,y:0,x:0}:{}}
      transition={{duration:0.85,delay,ease:[0.16,1,0.3,1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, sfx="" }:{ target:number; sfx?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true });
  const [n, setN] = useState(0);
  useEffect(()=>{
    if (!inView) return;
    let v=0; const step=target/60;
    const t=setInterval(()=>{ v+=step; if(v>=target){setN(target);clearInterval(t);}else setN(Math.floor(v)); },18);
    return ()=>clearInterval(t);
  },[inView,target]);
  return <span ref={ref}>{n}{sfx}</span>;
}

/* ── Netflix-style Video Card ── */
function NetflixCard({ p, i }:{ p:typeof PROJECTS[0]; i:number }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [hov, setHov] = useState(false);
  const [ready, setReady] = useState(false);

  const enter = () => {
    setHov(true);
    vidRef.current?.play().catch(()=>{});
  };
  const leave = () => {
    setHov(false);
    if (vidRef.current) { vidRef.current.pause(); vidRef.current.currentTime=0; }
  };

  return (
    <motion.article
      layout
      initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.94}}
      transition={{duration:0.5,delay:i*0.06}}
      onMouseEnter={enter} onMouseLeave={leave}
      className="group relative overflow-hidden rounded-xl cursor-pointer card-glow transition-all duration-500"
      style={{border:"1px solid rgba(255,255,255,0.06)"}}
    >
      {/* Media layer */}
      <div className="aspect-video bg-black overflow-hidden relative">
        <motion.img src={p.img} alt={p.title}
          className="w-full h-full object-cover absolute inset-0 z-10"
          style={{filter:"brightness(0.65)"}}
          animate={{opacity: hov&&ready?0:1, scale: hov?1.08:1}}
          transition={{duration:0.6}}/>
        <video ref={vidRef} src={PREVIEW[p.cat]} muted loop playsInline preload="none"
          onLoadedData={()=>setReady(true)}
          className="absolute inset-0 w-full h-full object-cover z-20"
          style={{opacity: hov&&ready?1:0, transition:"opacity 0.5s ease"}}/>

        {/* Cinematic bars */}
        <motion.div className="absolute top-0 inset-x-0 h-10 bg-black z-30 pointer-events-none origin-top"
          animate={{scaleY:hov?1:0}} transition={{duration:0.3}}/>
        <motion.div className="absolute bottom-0 inset-x-0 h-10 bg-black z-30 pointer-events-none origin-bottom"
          animate={{scaleY:hov?1:0}} transition={{duration:0.3}}/>

        {/* Play button */}
        <motion.div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          animate={{opacity:hov?1:0}} transition={{duration:0.25}}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full"
              style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}
              animate={hov?{scale:[1,1.5,1],opacity:[0.7,0,0.7]}:{}}
              transition={{repeat:Infinity,duration:1.5}}/>
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center neon-purple"
              style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
              <Play className="w-6 h-6 fill-white text-white ml-1"/>
            </div>
          </div>
        </motion.div>

        {/* Views badge */}
        <div className="absolute top-3 right-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)"}}>
          <Eye className="w-3 h-3 text-purple-400"/> {p.views}
        </div>
        <div className="absolute top-3 left-3 z-50 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{background:"linear-gradient(135deg,rgba(168,85,247,0.7),rgba(59,130,246,0.7))",backdropFilter:"blur(8px)"}}>
          {p.cat}
        </div>

        {/* Progress bar */}
        <motion.div className="absolute bottom-10 inset-x-0 h-0.5 z-40 pointer-events-none"
          animate={{opacity:hov?1:0}} style={{background:"rgba(255,255,255,0.12)"}}>
          <motion.div className="h-full" style={{background:"linear-gradient(to right,#a855f7,#3b82f6)"}}
            animate={{width:hov?"100%":"0%"}} transition={{duration:hov?10:0,ease:"linear"}}/>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4" style={{background:"#0c0c18"}}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-white font-bold text-sm truncate group-hover:gradient-text-warm transition-all">{p.title}</h3>
            <p className="text-white/35 text-xs mt-1 line-clamp-1">{p.desc}</p>
          </div>
          <div className="text-white/25 text-xs font-mono shrink-0 glass px-2 py-1 rounded">{p.dur}</div>
        </div>
      </div>

      {/* Hover border glow */}
      <motion.div className="absolute inset-0 rounded-xl pointer-events-none z-50"
        animate={{boxShadow: hov?"inset 0 0 0 1px rgba(168,85,247,0.45)":"inset 0 0 0 1px transparent"}}
        transition={{duration:0.3}}/>
    </motion.article>
  );
}

/* ────────────────────────────── MAIN ──────────────────────────────────── */
const NAV = ["About","Work","Services","Stats","Contact"];

export default function Home() {
  const heroRef   = useRef<HTMLElement>(null);
  const heroVidRef = useRef<HTMLVideoElement>(null);
  const [cat, setCat]       = useState("All");
  const [menu, setMenu]     = useState(false);
  const [vidPaused,setVidPaused] = useState(false);
  const [muted, setMuted]   = useState(true);

  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY   = useTransform(scrollYProgress,[0,1],[0,140]);
  const heroOp  = useTransform(scrollYProgress,[0,0.8],[1,0]);
  const heroSc  = useTransform(scrollYProgress,[0,1],[1,1.12]);

  const filtered = cat==="All" ? PROJECTS : PROJECTS.filter(p=>p.cat===cat);

  const togglePlay = () => {
    if (!heroVidRef.current) return;
    if (vidPaused) { heroVidRef.current.play(); setVidPaused(false); }
    else { heroVidRef.current.pause(); setVidPaused(true); }
  };
  const toggleMute = () => {
    if (!heroVidRef.current) return;
    heroVidRef.current.muted = !muted;
    setMuted(m=>!m);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden grain">

      {/* ─── NAV ─── */}
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}
        className="fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center glass-nav border-b"
        style={{borderColor:"rgba(168,85,247,0.1)"}}>
        <a href="#" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
            style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>S</span>
          <span className="text-white font-black text-lg uppercase tracking-tight">Shoaib<span className="gradient-text">.</span></span>
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-white/50">
          {NAV.map(n=>(
            <a key={n} href={`#${n.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative group py-1">
              {n}
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{background:"linear-gradient(to right,#a855f7,#3b82f6)"}}/>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white hover:scale-105 transition-all duration-300 neon-purple"
            style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
            <MessageCircle className="w-4 h-4"/> Hire Me
          </a>
          <button onClick={()=>setMenu(v=>!v)} className="md:hidden p-2 text-white/60 hover:text-white">
            {menu ? <X className="w-6 h-6"/> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-current"/><div className="w-4 h-0.5 bg-current"/><div className="w-6 h-0.5 bg-current"/></div>}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            className="fixed top-[65px] inset-x-0 z-40 px-6 py-5 flex flex-col gap-1"
            style={{background:"rgba(5,5,8,0.97)",borderBottom:"1px solid rgba(168,85,247,0.15)"}}>
            {NAV.map(n=>(
              <a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenu(false)}
                className="py-3.5 text-white/60 hover:text-white font-semibold border-b border-white/5 last:border-0 transition-colors">{n}</a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white"
              style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
              <MessageCircle className="w-4 h-4"/> Hire Me on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-end pb-24 overflow-hidden">
        {/* Video BG */}
        <motion.div style={{y:heroY,scale:heroSc}} className="absolute inset-0 z-0">
          <video ref={heroVidRef} autoPlay muted loop playsInline poster={heroBg}
            className="w-full h-full object-cover"
            style={{filter:"brightness(0.45) saturate(1.15)"}}>
            <source src={HERO_VIDEO} type="video/mp4"/>
            <img src={heroBg} alt="" className="w-full h-full object-cover"/>
          </video>
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, #050508 0%, rgba(5,5,8,0.5) 40%, rgba(5,5,8,0.15) 70%, transparent 100%)"}}/>
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 100% 80% at 50% 100%, rgba(168,85,247,0.08) 0%, transparent 60%)"}}/>
          {/* Left accent glow */}
          <div className="absolute left-0 top-1/3 w-[600px] h-[600px] blur-[160px] opacity-20 pointer-events-none"
            style={{background:"radial-gradient(circle,#a855f7,transparent)"}}/>
          <div className="absolute right-0 bottom-1/3 w-[400px] h-[400px] blur-[120px] opacity-12 pointer-events-none"
            style={{background:"radial-gradient(circle,#3b82f6,transparent)"}}/>
        </motion.div>

        {/* Content */}
        <motion.div style={{opacity:heroOp}} className="relative z-10 w-full px-6 md:px-16 max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full"
            style={{background:"rgba(168,85,247,0.12)",border:"1px solid rgba(168,85,247,0.25)"}}>
            <motion.span animate={{opacity:[1,0.3,1]}} transition={{repeat:Infinity,duration:2}}
              className="w-2 h-2 rounded-full bg-green-400 inline-block"/>
            <span className="text-sm text-purple-300 font-semibold tracking-widest uppercase">Open for Projects</span>
          </motion.div>

          {/* Main title */}
          <motion.div initial={{opacity:0,y:80}} animate={{opacity:1,y:0}}
            transition={{duration:1.2,delay:0.45,ease:[0.16,1,0.3,1]}}>
            <h1 className="font-black uppercase leading-[0.88] tracking-tighter">
              <span className="block text-white" style={{fontSize:"clamp(3.5rem,12vw,9rem)"}}>Shoaib</span>
              <span className="block" style={{fontSize:"clamp(1.4rem,4.5vw,3.8rem)", WebkitTextStroke:"1.5px rgba(168,85,247,0.55)", color:"transparent"}}>
                Cinematic Video Editor
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0}}
            className="mt-5 mb-8 text-lg md:text-xl italic font-light max-w-xl"
            style={{color:"rgba(255,255,255,0.45)"}}>
            "I don't just edit videos, <span style={{color:"rgba(192,132,252,0.85)"}}>I create emotions.</span>"
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.15}}
            className="flex flex-wrap gap-4 items-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-white text-base hover:scale-105 transition-all duration-300 neon-purple"
              style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
              <MessageCircle className="w-5 h-5"/>
              Hire Me — WhatsApp
              <motion.span animate={{x:[0,4,0]}} transition={{repeat:Infinity,duration:1.4}}>
                <MoveRight className="w-4 h-4"/>
              </motion.span>
            </a>
            <a href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white/80 text-base hover:text-white transition-all duration-300 glass hover:scale-105">
              <Play className="w-5 h-5 text-purple-400 fill-purple-400"/> Watch My Work
            </a>
          </motion.div>
        </motion.div>

        {/* Video controls */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
          className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-3">
          <button onClick={toggleMute}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white glass transition-colors">
            {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
          </button>
          <button onClick={togglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white glass transition-colors">
            {vidPaused ? <Play className="w-4 h-4"/> : <Pause className="w-4 h-4"/>}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{color:"rgba(255,255,255,0.2)"}}>
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div animate={{y:[0,7,0]}} transition={{repeat:Infinity,duration:1.8}}>
            <ArrowDown className="w-4 h-4"/>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <div className="py-4 overflow-hidden relative" style={{background:"rgba(168,85,247,0.08)",borderTop:"1px solid rgba(168,85,247,0.15)",borderBottom:"1px solid rgba(168,85,247,0.15)"}}>
        <div className="flex marquee-track whitespace-nowrap">
          {[...MARQUEE_TEXT,...MARQUEE_TEXT,...MARQUEE_TEXT,...MARQUEE_TEXT].map((t,i)=>(
            <span key={i} className="inline-flex items-center gap-3 mx-4 text-sm font-bold uppercase tracking-widest"
              style={{color: i%2===0?"rgba(168,85,247,0.7)":"rgba(255,255,255,0.2)"}}>
              {t} <span className="text-purple-700">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section id="stats" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s,i)=>(
            <FadeIn key={s.lbl} delay={i*0.09}>
              <div className="glass-purple rounded-2xl p-6 text-center group hover:scale-105 hover:neon-purple transition-all duration-400">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-400"
                  style={{background:"rgba(168,85,247,0.12)",border:"1px solid rgba(168,85,247,0.25)"}}>
                  {s.icon}
                </div>
                <div className="text-4xl font-black gradient-text mb-1">
                  <Counter target={s.val} sfx={s.sfx}/>
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold" style={{color:"rgba(255,255,255,0.3)"}}>{s.lbl}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Photo */}
          <FadeIn dir="left" className="w-full lg:w-2/5 shrink-0">
            <div className="relative max-w-[380px] mx-auto">
              <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
                style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)",transform:"translate(20px,20px)"}}/>
              <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl"
                style={{border:"1px solid rgba(168,85,247,0.2)"}}/>
              <img src={aboutImg} alt="Shoaib"
                className="relative w-full rounded-2xl aspect-[3/4] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"/>
              <div className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl font-black text-sm text-white uppercase tracking-wider neon-purple"
                style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
                1 Year Exp.
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <div className="w-full space-y-7">
            <FadeIn delay={0.1} dir="right">
              <p className="gradient-text text-sm font-bold uppercase tracking-widest mb-2">About Me</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-white">
                Telling Stories <br/><span className="gradient-text">Frame by Frame</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} dir="right" className="space-y-4 text-base leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>
              <p>I'm Shoaib — a cinematic video editor with expertise in Adobe Premiere Pro and CapCut. Every project I take on gets my full creative energy and technical attention to detail.</p>
              <p>From viral short-form reels to emotionally rich cinematic productions, I craft edits that don't just look good — they make people feel something.</p>
            </FadeIn>
            <FadeIn delay={0.25} dir="right" className="flex flex-wrap gap-3">
              {[["Premiere Pro","#a855f7"],["CapCut","#3b82f6"],["Color Grading","#a855f7"],["Sound Design","#3b82f6"],["Motion Graphics","#a855f7"]].map(([lbl,c])=>(
                <span key={lbl} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{background:`${c}14`,border:`1px solid ${c}40`,color:`${c}`}}>
                  {lbl}
                </span>
              ))}
            </FadeIn>
            <FadeIn delay={0.3} dir="right" className="grid grid-cols-3 gap-3 pt-2">
              {[{icon:<CheckCircle className="w-5 h-5"/>,lbl:"Fast Turnaround",c:"#a855f7"},{icon:<CheckCircle className="w-5 h-5"/>,lbl:"Free Revisions",c:"#3b82f6"},{icon:<CheckCircle className="w-5 h-5"/>,lbl:"Quality First",c:"#22c55e"}].map(f=>(
                <div key={f.lbl} className="flex items-center gap-2 text-sm font-medium" style={{color:"rgba(255,255,255,0.6)"}}>
                  <span style={{color:f.c}}>{f.icon}</span> {f.lbl}
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.35} dir="right">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white hover:scale-105 transition-all duration-300 neon-purple"
                style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
                <MessageCircle className="w-5 h-5"/> Let's Work Together
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="work" className="py-24 relative" style={{background:"#080810",borderTop:"1px solid rgba(168,85,247,0.07)"}}>
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <FadeIn>
              <p className="gradient-text text-sm font-bold uppercase tracking-widest mb-2">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">My Work</h2>
            </FadeIn>
            {/* Category filters */}
            <FadeIn delay={0.1} className="flex flex-wrap gap-2">
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  style={cat===c
                    ?{background:"linear-gradient(135deg,#a855f7,#3b82f6)",color:"white",boxShadow:"0 0 20px rgba(168,85,247,0.4)"}
                    :{background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  {c}
                </button>
              ))}
            </FadeIn>
          </div>

          {/* Netflix grid: 1 wide + 2 small on first row, then 3-col */}
          <AnimatePresence mode="popLayout">
            {cat==="All" ? (
              <div key="all" className="space-y-5">
                {/* Row 1: featured + 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2">
                    <NetflixCard p={filtered[0]} i={0}/>
                  </div>
                  <div className="flex flex-col gap-5">
                    {filtered.slice(1,3).map((p,i)=><NetflixCard key={p.id} p={p} i={i+1}/>)}
                  </div>
                </div>
                {/* Row 2: 3-col */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {filtered.slice(3).map((p,i)=><NetflixCard key={p.id} p={p} i={i+3}/>)}
                </div>
              </div>
            ) : (
              <motion.div key={cat} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p,i)=><NetflixCard key={p.id} p={p} i={i}/>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p className="gradient-text text-sm font-bold uppercase tracking-widest mb-2">What I Offer</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Services</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s,i)=>(
            <FadeIn key={s.title} delay={i*0.09}>
              <div className="group relative p-8 rounded-2xl transition-all duration-400 overflow-hidden cursor-default"
                style={{background:"#0c0c18",border:`1px solid ${s.col}18`}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=`${s.col}45`)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=`${s.col}18`)}>
                {/* Background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{background:`radial-gradient(ellipse 80% 80% at 0% 0%, ${s.col}08, transparent)`}}/>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{background:`${s.col}14`,border:`1px solid ${s.col}35`,color:s.col}}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full"
                      style={{background:`${s.col}12`,color:s.col,border:`1px solid ${s.col}25`}}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-300">{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{color:"rgba(255,255,255,0.4)"}}>{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3"
                    style={{color:s.col}}>
                    Get in Touch <ChevronRight className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 relative overflow-hidden" style={{background:"#080810",borderTop:"1px solid rgba(168,85,247,0.07)"}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(168,85,247,0.05), transparent)"}}/>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-14">
            <p className="gradient-text text-sm font-bold uppercase tracking-widest mb-2">Social Proof</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Client Reviews</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t,i)=>(
              <FadeIn key={t.name} delay={i*0.12}>
                <div className="group p-7 rounded-2xl flex flex-col gap-5 h-full transition-all duration-400 hover:scale-[1.02] cursor-default"
                  style={{background:"#0c0c18",border:"1px solid rgba(168,85,247,0.1)"}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(168,85,247,0.3)")}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(168,85,247,0.1)")}>
                  <div className="flex items-start justify-between">
                    <Quote className="w-8 h-8 text-purple-500/30 group-hover:text-purple-500/60 transition-colors"/>
                    <div className="flex gap-0.5">
                      {Array.from({length:t.rating}).map((_,j)=>(
                        <Star key={j} className="w-4 h-4 fill-purple-400 text-purple-400"/>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 italic" style={{color:"rgba(255,255,255,0.5)"}}>"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4" style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
                      style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
                      {t.av}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-xs mt-0.5" style={{color:"rgba(255,255,255,0.3)"}}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-8 px-6 md:px-12">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden py-20 px-8 md:px-16 text-center"
            style={{background:"linear-gradient(135deg,rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(168,85,247,0.08) 100%)",border:"1px solid rgba(168,85,247,0.2)"}}>
            <div className="absolute inset-0 pointer-events-none"
              style={{background:"radial-gradient(ellipse 80% 80% at 50% 50%, rgba(168,85,247,0.07), transparent)"}}/>
            <div className="relative z-10">
              <p className="gradient-text text-sm font-bold uppercase tracking-widest mb-4">Ready to Collaborate?</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
                Have a Project?<br/><span className="gradient-text">Let's Create Together.</span>
              </h2>
              <p className="text-base mb-10 max-w-lg mx-auto" style={{color:"rgba(255,255,255,0.4)"}}>
                Fast delivery. Professional quality. 100% dedication. Let's bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg hover:scale-105 transition-all duration-300 neon-green"
                  style={{background:"linear-gradient(135deg,#16a34a,#22c55e)"}}>
                  <MessageCircle className="w-6 h-6"/> Message on WhatsApp
                </a>
                <a href="mailto:shoaib@email.com"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg glass hover:scale-105 transition-all duration-300">
                  <Mail className="w-6 h-6"/> Send an Email
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-16 px-6 md:px-12 max-w-3xl mx-auto">
        <FadeIn className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {icon:<Mail className="w-6 h-6"/>,      lbl:"Email",     val:"shoaib@email.com",    href:"mailto:shoaib@email.com",  c:"#a855f7"},
            {icon:<MessageCircle className="w-6 h-6"/>,lbl:"WhatsApp",val:"Chat directly",        href:WHATSAPP,                   c:"#22c55e"},
            {icon:<Instagram className="w-6 h-6"/>, lbl:"Instagram", val:"@shoaib.edits",        href:"#",                        c:"#ec4899"},
          ].map(c=>(
            <a key={c.lbl} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl glass transition-all duration-300 hover:scale-105 text-center"
              onMouseEnter={e=>(e.currentTarget.style.borderColor=`${c.c}45`)}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)")}>
              <div className="w-13 h-13 rounded-full glass flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{color:c.c,width:52,height:52}}>
                {c.icon}
              </div>
              <div>
                <div className="text-white font-bold">{c.lbl}</div>
                <div className="text-xs mt-0.5" style={{color:"rgba(255,255,255,0.3)"}}>{c.val}</div>
              </div>
            </a>
          ))}
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-3">
          {[{icon:<Youtube className="w-4 h-4"/>,lbl:"YouTube",c:"#ef4444"},{icon:<Twitter className="w-4 h-4"/>,lbl:"Twitter / X",c:"#38bdf8"}].map(s=>(
            <a key={s.lbl} href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm glass hover:scale-105 transition-all duration-300"
              style={{color:s.c}}>
              {s.icon} {s.lbl}
            </a>
          ))}
        </FadeIn>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-6 md:px-12" style={{borderTop:"1px solid rgba(168,85,247,0.08)"}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{color:"rgba(255,255,255,0.2)"}}>
          <div className="font-black text-lg uppercase tracking-tight" style={{color:"rgba(255,255,255,0.5)"}}>
            Shoaib<span className="gradient-text">.</span>
          </div>
          <div>© {new Date().getFullYear()} Shoaib. All rights reserved. Built with passion in Premiere Pro & CapCut.</div>
          <div className="flex gap-5">
            {["Instagram","YouTube","WhatsApp"].map(l=>(
              <a key={l} href="#" className="hover:text-purple-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
