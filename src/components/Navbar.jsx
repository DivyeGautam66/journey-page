// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Timeline', panel: 'timeline' },
  { label: 'Failures', panel: 'failures' },
  { label: 'Vision',   panel: 'vision' },
];

export default function Navbar({ activePanel = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (panel) => {
    setMobileOpen(false);
    onNavigate?.(panel);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">

        {/* Logo — always goes home */}
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:shadow-gray-400 transition-shadow duration-300">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-syne font-bold text-slate-900 tracking-wide">
            Divye<span className="text-black"> Gautam</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activePanel === link.panel;
            return (
              <button
                key={link.panel}
                onClick={() => go(link.panel)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-250 ${
                  isActive
                    ? 'text-black'
                    : 'text-slate-500 hover:text-black'
                }`}
              >
                {/* Active pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.15)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}

          {/* Connect CTA */}
          <button
            onClick={() => go('vision')}
            className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-all duration-300 hover:shadow-gray-300"
          >
            Connect
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <button
                onClick={() => go('home')}
                className={`text-left text-sm font-medium py-3 border-b border-slate-50 transition-colors ${
                  activePanel === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.panel}
                  onClick={() => go(link.panel)}
                  className={`text-left text-sm font-medium py-3 border-b border-slate-50 transition-colors ${
                    activePanel === link.panel ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
