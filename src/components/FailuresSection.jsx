// src/components/FailuresSection.jsx
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import { failures } from '../data/journeyData';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FailureCard({ failure, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div
        className="p-8 rounded-2xl overflow-hidden relative transition-all duration-400 bg-white"
        style={{
          border: `1.5px solid ${failure.color}20`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 32px ${failure.color}18`;
          e.currentTarget.style.borderColor = `${failure.color}35`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = `${failure.color}20`;
        }}
      >
        {/* Subtle bg tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 0% 0%, ${failure.color}06 0%, transparent 60%)` }}
        />

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
          style={{ background: `${failure.color}10`, border: `1.5px solid ${failure.color}20` }}
        >
          <AlertTriangle size={20} style={{ color: failure.color }} />
        </div>

        {/* Stat */}
        <div
          className="font-syne font-black text-5xl mb-1"
          style={{ color: failure.color }}
        >
          <AnimatedCounter target={failure.stat} />
        </div>
        <p className="text-xs text-slate-400 mb-5 font-mono-custom font-medium">{failure.statLabel}</p>

        <h3 className="font-syne font-bold text-xl text-slate-800 mb-3">{failure.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{failure.description}</p>

        {/* Lesson */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl"
          style={{ background: `${failure.color}06`, border: `1px solid ${failure.color}15` }}
        >
          <BookOpen size={15} style={{ color: failure.color }} className="mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: failure.color }}>
              Lesson Learned
            </span>
            <p className="text-slate-600 text-sm mt-1 italic">"{failure.lesson}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FailuresSection({ standalone = false }) {
  return (
    <section
      id="failures"
      className="section-pad relative"
      style={{ background: 'linear-gradient(180deg, #f8f9ff 0%, #fff5f5 100%)', paddingTop: standalone ? '8rem' : undefined }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="font-mono-custom text-red-400 text-xs tracking-widest uppercase font-semibold">
            The Scars
          </span>
          <h2 className="font-syne font-black text-4xl md:text-6xl text-slate-800 mt-3 mb-4">
            Failures &{' '}
            <span className="gradient-text-fire">Lessons</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Every great story has its dark chapters. These are mine — raw,
            honest, and the most valuable parts of my journey.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-slate-400 text-lg italic max-w-2xl mx-auto">
            "I didn't fail. I found{' '}
            <span className="text-orange-500 not-italic font-semibold">
              10,000 ways that won't work.
            </span>
            "
          </p>
          <cite className="text-slate-400 text-sm mt-2 block">— Thomas Edison (adopted)</cite>
        </motion.blockquote>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {failures.map((f, i) => (
            <FailureCard key={f.id} failure={f} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl text-center bg-white"
          style={{ border: '1.5px solid rgba(249,115,22,0.18)', boxShadow: '0 4px 20px rgba(249,115,22,0.08)' }}
        >
          <TrendingUp className="mx-auto mb-3 text-orange-400" size={26} />
          <p className="text-slate-800 font-syne font-bold text-lg">
            Each failure added a layer to who I am.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Resilience isn't born — it's built, scar by scar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
