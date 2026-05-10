// src/components/IntroSection.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── EDIT YOUR INFO HERE ───────────────────────────────────────────────
const NAME = 'Divye Gautam';
const HEADLINE = "Dreaming big, working hard, and proving myself every day.";
const INTRO_TEXT = (
  <>
    <p>
      I come from Kota, Rajasthan — a city known for producing some of the brightest students in the country. Ironically, I was never considered one of them.
    </p>
    <p>
      As a child, I was more interested in football and fun than academics. I was often seen as the naughty kid who would never achieve much in studies. But over time, challenges, failures, and constant self-doubt pushed me to change myself completely.
    </p>
    <p>
      My journey has not been perfect. It has been filled with achievements, painful failures, and most importantly, personal growth that shaped who I am today.
    </p>
  </>
);
const PHOTO_URL = '/profile.jpg'; // paste a URL here or leave null for initials avatar
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
        paddingTop: '6rem',
        paddingBottom: '6rem',
        marginBottom: '6rem',
        marginTop: '6rem',

      }}
    >
      {/* Soft blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-[120px]"
          style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full blur-[80px]"
          style={{ width: 350, height: 350, bottom: '0%', right: '5%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-16 lg:gap-24">

          {/* ── Left Column: Headline + Intro ───────────────────────────── */}
          <div className="flex-1 flex flex-col pt-4 lg:pt-10">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14"
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

            {/* Divider */}
            <div className="w-full h-px bg-slate-200 mb-24 mt-4" />

            {/* Bottom row: "Intro" label + paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-6"
            >
              {/* Label */}
              <div className="sm:w-32 flex-shrink-0">
                <span className="font-syne font-bold text-slate-800 text-2xl tracking-tight">Intro</span>
              </div>

              {/* Paragraph */}
              <div className="flex-1 text-slate-600 text-lg leading-relaxed space-y-6 pr-0 lg:pr-12">
                {INTRO_TEXT}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Photo ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[400px] flex-shrink-0 lg:pt-10 flex justify-center lg:justify-end"
          >
            <div
              className="relative overflow-hidden shadow-xl"
              style={{
                width: 380,
                height: 480,
                background: 'linear-gradient(135deg, #e0e7ff, #ede9fe)',
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

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #ffffff)' }}
      />
    </section>
  );
}
