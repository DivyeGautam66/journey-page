// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

const words = ['Engineer', 'Builder', 'Leader', 'Dreamer'];

export default function HeroSection({ onNavigate }) {
  const wordRef = useRef(null);
  const blobRef = useRef(null);

  // GSAP word cycling
  useEffect(() => {
    let idx = 0;
    const cycle = () => {
      if (!wordRef.current) return;
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          idx = (idx + 1) % words.length;
          if (wordRef.current) wordRef.current.textContent = words[idx];
          gsap.fromTo(
            wordRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
          );
        },
      });
    };
    const timer = setInterval(cycle, 2200);
    return () => clearInterval(timer);
  }, []);

  // Parallax blob
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(blobRef.current, { x, y, duration: 1.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f8f9ff 0%, #ffffff 50%, #fdf4ff 100%)' }}
    >
      {/* Soft background orbs */}
      <div
        ref={blobRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: 600,
            height: 600,
            top: '-5%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 400,
            height: 400,
            bottom: '10%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-[60px]"
          style={{
            width: 300,
            height: 300,
            top: '55%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full text-black text-sm font-medium mb-8"
          style={{
            background: 'rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          Divye Gautam
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-12"
        >
          <span className="text-slate-800">I am a</span>
          <br />
          <span
            ref={wordRef}
            className="gradient-text inline-block"
            style={{ minWidth: '300px' }}
          >
            {words[0]}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          its not a sprint, its a marathon
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button
            onClick={() => onNavigate('timeline')}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-500 hover:text-black transition-all duration-300"
          >
            Start timeline
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>


      </div>


    </section>
  );
}
