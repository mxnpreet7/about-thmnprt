import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Instagram, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { useAudio } from './AudioEngine';
import { PERSONAL_INFO } from '../data/personalData';

interface NavbarProps {
  redAuraMode: boolean;
  onToggleRedAura: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ redAuraMode, onToggleRedAura }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const { isPlaying, isMuted, togglePlay, toggleMute, playClickSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    playClickSound();
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 3) {
      onToggleRedAura();
      setLogoClickCount(0);
    }
  };

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "CASE FILE", href: "#case-file" },
    { label: "MUSIC", href: "#music" },
    { label: "BOOKS", href: "#books" },
    { label: "FASHION", href: "#fashion" },
    { label: "ARCHIVE", href: "#archive" },
    { label: "TRAVEL", href: "#travel" },
    { label: "NOTES", href: "#notes" },
    { label: "BIO-LINKS", href: "#socials" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300">
      <nav
        id="main-navbar-dock"
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-panel border-white/10 shadow-2xl shadow-black/80'
            : 'bg-black/40 backdrop-blur-md border border-white/5'
        } ${redAuraMode ? 'border-red-500/40 shadow-red-950/40' : ''}`}
      >
        {/* Monogram Brand / Easter Egg Trigger */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-starboy"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            title="Click 3 times to unlock Starboy Aura Mode"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              redAuraMode 
                ? 'bg-red-950/80 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.6)]' 
                : 'bg-white/5 border-white/15 text-white/90 group-hover:border-red-500/50'
            }`}>
              <span className="font-editorial text-xs font-black tracking-tighter">
                {redAuraMode ? '★' : 'MS'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-display font-extrabold tracking-widest text-white flex items-center gap-1">
                STARBOY
                {redAuraMode && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-red-600/30 text-red-400 rounded-full font-mono border border-red-500/40">
                    AURA
                  </span>
                )}
              </span>
              <span className="text-[9px] text-white/40 tracking-wider font-mono hidden sm:inline">
                MANPREET SINGH
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-[11px] font-medium tracking-wider text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls & Socials */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound status button */}
          <button
            id="nav-btn-audio-toggle"
            onClick={() => {
              playClickSound();
              if (!isPlaying) togglePlay();
              else toggleMute();
            }}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
            title={isPlaying ? (isMuted ? "Sound Muted" : "Atmospheric Audio Active") : "Start Atmosphere"}
          >
            {isPlaying && !isMuted ? (
              <Volume2 className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
            )}
          </button>

          {/* Quick Instagram link */}
          <a
            id="nav-link-instagram"
            href={PERSONAL_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-full text-xs font-medium tracking-wide transition-all duration-300"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@thmnprt</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-white/80 hover:text-white bg-white/5 rounded-full"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-3xl glass-panel border border-white/10 shadow-2xl backdrop-blur-2xl animate-fade-in"
        >
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-mono tracking-widest text-red-500 uppercase px-2 mb-1">
              DIGITAL UNIVERSE ARCHIVE
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 text-sm font-medium tracking-wider text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}

            <div className="h-px bg-white/10 my-2" />

            <div className="flex items-center justify-between px-2 pt-1">
              <a
                href={PERSONAL_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram @thmnprt</span>
              </a>

              <button
                onClick={() => {
                  onToggleRedAura();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-white/60 hover:text-white flex items-center gap-1 font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>{redAuraMode ? "Deactivate Aura" : "Aura Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
