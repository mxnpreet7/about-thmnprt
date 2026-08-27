import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Shield, Terminal, Zap, Trophy, RefreshCw, 
  Sparkles, CheckCircle2, AlertCircle, Play, Flame, Gamepad2, 
  Users, Flag, Compass, Radio, ChevronRight, Key, Cpu, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useAudio } from './AudioEngine';
import { PERSONAL_INFO } from '../data/personalData';

interface VaultChamber {
  id: string;
  category: 'GAMING_F1' | 'GAMING_FOOTBALL' | 'GAMING_CRICKET' | 'COMMUNITY' | 'SONIC' | 'SOLITUDE';
  categoryLabel: string;
  chamberName: string;
  codename: string;
  cipherPin: string;
  iconType: 'f1' | 'football' | 'cricket' | 'community' | 'sonic' | 'solitude';
  accentColor: string;
  summary: string;
  subject: string;
  affiliationOrTeam: string;
  keyStats: { label: string; value: string }[];
  classifiedLog: string;
  quoteOrPhilosophy: string;
}

const VAULT_CHAMBERS: VaultChamber[] = [
  {
    id: 'chamber-f1',
    category: 'GAMING_F1',
    categoryLabel: 'GAMING & RACING TELEMETRY',
    chamberName: 'Chamber 01: Apex Precision',
    codename: 'MONACO-16',
    cipherPin: '16',
    iconType: 'f1',
    accentColor: '#DC2626',
    subject: 'Charles Leclerc',
    affiliationOrTeam: 'Scuderia Ferrari #16 • Formula 1',
    summary: 'Masterclass in qualifying lap perfection, spatial telemetry, and cold resilience under intense high-speed pressure.',
    keyStats: [
      { label: 'DISCIPLINE', value: 'Formula 1' },
      { label: 'DRIVER #', value: '#16 Ferrari' },
      { label: 'OBSESSION', value: 'Quali Telemetry' },
      { label: 'PEAK MOMENT', value: 'Monaco GP Victory' }
    ],
    classifiedLog: 'Tracks corner apex data, tire degradation curves, and Charles Leclerc’s razor-thin qualifying lines around street circuits. Fascination with how split-second decisions at 340 km/h define victory.',
    quoteOrPhilosophy: '"Precision is not an act, it is a persistent calibration."'
  },
  {
    id: 'chamber-football',
    category: 'GAMING_FOOTBALL',
    categoryLabel: 'GAMING & JOGA BONITO',
    chamberName: 'Chamber 02: Samba Audacity',
    codename: 'NEYMAR-10',
    cipherPin: '10',
    iconType: 'football',
    accentColor: '#F59E0B',
    subject: 'Neymar Jr.',
    affiliationOrTeam: 'Seleção Brasileira (Brazil #10)',
    summary: 'Audacious street dribbling, samba rhythm, unpredictability, and unapologetic charisma on the world stage.',
    keyStats: [
      { label: 'DISCIPLINE', value: 'Football / Joga Bonito' },
      { label: 'NATIONAL TEAM', value: 'Brazil (Seleção)' },
      { label: 'STYLE', value: 'Creative Playmaker' },
      { label: 'TRAIT', value: 'Unpredictable Flair' }
    ],
    classifiedLog: 'Inspired by Neymar’s fearless expression—bringing authentic Brazilian street football flair into elite stadiums without losing joy or audacity.',
    quoteOrPhilosophy: '"Ousadia e Alegria — Audacity and Joy."'
  },
  {
    id: 'chamber-cricket',
    category: 'GAMING_CRICKET',
    categoryLabel: 'GAMING & CLUTCH POISE',
    chamberName: 'Chamber 03: Fearless Dominance',
    codename: 'IYER-96',
    cipherPin: '96',
    iconType: 'cricket',
    accentColor: '#38BDF8',
    subject: 'Shreyas Iyer',
    affiliationOrTeam: 'Punjab Kings (PBKS) • Team India',
    summary: 'Fearless strokeplay, middle-order poise against express spin, and high-stakes match-winning captaincy composure.',
    keyStats: [
      { label: 'DISCIPLINE', value: 'Cricket (T20 / ODI)' },
      { label: 'FRANCHISE', value: 'PBKS (Captaincy)' },
      { label: 'COUNTRY', value: 'Team India' },
      { label: 'SPECIALTY', value: 'Clutch Spin Demolition' }
    ],
    classifiedLog: 'Admiring Shreyas Iyer’s calculated counter-attacks during pressure middle overs, leadership calmness, and fierce intent to dominate every ball.',
    quoteOrPhilosophy: '"Composure under fire transforms pressure into momentum."'
  },
  {
    id: 'chamber-community',
    category: 'COMMUNITY',
    categoryLabel: 'COMMUNITY & ACADEMIC COHORT',
    chamberName: 'Chamber 04: Engineering Nexus',
    codename: 'SUPER-60',
    cipherPin: '60',
    iconType: 'community',
    accentColor: '#10B981',
    subject: 'Super 60 Community',
    affiliationOrTeam: 'SVIET Chandigarh (Engineering & Tech)',
    summary: 'Selected high-agency cohort of 60 driven engineering developers at Swami Vivekanand Institute of Engineering & Technology.',
    keyStats: [
      { label: 'COMMUNITY', value: 'Super 60' },
      { label: 'INSTITUTION', value: 'SVIET Chandigarh' },
      { label: 'PILLARS', value: 'Tech & Architecture' },
      { label: 'MEMBER STATUS', value: 'Active Contributor' }
    ],
    classifiedLog: 'A selective incubator of 60 engineering builders in Chandigarh. Fostering intense peer accountability, full-stack architectural mastery, and collective growth beyond traditional boundaries.',
    quoteOrPhilosophy: '"Surround yourself with the builders who accelerate your ceiling."'
  },
  {
    id: 'chamber-sonic',
    category: 'SONIC',
    categoryLabel: 'SONIC ARCHIVE & ATMOSPHERE',
    chamberName: 'Chamber 05: Midnight Trinity',
    codename: 'STARBOY-XO',
    cipherPin: '77',
    iconType: 'sonic',
    accentColor: '#EC4899',
    subject: 'The Holy Trinity',
    affiliationOrTeam: 'The Weeknd • Lana Del Rey • Billie Eilish',
    summary: 'Cinematic noir storytelling, 808 sub-bass spatial mixes, and haunting vocal melancholia for solitary 2:00 AM drives.',
    keyStats: [
      { label: 'CORE ANTHEM', value: 'Starboy' },
      { label: 'ROTATION', value: 'São Paulo • Timeless' },
      { label: 'ATMOSPHERE', value: 'Chemtrails • Wildflower' },
      { label: 'STREAM PROFILE', value: '@thmnprt Apple Music' }
    ],
    classifiedLog: 'The soundtrack powering the entire Starboy universe. Abel Tesfaye, Lana Del Rey, and Billie Eilish creating auditory movie scores for everyday reality.',
    quoteOrPhilosophy: '"Music is the emotional filter that turns life into cinema."'
  },
  {
    id: 'chamber-solitude',
    category: 'SOLITUDE',
    categoryLabel: 'SOLITUDE & EXPLORATION',
    chamberName: 'Chamber 06: Solitary Horizons',
    codename: 'HORIZON-404',
    cipherPin: '04',
    iconType: 'solitude',
    accentColor: '#A855F7',
    subject: 'Solo Sanctuary Expeditions',
    affiliationOrTeam: 'Amalfi Coast • Kyoto • Santorini',
    summary: 'The deliberate philosophy of solo exploration—walking historic streets alone with noise-canceling headphones to recharge absolute autonomy.',
    keyStats: [
      { label: 'PHILOSOPHY', value: 'The Art of Being Alone' },
      { label: 'WISHLIST #1', value: 'Amalfi Coast (Italy)' },
      { label: 'WISHLIST #2', value: 'Kyoto (Japan)' },
      { label: 'WISHLIST #3', value: 'Santorini (Greece)' }
    ],
    classifiedLog: 'Solitude is not loneliness; it is the sovereign state where original thinking occurs without social performance or external validation.',
    quoteOrPhilosophy: '"He who masters solitude can never be held hostage by company."'
  }
];

