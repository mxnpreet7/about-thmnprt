import React, { useState } from 'react';
import { BookOpen, Star, Sparkles, BookMarked, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BOOKS_DATA } from '../data/personalData';
import { Book } from '../types';
import { useAudio } from '../components/AudioEngine';

export const BooksSection: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS_DATA[0]);
  const { playClickSound, playWhooshSound } = useAudio();

  const handleBookToggle = () => {
    playWhooshSound();
    setIsBookOpen(!isBookOpen);
  };

  const handleBookCardClick = (book: Book) => {
    playClickSound();
    setSelectedBook(book);
  };

  return (
    <section id="books" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5 text-red-500" />
          <span>LITERARY ANCHORS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          BOOKS THAT REWIRED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-red-400">MY THINKING.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Nonfiction as cognitive architecture. Reading not for decoration, but to understand human behavior and master solitary focus.
        </p>
      </div>

      {/* Featured Masterpiece: The Art of Being Alone (3D Book Display) */}
      <div className="relative mb-20 p-6 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e0e12] via-[#09090b] to-[#040405] border border-white/10 shadow-2xl overflow-hidden">
        {/* Ambient red accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Interactive Book Preview Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="relative perspective-1000 cursor-pointer group"
              onClick={handleBookToggle}
              title="Click to inspect 3D Book view"
            >
              <motion.div
                animate={{ rotateY: isBookOpen ? -25 : -8, rotateX: 6 }}
                whileHover={{ rotateY: -15, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-56 h-80 sm:w-64 sm:h-92 rounded-r-2xl rounded-l-md bg-gradient-to-tr from-[#121214] via-[#1A1A1E] to-[#26262B] p-6 shadow-[20px_20px_50px_rgba(0,0,0,0.9)] border-r-2 border-t border-b border-white/15 flex flex-col justify-between relative transform-style-3d overflow-hidden"
              >
                {/* Book Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/80 to-transparent border-r border-white/10" />

                {/* Top Badge */}
                <div className="pl-4">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-red-400 uppercase">
                    FEATURED TEXT
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Book Title Typography */}
                <div className="pl-4 my-auto">
                  <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white leading-tight">
                    The Art of <br />
                    <span className="text-red-400">Being Alone</span>
                  </h3>
                  <p className="text-[11px] font-mono text-white/50 mt-2">
                    Solitude & Self-Mastery
                  </p>
                </div>

                {/* Bottom Quote & Action */}
                <div className="pl-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40">5.0 / 5.0 RATING</span>
                  <span className="text-[10px] font-mono text-red-400 group-hover:underline">
                    {isBookOpen ? "FOLD BOOK" : "OPEN 3D VIEW"}
                  </span>
                </div>
              </motion.div>
            </div>

            <p className="mt-4 text-xs font-mono text-white/40 text-center">
              [CLICK BOOK TO TOGGLE 3D PERSPECTIVE]
            </p>
          </div>

          {/* Core Solitude Philosophical Reflection */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BOOK THAT CHANGED MY PERSPECTIVE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Why Solitude Is A Superpower, Not Isolation.
            </h3>

            <blockquote className="mt-4 p-4 rounded-xl bg-black/40 border-l-2 border-red-500 text-sm italic text-white/80 font-editorial">
              “{BOOKS_DATA[0].quote}”
            </blockquote>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
              <p>
                Society often treats spending time alone as a problem to be solved. If you aren't constantly socializing, people assume you are either sad or anti-social.
              </p>
              <p>
                This book permanently changed how I see quiet time. Being comfortable in your own presence gives you unconditional clarity:
              </p>
            </div>

            {/* Core Solitude Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {[
                { title: "Self-Reflection", desc: "Understanding motives without external peer interference." },
                { title: "Genuine Independence", desc: "Never settling for shallow company out of fear of quiet." },
                { title: "Deep Focus", desc: "Discovering interests, books, and music on your own terms." },
                { title: "Quiet Confidence", desc: "Being comfortable with who you are behind closed doors." }
              ].map((pillar) => (
                <div key={pillar.title} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{pillar.title}</div>
                    <div className="text-[11px] text-white/50">{pillar.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Books Grid */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
          COMPLETE READING ARCHIVE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BOOKS_DATA.map((book) => {
            const isCurrent = selectedBook.id === book.id;
            return (
              <div
                key={book.id}
                onClick={() => handleBookCardClick(book)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-neutral-900 border-2 border-red-500/60 shadow-xl'
                    : 'glass-panel border border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-2">
                    <span>{book.category}</span>
                    {book.rating > 0 ? (
                      <span className="text-amber-400 font-bold">★ {book.rating}.0</span>
                    ) : (
                      <span className="text-red-400 font-bold uppercase">NEXT UP</span>
                    )}
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">
                    {book.title}
                  </h4>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    {book.author}
                  </p>
                  <p className="text-xs text-neutral-300 font-body mt-3 leading-relaxed">
                    {book.importance}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span className="font-mono text-[11px]">
                    {book.isPlaceholder ? "Queue Position: 03" : "Core Archive"}
                  </span>
                  <BookMarked className={`w-4 h-4 ${isCurrent ? 'text-red-400' : 'text-white/40'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
