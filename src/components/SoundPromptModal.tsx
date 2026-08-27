import React from 'react';
import { Volume2, VolumeX, Sparkles, Disc, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { useAudio } from './AudioEngine';

interface SoundPromptModalProps {
  onDismiss: () => void;
}

export const SoundPromptModal: React.FC<SoundPromptModalProps> = ({ onDismiss }) => {
  const { playAudio, setHasInteracted, playClickSound, isInstagramBrowser } = useAudio();

  const handleEnterWithSound = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    playAudio();
    onDismiss();
  };

  const handleEnterMuted = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    setHasInteracted(true);
    playClickSound();
    onDismiss();
  };

  return (
    <div
      id="sound-entry-prompt-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#0A0A0D] border border-red-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(220,38,38,0.25)] overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Monogram */}
        <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center mb-4">
          <Disc className="w-6 h-6 animate-spin-slow" />
        </div>

        <span className="text-[10px] font-mono tracking-[0.3em] text-red-500 uppercase block mb-1">
          CINEMATIC SOUNDTRACK
        </span>

        <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-tight">
          ENTER WITH SOUND?
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
          {isInstagramBrowser
            ? "Optimized for Instagram Bio view. Tap below to start the atmospheric soundtrack."
            : "For the optimal experience, explore with the official signature soundtrack."}
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col gap-3">
          <button
            id="btn-sound-prompt-enter-with-audio"
            onClick={handleEnterWithSound}
            onTouchEnd={handleEnterWithSound}
            className="w-full py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <Volume2 className="w-4 h-4" />
            <span>PLAY AFTER HOURS SOUNDTRACK</span>
          </button>

          <button
            id="btn-sound-prompt-enter-muted"
            onClick={handleEnterMuted}
            className="w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white/60 hover:text-white font-mono text-xs tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <VolumeX className="w-4 h-4" />
            <span>EXPLORE IN SILENCE</span>
          </button>
        </div>

        <div className="mt-5 text-[10px] font-mono text-white/40 flex items-center justify-center gap-1.5">
          <Radio className="w-3 h-3 text-red-500" />
          <span>Tap vinyl dock anytime to control audio</span>
        </div>
      </motion.div>
    </div>
  );
};

