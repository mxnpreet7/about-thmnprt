import React, { useState } from 'react';
import { Feather, Clock, Calendar, ArrowUpRight, X, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/personalData';
import { BlogPost } from '../types';
import { useAudio } from '../components/AudioEngine';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { playClickSound, playWhooshSound } = useAudio();

  const handleOpenPost = (post: BlogPost) => {
    playWhooshSound();
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    playClickSound();
    setSelectedPost(null);
  };

  return (
    <section id="notes" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Feather className="w-3.5 h-3.5 text-red-500" />
          <span>EDITORIAL ESSAYS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          STARBOY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-red-400">NOTES</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Unfiltered thoughts on solitude, aesthetics, music, and the psychology of navigating modern life quietly.
        </p>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => handleOpenPost(post)}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-3">
                <span className="text-red-400 font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-red-300 transition-colors">
                {post.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 group-hover:text-white">
              <span>READ FULL ESSAY</span>
              <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Essay Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div
            id="modal-essay-reader"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#0C0C0F] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto"
            >
              {/* Close Button */}
              <button
                id="btn-close-essay-modal"
                onClick={handleClosePost}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close reading view"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="pr-12">
                <div className="flex items-center gap-3 text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
                  <span>{selectedPost.category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">{selectedPost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-white leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="text-xs font-mono text-white/40 mt-2">
                  Published: {selectedPost.date} by Manni (Starboy)
                </div>
              </div>

              <div className="h-px bg-white/10 my-6" />

              {/* Essay Body Content */}
              <div className="space-y-4 text-sm sm:text-base font-body text-neutral-200 leading-relaxed font-light">
                {selectedPost.content.map((p, i) => (
                  <p key={i} className="leading-7">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>STARBOY EDITORIAL ARCHIVE</span>
                <span className="text-red-400">#NOTE-{selectedPost.id.toUpperCase()}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
