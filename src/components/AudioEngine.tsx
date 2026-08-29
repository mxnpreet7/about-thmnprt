import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3, ExternalLink, Music2, Radio, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/personalData';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasInteracted: boolean;
  showPlayerModal: boolean;
  isInstagramBrowser: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  setShowPlayerModal: (v: boolean) => void;
  setHasInteracted: (v: boolean) => void;
  playClickSound: () => void;
  playWhooshSound: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};

// Declare YT global type for TypeScript
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);
  const [isInstagramBrowser, setIsInstagramBrowser] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    masterGain?: GainNode;
    oscillators?: OscillatorNode[];
    filter?: BiquadFilterNode;
    intervalId?: any;
  }>({});
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Detect Instagram, Facebook, TikTok in-app webview
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || '';
      const isIAB = /Instagram|FBAN|FBAV|ByteLocale|TikTok/i.test(ua);
      setIsInstagramBrowser(isIAB);
    }
  }, []);

  const initWebAudio = () => {
    if (!audioCtxRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      } catch {
        // Ignore if unsupported
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  // Dreamy lofi synth chord progression for Yung Kai "blue" (Dmaj7 - Bm7 - Gmaj7 - A7)
  const startAtmosphericSynth = () => {
    try {
      initWebAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;

      stopAtmosphericSynth();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.16, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);

      // Chords sequence: Dmaj7 -> Bm7 -> Gmaj7 -> A
      const chordFrequencies = [
        [73.42, 146.83, 185.00, 220.00], // D2, D3, F#3, A3
        [61.74, 123.47, 146.83, 185.00], // B1, B2, D3, F#3
        [98.00, 146.83, 196.00, 246.94], // G2, D3, G3, B3
        [110.00, 164.81, 220.00, 277.18] // A2, E3, A3, C#4
      ];

      let currentChordIndex = 0;
      const activeOscs: OscillatorNode[] = [];

      const playChord = (frequencies: number[]) => {
        const now = ctx.currentTime;
        frequencies.forEach(freq => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime(Math.random() * 4 - 2, now);

          oscGain.gain.setValueAtTime(0.001, now);
          oscGain.gain.exponentialRampToValueAtTime(0.06, now + 1.4);
          oscGain.gain.exponentialRampToValueAtTime(0.001, now + 5.6);

          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start(now);
          osc.stop(now + 6.0);
          activeOscs.push(osc);
        });
      };

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      playChord(chordFrequencies[0]);

      const intervalId = setInterval(() => {
        currentChordIndex = (currentChordIndex + 1) % chordFrequencies.length;
        playChord(chordFrequencies[currentChordIndex]);
      }, 5200);

      synthNodesRef.current = {
        masterGain,
        oscillators: activeOscs,
        filter,
        intervalId
      };
    } catch {
      // Safe fallback
    }
  };

  const stopAtmosphericSynth = () => {
    try {
      if (synthNodesRef.current.intervalId) {
        clearInterval(synthNodesRef.current.intervalId);
      }
      if (synthNodesRef.current.masterGain && audioCtxRef.current) {
        synthNodesRef.current.masterGain.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
    } catch {
      // Safe fallback
    }
  };

  const playClickSound = () => {
    if (isMuted || !hasInteracted) return;
    try {
      initWebAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(volume * 0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  };

  const playWhooshSound = () => {
    if (isMuted || !hasInteracted) return;
    try {
      initWebAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(volume * 0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Ignore
    }
  };

  // Immediate synchronous play execution on user click/touch
  const playAudio = () => {
    initWebAudio();
    setHasInteracted(true);
    setIsPlaying(true);

    if (audioElementRef.current) {
      audioElementRef.current.muted = isMuted;
      audioElementRef.current.volume = isMuted ? 0 : volume;
      const playPromise = audioElementRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            stopAtmosphericSynth();
          })
          .catch((err) => {
            console.warn("Direct HTML5 audio playback deferred or blocked, using atmospheric synth fallback:", err);
            startAtmosphericSynth();
            setIsPlaying(true);
          });
      }
    } else {
      startAtmosphericSynth();
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    stopAtmosphericSynth();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioElementRef.current) {
      audioElementRef.current.muted = nextMute;
      audioElementRef.current.volume = nextMute ? 0 : volume;
    }
    if (synthNodesRef.current.masterGain && audioCtxRef.current) {
      synthNodesRef.current.masterGain.gain.setValueAtTime(nextMute ? 0 : volume * 0.16, audioCtxRef.current.currentTime);
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioElementRef.current && !isMuted) {
      audioElementRef.current.volume = v;
    }
    if (synthNodesRef.current.masterGain && audioCtxRef.current && !isMuted) {
      synthNodesRef.current.masterGain.gain.setValueAtTime(v * 0.16, audioCtxRef.current.currentTime);
    }
  };

  // Pre-load audio on mount and unlock on first user gesture for Instagram browser & mobile
  useEffect(() => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.load();
    }

    // Global one-time interaction listener on any touch, click, scroll or keydown
    const handleFirstActivation = () => {
      setHasInteracted(true);
      initWebAudio();
      if (audioElementRef.current && audioElementRef.current.paused) {
        audioElementRef.current.muted = isMuted;
        audioElementRef.current.volume = isMuted ? 0 : volume;
        audioElementRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach(event => {
        window.removeEventListener(event, handleFirstActivation);
      });
    };

    ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach(event => {
      window.addEventListener(event, handleFirstActivation, { passive: true, once: true });
    });

    return () => {
      cleanupListeners();
      try {
        stopAtmosphericSynth();
        audioCtxRef.current?.close();
      } catch {
        // cleanup
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasInteracted,
        showPlayerModal,
        isInstagramBrowser,
        playAudio,
        pauseAudio,
        togglePlay,
        toggleMute,
        setVolume,
        setShowPlayerModal,
        setHasInteracted,
        playClickSound,
        playWhooshSound
      }}
    >
      {children}

      {/* HTML5 Direct Audio Stream (Primary Engine) */}
      <audio
        ref={audioElementRef}
        id="starboy-soundtrack-audio"
        src={PERSONAL_INFO.audioTrack.audioSrc || "/audio/blue.mp3"}
        loop
        playsInline
        preload="auto"
        onPlay={() => {
          setIsPlaying(true);
          stopAtmosphericSynth();
        }}
        onError={() => {
          if (isPlaying) {
            startAtmosphericSynth();
          }
        }}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Mini Player Widget & Atmosphere Modal */}
      <FloatingAudioBar />
      {showPlayerModal && <TrackAudioModal onClose={() => setShowPlayerModal(false)} />}
    </AudioContext.Provider>
  );
};

