import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Compass, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/personalData';
import { useAudio } from '../components/AudioEngine';

interface HeroSectionProps {
  redAuraMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ redAuraMode }) => {
  const [identityStage, setIdentityStage] = useState<'manni' | 'manpreet' | 'starboy'>('manni');
  const [taglineIndex, setTaglineIndex] = useState<number>(0);
  const { playClickSound, playWhooshSound, isPlaying, playAudio } = useAudio();

  // Cycling identity transformation every few seconds if not manually clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setIdentityStage((prev) => {
        if (prev === 'manni') return 'manpreet';
        if (prev === 'manpreet') return 'starboy';
        return 'manni';
      });
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Tagline cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleStageClick = (stage: 'manni' | 'manpreet' | 'starboy') => {
    playWhooshSound();
    setIdentityStage(stage);
  };

  const handleScrollDown = () => {
    playClickSound();
    if (!isPlaying) playAudio();
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Top subtle coordinates & ambient status indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono text-white/50 tracking-widest uppercase"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-white/80">BASE: CHANDIGARH</span>
          <span className="hidden md:inline text-red-400 font-mono font-bold">• SUPER 60 (SVIET)</span>
        </div>
        <span className="text-white/20">/</span>
        <div className="flex items-center gap-1">
          <Radio className="w-3 h-3 text-red-500" />
          <span>DOSSIER: #STARBOY-404</span>
        </div>
        <span className="text-white/20 hidden sm:inline">/</span>
        <span className="hidden sm:inline text-white/40">BORN: 06.07.2008</span>
      </motion.div>

      {/* Main Center Identity Reveal Stage */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl my-auto py-8">
        {/* Stage switch pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-1 p-1 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          {(['manni', 'manpreet', 'starboy'] as const).map((stage) => {
            const isActive = identityStage === stage;
            const labelMap = {
              manni: '01. MANNI',
              manpreet: '02. MANPREET',
              starboy: '03. STARBOY'
            };
            return (
              <button
                key={stage}
                id={`btn-hero-identity-${stage}`}
                onClick={() => handleStageClick(stage)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {labelMap[stage]}
              </button>
            );
          })}
        </motion.div>

        {/* Morphing Giant Typography Hero */}
        <div className="relative min-h-[140px] sm:min-h-[220px] md:min-h-[280px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {identityStage === 'manni' && (
              <motion.div
                key="manni-view"
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.94 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-mono tracking-[0.3em] text-white/40 uppercase mb-2">
                  THE REAL-LIFE NICKNAME
                </span>
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-editorial font-extrabold tracking-tight text-white drop-shadow-2xl">
                  MANNI
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-white/60 font-body max-w-md">
                  Chill, independent, and comfortably observing the world.
                </p>
              </motion.div>
            )}

            {identityStage === 'manpreet' && (
              <motion.div
                key="manpreet-view"
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.94 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-mono tracking-[0.3em] text-red-500 uppercase mb-2">
                  THE PERSON OF INTEREST
                </span>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white drop-shadow-2xl">
                  MANPREET <span className="text-white/60 font-light">SINGH</span>
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-white/60 font-body max-w-md">
                  Grounded in Nagina roots, part of the Super 60 Community at SVIET Chandigarh, exploring psychology & music.
                </p>
              </motion.div>
            )}

            {identityStage === 'starboy' && (
              <motion.div
                key="starboy-view"
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.94 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-mono tracking-[0.35em] text-red-500 uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  THE DIGITAL UNIVERSE IDENTITY
                </span>
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-editorial font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-neutral-500 drop-shadow-[0_0_35px_rgba(220,38,38,0.35)]">
                  STARBOY
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-white/70 font-body max-w-lg">
                  Music obsession. Dark tailoring. Unfiltered curiosity and late-night thoughts.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Tagline Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 sm:mt-10 min-h-[32px] flex items-center justify-center"
        >
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light tracking-wide italic border-l-2 border-red-500 pl-4 py-0.5 text-left max-w-xl">
            “{PERSONAL_INFO.taglines[taglineIndex]}”
          </p>
        </motion.div>

        {/* Web tension line visual connecting hero to next section */}
        <div className="mt-8 flex justify-center items-center">
          <div className="w-px h-16 bg-gradient-to-b from-white/30 via-red-500/60 to-transparent" />
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
          ENTER IF YOU'RE CURIOUS
        </span>
        <button
          id="btn-hero-enter-scroll"
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll down into Starboy universe"
        >
          <div className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-red-500/60 transition-colors">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-red-500"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-red-400 group-hover:translate-y-1 transition-all" />
        </button>
      </motion.div>
    </section>
  );
};
