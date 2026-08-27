import React, { useState } from 'react';
import { Compass, MapPin, Navigation, Sparkles, Music, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRAVEL_DESTINATIONS } from '../data/personalData';
import { TravelDestination } from '../types';
import { useAudio } from '../components/AudioEngine';

export const TravelSection: React.FC = () => {
  const [activeDest, setActiveDest] = useState<TravelDestination>(TRAVEL_DESTINATIONS[0]);
  const { playClickSound } = useAudio();

  const handleSelect = (dest: TravelDestination) => {
    playClickSound();
    setActiveDest(dest);
  };

  return (
    <section id="travel" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Compass className="w-3.5 h-3.5 text-red-500" />
          <span>SOLITARY GEOGRAPHY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          SOLO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-red-400">EXPLORATIONS</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Exploring places on your own terms. Wandering unfamiliar streets with headphones, observing architecture and quiet corners unhurried.
        </p>
      </div>

      {/* Map Grid Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Destinations List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 px-1">
            LOCATION NODES
          </div>

          {TRAVEL_DESTINATIONS.map((dest) => {
            const isSelected = activeDest.id === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => handleSelect(dest)}
                className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-2 border-red-500 shadow-lg shadow-red-950/40'
                    : 'glass-panel border border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-red-600 text-white' : 'bg-white/5 text-white/60'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                      {dest.badge}
                    </div>
                    <h4 className="text-base sm:text-lg font-display font-bold text-white">
                      {dest.name}
                    </h4>
                    <span className="text-[11px] font-mono text-white/40">
                      {dest.stateOrCountry}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 text-white/40 transition-transform ${isSelected ? 'text-red-400 translate-x-1' : ''}`} />
              </div>
            );
          })}
        </div>

        {/* Cinematic Destination Detail Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#0B0B0E] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono text-red-400 uppercase tracking-widest pb-4 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-red-500" />
                  {activeDest.badge}
                </span>
                <span className="text-white/40">{activeDest.coordinates}</span>
              </div>

              <div className="mt-6">
                <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                  {activeDest.name}
                </h3>
                <div className="text-sm font-mono text-white/50 mt-0.5">
                  {activeDest.stateOrCountry}
                </div>

                <p className="mt-4 text-sm text-neutral-300 font-body leading-relaxed">
                  {activeDest.description}
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40 uppercase">ATMOSPHERE & VIBE:</span>
                    <span className="text-white/90 font-medium">{activeDest.vibe}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/5">
                    <span className="text-white/40 uppercase flex items-center gap-1">
                      <Music className="w-3 h-3 text-red-400" /> RECOMMENDED SOUNDTRACK:
                    </span>
                    <span className="text-red-400">{activeDest.soundtrack}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
