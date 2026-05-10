// src/App.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import IntroSection from './components/IntroSection';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import MyJourneySection from './components/MyJourneySection';
import Footer from './components/Footer';

const panelVariants = {
  initial: { opacity: 0, y: 24, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, scale: 0.99, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

export default function App() {
  const [active, setActive] = useState('home');

  const navigate = (panel) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setActive(panel), 80); // let scroll settle first
  };

  const panels = {
    home: (
      <>
        <IntroSection />
        <HeroSection onNavigate={navigate} />
      </>
    ),
    timeline: <TimelineSection standalone />,
    journey: <MyJourneySection standalone />,
  };

  return (
    <div className="relative min-h-screen" style={{ background: '#ffffff' }}>
      <CustomCursor />
      <ScrollProgress />
      <Navbar activePanel={active} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {panels[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
