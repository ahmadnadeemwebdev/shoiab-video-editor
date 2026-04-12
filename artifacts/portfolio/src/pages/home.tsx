import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Play, Mail, MessageCircle, Instagram, Youtube, Twitter,
  Scissors, Film, Palette, Zap, Monitor, Users,
  ArrowDown, ChevronRight, Star, Quote, CheckCircle, Sparkles, X
} from 'lucide-react';

import heroBg from "../assets/hero-bg.png";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";
import aboutPortrait from "../assets/about-portrait.png";

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "none"
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = direction === "up" ? { opacity: 0, y: 40 }
    : direction === "left" ? { opacity: 0, x: -40 }
    : direction === "right" ? { opacity: 0, x: 40 }
    : { opacity: 0 };
  return (
    <motion.div ref={ref} initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CATEGORIES = ["All", "YouTube", "Reels", "Cinematic", "Wedding"];

const allProjects = [
  { id: 1, title: "Brand Story Reel", category: "YouTube", duration: "2:45", image: project1, desc: "Dynamic brand storytelling with punchy cuts and motion graphics." },
  { id: 2, title: "Music Video Edit", category: "Cinematic", duration: "3:47", image: project2, desc: "Cinematic color grade and seamless beat-synced transitions." },
  { id: 3, title: "Short Film Cut", category: "Cinematic", duration: "8:15", image: project3, desc: "Narrative short with emotional pacing and immersive sound design." },
  { id: 4, title: "Wedding Highlights", category: "Wedding", duration: "4:20", image: project1, desc: "Emotional highlight reel capturing the most precious moments." },
  { id: 5, title: "Product Reel Pack", category: "Reels", duration: "0:30", image: project2, desc: "Fast-paced product showcase optimized for Instagram and TikTok." },
  { id: 6, title: "Vlog Series Ep. 1", category: "YouTube", duration: "12:00", image: project3, desc: "Engaging travel vlog with smooth cuts and energetic pacing." },
];

const skills = [
  { icon: <Monitor className="w-6 h-6" />, name: "Adobe Premiere Pro", level: 90, color: "from-purple-500 to-violet-600" },
  { icon: <Scissors className="w-6 h-6" />, name: "CapCut", level: 95, color: "from-blue-500 to-cyan-500" },
  { icon: <Film className="w-6 h-6" />, name: "Video Editing", level: 92, color: "from-purple-500 to-blue-500" },
  { icon: <Palette className="w-6 h-6" />, name: "Color Grading", level: 80, color: "from-violet-500 to-purple-600" },
  { icon: <Zap className="w-6 h-6" />, name: "Transitions & Effects", level: 88, color: "from-blue-500 to-indigo-500" },
  { icon: <Users className="w-6 h-6" />, name: "Social Media Content", level: 93, color: "from-cyan-500 to-blue-600" },
];

const services = [
  { icon: <Youtube className="w-7 h-7" />, title: "YouTube Editing", desc: "Long-form content with clean cuts, dynamic graphics, and pacing that retains viewers.", price: "From $25", color: "from-red-500/20 to-red-600/5", border: "border-red-500/20 hover:border-red-500/50" },
  { icon: <Zap className="w-7 h-7" />, title: "Reels & TikTok", desc: "Trend-driven short clips with viral hooks, effects, and music-synced transitions.", price: "From $10", color: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/20 hover:border-purple-500/50" },
  { icon: <Film className="w-7 h-7" />, title: "Cinematic Videos", desc: "Premium film-grade edits with rich color, sound design and emotional storytelling.", price: "From $50", color: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/20 hover:border-blue-500/50" },
  { icon: <Star className="w-7 h-7" />, title: "Wedding Edits", desc: "Timeless, cinematic highlight films that honor the emotion of your most special day.", price: "From $80", color: "from-pink-500/20 to-pink-600/5", border: "border-pink-500/20 hover:border-pink-500/50" },
];

const testimonials = [
  { name: "Aryan Khan", role: "YouTube Creator • 250K Subscribers", avatar: "AK", review: "Shoaib took my raw footage and turned it into something I'm genuinely proud of. The pacing, the transitions, the color — everything was exactly what I wanted but couldn't describe. Incredibly talented.", rating: 5 },
  { name: "Sara Malik", role: "Fashion Brand Owner", avatar: "SM", review: "I needed a quick product reel for Instagram and Shoaib delivered within 24 hours. The quality blew me away — my engagement tripled after posting it. Highly recommend!", rating: 5 },
  { name: "Usman Tariq", role: "Wedding Videographer", avatar: "UT", review: "Best editor I've worked with for wedding content. He understands emotion and timing better than anyone. My clients are always thrilled with the final result.", rating: 5 },
];

const NAV_LINKS = ["About", "Skills", "Work", "Services", "Testimonials", "Contact"];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center"
        style={{ background: "rgba(9,9,18,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.1)" }}
      >
        <a href="#" className="text-xl font-black uppercase tracking-tighter text-white">
          Shoaib<span className="gradient-text">.</span>
        </a>

        <div className="hidden md:flex gap-7 text-sm font-medium tracking-wide text-white/60">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative group py-1"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-105 neon-glow"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
          >
            <MessageCircle className="w-4 h-4" /> Hire Me
          </a>
          <button onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden text-white/70 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[65px] left-0 w-full z-40 flex flex-col gap-1 px-6 py-4"
            style={{ background: "rgba(9,9,18,0.97)", borderBottom: "1px solid rgba(139,92,246,0.15)" }}
          >
            {NAV_LINKS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white/70 hover:text-white font-medium border-b border-white/5 last:border-0 transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
            >
              <MessageCircle className="w-4 h-4" /> Hire Me on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{
            background: "linear-gradient(to bottom, rgba(9,9,18,0.55) 0%, rgba(9,9,18,0.4) 40%, rgba(9,9,18,0.95) 100%)"
          }} />
          <div className="absolute inset-0 z-10" style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)"
          }} />
          <img src={heroBg} alt="Cinematic Studio" className="w-full h-full object-cover object-center" />
        </motion.div>

        {/* Floating glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[120px] pointer-events-none z-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-[100px] pointer-events-none z-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-semibold tracking-wider uppercase">Available for Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-none mb-6"
          >
            <span className="text-white">Shoaib</span>
            <br />
            <span className="gradient-text neon-text">Professional Video Editor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl text-white/50 font-light mb-12 max-w-2xl mx-auto"
          >
            Crafting stories through visuals — frame by frame, cut by cut.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#work"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:scale-105 neon-glow"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
            >
              <Play className="w-5 h-5 fill-white" />
              Watch My Work
            </a>
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg glass transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp Me
            </a>
          </motion.div>

          {/* Scroll ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <FadeIn direction="left" className="w-full lg:w-2/5">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-2xl opacity-30 blur-2xl"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", transform: "translate(12px,12px)" }} />
              <div className="absolute inset-0 rounded-2xl border border-purple-500/20 translate-x-4 translate-y-4" />
              <img src={aboutPortrait} alt="Shoaib" className="relative w-full rounded-2xl object-cover aspect-[3/4] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-4 -right-4 rounded-xl px-5 py-3 font-black text-sm uppercase tracking-wider text-white shadow-lg neon-glow"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                1 Year Exp.
              </div>
            </div>
          </FadeIn>

          <div className="w-full lg:w-3/5 space-y-6">
            <FadeIn delay={0.1} direction="right">
              <span className="gradient-text text-sm font-bold uppercase tracking-widest">About Me</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3 leading-tight">
                Telling Stories <br /> <span className="gradient-text">Through Every Cut</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} direction="right" className="space-y-4 text-white/55 text-lg leading-relaxed font-light">
              <p>I'm Shoaib — a passionate video editor with 1 year of hands-on experience in Adobe Premiere Pro and CapCut. I believe raw footage is just the beginning; the magic happens in the edit.</p>
              <p>From viral social media reels to polished cinematic productions, I bring creativity, precision, and storytelling instinct to every project. My mission is simple: make viewers feel something.</p>
            </FadeIn>
            <FadeIn delay={0.3} direction="right" className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-purple-400" />, label: "Fast Delivery" },
                { icon: <CheckCircle className="w-5 h-5 text-blue-400" />, label: "Revisions Included" },
                { icon: <CheckCircle className="w-5 h-5 text-violet-400" />, label: "Quality First" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 text-white/70 text-sm">
                  {f.icon} {f.label}
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.35} direction="right" className="flex gap-10 pt-4 border-t border-white/5">
              {[{ v: "1+", l: "Year Exp." }, { v: "2", l: "Core Tools" }, { v: "100%", l: "Dedicated" }].map(s => (
                <div key={s.l}>
                  <div className="text-4xl font-black gradient-text">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-white/35 mt-1">{s.l}</div>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.4} direction="right">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 neon-glow"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
              >
                Hire Me <ChevronRight className="w-5 h-5" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 relative overflow-hidden" style={{ background: "rgba(139,92,246,0.03)", borderTop: "1px solid rgba(139,92,246,0.08)", borderBottom: "1px solid rgba(139,92,246,0.08)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(139,92,246,0.07),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="gradient-text text-sm font-bold uppercase tracking-widest">What I Do</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">My Skills</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 0.07}>
                <div className="group p-6 rounded-2xl glass hover:border-purple-500/30 transition-all duration-400 space-y-4 cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))", border: "1px solid rgba(139,92,246,0.3)" }}>
                      {skill.icon}
                    </div>
                    <span className="text-white font-bold text-base">{skill.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/35 uppercase tracking-widest text-xs">Proficiency</span>
                      <span className="gradient-text font-black">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: i * 0.08, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
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
          <p className="text-white/40 mt-3 max-w-xl mx-auto">From social reels to cinematic films — every project is crafted with intention.</p>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300"
              style={activeCategory === cat
                ? { background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", color: "white", boxShadow: "0 0 20px rgba(139,92,246,0.4)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {cat}
            </motion.button>
          ))}
        </FadeIn>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ border: "1px solid rgba(139,92,246,0.1)" }}
                onClick={() => setPlayingId(playingId === project.id ? null : project.id)}
              >
                <div className="aspect-video overflow-hidden bg-black">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{ filter: "brightness(0.75)" }}
                    whileHover={{ scale: 1.07, filter: "brightness(0.9)" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.2), rgba(9,9,18,0.6))", backdropFilter: "blur(2px)" }}>
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-2xl neon-glow"
                    style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", width: 72, height: 72 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <Play className="w-7 h-7 fill-white text-white ml-1" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(9,9,18,0.97) 0%, rgba(9,9,18,0.7) 60%, transparent)" }}>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="gradient-text text-xs font-bold uppercase tracking-widest mb-1.5">{project.category}</div>
                      <h3 className="text-white font-black text-lg leading-tight group-hover:gradient-text transition-all">{project.title}</h3>
                      <p className="text-white/40 text-xs mt-1 line-clamp-1">{project.desc}</p>
                    </div>
                    <div className="text-white/30 text-xs font-mono glass px-2.5 py-1.5 rounded-lg shrink-0 ml-3">{project.duration}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 relative overflow-hidden" style={{ background: "rgba(59,130,246,0.02)", borderTop: "1px solid rgba(59,130,246,0.08)", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.06),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="gradient-text text-sm font-bold uppercase tracking-widest">What I Offer</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">Services</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className={`group p-8 rounded-2xl transition-all duration-400 cursor-default border bg-gradient-to-br ${s.color} ${s.border}`}
                  style={{ backdropFilter: "blur(10px)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:neon-glow"
                      style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))", border: "1px solid rgba(139,92,246,0.3)" }}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full gradient-text"
                      style={{ border: "1px solid rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.1)" }}>
                      {s.price}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight mb-3 group-hover:gradient-text transition-all">{s.title}</h3>
                  <p className="text-white/45 leading-relaxed text-sm mb-5">{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 gradient-text text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300">
                    Get Started <ChevronRight className="w-4 h-4" />
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
              <div className="p-7 rounded-2xl glass flex flex-col gap-5 h-full hover:border-purple-500/25 transition-all duration-400 group"
                style={{ borderColor: "rgba(139,92,246,0.12)" }}>
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-purple-500/40 group-hover:text-purple-500/70 transition-colors" />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed text-sm flex-1 italic">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full font-black text-sm text-white flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-white/35 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 relative overflow-hidden" style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(139,92,246,0.07),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <FadeIn>
            <span className="gradient-text text-sm font-bold uppercase tracking-widest">Let's Work Together</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mt-3 leading-tight">
              Ready to Create <br /><span className="gradient-text neon-text">Something Epic?</span>
            </h2>
            <p className="text-white/40 mt-5 text-lg max-w-xl mx-auto">Have a project? Reach out — I respond fast and always deliver quality.</p>
          </FadeIn>

          <FadeIn delay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
            {[
              { icon: <Mail className="w-6 h-6" />, label: "Email", value: "shoaib@email.com", href: "mailto:shoaib@email.com", glow: "hover:border-purple-500/40 hover:bg-purple-500/5", iconColor: "text-purple-400" },
              { icon: <MessageCircle className="w-6 h-6" />, label: "WhatsApp", value: "Message directly", href: "https://wa.me/923000000000", glow: "hover:border-green-500/40 hover:bg-green-500/5", iconColor: "text-green-400" },
              { icon: <Instagram className="w-6 h-6" />, label: "Instagram", value: "@shoaib.edits", href: "#", glow: "hover:border-pink-500/40 hover:bg-pink-500/5", iconColor: "text-pink-400" },
            ].map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-white/5 transition-all duration-300 ${c.glow}`}>
                <div className={`w-14 h-14 rounded-full glass flex items-center justify-center ${c.iconColor} group-hover:scale-110 transition-transform`}>{c.icon}</div>
                <div>
                  <div className="text-white font-bold">{c.label}</div>
                  <div className="text-white/35 text-xs mt-0.5">{c.value}</div>
                </div>
              </a>
            ))}
          </FadeIn>

          <FadeIn delay={0.25} className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: <Youtube className="w-4 h-4 text-red-400" />, label: "YouTube" },
              { icon: <Twitter className="w-4 h-4 text-sky-400" />, label: "Twitter / X" },
            ].map(s => (
              <a key={s.label} href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white/40 glass border border-white/5 hover:text-white hover:border-white/20 transition-all duration-300">
                {s.icon} {s.label}
              </a>
            ))}
          </FadeIn>

          <FadeIn delay={0.35} className="mt-12">
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-black text-white text-lg transition-all duration-300 hover:scale-105 neon-glow"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
            >
              <MessageCircle className="w-6 h-6" /> Hire Me on WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-12" style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/25">
          <div className="font-black uppercase tracking-tighter text-white/60">Shoaib<span className="gradient-text">.</span></div>
          <div>© {new Date().getFullYear()} Shoaib. All rights reserved. Built with passion.</div>
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
