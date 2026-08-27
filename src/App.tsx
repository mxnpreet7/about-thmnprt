import React, { useState, useEffect } from 'react';
import { AudioProvider } from './components/AudioEngine';
import { WebCanvas } from './components/WebCanvas';
import { Navbar } from './components/Navbar';
import { SoundPromptModal } from './components/SoundPromptModal';
import { EasterEggModal } from './components/EasterEggModal';

import { HeroSection } from './sections/HeroSection';
import { RevealSection } from './sections/RevealSection';
import { CaseFileSection } from './sections/CaseFileSection';
import { MusicSection } from './sections/MusicSection';
import { BooksSection } from './sections/BooksSection';
import { FashionSection } from './sections/FashionSection';
import { ArchiveSection } from './sections/ArchiveSection';
import { ChillGuySection } from './sections/ChillGuySection';
import { TravelSection } from './sections/TravelSection';
import { BlogSection } from './sections/BlogSection';
import { SocialLinkBioSection } from './sections/SocialLinkBioSection';
import { FooterSection } from './sections/FooterSection';

export default function App() {
  const [showSoundPrompt, setShowSoundPrompt] = useState<boolean>(true);
  const [showSecretModal, setShowSecretModal] = useState<boolean>(false);
  const [redAuraMode, setRedAuraMode] = useState<boolean>(false);

  // Secret keyboard easter egg: typing "starboy"
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing when typing inside inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }
      if (keyBuffer.endsWith('starboy') || keyBuffer.endsWith('manni') || e.key === '4') {
        setShowSecretModal(true);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleRedAura = () => {
    setRedAuraMode((prev) => !prev);
  };

  return (
    <AudioProvider>
      <div className={`relative min-h-screen bg-[#030303] text-[#E5E5E5] transition-colors duration-700 ${
        redAuraMode ? 'selection:bg-red-700 selection:text-white' : ''
      }`}>
        {/* Dynamic Spider-web & Atmospheric Particles Canvas */}
        <WebCanvas redAuraMode={redAuraMode} />

        {/* Global Floating Navigation Dock */}
        <Navbar
          redAuraMode={redAuraMode}
          onToggleRedAura={handleToggleRedAura}
        />

        {/* Main Sections Stream */}
        <main className="relative z-10 w-full overflow-hidden">
          <HeroSection redAuraMode={redAuraMode} />
          <RevealSection />
          <CaseFileSection />
          <MusicSection />
          <BooksSection />
          <FashionSection />
          <ArchiveSection />
          <ChillGuySection />
          <TravelSection />
          <BlogSection />
          <SocialLinkBioSection />
        </main>

        {/* Footer & End Sequence */}
        <FooterSection onTriggerSecretModal={() => setShowSecretModal(true)} />

        {/* Initial Audio Prompt */}
        {showSoundPrompt && (
          <SoundPromptModal onDismiss={() => setShowSoundPrompt(false)} />
        )}

        {/* Easter Egg Modal */}
        {showSecretModal && (
          <EasterEggModal
            onClose={() => setShowSecretModal(false)}
            onToggleRedAura={handleToggleRedAura}
            redAuraMode={redAuraMode}
          />
        )}
      </div>
    </AudioProvider>
  );
}
