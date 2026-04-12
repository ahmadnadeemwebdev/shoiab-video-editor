import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Play, Mail, MessageCircle, Instagram, Youtube, Twitter,
  Scissors, Film, Palette, Zap, Monitor, Users,
  ArrowDown, ExternalLink, ChevronRight, Star
} from 'lucide-react';

import heroBg from "../assets/hero-bg.png";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";
import aboutPortrait from "../assets/about-portrait.png";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const skills = [
  { icon: <Monitor className="w-6 h-6" />, name: "Adobe Premiere Pro", level: 90 },
  { icon: <Scissors className="w-6 h-6" />, name: "CapCut", level: 95 },
  { icon: <Film className="w-6 h-6" />, name: "Video Editing", level: 92 },
  { icon: <Palette className="w-6 h-6" />, name: "Color Grading", level: 80 },
  { icon: <Zap className="w-6 h-6" />, name: "Transitions & FX", level: 88 },
  { icon: <Users className="w-6 h-6" />, name: "Social Media Content", level: 93 },
];

const projects = [
  { id: 1, title: "Cinematic Brand Reel", category: "Commercial", duration: "1:32", image: project1 },
  { id: 2, title: "Music Video Edit", category: "Music Video", duration: "3:47", image: project2 },
  { id: 3, title: "Short Film Cut", category: "Narrative", duration: "8:15", image: project3 },
  { id: 4, title: "Wedding Highlights", category: "Wedding", duration: "4:20", image: project1 },
  { id: 5, title: "Social Media Pack", category: "Reels / TikTok", duration: "0:30", image: project2 },
  { id: 6, title: "YouTube Vlog Series", category: "YouTube", duration: "12:00", image: project3 },
];

const services = [
  {
    icon: <Youtube className="w-8 h-8" />,
    title: "YouTube Editing",
    desc: "Engaging long-form content with clean cuts, graphics, and pacing that keeps viewers watching till the end.",
    price: "Starting at $25"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Reels & TikTok",
    desc: "Fast-paced, trend-driven short videos optimized for maximum reach and engagement on social platforms.",
    price: "Starting at $10"
  },
  {
    icon: <Film className="w-8 h-8" />,
    title: "Cinematic Videos",
    desc: "Premium cinematic edits with color grading, sound design, and storytelling that feels like a film.",
    price: "Starting at $50"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Wedding Edits",
    desc: "Beautiful, emotional highlight reels that capture your special day in a timeless, cinematic style.",
    price: "Starting at $80"
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black uppercase tracking-tighter text-white"
        >
          Shoaib<span className="text-primary">.</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex gap-8 text-sm font-medium tracking-wider text-white/70 uppercase"
        >
          {["About", "Skills", "Work", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-primary transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-primary text-black text-sm font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform duration-300"
        >
          Hire Me <ChevronRight className="w-4 h-4" />
        </motion.a>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <img src={heroBg} alt="Editing Studio" className="w-full h-full object-cover object-center scale-105" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 border border-primary/30 bg-primary/10 rounded-full px-4 py-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Available for Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-4"
          >
            I'm <span className="text-primary">Shoaib</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl md:text-3xl font-light text-white/80 mb-4"
          >
            Video Editor
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-12"
          >
            Turning ideas into cinematic visuals — one frame at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-black uppercase tracking-wider rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-black" /> Watch My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <Mail className="w-5 h-5" /> Get In Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <FadeIn className="w-full lg:w-2/5">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl translate-x-5 translate-y-5" />
              <div className="absolute inset-0 border border-primary/30 rounded-2xl translate-x-3 translate-y-3" />
              <img
                src={aboutPortrait}
                alt="Shoaib — Video Editor"
                className="relative w-full rounded-2xl object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary text-black font-black text-sm uppercase tracking-widest px-5 py-3 rounded-xl shadow-lg">
                1 Year Exp.
              </div>
            </div>
          </FadeIn>

          <div className="w-full lg:w-3/5 space-y-6">
            <FadeIn delay={0.1}>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">About Me</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2">
                Crafting Stories <br /> <span className="text-primary">Frame by Frame</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
              <p>
                I'm Shoaib, a passionate video editor with hands-on experience in Adobe Premiere Pro and CapCut. I believe every piece of footage holds a story waiting to be told — my job is to find it and make it unforgettable.
              </p>
              <p>
                From high-energy social media reels to polished cinematic productions, I bring creativity, precision, and a sharp eye for detail to every project. I'm deeply committed to growing my craft and delivering work that exceeds expectations.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-wrap gap-6 pt-4">
              {[
                { value: "1", label: "Year Experience" },
                { value: "2", label: "Core Tools" },
                { value: "100%", label: "Dedication" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-black text-primary">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.4}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-black uppercase tracking-wider rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all duration-300 mt-2"
              >
                Hire Me <ChevronRight className="w-5 h-5" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(234,179,8,0.08),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">What I Do</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2">My Skills</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-primary/40 hover:bg-primary/5 transition-all duration-400 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      {skill.icon}
                    </div>
                    <span className="text-white font-bold text-lg">{skill.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 uppercase tracking-widest text-xs">Proficiency</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-amber-300 rounded-full"
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
        <FadeIn className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">My Work</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2">Selected Projects</h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">A showcase of my recent video editing work — from social media content to cinematic productions.</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl bg-black border border-white/[0.07] hover:border-primary/30 transition-all duration-400 cursor-pointer">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-400"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.5)]"
                  >
                    <Play className="w-6 h-6 ml-1 fill-black text-black" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{project.category}</div>
                      <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    <div className="text-white/40 text-sm font-mono bg-white/5 px-2 py-1 rounded">{project.duration}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(234,179,8,0.06),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">What I Offer</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2">Services</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-primary/40 hover:bg-primary/5 transition-all duration-400 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="text-primary text-sm font-bold border border-primary/20 bg-primary/10 px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-white/50 leading-relaxed">{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300">
                    Get Started <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">Let's Work Together</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mt-2">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Have a project in mind? I'd love to bring it to life. Reach out and let's create something amazing together.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <a
            href="mailto:shoaib@email.com"
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold">Email</div>
              <div className="text-white/40 text-sm">shoaib@email.com</div>
            </div>
          </a>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold">WhatsApp</div>
              <div className="text-white/40 text-sm">Message me directly</div>
            </div>
          </a>
          <a
            href="#"
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold">Instagram</div>
              <div className="text-white/40 text-sm">@shoaib.edits</div>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.2} className="text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 text-sm">
              <Youtube className="w-4 h-4 text-red-400" /> YouTube
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 text-sm">
              <Twitter className="w-4 h-4 text-sky-400" /> Twitter / X
            </a>
          </div>
          <a
            href="mailto:shoaib@email.com"
            className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-black font-black uppercase tracking-widest text-lg rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all duration-300"
          >
            <Mail className="w-6 h-6" /> Hire Me Now
          </a>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <div className="font-bold uppercase tracking-widest">Shoaib<span className="text-primary">.</span></div>
          <div>© {new Date().getFullYear()} Shoaib. All rights reserved.</div>
          <div className="flex gap-6">
            {["Instagram", "YouTube", "WhatsApp"].map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
