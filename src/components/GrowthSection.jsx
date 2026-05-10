// src/components/GrowthSection.jsx
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, techStack } from '../data/journeyData';
import { TrendingUp, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const barRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.2,
          delay: index * 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
          {skill.name}
        </span>
        <span className="font-mono-custom text-xs font-bold" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.06)' }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}90)`,
            width: '0%',
          }}
        />
      </div>
    </motion.div>
  );
}


export default function GrowthSection() {
  return (
    <section
      id="growth"
      className="section-pad relative"
      style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #f8f9ff 100%)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono-custom text-emerald-500 text-xs tracking-widest uppercase font-semibold">
            The Transformation
          </span>
          <h2 className="font-syne font-black text-4xl md:text-6xl text-slate-800 mt-3 mb-4">
            Growth{' '}
            <span className="gradient-text-green">Unlocked</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Progress isn't linear. It's the sum of every struggle,
            every pivot, every sleepless night turned into a breakthrough.
          </p>
        </motion.div>


        {/* Skills + Tech Split */}
        <div className="grid md:grid-cols-2 gap-12 mt-4">
          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-emerald-500" />
              <h3 className="font-syne font-bold text-xl text-slate-800">
                Skill Growth
              </h3>
            </div>
            <div className="space-y-5">
              {skills.map((s, i) => (
                <SkillBar key={s.name} skill={s} index={i} />
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={18} className="text-indigo-500" />
              <h3 className="font-syne font-bold text-xl text-slate-800">
                Tech Arsenal
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white cursor-default group"
                  style={{ border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {tech.icon}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Transformation quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.03))',
                border: '1.5px solid rgba(16,185,129,0.15)',
              }}
            >
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "The most dangerous weapon in any startup is a builder who thinks
                like a leader, feels like a designer, and ships like an engineer."
              </p>
              <p className="text-emerald-500 text-xs mt-2 font-mono-custom font-semibold">— My north star</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