export const Vault: React.FC = () => {
  const [unlockedChambers, setUnlockedChambers] = useState<Set<string>>(new Set(['chamber-f1'])); // start with 1 unlocked teaser
  const [selectedChamberId, setSelectedChamberId] = useState<string>('chamber-f1');
  const [inputPin, setInputPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [puzzleMode, setPuzzleMode] = useState<'keypad' | 'sequence' | 'probe'>('keypad');
  
  // Sequence Game State
  const [sequencePattern, setSequencePattern] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [activeFlashingNode, setActiveFlashingNode] = useState<number | null>(null);
  const [sequenceStep, setSequenceStep] = useState<number>(1);
  const [sequenceSuccess, setSequenceSuccess] = useState<boolean>(false);

  const { playClickSound, playWhooshSound } = useAudio();

  const selectedChamber = VAULT_CHAMBERS.find(c => c.id === selectedChamberId) || VAULT_CHAMBERS[0];
  const isSelectedUnlocked = unlockedChambers.has(selectedChamber.id);
  const allUnlocked = unlockedChambers.size === VAULT_CHAMBERS.length;
  const unlockPercentage = Math.round((unlockedChambers.size / VAULT_CHAMBERS.length) * 100);

  // Trigger confetti when fully unlocked
  const checkConfettiReward = (newSet: Set<string>) => {
    if (newSet.size === VAULT_CHAMBERS.length) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#10B981', '#F59E0B', '#38BDF8', '#FFFFFF']
        });
      } catch {
        // Safe fallback
      }
    }
  };

  // Unlock by PIN submission
  const handlePinSubmit = () => {
    if (!inputPin.trim()) return;

    playClickSound();

    if (inputPin.trim() === selectedChamber.cipherPin || inputPin.trim() === 'STARBOY' || inputPin.trim() === '404' || inputPin.trim() === '16') {
      playWhooshSound();
      setUnlockedChambers((prev: Set<string>) => {
        const next = new Set<string>(prev);
        next.add(selectedChamber.id);
        checkConfettiReward(next);
        return next;
      });
      setInputPin('');
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1200);
    }
  };

  // Quick Unlock Chamber
  const handleDirectUnlock = (chamberId: string) => {
    playWhooshSound();
    setUnlockedChambers((prev: Set<string>) => {
      const next = new Set<string>(prev);
      next.add(chamberId);
      checkConfettiReward(next);
      return next;
    });
  };

  // Unlock All Chambers
  const handleUnlockAll = () => {
    playWhooshSound();
    const all = new Set<string>(VAULT_CHAMBERS.map(c => c.id));
    setUnlockedChambers(all);
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#DC2626', '#10B981', '#F59E0B', '#38BDF8', '#EC4899', '#FFFFFF']
      });
    } catch {
      // Safe fallback
    }
  };

  // Re-lock all except first
  const handleRelock = () => {
    playClickSound();
    setUnlockedChambers(new Set(['chamber-f1']));
    setSelectedChamberId('chamber-f1');
    setInputPin('');
  };

  // Start Sequence Memory Mini-Game
  const startSequenceGame = () => {
    playClickSound();
    const stepLength = 4;
    const newSeq: number[] = [];
    for (let i = 0; i < stepLength; i++) {
      newSeq.push(Math.floor(Math.random() * 4));
    }
    setSequencePattern(newSeq);
    setUserSequence([]);
    setIsShowingSequence(true);
    setSequenceSuccess(false);

    // Playback sequence to user
    newSeq.forEach((nodeIdx, i) => {
      setTimeout(() => {
        setActiveFlashingNode(nodeIdx);
        playClickSound();
        setTimeout(() => setActiveFlashingNode(null), 350);
      }, (i + 1) * 600);
    });

    setTimeout(() => {
      setIsShowingSequence(false);
    }, (newSeq.length + 1) * 600);
  };

  // User taps a node in sequence game
  const handleNodeTap = (nodeIndex: number) => {
    if (isShowingSequence) return;
    playClickSound();

    const nextUserSeq = [...userSequence, nodeIndex];
    setUserSequence(nextUserSeq);

    // Check if match
    const currentIndex = nextUserSeq.length - 1;
    if (nextUserSeq[currentIndex] !== sequencePattern[currentIndex]) {
      // Failed sequence
      setPinError(true);
      setTimeout(() => {
        setPinError(false);
        setUserSequence([]);
      }, 800);
      return;
    }

    // Completed full pattern successfully!
    if (nextUserSeq.length === sequencePattern.length) {
      playWhooshSound();
      setSequenceSuccess(true);
      // Unlock all locked chambers!
      setUnlockedChambers(new Set(VAULT_CHAMBERS.map(c => c.id)));
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#DC2626', '#38BDF8', '#FFFFFF']
        });
      } catch {}
    }
  };

  return (
    <div id="vault-interactive" className="my-16 p-6 sm:p-10 rounded-3xl bg-[#060608] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 animate-pulse" />

      {/* Header & HUD */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-widest mb-1.5">
            <Shield className="w-4 h-4 text-red-500" />
            <span>CLASSIFIED VAULT INTERACTION ENGINE</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            The Classified Interest Vault
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-body mt-1 max-w-xl">
            Crack encrypted chambers to reveal categorized obsessions across Gaming (F1, Football, Cricket), Academic Community (Super 60), and Music.
          </p>
        </div>

        {/* Global Vault Progress Badge */}
        <div className="bg-black/90 p-4 rounded-2xl border border-red-500/30 flex flex-col gap-2 min-w-[260px]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/60">SECTOR ACCESS:</span>
            <span className="text-red-400 font-bold">
              {unlockedChambers.size} / {VAULT_CHAMBERS.length} CHAMBERS ({unlockPercentage}%)
            </span>
          </div>

          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${unlockPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
            <span>CHAMBERS STATUS:</span>
            {allUnlocked ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> FULLY DECRYPTED
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> CIPHER ACTIVE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mode Controls & Global Overrides */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Interaction Mode Switcher */}
        <div className="flex items-center gap-2 bg-black/80 p-1.5 rounded-2xl border border-white/10 self-start">
          <button
            id="btn-vault-mode-keypad"
            onClick={() => {
              playClickSound();
              setPuzzleMode('keypad');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              puzzleMode === 'keypad'
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>CIPHER KEYPAD</span>
          </button>

          <button
            id="btn-vault-mode-sequence"
            onClick={() => {
              playClickSound();
              setPuzzleMode('sequence');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              puzzleMode === 'sequence'
                ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>SEQUENCE PUZZLE</span>
          </button>

          <button
            id="btn-vault-mode-probe"
            onClick={() => {
              playClickSound();
              setPuzzleMode('probe');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              puzzleMode === 'probe'
                ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-600/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTOR GRID</span>
          </button>
        </div>

        {/* Global Solver & Reset */}
        <div className="flex items-center gap-2">
          <button
            id="btn-vault-unlock-all"
            onClick={handleUnlockAll}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
          >
            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            <span>OVERRIDE & UNLOCK ALL</span>
          </button>

          <button
            id="btn-vault-relock"
            onClick={handleRelock}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RE-LOCK</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Chamber Interaction Deck */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chamber Selector List (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between px-1">
            <span>SELECT CHAMBER SECTOR:</span>
            <span>{VAULT_CHAMBERS.length} SECTORS</span>
          </div>

          <div className="space-y-2.5">
            {VAULT_CHAMBERS.map((chamber, idx) => {
              const isUnlocked = unlockedChambers.has(chamber.id);
              const isSelected = selectedChamberId === chamber.id;

              return (
                <div
                  key={chamber.id}
                  id={`vault-chamber-item-${chamber.id}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedChamberId(chamber.id);
                  }}
                  className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer border relative overflow-hidden flex items-center justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-red-500 shadow-xl shadow-red-950/30'
                      : 'bg-black/60 border-white/5 hover:border-white/20 hover:bg-neutral-950'
                  }`}
                >
                  {/* Left Accent indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: isUnlocked ? chamber.accentColor : '#333' }}
                  />

                  <div className="pl-2 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: isUnlocked ? `${chamber.accentColor}20` : '#111',
                        color: isUnlocked ? chamber.accentColor : '#666',
                        border: `1px solid ${isUnlocked ? `${chamber.accentColor}50` : '#222'}`
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">
                          {chamber.categoryLabel.split('&')[0]}
                        </span>
                        {isUnlocked ? (
                          <span className="text-[8px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                            OPEN
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono bg-red-950/80 text-red-400 px-1.5 py-0.2 rounded border border-red-500/30">
                            LOCKED
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-display font-bold text-white mt-0.5">
                        {isUnlocked ? chamber.subject : `[ENCRYPTED]: ${chamber.codename}`}
                      </h4>
                      <p className="text-[11px] text-white/50 font-body truncate max-w-[220px]">
                        {isUnlocked ? chamber.affiliationOrTeam : 'Tap to crack PIN / telemetry cipher'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUnlocked ? (
                      <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Decryption Terminal & Chamber Dossier (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="h-full p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Top Chamber Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedChamber.accentColor }}
                  />
                  <span className="text-white/80 font-bold uppercase tracking-wider">
                    {selectedChamber.chamberName}
                  </span>
                </div>
                <span className="text-white/40 font-mono text-[10px]">
                  CODENAME: {selectedChamber.codename}
                </span>
              </div>

              {/* UNLOCKED DOSSIER VIEW */}
              {isSelectedUnlocked ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                        {selectedChamber.categoryLabel}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-0.5">
                        {selectedChamber.subject}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{selectedChamber.affiliationOrTeam}</span>
                      </p>
                    </div>

                    <div
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 self-start sm:self-center"
                      style={{
                        backgroundColor: `${selectedChamber.accentColor}20`,
                        color: selectedChamber.accentColor,
                        border: `1px solid ${selectedChamber.accentColor}50`
                      }}
                    >
                      AUTHORIZED ACCESS
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <p className="text-sm font-body text-white/80 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
                    {selectedChamber.summary}
                  </p>

                  {/* Telemetry Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {selectedChamber.keyStats.map((stat, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-black/70 border border-white/5 flex flex-col justify-between"
                      >
                        <span className="text-[9px] font-mono text-white/40 uppercase">
                          {stat.label}
                        </span>
                        <span className="text-xs sm:text-sm font-display font-bold text-white mt-1">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Classified Log */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block">
                      TELEMETRY ARCHIVE LOG:
                    </span>
                    <p className="text-xs text-white/70 font-body leading-relaxed">
                      {selectedChamber.classifiedLog}
                    </p>
                  </div>

                  {/* Quote or Principle */}
                  <div className="p-3.5 rounded-xl bg-white/5 border-l-2 border-red-500 text-xs font-mono italic text-white/80">
                    {selectedChamber.quoteOrPhilosophy}
                  </div>
                </motion.div>
              ) : (
                /* LOCKED INTERACTIVE DECRYPTION PUZZLE VIEW */
                <div className="mt-6 space-y-6">
                  <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40">
                        <Lock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                          ACCESS RESTRICTED • CIPHER ENCRYPTED
                        </div>
                        <h4 className="text-lg font-display font-bold text-white">
                          Crack {selectedChamber.codename}
                        </h4>
                        <p className="text-xs text-white/50 font-body">
                          Enter PIN keycode or use sequence decoder to unlock classified details.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SUB-MODE 1: KEYPAD CIPHER */}
                  {puzzleMode === 'keypad' && (
                    <div className="space-y-4 bg-black/70 p-5 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/60">CIPHER PIN ENTRY:</span>
                        <span className="text-red-400 text-[10px]">
                          HINT: PIN is "{selectedChamber.cipherPin}"
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          id="vault-pin-input"
                          type="text"
                          maxLength={8}
                          value={inputPin}
                          onChange={(e) => setInputPin(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                          placeholder={`Enter PIN (e.g. ${selectedChamber.cipherPin})`}
                          className={`flex-1 px-4 py-3 rounded-xl bg-black border text-white font-mono text-sm tracking-widest focus:outline-none transition-all ${
                            pinError
                              ? 'border-red-500 animate-shake bg-red-950/40'
                              : 'border-white/20 focus:border-red-500'
                          }`}
                        />

                        <button
                          id="btn-vault-pin-submit"
                          onClick={handlePinSubmit}
                          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-all cursor-pointer shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                        >
                          <span>CRACK</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Code Chips */}
                      <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
                        <span className="text-white/30">QUICK HINTS:</span>
                        {[selectedChamber.cipherPin, '16', '10', '96', '60', '77'].map(code => (
                          <button
                            key={code}
                            onClick={() => {
                              playClickSound();
                              setInputPin(code);
                            }}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 cursor-pointer"
                          >
                            #{code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB-MODE 2: SEQUENCE MEMORY GAME */}
                  {puzzleMode === 'sequence' && (
                    <div className="space-y-4 bg-black/70 p-5 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          <span>SEQUENCE MATRIX GAME</span>
                        </span>
                        <span className="text-white/40 text-[10px]">
                          REPEAT THE GLOWING PATTERN
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-2">
                        {[
                          { name: 'ALPHA (F1)', color: '#DC2626' },
                          { name: 'BETA (FOOTBALL)', color: '#F59E0B' },
                          { name: 'GAMMA (CRICKET)', color: '#38BDF8' },
                          { name: 'DELTA (SUPER 60)', color: '#10B981' }
                        ].map((node, nIdx) => {
                          const isFlashing = activeFlashingNode === nIdx;
                          return (
                            <button
                              key={nIdx}
                              onClick={() => handleNodeTap(nIdx)}
                              disabled={isShowingSequence}
                              className={`p-4 rounded-xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer border text-center ${
                                isFlashing
                                  ? 'scale-105 shadow-xl text-white'
                                  : 'bg-neutral-900 text-white/70 hover:bg-neutral-800 hover:text-white border-white/10'
                              }`}
                              style={{
                                borderColor: isFlashing ? node.color : undefined,
                                backgroundColor: isFlashing ? node.color : undefined
                              }}
                            >
                              {node.name}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <button
                          onClick={startSequenceGame}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>START SEQUENCE</span>
                        </button>

                        <span className="text-[11px] font-mono text-white/40">
                          {isShowingSequence ? 'Observing pattern...' : 'Tap buttons in recorded order'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SUB-MODE 3: ONE-CLICK DIRECT PROBE */}
                  {puzzleMode === 'probe' && (
                    <div className="space-y-4 bg-black/70 p-5 rounded-2xl border border-white/10">
                      <div className="text-xs font-mono text-amber-400 font-bold">
                        SECTOR DIRECT BIOMETRIC PROBE:
                      </div>
                      <p className="text-xs text-white/60 font-body">
                        Direct probe allows rapid telemetry extraction for research access.
                      </p>
                      <button
                        onClick={() => handleDirectUnlock(selectedChamber.id)}
                        className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-mono text-xs font-bold tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>DECRYPT & UNLOCK SECTOR INSTANTLY</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>ACTIVE SUBJECT: {PERSONAL_INFO.name} ({PERSONAL_INFO.nickname})</span>
              </div>

              {!isSelectedUnlocked && (
                <button
                  onClick={() => handleDirectUnlock(selectedChamber.id)}
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Unlock className="w-3 h-3" /> Quick Unlock Chamber
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
