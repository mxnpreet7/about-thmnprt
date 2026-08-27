import React from 'react';
import { Smile, BatteryCharging, Sparkles, Heart, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CHILL_STATUS_CARDS, PERSONAL_INFO } from '../data/personalData';

export const ChillGuySection: React.FC = () => {
  return (
    <section id="status" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Smile className="w-3.5 h-3.5 text-red-500" />
          <span>REAL-TIME TELEMETRY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          CURRENT STATUS: <span className="text-red-500">CHILL.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Refusing to overcomplicate life. Operating on high curiosity, great music, and an unbothered calm frequency.
        </p>
      </div>

      {/* Real-time Status Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {CHILL_STATUS_CARDS.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                <span className="text-white/40 tracking-wider uppercase">{card.title}</span>
                <span className="text-[9px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded-full border border-red-500/30">
                  {card.badge}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {card.value}
              </h3>
              <p className="text-xs text-neutral-300 font-body leading-relaxed">
                {card.subtext}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>LIVE FREQUENCY ACTIVE</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* WHAT KEEPS ME GROUNDED — Subtle Faith & Perspective Card */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0C0C0F] via-[#09090C] to-[#120B0D] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
            <Heart className="w-3.5 h-3.5 text-red-500" />
            <span>INNER FOUNDATION</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            What Keeps Me Grounded
          </h3>

          <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
            Behind the digital aesthetic, curiosity, and sarcastic humor, I believe in God and maintain a quiet sense of gratitude for each day.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
            Faith isn't something to advertise loudly or lecture people about. For me, it is a quiet internal anchor that keeps ego in check, brings peace in uncertain moments, and reminds me that life is much bigger than any single plan.
          </p>

          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Quiet Faith • Humility • Genuine Happiness</span>
          </div>
        </div>
      </div>
    </section>
  );
};
