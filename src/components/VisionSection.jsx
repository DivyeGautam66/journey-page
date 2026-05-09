// src/components/VisionSection.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Heart, Compass, Star } from 'lucide-react';
import { visionCards } from '../data/journeyData';

const iconMap = { Target, Heart, Compass };

function OrbitalRing({ radius, color, duration, dotColor, dotSize, delay = 0 }) {
  return (
    <div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: `${color}25`,
        top: '50%',
        left: '50%',
        marginTop: -radius,
        marginLeft: -radius,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: dotColor,
          boxShadow: `0 0 8px ${dotColor}80`,
          top: -dotSize / 2,
          left: '50%',
          marginLeft: -dotSize / 2,
          transformOrigin: `50% ${radius + dotSize / 2}px`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function VisionSection({ standalone = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="vision"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f8f9ff 0%, #fdf4ff 50%, #f8f9ff 100%)', paddingTop: standalone ? '8rem' : undefined }}
    >
      {/* Soft bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: 500,
            height: 500,
            top: '10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 400,
            height: 400,
            bottom: '10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono-custom text-violet-500 text-xs tracking-widest uppercase font-semibold">
            The Destination
          </span>
          <h2 className="font-syne font-black text-4xl md:text-6xl text-slate-800 mt-3 mb-4">
            Future{' '}
            <span className="gradient-text">Vision</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Every journey needs a north star. Here's mine — bold, clear,
            and worth every sacrifice made along the way.
          </p>
        </motion.div>

        {/* Main visual + statement */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          {/* Orbital animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex-shrink-0"
            style={{ width: 300, height: 300 }}
          >
            {/* Center core */}
            <div
              className="absolute rounded-full flex items-center justify-center shadow-xl"
              style={{
                width: 90,
                height: 90,
                top: '50%',
                left: '50%',
                marginTop: -45,
                marginLeft: -45,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
              }}
            >
              <Star size={32} className="text-white" />
            </div>

            {/* Orbital rings */}
            <OrbitalRing radius={75} color="#6366f1" duration={6} dotColor="#6366f1" dotSize={10} delay={0} />
            <OrbitalRing radius={110} color="#8b5cf6" duration={10} dotColor="#8b5cf6" dotSize={8} delay={2} />
            <OrbitalRing radius={145} color="#ec4899" duration={14} dotColor="#ec4899" dotSize={6} delay={1} />
          </motion.div>

          {/* Vision statement */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1"
          >
            <div
              className="p-8 rounded-3xl relative overflow-hidden bg-white"
              style={{
                border: '1.5px solid rgba(99,102,241,0.15)',
                boxShadow: '0 8px 40px rgba(99,102,241,0.1)',
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent)' }}
              />
              <h3 className="font-syne font-black text-2xl md:text-3xl text-slate-800 mb-4 leading-tight">
                To build products that{' '}
                <span className="gradient-text">outlive the moment</span>{' '}
                they're created.
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                My vision is to stand at the intersection of technology, design, and
                business — creating ventures that solve real problems for real people.
                Not chasing trends. Building legacies.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Founder', 'Innovator', 'Impact-driven', 'E-Cell'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-600"
                    style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {visionCards.map((card, i) => {
            const Icon = iconMap[card.icon] || Target;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="p-7 rounded-2xl bg-white group cursor-default transition-all duration-300"
                style={{
                  border: '1.5px solid rgba(99,102,241,0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))',
                    border: '1.5px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <Icon size={20} className="text-indigo-500" />
                </div>
                <h4 className="font-syne font-bold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
