import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX, ArrowUp } from 'lucide-react';

const sectionsData = [
  {
    id: 'hero',
    title: 'My Journey',
    subtitle: 'From self-doubt to self-belief.',
    align: 'center',
    bgImage: '',
    bgGradient: 'radial-gradient(circle at center, #111827 0%, #000000 100%)',
  },
  {
    id: 'beginning',
    title: 'Every City Has Expectations',
    align: 'left',
    content: (
      <div className="space-y-6 text-slate-200 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl">
        <p>Kota expected me to study.</p>
        <p className="text-slate-400">Life expected me to follow the same path as everyone else.</p>
        <p>But I was distracted. Lost. Unfocused.</p>
        <p className="text-slate-400">At least, that’s what everyone thought.</p>
        <p>Because while everyone was seeing a failure, I was still discovering who I wanted to become.</p>
      </div>
    ),
    bgImage: '/notebook_scan.png',
  },
  {
    id: 'football',
    title: 'Football Saved Me',
    align: 'left',
    content: (
      <div className="space-y-6 text-slate-200 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl">
        <p>When studies made me feel small, football gave me confidence.</p>
        <p className="text-slate-400">It was the only place where I felt respected.</p>
        <p>The only place where effort mattered more than marks.</p>
        <p className="text-slate-400">And for the first time in my life, I felt like I was actually good at something.</p>
      </div>
    ),
    bgImage: '/football.jpg',
  },
  {
    id: 'turning-point',
    title: 'The Turning Point',
    align: 'center',
    content: (
      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="space-y-6 text-slate-300 text-xl md:text-3xl max-w-3xl text-center drop-shadow-lg">
          <p>People thought I would never succeed. Friends and relatives doubted me.</p>
          <p>But those doubts lit a fire inside me. I decided to prove everyone wrong.</p>
        </div>
        <div className="relative group w-full max-w-4xl py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
          <p className="relative z-10 font-syne italic text-3xl md:text-5xl lg:text-6xl text-white text-center leading-tight">
            "Aim for the moon. Even if you miss, you may land among the stars."
          </p>
        </div>
      </div>
    ),
    bgImage: '/turning_point.jpg',
  },
  {
    id: 'jee',
    title: 'The Grind Nobody Saw',
    align: 'left',
    content: (
      <div className="space-y-6 text-slate-200 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl">
        <p>The world only notices results.</p>
        <p className="text-slate-400">Nobody sees the silent nights, the breakdowns, the pressure, the fear of disappointing everyone.</p>
        <p>For two years, my entire world became preparation.</p>
      </div>
    ),
    bgImage: '/study_table.jpg',
  },
  {
    id: 'failure',
    title: 'The Hardest Day of My Life',
    align: 'center',
    content: (
      <div className="space-y-6 text-slate-300 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl text-center mx-auto">
        <p>Some failures don’t break your marks.</p>
        <p className="text-slate-400">They break your confidence.</p>
        <p>That result made me question everything my effort, my abilities, even myself.</p>
        <p className="text-slate-400">For a while, I truly believed I wasn’t enough.</p>
      </div>
    ),
    bgGradient: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
  },
  {
    id: 'comeback',
    title: "But Failure Wasn't The End",
    align: 'left',
    content: (
      <div className="space-y-6 text-slate-200 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl">
        <p>I got into college. I secured a 15k rank.</p>
        <p className="text-slate-400">When I saw the pride on my father's face, I realized:</p>
        <p>I didn’t get the dream I imagined.</p>
        <p className="text-slate-400">But I got something more important:</p>
        <p>Perspective. Discipline. Resilience.</p>
        <p className="text-slate-400">And somewhere along the way,</p>
        <p>I realized growth matters more than perfection.</p>
      </div>
    ),
    bgImage: '/college.jpg',
  },
  {
    id: 'ending',
    title: "I'm Still Writing My Story",
    align: 'left',
    content: (
      <div className="space-y-6 text-slate-200 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-2xl max-w-4xl">
        <p>This isn't a success story yet.</p>
        <p className="text-slate-400">It's a becoming story.</p>
        <p>And honestly?</p>
        <p className="text-slate-400">I'm just getting started.</p>
      </div>
    ),
    bgImage: '/group_photo.jpg',
  },
];

function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 1.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [null, Math.random() * 0.8 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function Section({ section, index, containerRef }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  // Make the text visible when the section is in view.
  // 0 is when it enters from bottom, 0.5 is center, 1 is when it leaves top
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      ref={ref}
      id={section.id}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden snap-start snap-always"
      style={{
        background: section.bgGradient || '#000',
      }}
    >
      {/* Background Image with Parallax */}
      {section.bgImage && (
        <motion.div
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url(${section.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: yBg,
            filter: 'contrast(1.2) brightness(0.8)',
          }}
        />
      )}

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Film Grain Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <AmbientParticles />

      {/* Content */}
      <motion.div
        className={`relative z-10 flex flex-col h-full justify-center px-6 md:px-20 w-full max-w-7xl mx-auto ${section.align === 'center' ? 'items-center text-center' : 'items-start text-left'
          }`}
        style={{ opacity: opacityText, y: yText }}
      >
        <h2 className={`font-syne font-black text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 drop-shadow-2xl ${section.id === 'hero' ? 'uppercase tracking-widest text-center w-full' : ''
          }`}>
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="text-2xl md:text-4xl text-slate-400 font-light tracking-wide w-full">
            {section.subtitle}
          </p>
        )}

        {section.content && (
          <div className="mt-8 w-full">
            {section.content}
          </div>
        )}
      </motion.div>

      {/* Scroll Indicator (Only on Hero) */}
      {section.id === 'hero' && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase font-mono-custom">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      )}
    </section>
  );
}

export default function MyJourneySection({ standalone = false }) {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="bg-black text-white w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
      {sectionsData.map((section, index) => (
        <Section key={section.id} section={section} index={index} containerRef={containerRef} />
      ))}

      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} src="/ambient.mp3" loop />

      {/* Controls Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Back to Top Button */}
        <button
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-xl flex items-center justify-center cursor-none"
          title="Back to Top"
        >
          <ArrowUp size={24} />
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-xl flex items-center justify-center cursor-none"
          title="Toggle Ambient Sound"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </div>
  );
}