// Mini player pill attached on bottom right / accessible globally
const FloatingAudioBar: React.FC = () => {
  const { isPlaying, isMuted, togglePlay, toggleMute, setShowPlayerModal, volume, setVolume, isInstagramBrowser } = useAudio();

  return (
    <aside 
      aria-label="Audio controller" 
      id="floating-soundtrack-controller" 
      className="fixed bottom-4 sm:bottom-5 right-3 sm:right-5 z-40 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-neutral-950/95 border border-red-500/50 shadow-[0_0_25px_rgba(220,38,38,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-red-500"
    >
      <button
        id="btn-toggle-vinyl-play"
        onClick={togglePlay}
        className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        title={isPlaying ? `Pause ${PERSONAL_INFO.audioTrack.title} Soundtrack` : `Play ${PERSONAL_INFO.audioTrack.title} Soundtrack`}
      >
        <Disc3
          className={`w-5 h-5 text-red-500 transition-transform duration-700 ${
            isPlaying ? 'animate-spin-slow' : 'opacity-70'
          }`}
        />
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 uppercase tracking-widest font-case flex items-center gap-1">
            <span>{PERSONAL_INFO.audioTrack.title.toUpperCase()}</span>
            {isInstagramBrowser && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
          </span>
          <span className="text-[8px] sm:text-[9px] text-white/50 tracking-wider">
            {isPlaying ? "PLAYING AUDIO" : "TAP TO PLAY"}
          </span>
        </div>
      </button>

      {/* Animated Equalizer Visualizer */}
      <div className="flex items-end gap-0.5 h-4 w-4 sm:w-5 px-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`w-1 bg-red-500 rounded-full transition-all duration-300 ${
              isPlaying
                ? bar === 1 ? 'h-3 animate-pulse' : bar === 2 ? 'h-4 animate-bounce' : bar === 3 ? 'h-2 animate-pulse' : 'h-3.5 animate-bounce'
                : 'h-1 bg-white/20'
            }`}
          />
        ))}
      </div>

      <div className="h-4 w-px bg-white/10 mx-0.5" />

      {/* Mute Toggle */}
      <button
        id="btn-toggle-mute"
        onClick={toggleMute}
        className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Volume slider for desktop */}
      <input
        id="audio-volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-12 h-1 accent-red-600 bg-white/10 rounded-lg cursor-pointer hidden md:block"
        aria-label="Soundtrack Volume"
      />

      {/* Button to open official video / full track player */}
      <button
        id="btn-open-full-track"
        onClick={() => setShowPlayerModal(true)}
        className="px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold text-white/90 bg-red-600/30 hover:bg-red-600 hover:text-white border border-red-500/40 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1"
        title="Open Full Player"
      >
        <span>VIDEO</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </button>
    </aside>
  );
};

// Official Yung Kai — blue Video/Embed Modal
const TrackAudioModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div id="modal-track-player" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0B0B0E] border border-red-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-red-500 uppercase">
              SIGNATURE SOUNDTRACK ARCHIVE
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
              {PERSONAL_INFO.audioTrack.artist} — {PERSONAL_INFO.audioTrack.title}
            </h3>
          </div>
          <button
            id="btn-close-track-modal"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${PERSONAL_INFO.audioTrack.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={`${PERSONAL_INFO.audioTrack.artist} - ${PERSONAL_INFO.audioTrack.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-white/60 gap-2">
          <span>Official Authorized YouTube Audio Stream</span>
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.audioTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 flex items-center gap-1 font-mono text-[11px]"
            >
              Open in YouTube <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

