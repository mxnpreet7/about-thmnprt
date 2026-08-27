import React, { useState, useMemo, useEffect } from 'react';
import { Archive, Sparkles, Filter, ChevronRight, CheckCircle, HelpCircle, Search, X, Lock, Unlock, Zap, Terminal, Trophy, RefreshCw, Eye, ShieldAlert, Radio, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { STARBOY_ARCHIVE } from '../data/personalData';
import { ArchiveItem } from '../types';
import { useAudio } from '../components/AudioEngine';
import { Vault } from '../components/Vault';

export const ArchiveSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'game'>('grid');
  const [decryptedIndices, setDecryptedIndices] = useState<Set<number>>(new Set([0, 1, 2])); // initial teasers decrypted
  const [scanPulseIndex, setScanPulseIndex] = useState<number | null>(null);
  const [activeExpandedItem, setActiveExpandedItem] = useState<ArchiveItem | null>(null);
  
  const { playClickSound, playWhooshSound } = useAudio();

  const categories = useMemo(() => {
    return ['ALL', ...Array.from(new Set(STARBOY_ARCHIVE.map((i) => i.category)))];
  }, []);

  // Filter items by category & search keyword
  const filteredArchive = useMemo(() => {
    return STARBOY_ARCHIVE.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const catMatch = item.category.toLowerCase().includes(q);
      const titleMatch = item.title.toLowerCase().includes(q);
      const valueMatch = item.value.toLowerCase().includes(q);
      const traitMatch = item.personalityTrait.toLowerCase().includes(q);
      const notesMatch = item.notes?.toLowerCase().includes(q) || false;

      return catMatch || titleMatch || valueMatch || traitMatch || notesMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Game Decryption for a specific item
  const handleDecryptNode = (originalIndex: number) => {
    if (decryptedIndices.has(originalIndex)) return;

    playWhooshSound();
    setScanPulseIndex(originalIndex);

    setTimeout(() => {
      setDecryptedIndices((prev) => {
        const next = new Set(prev);
        next.add(originalIndex);
        
        // Milestone or full unlock confetti reward
        if (next.size === STARBOY_ARCHIVE.length || next.size % 5 === 0) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#DC2626', '#FFFFFF', '#000000', '#EF4444']
            });
          } catch {
            // Ignore if canvas unsupported
          }
        }
        return next;
      });
      setScanPulseIndex(null);
    }, 280);
  };

  // Game Action: Decrypt all nodes in sequence
  const handleDecryptAll = () => {
    playWhooshSound();
    const all = new Set(STARBOY_ARCHIVE.map((_, i) => i));
    setDecryptedIndices(all);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#FFFFFF', '#EF4444']
      });
    } catch {
      // Ignore
    }
  };

  // Game Action: Reset / Re-lock cipher
  const handleResetCipher = () => {
    playClickSound();
    setDecryptedIndices(new Set([0]));
  };

  // Game Action: Scan random locked node
  const handleScanRandom = () => {
    playWhooshSound();
    const locked = STARBOY_ARCHIVE.map((_, i) => i).filter((i) => !decryptedIndices.has(i));
    if (locked.length === 0) return;
    const rand = locked[Math.floor(Math.random() * locked.length)];
    handleDecryptNode(rand);
  };

  const traitMappings = [
    { source: "COMMUNITY & ACADEMICS", trait: "Elite Engineering Growth", desc: "Member of the Super 60 community at SVIET Chandigarh, building and learning alongside driven engineering peers." },
    { source: "SPORTS (F1, FOOTBALL, CRICKET)", trait: "Precision & Audacious Flair", desc: "Leclerc's qualifying laser focus, Neymar Jr. (Brazil) samba flair, and Shreyas Iyer (PBKS, India) clutch composure." },
    { source: "MUSIC", trait: "Emotion & Cinema", desc: "Turns routine moments into dramatic third-act cinematic sequences." },
    { source: "BOOKS", trait: "Deep Curiosity & Systems", desc: "Nonfiction frameworks that rewire internal habits and decision models." },
    { source: "FASHION", trait: "Self-Expression & Clarity", desc: "Monochrome editorial tailoring that removes visual noise and conveys effortless composure." },
    { source: "TRAVEL", trait: "Solitary Discovery", desc: "Exploring Amalfi, Kyoto, and Santorini alone to observe architecture and recharge autonomy." },
    { source: "PSYCHOLOGICAL STORIES", trait: "Understanding Human Motives", desc: "Analyzing cognitive motives, chess-like strategy, and nuanced anti-heroes." }
  ];

  const quickSearchTags = ["Super 60", "SVIET", "Shreyas Iyer", "PBKS", "Neymar", "Brazil", "Leclerc", "F1", "Starboy", "Obsidian", "Tailoring", "Kyoto"];

  const progressPercentage = Math.round((decryptedIndices.size / STARBOY_ARCHIVE.length) * 100);

  return (
    <section id="archive" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Archive className="w-3.5 h-3.5 text-red-500" />
          <span>VAULT OF PREFERENCES</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          THE STARBOY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-red-500">ARCHIVE</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          A definitive, transparent taxonomy of aesthetic choices, sports obsessions, media rotation, and why each preference connects directly to core character.
        </p>
      </div>

      {/* WHY I LIKE WHAT I LIKE: Trait Bridge Matrix */}
      <div className="mb-16 p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span>COGNITIVE NARRATIVE MAPPING</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
          Why I Like What I Like
        </h3>
        <p className="text-xs text-white/50 font-body mb-8 max-w-2xl">
          Nothing is random. Every aesthetic choice and interest is an outward reflection of an internal cognitive priority:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {traitMappings.map((tm) => (
            <div
              key={tm.source}
              className="p-5 rounded-2xl bg-black/50 border border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-red-400 uppercase tracking-wider mb-2">
                  <span>{tm.source}</span>
                  <span className="text-white/30 group-hover:text-red-400 transition-colors">→ TRAIT</span>
                </div>
                <h4 className="text-base font-bold font-display text-white">
                  {tm.trait}
                </h4>
                <p className="text-xs text-white/60 font-body mt-2 leading-relaxed">
                  {tm.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLASSIFIED VAULT INTERACTION & PUZZLE CHAMBERS */}
      <Vault />

      {/* INTERACTIVE SEARCH & FILTER CONTROLS */}
      <div className="mb-8 p-6 rounded-3xl bg-[#09090C] border border-white/10 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Keyword Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            <input
              id="archive-keyword-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vault (e.g. F1, Leclerc, Neymar, Books, Noir, Kyoto...)"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/70 border border-white/10 focus:border-red-500/80 text-white placeholder:text-white/30 text-xs sm:text-sm font-mono focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                id="btn-clear-archive-search"
                onClick={() => {
                  playClickSound();
                  setSearchQuery('');
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mode Switcher: Grid View vs Gamified Vault Cipher Game */}
          <div className="flex items-center gap-2 bg-black/80 p-1.5 rounded-2xl border border-white/10 self-start lg:self-center">
            <button
              id="btn-view-mode-grid"
              onClick={() => {
                playClickSound();
                setViewMode('grid');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/30'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>STANDARD GRID</span>
            </button>

            <button
              id="btn-view-mode-game"
              onClick={() => {
                playClickSound();
                setViewMode('game');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'game'
                  ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/30 animate-pulse'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              <span>CIPHER GAME MODE</span>
            </button>
          </div>
        </div>

        {/* Category Pills & Quick Filter Tags */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-red-400" />
              <span>FILTER BY TAXONOMY CATEGORY:</span>
            </span>
            <span>
              {filteredArchive.length} of {STARBOY_ARCHIVE.length} records matching
            </span>
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'ALL'
                ? STARBOY_ARCHIVE.length
                : STARBOY_ARCHIVE.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  id={`btn-archive-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600/30 text-red-300 border border-red-500 font-bold'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-red-500 text-white' : 'bg-white/10 text-white/40'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Suggestion Tags */}
          <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-white/40 pt-2 border-t border-white/5">
            <span className="text-white/30 text-[10px]">POPULAR:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playClickSound();
                  setSearchQuery(tag);
                }}
                className="px-2 py-0.5 rounded-md bg-black/50 hover:bg-white/10 hover:text-white text-white/50 text-[10px] transition-colors border border-white/5 cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GAMIFIED VAULT CIPHER TERMINAL (When Game Mode Active) */}
      {viewMode === 'game' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="mb-12 p-6 sm:p-10 rounded-3xl bg-[#060608] border-2 border-red-500/40 shadow-2xl relative overflow-hidden"
        >
          {/* Animated Matrix Radar Line Header */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 animate-pulse" />

          {/* Terminal Game HUD */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
                <Radio className="w-4 h-4 animate-spin-slow text-red-500" />
                <span>CLASSIFIED STARBOY CIPHER TERMINAL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                Vault Decryption Matrix
              </h3>
              <p className="text-xs text-white/60 font-mono mt-1">
                Click encrypted telemetry nodes below to decrypt and reveal classified persona traits.
              </p>
            </div>

            {/* Game Stats & Progress Gauge */}
            <div className="bg-black/80 p-4 rounded-2xl border border-red-500/30 flex flex-col gap-2 min-w-[240px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">DECRYPTION PROGRESS:</span>
                <span className="text-red-400 font-bold">{decryptedIndices.size} / {STARBOY_ARCHIVE.length} ({progressPercentage}%)</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {decryptedIndices.size === STARBOY_ARCHIVE.length && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold pt-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>ACCESS LEVEL 1 GRANTED • ALL SECRETS DECRYPTED</span>
                </div>
              )}
            </div>
          </div>

          {/* Game Quick Action Buttons */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button
              id="btn-cipher-scan-random"
              onClick={handleScanRandom}
              disabled={decryptedIndices.size === STARBOY_ARCHIVE.length}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SCAN NEXT NODE</span>
            </button>

            <button
              id="btn-cipher-decrypt-all"
              onClick={handleDecryptAll}
              className="px-3.5 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>HACK / DECRYPT ALL</span>
            </button>

            <button
              id="btn-cipher-reset"
              onClick={handleResetCipher}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RE-LOCK MATRIX</span>
            </button>
          </div>

          {/* Cipher Nodes Game Cards Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STARBOY_ARCHIVE.map((item, idx) => {
              const isDecrypted = decryptedIndices.has(idx);
              const isScanning = scanPulseIndex === idx;

              return (
                <div
                  key={`game-node-${idx}`}
                  id={`cipher-node-${idx}`}
                  onClick={() => handleDecryptNode(idx)}
                  className={`p-5 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer border ${
                    isDecrypted
                      ? 'bg-neutral-950/80 border-red-500/50 shadow-lg shadow-red-950/20'
                      : isScanning
                      ? 'bg-red-950/50 border-red-500 animate-pulse'
                      : 'bg-black/60 border-white/10 hover:border-red-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                      <span className="text-white/40">
                        NODE #{String(idx + 1).padStart(2, '0')}
                      </span>
                      {isDecrypted ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-[9px] bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <Unlock className="w-2.5 h-2.5" /> DECRYPTED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-[9px] bg-red-950/50 px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                          <Lock className="w-2.5 h-2.5" /> ENCRYPTED
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                      {item.category}
                    </div>

                    {isDecrypted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1"
                      >
                        <h4 className="text-lg font-display font-bold text-white">
                          {item.value}
                        </h4>
                      </motion.div>
                    ) : (
                      <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-white/30 tracking-widest">
                        ● ● ● ● ● ● ● [CLICK TO REVEAL]
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 text-xs font-body">
                    {isDecrypted ? (
                      <div className="text-white/70">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">
                          RESONANCE:
                        </span>
                        <p className="mt-0.5 text-neutral-300">
                          {item.personalityTrait}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-red-500" /> Tap node to decrypt telemetry
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* STANDARD VAULT ARCHIVE GRID (Filtered results) */}
      {viewMode === 'grid' && (
        <div>
          {filteredArchive.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-black/40 border border-white/10">
              <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h4 className="text-xl font-display font-bold text-white">
                No matching vault items found
              </h4>
              <p className="text-xs text-white/50 font-mono mt-1">
                Try searching for "F1", "Leclerc", "Neymar", "Music", or clear the search filter.
              </p>
              <button
                onClick={() => {
                  playClickSound();
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white font-mono text-xs font-bold cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredArchive.map((item, idx) => (
                  <motion.div
                    key={item.category + item.title + idx}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-red-950/20"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                        <span className="text-red-400 font-bold uppercase tracking-widest bg-red-950/40 px-2.5 py-0.5 rounded-full border border-red-500/30">
                          {item.category}
                        </span>
                        <span className="text-white/40 text-[9px] font-mono">
                          {item.title}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-display font-bold text-white mt-2 group-hover:text-red-200 transition-colors">
                        {item.value}
                      </h4>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 text-xs text-white/70 font-body space-y-2">
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase block">
                          PERSONALITY TRAIT:
                        </span>
                        <p className="mt-0.5 text-neutral-300 leading-relaxed">
                          {item.personalityTrait}
                        </p>
                      </div>

                      {item.notes && (
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[9px] font-mono text-red-400/80 uppercase block">
                            ARCHIVE CONTEXT:
                          </span>
                          <p className="text-[11px] text-white/50 font-mono mt-0.5">
                            {item.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
