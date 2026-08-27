import React, { useState } from 'react';
import { Instagram, Ghost, Lock, Copy, Check, ExternalLink, Sparkles, Share2, QrCode, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/personalData';
import { useAudio } from '../components/AudioEngine';

export const SocialLinkBioSection: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [showQr, setShowQr] = useState<boolean>(false);
  const { playClickSound } = useAudio();

  const handleCopy = (text: string, label: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedHandle(label);
    setTimeout(() => setCopiedHandle(null), 2200);
  };

  const socials = [
    {
      id: "instagram",
      platform: "INSTAGRAM",
      handle: "@thmnprt",
      subtitle: "Main Digital Archive & Visual Moods",
      url: PERSONAL_INFO.instagram.url,
      icon: <Instagram className="w-5 h-5 text-red-400" />,
      accent: "hover:border-red-500/70 hover:shadow-red-950/40",
      isPrimary: true
    },
    {
      id: "apple-music",
      platform: "APPLE MUSIC",
      handle: "@thmnprt",
      subtitle: "Curated Playlists & Midnight Rotation Archives",
      url: PERSONAL_INFO.appleMusic.url,
      icon: <Music2 className="w-5 h-5 text-[#FC3C44]" />,
      accent: "hover:border-[#FC3C44]/70 hover:shadow-red-950/30",
      isPrimary: false
    },
    {
      id: "snapchat",
      platform: "SNAPCHAT",
      handle: "@thmnprt",
      subtitle: "Real-time Spontaneous Snaps & Stories",
      url: PERSONAL_INFO.snapchat.url,
      icon: <Ghost className="w-5 h-5 text-amber-400" />,
      accent: "hover:border-amber-500/50 hover:shadow-amber-950/30",
      isPrimary: false
    },
    {
      id: "private-insta",
      platform: "PRIVATE INSTAGRAM",
      handle: "@mnprt.404",
      subtitle: "Close Circle & Unfiltered Personal Log",
      url: PERSONAL_INFO.privateInstagram.url,
      icon: <Lock className="w-5 h-5 text-neutral-300" />,
      accent: "hover:border-white/40",
      isPrimary: false
    }
  ];

  return (
    <section id="socials" className="relative py-24 sm:py-32 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Share2 className="w-3.5 h-3.5 text-red-500" />
          <span>LINK-IN-BIO HUB</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-tight">
          FIND ME <span className="text-red-500">ELSEWHERE</span>
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-white/60 max-w-md font-body">
          Direct channels into the personal ecosystem. Designed with instant one-tap navigation for mobile visitors.
        </p>
      </div>

      {/* Bio / Community Status Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-red-500/30 flex items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
              ACADEMIC & TECH COHORT
            </div>
            <div className="text-sm sm:text-base font-display font-bold text-white">
              Super 60 Community • SVIET Chandigarh
            </div>
          </div>
        </div>
        <span className="hidden sm:inline text-[10px] font-mono bg-white/10 text-white/70 px-2.5 py-1 rounded-full border border-white/10">
          MEMBER
        </span>
      </div>

      {/* Social Links Stack */}
      <div className="space-y-4 mb-10">
        {socials.map((soc) => (
          <div
            key={soc.id}
            className={`p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${soc.accent} ${
              soc.isPrimary ? 'bg-gradient-to-r from-red-950/20 via-black to-black' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 shrink-0">
                {soc.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                    {soc.platform}
                  </span>
                  {soc.isPrimary && (
                    <span className="text-[9px] font-mono px-2 py-0.2 bg-red-600/30 text-red-300 rounded-full border border-red-500/40">
                      PRIMARY
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {soc.handle}
                </h3>
                <p className="text-xs text-white/50 font-body">
                  {soc.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {/* Copy Handle Button */}
              <button
                id={`btn-copy-${soc.id}`}
                onClick={() => handleCopy(soc.handle, soc.id)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Handle"
              >
                {copiedHandle === soc.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>

              {/* Direct Open Link Button */}
              <a
                id={`link-open-${soc.id}`}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/20 cursor-pointer"
              >
                <span>OPEN</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Share / Digital Card Bar */}
      <div className="p-6 rounded-2xl bg-black/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="text-xs font-mono text-white/80 font-bold">
            DIRECT SHAREABLE PROFILE
          </div>
          <div className="text-[11px] font-mono text-white/40 mt-0.5">
            https://thmnprt.digital // Starboy Ecosystem
          </div>
        </div>

        <button
          id="btn-copy-profile-url"
          onClick={() => handleCopy(window.location.href, 'profile-url')}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          {copiedHandle === 'profile-url' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">LINK COPIED TO CLIPBOARD</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>COPY PORTFOLIO LINK</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
