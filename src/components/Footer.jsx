// src/components/Footer.jsx
import { motion } from 'framer-motion';
import { Code2, MessageCircle, Globe, Mail, Zap, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: MessageCircle, label: 'Twitter', href: '#' },
  { icon: Globe, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden bg-white">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.3), transparent)' }}
      />

      {/* Subtle background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-md">
              <Zap size={17} className="text-white" />
            </div>
            <span className="font-syne font-bold text-xl text-black">
              Divye<span className="text-black"> Gautam</span>
            </span>
          </div>

          {/* Quote */}
          <blockquote className="max-w-2xl mx-auto mb-10">
            <p className="text-slate-600 text-lg md:text-xl font-syne font-medium leading-relaxed italic">
              "The path to innovation is paved with{' '}
              <span className="gradient-text not-italic font-bold">
                bold ideas, broken prototypes,
              </span>{' '}
              and relentless execution."
            </p>
          </blockquote>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"
                style={{ border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                title={label}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-400">
            {['Timeline', 'Failures', 'Growth', 'Vision'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-indigo-500 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Bottom line */}
          <div
            className="pt-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <span>© 2024</span>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="font-syne font-semibold text-slate-600">Divye Gautam</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
