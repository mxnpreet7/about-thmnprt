import React, { useEffect } from 'react';
import { Sparkles, Terminal, X, ShieldAlert, Key, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useAudio } from './AudioEngine';

interface EasterEggModalProps {
  onClose: () => void;
  onToggleRedAura: () => void;
  redAuraMode: boolean;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  onClose,
  onToggleRedAura,
  redAuraMode
}) => {
  const { playClickSound, playWhooshSound } = useAudio();

  useEffect(() => {
    // Fire crimson / silver confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#FFFFFF', '#1A1A1A', '#EF4444']
      });
    } catch {
      // Ignore if canvas unsupported
    }
  }, []);

  return (
    <div
      id="modal-easter-egg"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-[#09090C] border-2 border-red-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(220,38,38,0.4)] text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
          <Terminal className="w-4 h-4" />
          <span>CLASSIFIED PROTOCOL UNLOCKED</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          STARBOY LEVEL 404
        </h3>

        <div className="mt-4 p-4 rounded-2xl bg-black/80 border border-red-500/30 font-case text-xs text-neutral-300 space-y-2">
          <p className="text-red-400 font-bold">
            &gt; CONGRATULATIONS: You found the hidden node.
          </p>
          <p>
            &gt; “The world doesn't need another loud voice. It needs people who are comfortable enough with themselves to create quietly and think deeply.”
          </p>
          <p className="text-white/50 text-[11px]">
            &gt; ACCESS TOKEN: 06-JULY-2008 // CHANDIGARH-GRID
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              playClickSound();
              onToggleRedAura();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
          >
            <Zap className="w-4 h-4" />
            <span>{redAuraMode ? "DISABLE AURA MODE" : "ACTIVATE RED AURA MODE"}</span>
          </button>

          <span className="text-[10px] font-mono text-white/40">
            [TRIGGERED VIA LOGO OR KEY CODE]
          </span>
        </div>
      </motion.div>
    </div>
  );
};
