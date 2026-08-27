import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONALITY_STATEMENTS, PERSONALITY_SLIDERS } from '../data/personalData';
import { useAudio } from '../components/AudioEngine';

export const RevealSection: React.FC = () => {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PERSONALITY_SLIDERS.forEach((s) => {
      initial[s.id] = s.defaultValue;
    });
    return initial;
  });

  const { playClickSound } = useAudio();

  const handleSliderChange = (id: string, val: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleResetSliders = () => {
    playClickSound();
    const reset: Record<string, number> = {};
    PERSONALITY_SLIDERS.forEach((s) => {
      reset[s.id] = s.defaultValue;
    });
    setSliderValues(reset);
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3 text-red-500" />
          <span>DECODING THE IDENTITY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          WHO IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-red-500">STARBOY?</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/50 max-w-xl font-body">
          A progressive glimpse into the mind, habits, humor, and quiet philosophy behind the handle.
        </p>
      </div>

      {/* Kinetic Personality Statements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-24">
        {PERSONALITY_STATEMENTS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover overflow-hidden flex items-start gap-4"
          >
            {/* Number Tag */}
            <span className="font-mono text-xs text-red-500/70 font-semibold mt-1">
              {String(idx + 1).padStart(2, '0')}
            </span>

            <div className="flex-1">
              <p className="text-base sm:text-lg md:text-xl font-display font-medium text-white/90 group-hover:text-white transition-colors">
                “{item.text}”
              </p>
            </div>

            {/* Subtle background red indicator */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* STARBOY SETTINGS — Interactive Control Deck */}
      <div id="starboy-settings-deck" className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest">
              <Sliders className="w-4 h-4 text-red-500" />
              <span>SYSTEM CALIBRATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              STARBOY SETTINGS
            </h3>
            <p className="text-xs text-white/50 font-body mt-0.5">
              Interactive personality coefficients. Adjust the parameters to observe system reactions.
            </p>
          </div>

          <button
            id="btn-reset-sliders"
            onClick={handleResetSliders}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET DEFAULTS</span>
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PERSONALITY_SLIDERS.map((slider) => {
            const currentVal = sliderValues[slider.id] ?? slider.defaultValue;
            return (
              <div
                key={slider.id}
                className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-red-500/20 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/90 font-semibold tracking-wider">
                    {slider.label}
                  </span>
                  <span className="text-red-400 font-bold">
                    {currentVal}%
                  </span>
                </div>

                {/* Slider bar */}
                <input
                  id={`slider-${slider.id}`}
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  value={currentVal}
                  onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                  aria-label={slider.label}
                />

                <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>{slider.lowLabel}</span>
                  <span>{slider.highLabel}</span>
                </div>

                <p className="text-xs text-neutral-300 font-light mt-1 italic">
                  {currentVal > 80
                    ? slider.comment
                    : currentVal < 30
                    ? `Warning: Low ${slider.label.toLowerCase()} might cause excessive sleep.`
                    : `Balanced calibration: Functioning normally.`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
