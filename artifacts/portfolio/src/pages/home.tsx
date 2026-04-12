import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Play, Film, Video, Scissors } from 'lucide-react';

import heroBg from "../assets/hero-bg.png";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";
import aboutPortrait from "../assets/about-portrait.png";

const projects = [
  { id: 1, title: 'Neon Nights', category: 'Music Video', image: project1, year: '2024' },
  { id: 2, title: 'Velocity', category: 'Commercial', image: project2, year: '2023' },
  { id: 3, title: 'Echoes', category: 'Short Film', image: project3, year: '2023' },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-8 py-6 flex justify-between items-center text-white">
        <div className="text-xl font-bold tracking-tighter uppercase">Alex Mercer</div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#expertise" className="hover:text-primary transition-colors">Expertise</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src={heroBg} alt="Cinematic Editing Suite" className="w-full h-full object-cover object-center" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-6 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80">Available for booking</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-6 leading-none"
          >
            Crafting <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">The Frame.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl font-light"
          >
            Senior Video Editor specializing in high-end commercial, narrative, and music video storytelling.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-500 backdrop-blur-md group"
          >
            <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
        
        <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
          />
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-32 px-4 md:px-8 max-w-[1600px] mx-auto relative z-20 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Selected Work</h2>
            <div className="h-1 w-24 bg-primary mt-6"></div>
          </div>
          <p className="text-muted-foreground max-w-md text-lg">
            A curated selection of recent projects. From high-octane automotive commercials to moody narrative pieces.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group`}
            >
              <div className="w-full md:w-2/3 overflow-hidden relative aspect-[16/9] bg-black">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 backdrop-blur-[2px]">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-black shadow-[0_0_30px_rgba(245,166,35,0.5)]">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-center">
                <div className="text-primary text-sm font-bold tracking-widest uppercase mb-4">{project.category} // {project.year}</div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-8 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors w-fit">
                  View Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise & Tools */}
      <section id="expertise" className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">The Arsenal</h2>
              <p className="text-muted-foreground">
                Technical mastery in service of emotional storytelling. Every cut is deliberate. Every frame matters.
              </p>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {[
                { icon: <Film className="w-8 h-8 text-primary" />, title: "Offline Editing", desc: "Crafting the narrative spine with precision pacing and structural intuition using Premiere Pro & Avid." },
                { icon: <Video className="w-8 h-8 text-primary" />, title: "Color Grading", desc: "Setting the emotional tone through cinematic color palettes in DaVinci Resolve." },
                { icon: <Scissors className="w-8 h-8 text-primary" />, title: "VFX & Compositing", desc: "Seamless integration and motion graphics using After Effects and Nuke." }
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-white">{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 -z-10 border border-primary/30"></div>
              <img src={aboutPortrait} alt="Alex Mercer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Behind The <br/><span className="text-primary">Monitors</span></h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light">
              <p>
                I don't just cut footage together. I sculpt emotion out of raw time. For the past decade, I've lived in the dark, obsessing over the precise moment a scene breathes, breaks, or ignites.
              </p>
              <p>
                Whether it's a high-octane commercial for a luxury automotive brand, or a quiet, introspective indie film, my philosophy remains the same: the edit should be invisible, but the feeling should be overwhelming.
              </p>
              <p>
                Based in Los Angeles. Working globally.
              </p>
            </div>
            
            <div className="pt-8 flex gap-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-black text-white">10+</div>
                <div className="text-xs uppercase tracking-widest text-primary mt-1">Years Exp.</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">150+</div>
                <div className="text-xs uppercase tracking-widest text-primary mt-1">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">3</div>
                <div className="text-xs uppercase tracking-widest text-primary mt-1">Industry Awards</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-32 px-4 md:px-8 border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-12 relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">Let's Create<br/>Something <span className="text-primary">Epic.</span></h2>
          
          <p className="text-xl text-muted-foreground">Currently accepting inquiries for Q4 2024.</p>
          
          <a href="mailto:hello@alexmercer.com" className="inline-block px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-lg hover:bg-primary transition-colors duration-300">
            Get In Touch
          </a>
          
          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground uppercase tracking-widest">
            <div>© {new Date().getFullYear()} Alex Mercer. All Rights Reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Vimeo</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
