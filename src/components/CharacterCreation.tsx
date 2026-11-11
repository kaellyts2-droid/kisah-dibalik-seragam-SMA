import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen, GraduationCap, Palette, Play, History, Check } from 'lucide-react';
import { Archetype } from '../types/game';
import { ARCHETYPES, CHARACTERS } from '../data/characters';
import { sound } from '../utils/audio';

interface CharacterCreationProps {
  onStart: (name: string, archetype: Archetype) => void;
  hasSavedGame: boolean;
  onContinue: () => void;
}

export const CharacterCreation: React.FC<CharacterCreationProps> = ({
  onStart,
  hasSavedGame,
  onContinue,
}) => {
  const [playerName, setPlayerName] = useState<string>('Aira');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>('murid_baru');

  const handleStartNew = () => {
    sound.playHeartSparkle();
    const finalName = playerName.trim() || 'Aira';
    onStart(finalName, selectedArchetype);
  };

  const getArchetypeIcon = (id: Archetype) => {
    switch (id) {
      case 'murid_baru':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'ketua_osis':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'klub_seni':
        return <Palette className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 select-none overflow-y-auto">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900/90 backdrop-blur-md border-2 border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-4"
      >
        {/* Title & Tagline */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-300 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Visual Novel Interaktif Romansa SMA
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Kisah di Balik Seragam
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Kenangan manis, bimbang, dan debaran cinta di masa putih abu-abu SMA Nusantara.
          </p>
        </div>

        {/* Existing Save Continue Banner */}
        {hasSavedGame && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-800 to-indigo-950/60 border border-rose-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <History className="w-4 h-4 text-rose-400" /> Ada Progres Tersimpan
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Lanjutkan petualangan cintamu dari checkpoint terakhir.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onContinue();
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Lanjut Main
            </button>
          </div>
        )}

        {/* Protagonist Name Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Nama Protagonis (Kamu):
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Masukkan namamu..."
            maxLength={18}
            className="w-full bg-slate-950 border-2 border-slate-750 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
          />
        </div>

        {/* Background Archetype Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Pilih Latar Belakang & Bakat:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetype === arch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedArchetype(arch.id);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-rose-500 shadow-lg shadow-rose-500/10'
                      : 'bg-slate-950/60 hover:bg-slate-800/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-750">
                        {getArchetypeIcon(arch.id)}
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-0.5">{arch.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-tight mb-2">
                      {arch.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold border-t border-slate-800 pt-1.5 mt-auto">
                    {arch.bonusText}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meet the Love Interests Preview */}
        <div className="mb-6 p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
            3 Sosok yang Akan Mengisi Harimu:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(['rian', 'alya', 'reza'] as const).map((cid) => {
              const char = CHARACTERS[cid];
              return (
                <div
                  key={cid}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center"
                >
                  <div
                    className="w-10 h-10 rounded-full mb-1.5 flex items-center justify-center text-xs font-bold text-white shadow"
                    style={{ backgroundColor: char.accentColor }}
                  >
                    {char.name[0]}
                  </div>
                  <span className="text-xs font-bold text-white truncate w-full">{char.name}</span>
                  <span className="text-[10px] text-slate-400 truncate w-full">{char.badge}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartNew}
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-500/25 transition-all text-sm md:text-base flex items-center justify-center gap-2 active:scale-98"
        >
          <Play className="w-4 h-4 fill-current" /> Mulai Petualangan Masa SMA!
        </button>
      </motion.div>
    </div>
  );
};
