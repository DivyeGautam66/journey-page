// src/components/TimelineSection.jsx
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb, Flame, Rocket, Trophy, RefreshCw, Zap,
} from 'lucide-react';
import { timelineMilestones } from '../data/journeyData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Lightbulb, Flame, Rocket, Trophy, RefreshCw, Zap };

function TimelineCard({ milestone, index }) {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = iconMap[milestone.icon] || Zap;

  return (
    <div className={`relative flex items-center justify-between w-full gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 16 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`md:w-[calc(50%-2.5rem)] w-full group flex ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
      >
        <div className={`relative p-6 md:p-8 transition-all duration-500 w-full ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.25rem]"
            style={{
              background: `radial-gradient(circle at ${isLeft ? '90%' : '10%'} 10%, ${milestone.color}08 0%, transparent 60%)`,
            }}
          />

          {/* Phase badge */}
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            {isLeft ? (
              <>
                <span className="font-mono-custom text-slate-400 text-sm font-medium">{milestone.year}</span>
                <span className="text-slate-300">·</span>
                <span
                  className="font-mono-custom text-sm font-semibold"
                  style={{ color: milestone.color }}
                >
                  {milestone.phase}
                </span>
              </>
            ) : (
              <>
                <span
                  className="font-mono-custom text-sm font-semibold"
                  style={{ color: milestone.color }}
                >
                  {milestone.phase}
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-mono-custom text-slate-400 text-sm font-medium">{milestone.year}</span>
              </>
            )}
          </div>

          {/* Text */}
          <h3 className="font-syne font-bold text-3xl text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
            {milestone.title}
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: milestone.color }}>
            {milestone.subtitle}
          </p>
          <p className="text-slate-500 text-lg leading-relaxed">{milestone.description}</p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mt-5 text-sm text-slate-500 font-medium ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            {milestone.tags.join(' · ')}
          </div>
        </div>
      </motion.div>

      {/* Center dot on the line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10"
      >
        <div
          className="w-5 h-5 rounded-full border-4 border-white shadow-md"
          style={{
            background: milestone.color,
            boxShadow: `0 0 0 3px white, 0 0 12px ${milestone.color}60`,
          }}
        />
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  );
}

export default function TimelineSection({ standalone = false }) {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)', paddingTop: standalone ? '8rem' : undefined }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20 w-full flex flex-col items-center"
      >
        <span className="font-mono-custom text-indigo-500 text-sm tracking-widest uppercase font-semibold">
          The Story
        </span>
        <h2 className="font-syne font-black text-5xl md:text-7xl text-slate-800 mt-4 mb-6 text-center">
          My <span className="gradient-text">Timeline</span>
        </h2>
        <p className="text-slate-500 max-w-2xl text-center text-xl">
          Seven phases. Seven transformations in my life for something greater.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-5xl px-4 md:px-8">
          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200">
            <div
              ref={lineRef}
              className="w-full origin-top"
              style={{
                height: '100%',
                background: 'linear-gradient(180deg, #6366f1, #8b5cf6, #ec4899, #06b6d4, #22c55e)',
                transformOrigin: 'top',
              }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20 w-full">
            {timelineMilestones.map((m, i) => (
              <TimelineCard key={m.id} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
