import React, { useState } from 'react';
import { Disc, Play, Pause, Headphones, Radio, Volume2, Sparkles, ChevronRight, Music2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTISTS_DATA, PERSONAL_INFO } from '../data/personalData';
import { Artist } from '../types';
import { useAudio } from '../components/AudioEngine';

export const MusicSection: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(ARTISTS_DATA[0]);
  const { isPlaying, togglePlay, setShowPlayerModal, playClickSound } = useAudio();

  const handleArtistSelect = (artist: Artist) => {
    playClickSound();
    setSelectedArtist(artist);
  };

  return (
    <section id="music" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Headphones className="w-3.5 h-3.5 text-red-500" />
          <span>PRIMARY OBSESSION</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-tight">
          LIFE, BUT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400">HEADPHONES.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-body">
          Music isn't background ambiance — it's the emotional grading system that gives everyday life its cinematic weight.
        </p>
      </div>

      {/* Starboy Featured Vinyl Deck */}
      <div className="relative mb-20 p-6 sm:p-10 rounded-3xl glass-panel border border-red-500/30 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vinyl Visualizer Turntable */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Spinning Vinyl */}
              <div
                className={`w-full h-full rounded-full bg-[#08080A] border-4 border-neutral-800 flex items-center justify-center shadow-2xl transition-transform duration-700 ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                style={{
                  backgroundImage: `radial-gradient(circle, #1a1a1e 10%, #050505 40%, #151518 70%, #000 100%)`
                }}
              >
                {/* Vinyl Grooves rings */}
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                <div className="absolute inset-16 rounded-full border border-white/10" />

                {/* Center Label */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-red-800 to-black border-2 border-red-500 flex flex-col items-center justify-center text-center p-1">
                  <span className="text-[8px] font-mono text-red-300 font-bold uppercase">STARBOY</span>
                  <span className="text-[7px] text-white/50">THE WEEKND</span>
                  <div className="w-2 h-2 rounded-full bg-black mt-1" />
                </div>
              </div>

              {/* Tonearm graphic */}
              <div
                className={`absolute top-0 right-2 w-20 h-28 origin-top-right transition-transform duration-500 pointer-events-none ${
                  isPlaying ? 'rotate-12' : '-rotate-12'
                }`}
              >
                <div className="w-1.5 h-20 bg-neutral-400 rounded-full shadow-md mx-auto" />
                <div className="w-4 h-3 bg-red-600 rounded-sm mx-auto shadow" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                id="btn-music-section-play"
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "PAUSE ATMOSPHERE" : "PLAY ATMOSPHERE"}</span>
              </button>

              <button
                id="btn-music-open-youtube"
                onClick={() => setShowPlayerModal(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                title="Open Official Video Modal"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Anthem Story & Audio Data */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CORE IDENTITY ANTHEM</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              {PERSONAL_INFO.audioTrack.title}
            </h3>
            <div className="text-sm font-mono text-white/60 mt-1">
              {PERSONAL_INFO.audioTrack.artist} • {PERSONAL_INFO.audioTrack.tempo}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
              The signature track powering the atmosphere. A dreamy, romantic blend of gentle indie chords, warm bedroom-pop melancholy, and Yung Kai's soothing late-night vocals.
            </p>

            {/* Sound Waveform Visualization */}
            <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-red-500' : 'bg-white/20'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(6, Math.sin(i * 0.4 + Date.now() * 0.003) * 28 + 12)}px`
                      : `${(i % 5) * 4 + 4}px`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Artists Showcase */}
      <div className="mb-8">
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
          HOLY TRINITY • THE ARCHIVED ARTISTS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARTISTS_DATA.map((artist) => {
            const isSelected = selectedArtist?.id === artist.id;
            return (
              <button
                key={artist.id}
                id={`btn-artist-${artist.id}`}
                onClick={() => handleArtistSelect(artist)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-2 border-red-500/70 shadow-xl shadow-red-950/30'
                    : 'glass-panel border border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    <span>{artist.genre.split('/')[0]}</span>
                    {isSelected && <span className="text-red-400 font-bold">SELECTED</span>}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {artist.name}
                  </h4>
                  <p className="text-xs text-red-400 font-mono mt-1">
                    {artist.mood}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>Explore Artist Profile</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-red-400' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Artist Deep Dive Drawer */}
      {selectedArtist && (
        <motion.div
          key={selectedArtist.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0B0B0E] border border-white/10 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
                PERSONAL CURATION
              </span>
              <h3 className="text-3xl font-display font-bold text-white mt-1">
                Why I Connect With {selectedArtist.name}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                {selectedArtist.personalNote}
              </p>
              
              <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/5">
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                  OPTIMAL LISTENING ENVIRONMENT
                </span>
                <span className="text-xs text-white/80 font-mono">
                  {selectedArtist.bestTime}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                NOTABLE ROTATION TRACKS
              </span>
              <div className="space-y-2">
                {selectedArtist.topTracks.map((track, idx) => (
                  <div
                    key={track}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-red-500 font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium text-white/90">
                        {track}
                      </span>
                    </div>
                    <Music2 className="w-3.5 h-3.5 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Apple Music Hub Card */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-red-500/30 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#FC3C44] to-[#F94C57] text-white shadow-xl shadow-red-500/20 shrink-0">
            <Music2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider font-bold">
                STREAMING PROFILE
              </span>
              <span className="text-[9px] font-mono bg-white/10 text-white/80 px-2 py-0.5 rounded-full">
                APPLE MUSIC
              </span>
            </div>
            <h4 className="text-2xl font-display font-bold text-white mt-0.5">
              Manni's Playlists on Apple Music
            </h4>
            <p className="text-xs text-white/60 font-body mt-1 max-w-lg">
              Explore full playlists, midnight noir mixes, and real-time listening archives directly on Apple Music (<span className="font-mono text-red-400">@thmnprt</span>).
            </p>
          </div>
        </div>

        <a
          id="btn-apple-music-profile"
          href={PERSONAL_INFO.appleMusic.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="px-5 py-3 rounded-2xl bg-white text-black hover:bg-red-600 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-600/30 cursor-pointer shrink-0"
        >
          <span>VIEW ON APPLE MUSIC</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
