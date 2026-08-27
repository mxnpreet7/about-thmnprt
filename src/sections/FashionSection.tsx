import React, { useState } from 'react';
import { Sparkles, Shirt, Layers, Watch, Compass, Footprints, Activity, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WARDROBE_ITEMS } from '../data/personalData';
import { WardrobeItem } from '../types';
import { useAudio } from '../components/AudioEngine';

export const FashionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeItem, setActiveItem] = useState<WardrobeItem | null>(WARDROBE_ITEMS[0]);
  const { playClickSound } = useAudio();

  const categories = ['ALL', 'SWEATERS', 'POLOS', 'GURKHA PANTS', 'TROUSERS', 'FORMAL SHOES', 'SNEAKERS', 'ACCESSORIES'];

  const filteredItems = selectedCategory === 'ALL'
    ? WARDROBE_ITEMS
    : WARDROBE_ITEMS.filter((item) => item.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    playClickSound();
    setSelectedCategory(cat);
  };

  const handleItemClick = (item: WardrobeItem) => {
    playClickSound();
    setActiveItem(item);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shirt': return <Shirt className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      default: return <Shirt className="w-5 h-5" />;
    }
  };

  return (
    <section id="fashion" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>EDITORIAL SARTORIAL ARCHIVE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          DRESS CODE: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-red-500">STARBOY</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Minimal. Versatile. Old-money influenced tailoring. Obsidian silhouettes designed to withstand any setting.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`btn-fashion-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => handleCategorySelect(cat)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/30'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Digital Wardrobe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredItems.map((item) => {
          const isSelected = activeItem?.id === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={() => handleItemClick(item)}
              className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 relative group overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0E0E12] border-2 border-red-500/80 shadow-2xl shadow-red-950/40'
                  : 'glass-panel border border-white/10 hover:border-white/25'
              }`}
            >
              {/* Top Bar */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-3">
                  <span className="text-red-400 font-bold uppercase">{item.category}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/10 font-mono">
                    {item.vibe}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-red-400">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-red-300 transition-colors">
                      {item.name}
                    </h4>
                    <div className="text-[11px] font-mono text-white/40">
                      Material: {item.material}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 font-body leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              {/* Sarcastic Fashion Commentary */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs italic text-red-300/90 font-editorial">
                  “{item.sarcasticQuote}”
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sartorial Philosophy Banner */}
      <div className="p-8 rounded-3xl bg-black/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
            THE UNWRITTEN RULE
          </span>
          <h3 className="text-2xl font-display font-bold text-white mt-1">
            “Fit over hype. Posture over logos. Black over everything.”
          </h3>
          <p className="text-xs text-white/50 mt-1 max-w-lg">
            No billboard branding, no fluorescent distractions. True presence comes from structural tailoring and absolute comfort in your own skin.
          </p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/80 shrink-0">
          PALETTE: #000000 / CHARCOAL / SILVER
        </div>
      </div>
    </section>
  );
};
