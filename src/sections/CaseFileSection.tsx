import React, { useState } from 'react';
import { ShieldCheck, FileText, Search, Eye, AlertCircle, Bookmark, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/personalData';
import { useAudio } from '../components/AudioEngine';

export const CaseFileSection: React.FC = () => {
  const [activeDossierTab, setActiveDossierTab] = useState<'profile' | 'series' | 'analysis'>('profile');
  const { playClickSound } = useAudio();

  const handleTab = (t: 'profile' | 'series' | 'analysis') => {
    playClickSound();
    setActiveDossierTab(t);
  };

  const favoriteShows = [
    {
      title: "THE MENTALIST",
      focus: "Hyper-Observation & Human Deduction",
      takeaway: "Patrick Jane's ability to read subconscious micro-expressions and predict human behavior through pure cognitive observation.",
      badge: "COGNITIVE STRATEGY"
    },
    {
      title: "YOU",
      focus: "Internal Monologue & Character Deconstruction",
      takeaway: "The intense study of self-justification, cognitive bias, and how people convince themselves of their own narratives.",
      badge: "PSYCHOLOGICAL NARRATIVE"
    },
    {
      title: "DEXTER",
      focus: "The Anatomy of Discipline & Systems",
      takeaway: "The Code of Harry as an extreme case study in adherence to strict rules, double lives, and methodical planning.",
      badge: "SYSTEMS & CODE"
    }
  ];

  return (
    <section id="case-file" className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
          <Eye className="w-3.5 h-3.5 text-red-500" />
          <span>INVESTIGATION DOSSIER</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-tight">
          CASE <span className="text-red-500 font-case">#STARBOY-404</span>
        </h2>
        <p className="mt-4 text-xs sm:text-sm font-mono text-white/50 max-w-lg">
          [CLASSIFICATION: OBSERVATIONAL PSYCHOLOGY] — An artistic case file on the habits, narratives, and strategy behind the persona.
        </p>
      </div>

      {/* Dossier Terminal Window */}
      <div className="relative rounded-3xl bg-[#09090C] border border-red-500/25 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Red Tension Thread Visual Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        {/* Dossier Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              PERSON OF INTEREST: MANNI (MANPREET SINGH)
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10">
            {(['profile', 'series', 'analysis'] as const).map((tab) => (
              <button
                key={tab}
                id={`btn-dossier-tab-${tab}`}
                onClick={() => handleTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeDossierTab === tab
                    ? 'bg-red-600/30 text-red-300 border border-red-500/40 font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Views */}
        <div className="mt-8">
          {activeDossierTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {/* Evidence Card 1 */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">
                    SUBJECT IDENTITY
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">
                    Manpreet Singh
                  </h4>
                  <div className="text-xs text-white/50 font-mono mt-0.5">
                    AKA: Manni / Starboy
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs font-body text-white/70 space-y-1.5">
                  <p><span className="text-white/40 font-mono">STATUS:</span> Chill & Curious</p>
                  <p><span className="text-white/40 font-mono">COMMUNITY:</span> Super 60 @ SVIET</p>
                  <p><span className="text-white/40 font-mono">LOCUS:</span> Chandigarh, India</p>
                  <p><span className="text-white/40 font-mono">ORIGIN:</span> Nagina, UP</p>
                </div>
              </div>

              {/* Evidence Card 2 */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">
                    BEHAVIORAL TRAITS
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">
                    Independent Strategist
                  </h4>
                  <div className="text-xs text-white/50 font-mono mt-0.5">
                    Modus Operandi
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs font-body text-white/70 space-y-1.5">
                  <p>• Highly observant in social spaces</p>
                  <p>• Continuous soundtrack in headphones</p>
                  <p>• Long solitary walks for thought clarity</p>
                  <p>• Comfortable in peaceful silence</p>
                </div>
              </div>

              {/* Evidence Card 3 - Sports & Tactical Arena */}
              <div className="p-5 rounded-2xl bg-black/50 border border-red-500/20 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">
                    SPORTS & TACTICAL ARENA
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">
                    Speed & Flair Icons
                  </h4>
                  <div className="text-xs text-white/50 font-mono mt-0.5">
                    Strategic Admiration
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs font-body text-white/70 space-y-1.5">
                  <p>• <span className="text-red-400 font-mono">F1:</span> Charles Leclerc (Ferrari)</p>
                  <p>• <span className="text-amber-400 font-mono">FOOTBALL:</span> Neymar Jr. (Brazil)</p>
                  <p>• <span className="text-sky-400 font-mono">CRICKET:</span> Shreyas Iyer (PBKS, India)</p>
                  <p>• Precision, speed, & audacity</p>
                </div>
              </div>

              {/* Evidence Card 4 */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">
                    GROUNDING AXIS
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">
                    Belief & Gratitude
                  </h4>
                  <div className="text-xs text-white/50 font-mono mt-0.5">
                    Inner Anchor
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs font-body text-white/70 space-y-1.5">
                  <p>• Believes in God with quiet humility</p>
                  <p>• Values inner peace over vanity</p>
                  <p>• Nonfiction reader of systems</p>
                  <p>• Grounded in gratitude & humor</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeDossierTab === 'series' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xs sm:text-sm text-white/60 font-body mb-4">
                Analysis of favorite psychological series and how they connect to story structure, cognitive observation, and human motives:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favoriteShows.map((show) => (
                  <div
                    key={show.title}
                    className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-500/30">
                        {show.badge}
                      </span>
                      <h4 className="text-lg font-bold font-display text-white mt-2">
                        {show.title}
                      </h4>
                      <div className="text-xs text-red-400/80 font-mono mt-0.5">
                        {show.focus}
                      </div>
                      <p className="text-xs text-white/70 font-body mt-3 leading-relaxed">
                        {show.takeaway}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeDossierTab === 'analysis' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4"
            >
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                <Search className="w-4 h-4" />
                <span>SUMMARY INVESTIGATIVE FINDINGS</span>
              </div>
              <p className="text-sm text-white/80 font-body leading-relaxed">
                “Subject does not fit standard extrovert or recluse archetypes. Operates with high independence and personal agency. Demonstrates natural humor with zero pretense. Motivated by curiosity rather than social conformity.”
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10 text-[11px] font-mono text-white/50">
                <span className="px-2 py-1 rounded bg-white/5">VERDICT: AUTHENTIC</span>
                <span className="px-2 py-1 rounded bg-white/5">CASE STATUS: OPEN FOR EXPLORATION</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
