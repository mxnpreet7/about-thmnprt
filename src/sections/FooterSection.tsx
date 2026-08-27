import React from 'react';
import { ArrowUp, Instagram, Sparkles, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/personalData';
import { useAudio } from '../components/AudioEngine';

interface FooterProps {
  onTriggerSecretModal: () => void;
}

export const FooterSection: React.FC<FooterProps> = ({ onTriggerSecretModal }) => {
  const { playClickSound, playWhooshSound } = useAudio();

  const handleBackToTop = () => {
    playWhooshSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative py-24 px-4 border-t border-white/10 overflow-hidden bg-black">
      {/* Background Web tension accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-radial-crimson pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* End Badge */}
        <span className="text-[10px] font-mono tracking-[0.3em] text-red-500 uppercase mb-4">
          END OF ARCHIVE SEQUENCE
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-bold text-white tracking-tight">
          YOU'VE REACHED THE END.
        </h2>

        {/* Signature Statements */}
        <div className="my-8 space-y-2">
          <p className="text-xl sm:text-2xl font-display font-medium text-white/90">
            “MANNI WAS HERE.”
          </p>
          <p className="text-sm font-mono text-white/40">
            STARBOY WILL PROBABLY ADD ANOTHER SECTION LATER.
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-4 mb-12">
          <a
            id="btn-footer-follow-story"
            href={PERSONAL_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-sm font-bold tracking-widest uppercase shadow-2xl shadow-red-600/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW THE STORY</span>
          </a>
        </div>

        {/* Back to Top */}
        <button
          id="btn-back-to-top"
          onClick={handleBackToTop}
          className="group flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-full bg-white/5 hover:bg-white/10"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-red-400" />
        </button>

        {/* Secret easter egg subtle trigger */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              onTriggerSecretModal();
            }}
            className="text-[10px] font-mono text-white/20 hover:text-red-400/60 transition-colors cursor-pointer"
          >
            [ACCESS CLASSIFIED PROTOCOL #404]
          </button>
          <div className="text-[11px] font-mono text-white/30">
            © 2026 MANPREET SINGH (STARBOY) • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};
