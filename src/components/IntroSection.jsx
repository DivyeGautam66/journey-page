// src/components/IntroSection.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── EDIT YOUR INFO HERE ───────────────────────────────────────────────
const NAME          = 'Divye Gautam';
const HEADLINE      = "Student entrepreneur passionate about building products that matter and leading teams that ship.";
const INTRO_TEXT    = "I'm a [Year] student at [Your College], pursuing [Your Degree]. From writing my first line of code to leading a 5-person founding team, every chapter of my journey has been driven by one thing — the relentless need to build. I believe in the intersection of technology, design, and business, and I'm here to prove that a single motivated person can change the way people experience the world.";
const PHOTO_URL     = null; // paste a URL here or leave null for initials avatar
// ───────────────────────────────────────────────────────────────────────

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="intro"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f0f4ff 0%, #f8f9ff 60%, #fdf4ff 100%)',
        paddingTop: '7rem',
        paddingBottom: '0',
      }}
    >
      {/* Soft blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-[120px]"
          style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full blur-[80px]"
          style={{ width: 350, height: 350, bottom: '0%', right: '5%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Top row: Photo + Headline ───────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14 pb-14">

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <div
              className="relative overflow-hidden shadow-xl"
              style={{
                width: 200,
                height: 240,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                background: 'linear-gradient(135deg, #e0e7ff, #ede9fe)',
                border: '3px solid rgba(99,102,241,0.15)',
              }}
            >
              {PHOTO_URL ? (
                <img
                  src={PHOTO_URL}
                  alt={NAME}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Initials fallback */
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="font-syne font-black text-6xl text-black"
                  >
                    {NAME.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.05 }}
              className="font-mono-custom text-xs tracking-widest uppercase text-black font-semibold mb-3 block"
            >
              Divye Gautam
            </motion.span>
            <h1
              className="font-syne font-black leading-[1.08] tracking-tight text-slate-900"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
            >
              {HEADLINE}
            </h1>
          </motion.div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div className="divider-line" />

        {/* ── Bottom row: "Intro" label + paragraph ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row gap-8 md:gap-20 py-14"
        >
          {/* Label */}
          <div className="md:w-40 flex-shrink-0">
            <span className="font-syne font-bold text-slate-800 text-base">Intro</span>
          </div>

          {/* Paragraph */}
          <p className="flex-1 text-slate-600 text-lg leading-relaxed md:max-w-2xl">
            {INTRO_TEXT}
          </p>
        </motion.div>

      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #ffffff)' }}
      />
    </section>
  );
}
