import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Play, Pause, Mail, MessageCircle, Instagram, Youtube, Twitter,
  Scissors, Film, Palette, Zap, Monitor, Users,
  ArrowDown, ChevronRight, Star, Quote, CheckCircle, Sparkles, X,
  Trophy, Clock, Smile, TrendingUp
} from 'lucide-react';

import heroBg from "../assets/hero-bg.png";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";
import aboutPortrait from "../assets/about-portrait.png";

/* ── Free stock video URLs (Mixkit CDN) ── */
const HERO_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-working-on-video-editing-in-a-studio-with-multiple-screens-34738-large.mp4";
const VIDEO_MAP: Record<string, string> = {
  YouTube:   "https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-camera-on-a-tripod-at-sunset-34386-large.mp4",
  Reels:     "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-a-neon-lit-corridor-4402-large.mp4",
  Cinematic: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-during-the-night-5178-large.mp4",
  Wedding:   "https://assets.mixkit.co/videos/preview/mixkit-groom-and-bride-looking-at-each-other-4066-large.mp4",
};

/* ── Reusable scroll-triggered fade ── */
function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants: Record<string, { opacity: number; x?: number; y?: number }> = {
    up:    { opacity: 0, y: 45 },
    left:  { opacity: 0, x: -45 },
    right: { opacity: 0, x: 45 },
    none:  { opacity: 0 },
  };
  return (
    <motion.div ref={ref} initial={variants[direction]}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated stat counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Video card with hover autoplay ── */
function VideoCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl cursor-pointer video-card"
      style={{ border: "1px solid rgba(139,92,246,0.12)" }}
    >
      {/* Thumbnail image */}
      <div className="aspect-video overflow-hidden bg-black relative">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0 z-10"
          animate={{ opacity: hovered && videoLoaded ? 0 : 1, scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ filter: "brightness(0.7)" }}
        />
        {/* Actual video */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover z-20"
          style={{ opacity: hovered && videoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        />

        {/* Cinematic letterbox bars on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-8 bg-black z-30 pointer-events-none"
          animate={{ scaleY: hovered ? 1 : 0 }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 0.35 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-8 bg-black z-30 pointer-events-none"
          animate={{ scaleY: hovered ? 1 : 0 }}
          style={{ transformOrigin: "bottom" }}
          transition={{ duration: 0.35 }}
        />

        {/* Play pulse button */}
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: hovered ? [1, 1.4, 1] : 1, opacity: hovered ? [0.6, 0, 0.6] : 0 }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}
            />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center neon-glow"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
              <Play className="w-6 h-6 fill-white text-white ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Progress bar on hover */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 h-0.5 z-40 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.15)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
        >
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(to right,#8b5cf6,#3b82f6)" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: hovered ? 12 : 0, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-50"
        style={{ background: "linear-gradient(to top, rgba(8,8,16,0.98) 0%, rgba(8,8,16,0.7) 65%, transparent 100%)" }}>
        <div className="flex items-end justify-between">
          <div>
            <div className="gradient-text text-xs font-bold uppercase tracking-widest mb-1.5">{project.category}</div>
            <h3 className="text-white font-black text-lg leading-tight transition-all duration-300 group-hover:[background:linear-gradient(135deg,#a78bfa,#60a5fa)] group-hover:[-webkit-background-clip:text] group-hover:[-webkit-text-fill-color:transparent]">
              {project.title}
            </h3>
            <p className="text-white/35 text-xs mt-1 line-clamp-1">{project.desc}</p>
          </div>
          <div className="text-white/30 text-xs font-mono glass px-2.5 py-1.5 rounded-lg shrink-0 ml-3">
            {project.duration}
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-50"
        animate={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.2)" : "inset 0 0 0 1px transparent" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ── Data ── */
const CATEGORIES = ["All", "YouTube", "Reels", "Cinematic", "Wedding"];

const allProjects = [
  { id: 1, title: "Brand Story Reel", category: "YouTube",   duration: "2:45", image: project1, desc: "Dynamic brand storytelling with punchy cuts and motion graphics.", videoUrl: VIDEO_MAP.YouTube },
  { id: 2, title: "Music Video Edit",  category: "Cinematic", duration: "3:47", image: project2, desc: "Cinematic color grade and seamless beat-synced transitions.",       videoUrl: VIDEO_MAP.Cinematic },
  { id: 3, title: "Short Film Cut",    category: "Cinematic", duration: "8:15", image: project3, desc: "Narrative short with emotional pacing and immersive sound design.",   videoUrl: VIDEO_MAP.Cinematic },
  { id: 4, title: "Wedding Highlights",category: "Wedding",   duration: "4:20", image: project1, desc: "Emotional highlight reel capturing the most precious moments.",       videoUrl: VIDEO_MAP.Wedding },
  { id: 5, title: "Product Reel Pack", category: "Reels",     duration: "0:30", image: project2, desc: "Fast-paced product showcase optimized for Instagram and TikTok.",    videoUrl: VIDEO_MAP.Reels },
  { id: 6, title: "Vlog Series Ep. 1", category: "YouTube",   duration: "12:00",image: project3, desc: "Engaging travel vlog with smooth cuts and energetic pacing.",         videoUrl: VIDEO_MAP.YouTube },
];

const skills = [
  { icon: <Monitor className="w-6 h-6" />, name: "Adobe Premiere Pro", level: 90, color: "from-purple-500 to-violet-600" },
  { icon: <Scissors className="w-6 h-6" />, name: "CapCut",             level: 95, color: "from-blue-500 to-cyan-500" },
  { icon: <Film className="w-6 h-6" />,     name: "Video Editing",      level: 92, color: "from-purple-500 to-blue-500" },
  { icon: <Palette className="w-6 h-6" />,  name: "Color Grading",      level: 80, color: "from-violet-500 to-purple-600" },
  { icon: <Zap className="w-6 h-6" />,      name: "Transitions & FX",   level: 88, color: "from-blue-500 to-indigo-500" },
  { icon: <Users className="w-6 h-6" />,    name: "Social Media Content",level: 93, color: "from-cyan-500 to-blue-600" },
];

const services = [
  { icon: <Youtube className="w-7 h-7" />, title: "YouTube Editing",    desc: "Long-form content with clean cuts, dynamic graphics, and pacing that keeps viewers hooked.",          price: "From $25", accent: "#ef4444" },
  { icon: <Zap className="w-7 h-7" />,     title: "Reels & TikTok",     desc: "Trend-driven viral clips with hooks, sound-synced cuts, and platform-optimized formats.",              price: "From $10", accent: "#8b5cf6" },
  { icon: <Film className="w-7 h-7" />,    title: "Cinematic Videos",   desc: "Premium film-grade productions with rich color grading, sound design, and narrative power.",           price: "From $50", accent: "#3b82f6" },
  { icon: <Star className="w-7 h-7" />,    title: "Wedding Edits",      desc: "Timeless, emotionally charged wedding films that capture every moment for a lifetime.",                price: "From $80", accent: "#ec4899" },
];

const testimonials = [
  { name: "Aryan Khan",   role: "YouTube Creator • 250K Subs",    avatar: "AK", rating: 5, review: "Shoaib transformed my raw footage into something I'm genuinely proud of. Pacing, color, transitions — all exactly right. Seriously talented." },
  { name: "Sara Malik",   role: "Fashion Brand Owner",            avatar: "SM", rating: 5, review: "Needed a product reel fast — Shoaib delivered in 24 hours. Quality was stunning. My Instagram engagement tripled. Will definitely work again." },
  { name: "Usman Tariq",  role: "Wedding Videographer",           avatar: "UT", rating: 5, review: "Best editor I've collaborated with. He understands emotion and timing better than anyone. Every client I've referred him to has been blown away." },
];

const stats = [
  { icon: <Trophy className="w-7 h-7" />,      value: 20,  suffix: "+", label: "Projects Done",      color: "#8b5cf6" },
  { icon: <Smile className="w-7 h-7" />,        value: 15,  suffix: "+", label: "Happy Clients",      color: "#3b82f6" },
  { icon: <Clock className="w-7 h-7" />,        value: 1,   suffix: "+", label: "Year Experience",    color: "#a78bfa" },
  { icon: <TrendingUp className="w-7 h-7" />,   value: 100, suffix: "%", label: "Client Satisfaction",color: "#60a5fa" },
];

const NAV_LINKS = ["About", "Skills", "Work", "Services", "Testimonials", "Contact"];

/* ── Main component ── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroVideoPaused, setHeroVideoPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  const toggleHeroVideo = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoPaused) { heroVideoRef.current.play(); setHeroVideoPaused(false); }
    else { heroVideoRef.current.pause(); setHeroVideoPaused(true); }
  };

  return (
    <div className="min-h-screen bg-[#080810] text-foreground overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center"
        style={{ background: "rgba(8,8,16,0.88)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}
      >
        <a href="#" className="text-xl font-black uppercase tracking-tighter text-white">
          Shoaib<span className="gradient-text">.</span>
        </a>
        <div className="hidden md:flex gap-7 text-sm font-semibold tracking-wide text-white/55">
          {NAV_LINKS.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative group py-1">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white hover:scale-105 transition-all duration-300 neon-glow"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
            <MessageCircle className="w-4 h-4" /> Hire Me
          </a>
          <button onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden text-white/70 hover:text-white p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-white/70"/><div className="w-4 h-0.5 bg-white/70"/><div className="w-6 h-0.5 bg-white/70"/></div>}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-[65px] left-0 w-full z-40 flex flex-col px-6 py-4"
            style={{ background: "rgba(8,8,16,0.97)", borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
            {NAV_LINKS.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 text-white/70 hover:text-white font-semibold border-b border-white/5 last:border-0 transition-colors">{item}</a>
            ))}
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white neon-glow"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
              <MessageCircle className="w-4 h-4" /> Hire Me on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(to bottom, rgba(8,8,16,0.4) 0%, rgba(8,8,16,0.25) 40%, rgba(8,8,16,1) 100%)"
          }}/>
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "radial-gradient(ellipse 65% 65% at 50% 40%, rgba(139,92,246,0.14) 0%, transparent 70%)"
          }}/>
          {/* Scanline overlay */}
          <div className="absolute inset-0 z-10 scanline pointer-events-none opacity-40" />
          {/* Video */}
          <video
            ref={heroVideoRef}
            autoPlay muted loop playsInline
            poster={heroBg}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(1.1)" }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
            <img src={heroBg} alt="Hero" className="w-full h-full object-cover" />
          </video>
        </motion.div>

        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none z-10 blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle,#8b5cf6,transparent)" }}/>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full pointer-events-none z-10 blur-[120px] opacity-10"
          style={{ background: "radial-gradient(circle,#3b82f6,transparent)" }}/>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center px-6 max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full glass-dark">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-green-400"/>
            <span className="text-sm text-white/70 font-semibold tracking-wider uppercase">Available for New Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase tracking-tighter leading-[0.9] mb-6"
          >
            <span className="block text-white" style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}>Shoaib</span>
            <span className="block gradient-text" style={{ fontSize: "clamp(1.8rem, 5.5vw, 4rem)", letterSpacing: "-0.02em" }}>
              Cinematic Video Editor
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="text-xl md:text-2xl text-white/45 font-light mb-12 max-w-xl mx-auto">
            I turn raw footage into powerful stories.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#work"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-white text-lg hover:scale-105 transition-all duration-300 neon-glow"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
              <Play className="w-5 h-5 fill-white" /> Watch My Work
            </a>
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-white text-lg glass-dark hover:scale-105 transition-all duration-300 neon-glow-green">
              <MessageCircle className="w-5 h-5 text-green-400" /> WhatsApp Me
            </a>
          </motion.div>

          {/* Video pause/play control */}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            onClick={toggleHeroVideo}
            className="absolute bottom-[-90px] right-0 md:right-8 flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-xs uppercase tracking-widest">
            {heroVideoPaused ? <Play className="w-4 h-4"/> : <Pause className="w-4 h-4"/>}
            {heroVideoPaused ? "Play" : "Pause"} Reel
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/25">
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 relative overflow-hidden" style={{ borderTop: "1px solid rgba(139,92,246,0.1)", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(139,92,246,0.05), transparent)" }}/>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="stat-card rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: `${s.color}22`, border: `1px solid ${s.color}44`, color: s.color }}>
                      {s.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-black mb-1 gradient-text">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/40 text-sm uppercase tracking-widest font-medium">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <FadeIn direction="left" className="w-full lg:w-2/5">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-2xl blur-3xl opacity-25"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", transform: "translate(16px,16px) scale(0.95)" }}/>
              <div className="absolute inset-0 rounded-2xl border border-purple-500/20 translate-x-5 translate-y-5"/>
              <img src={aboutPortrait} alt="Shoaib" className="relative w-full rounded-2xl object-cover aspect-[3/4] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"/>
              <div className="absolute -bottom-5 -right-5 rounded-xl px-5 py-3 font-black text-sm uppercase tracking-wider text-white neon-glow"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
                1 Year Exp.
              </div>
            </div>
          </FadeIn>
          <div className="w-full lg:w-3/5 space-y-6">
            <FadeIn delay={0.1} direction="right">
              <span className="gradient-text text-sm font-bold uppercase tracking-widest">About Me</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3 leading-tight">
                Telling Stories <br/><span className="gradient-text">Through Every Cut</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} direction="right" className="space-y-4 text-white/55 text-lg leading-relaxed">
              <p>I'm Shoaib — a passionate cinematic video editor with hands-on experience in Adobe Premiere Pro and CapCut. I believe raw footage is just the beginning; the real magic happens in the edit.</p>
              <p>From viral social media reels to polished cinematic productions, I bring creativity, technical precision, and storytelling instinct to every frame.</p>
            </FadeIn>
            <FadeIn delay={0.3} direction="right" className="grid grid-cols-3 gap-4 pt-2">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-purple-400" />, label: "Fast Delivery" },
                { icon: <CheckCircle className="w-5 h-5 text-blue-400"   />, label: "Revisions Included" },
                { icon: <CheckCircle className="w-5 h-5 text-violet-400" />, label: "Quality First" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 text-white/65 text-sm">{f.icon} {f.label}</div>
              ))}
            </FadeIn>
            <FadeIn delay={0.4} direction="right">
              <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 neon-glow"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
                <MessageCircle className="w-5 h-5" /> Hire Me on WhatsApp
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 relative overflow-hidden"
        style={{ background: "rgba(139,92,246,0.025)", borderTop: "1px solid rgba(139,92,246,0.08)", borderBottom: "1px solid rgba(139,92,246,0.08)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(139,92,246,0.07),transparent)] pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="gradient-text text-sm font-bold uppercase tracking-widest">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">My Skills</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 0.07}>
                <div className="group p-6 rounded-2xl glass hover:border-purple-500/30 transition-all duration-400 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:neon-glow"
                      style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.3))", border: "1px solid rgba(139,92,246,0.35)" }}>
                      {skill.icon}
                    </div>
                    <span className="text-white font-bold">{skill.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/30 uppercase tracking-widest text-xs">Proficiency</span>
                      <span className="gradient-text font-black">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: i * 0.09, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}/>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="work" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10">
          <span className="gradient-text text-sm font-bold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">Selected Work</h2>
          <p className="text-white/35 mt-3 max-w-lg mx-auto text-sm">Hover any project to see a live video preview. Click to watch the full piece.</p>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300"
              style={activeCategory === cat
                ? { background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", color: "white", boxShadow: "0 0 25px rgba(139,92,246,0.45)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {cat}
            </motion.button>
          ))}
        </FadeIn>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <VideoCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 relative overflow-hidden"
        style={{ background: "rgba(59,130,246,0.02)", borderTop: "1px solid rgba(59,130,246,0.08)", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.06),transparent)] pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="gradient-text text-sm font-bold uppercase tracking-widest">What I Offer</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">Services</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl glass transition-all duration-400 cursor-default"
                  style={{ border: `1px solid ${s.accent}22` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${s.accent}55`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${s.accent}22`)}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}33`, color: s.accent }}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full"
                      style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}30` }}>
                      {s.price}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight mb-3">{s.title}</h3>
                  <p className="text-white/45 leading-relaxed text-sm mb-5">{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300"
                    style={{ color: s.accent }}>
                    Get Started <ChevronRight className="w-4 h-4"/>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="gradient-text text-sm font-bold uppercase tracking-widest">Client Reviews</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">What Clients Say</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.12}>
              <div className="group p-7 rounded-2xl glass flex flex-col gap-5 h-full transition-all duration-400 hover:border-purple-500/25 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-purple-500/35 group-hover:text-purple-500/65 transition-colors"/>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-purple-400 text-purple-400"/>
                    ))}
                  </div>
                </div>
                <p className="text-white/55 leading-relaxed text-sm flex-1 italic">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full font-black text-sm text-white flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-white/30 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden mx-6 md:mx-12 mb-12 rounded-3xl"
        style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(139,92,246,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)" }}>
        <div className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(139,92,246,0.08), transparent)" }}/>
        <FadeIn className="text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            Have a Project? <br/><span className="gradient-text">Let's Create Together.</span>
          </h2>
          <p className="text-white/45 text-lg mb-10 max-w-xl mx-auto">I'm open for new collaborations. Fast delivery, professional results, 100% dedication.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg hover:scale-105 transition-all duration-300 neon-glow-green"
              style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
              <MessageCircle className="w-6 h-6"/> Hire Me on WhatsApp
            </a>
            <a href="mailto:shoaib@email.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-lg glass-dark hover:scale-105 transition-all duration-300">
              <Mail className="w-6 h-6"/> Send an Email
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Mail className="w-6 h-6"/>,            label: "Email",     value: "shoaib@email.com",      href: "mailto:shoaib@email.com",               col: "hover:border-purple-500/40" },
            { icon: <MessageCircle className="w-6 h-6"/>,   label: "WhatsApp",  value: "Message me directly",   href: "https://wa.me/923000000000",            col: "hover:border-green-500/40" },
            { icon: <Instagram className="w-6 h-6"/>,       label: "Instagram", value: "@shoaib.edits",          href: "#",                                     col: "hover:border-pink-500/40" },
          ].map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-white/5 transition-all duration-300 text-center ${c.col} hover:scale-105`}>
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-purple-400 group-hover:text-white group-hover:neon-glow group-hover:gradient-bg transition-all duration-300">{c.icon}</div>
              <div>
                <div className="text-white font-bold">{c.label}</div>
                <div className="text-white/30 text-xs mt-0.5">{c.value}</div>
              </div>
            </a>
          ))}
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-3">
          {[
            { icon: <Youtube className="w-4 h-4 text-red-400"/>, label: "YouTube" },
            { icon: <Twitter className="w-4 h-4 text-sky-400"/>, label: "Twitter / X" },
          ].map(s => (
            <a key={s.label} href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white/40 glass border border-white/5 hover:text-white hover:border-white/20 transition-all duration-300">
              {s.icon} {s.label}
            </a>
          ))}
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-12" style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/25">
          <div className="font-black uppercase tracking-tighter text-white/60 text-lg">Shoaib<span className="gradient-text">.</span></div>
          <div>© {new Date().getFullYear()} Shoaib. All rights reserved. Crafted with passion.</div>
          <div className="flex gap-6">
            {["Instagram", "YouTube", "WhatsApp"].map(l => (
              <a key={l} href="#" className="hover:text-purple-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
