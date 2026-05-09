// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

const words = ['Engineer', 'Builder', 'Leader', 'Dreamer', 'Founder'];

export default function HeroSection() {
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-black text-sm font-medium mb-8"
          style={{
            background: 'rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          <Sparkles size={13} />
          Divye Gautam
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
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
          <br />
          <span className="text-slate-400 text-3xl md:text-5xl font-light">
            in the making.
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Not a résumé. Not a portfolio. This is my{' '}
          <span className="text-black font-semibold">unfiltered journey</span> — the
          wins, the failures, the pivots, and the vision that keeps me going.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="#timeline"
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-indigo-200"
            style={{
              background: '#000000',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Journey
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: '#111111' }}
            />
          </a>
          <a
            href="#vision"
            className="px-8 py-4 rounded-2xl font-semibold text-black hover:text-black transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1.5px solid rgba(0,0,0,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            My Vision →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-12"
        >
          {[
            { val: '6+', label: 'Years of Building' },
            { val: '14', label: 'Investor Rejections' },
            { val: '∞', label: 'Lessons Learned' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-syne font-black text-4xl gradient-text">{s.val}</div>
              <div className="text-slate-400 text-sm mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs"
      >
        <span className="tracking-widest uppercase font-medium">Scroll to begin</span>
        <ChevronDown size={17} className="animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}
