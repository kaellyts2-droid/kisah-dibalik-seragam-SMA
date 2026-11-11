import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  BookOpen,
  Smartphone,
  Volume2,
  VolumeX,
  Play,
  Pause,
  FastForward,
  Sparkles,
} from 'lucide-react';
import { DialogueChoice, CharacterId, Archetype } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { sound } from '../utils/audio';

interface DialogueBoxProps {
  speaker: string;
  characterId?: CharacterId | 'narator' | 'guru' | 'player';
  text: string;
  choices?: DialogueChoice[];
  playerArchetype: Archetype;
  onChoiceSelect: (choice: DialogueChoice) => void;
  onNext: () => void;
  onOpenSmartphone: () => void;
  onOpenHistory: () => void;
  onToggleBgm: () => void;
  bgmEnabled: boolean;
  unreadCount: number;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  characterId,
  text,
  choices,
  playerArchetype,
  onChoiceSelect,
  onNext,
  onOpenSmartphone,
  onOpenHistory,
  onToggleBgm,
  bgmEnabled,
  unreadCount,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayedText(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [text]);

  // Auto-play logic
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    if (isAutoPlay && !isTyping && (!choices || choices.length === 0)) {
      autoPlayTimerRef.current = window.setTimeout(() => {
        onNext();
      }, 2400);
    }

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, isTyping, choices, onNext]);

  const handleBoxClick = () => {
    if (isTyping) {
      // Instant finish
      setDisplayedText(text);
      setIsTyping(false);
    } else if (!choices || choices.length === 0) {
      sound.playClick();
      onNext();
    }
  };

  const getChoiceBadge = (type: DialogueChoice['type']) => {
    switch (type) {
      case 'sweet':
        return { label: 'Manis & Perhatian ❤️', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      case 'casual':
        return { label: 'Santai & Candaan 😄', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      case 'bold':
        return { label: 'Berani & Romantis 🔥', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
      case 'archetype_secret':
        return { label: 'Karakter Spesial ✨', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
    }
  };

  const charInfo = characterId && characterId in CHARACTERS ? CHARACTERS[characterId as CharacterId] : null;

  return (
    <div className="relative w-full z-20 select-none">
      {/* Top Floating Controls */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-medium text-slate-300 flex items-center gap-1 shadow-sm transition-all"
            title="Riwayat Percakapan"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span>Log</span>
          </button>
          {/* Auto-Play Button */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1 shadow-sm transition-all ${
              isAutoPlay
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-300'
            }`}
            title="Otomatis Lanjut Dialog"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Auto</span>
          </button>
          {/* Audio BGM Button */}
          <button
            onClick={onToggleBgm}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1 shadow-sm transition-all ${
              bgmEnabled
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-400'
            }`}
            title="Nostalgic Lo-Fi BGM"
          >
            {bgmEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Musik</span>
          </button>
        </div>

        {/* Smartphone HUD Launcher Button */}
        <button
          onClick={onOpenSmartphone}
          className="relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20 border border-rose-400/40 transition-all active:scale-95"
        >
          <Smartphone className="w-4 h-4" />
          <span>Ponsel</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Dialogue Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-slate-950/85 backdrop-blur-md border-2 border-slate-700/70 hover:border-slate-600 rounded-2xl shadow-2xl p-4 md:p-5 flex flex-col min-h-[140px] md:min-h-[160px] relative transition-all"
        onClick={handleBoxClick}
      >
        {/* Speaker Name Badge */}
        {speaker && (
          <div className="absolute -top-3.5 left-5 z-10 flex items-center gap-2">
            <div
              className="px-3.5 py-1 rounded-xl font-bold text-xs md:text-sm text-white shadow-lg border flex items-center gap-1.5"
              style={{
                backgroundColor: charInfo ? charInfo.accentColor : '#334155',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              {charInfo && <span className="w-2 h-2 rounded-full bg-white"></span>}
              <span>{speaker}</span>
            </div>
            {charInfo && (
              <span className="hidden sm:inline-block text-[10px] text-slate-400 bg-slate-900/90 border border-slate-700/70 px-2 py-0.5 rounded-full">
                {charInfo.role}
              </span>
            )}
          </div>
        )}

        {/* Dialogue Text Area */}
        <div className="flex-1 mt-1 cursor-pointer">
          <p className="text-xs md:text-sm text-slate-100 leading-relaxed tracking-wide font-medium whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-3.5 bg-rose-400 ml-1 animate-pulse" />}
          </p>
        </div>

        {/* Choices Options or Next Arrow */}
        {choices && choices.length > 0 && !isTyping ? (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
            {choices.map((choice) => {
              const badge = getChoiceBadge(choice.type);
              const isLocked =
                choice.requiredArchetype && choice.requiredArchetype !== playerArchetype;

              if (isLocked) return null; // Hide secret options not for this archetype

              return (
                <motion.button
                  key={choice.id}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    onChoiceSelect(choice);
                  }}
                  className="w-full text-left p-2.5 md:p-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-rose-400/80 transition-all flex items-center justify-between gap-3 group shadow-md"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-xs md:text-sm text-slate-200 group-hover:text-rose-300 font-medium">
                      {choice.text}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 shrink-0" />
                </motion.button>
              );
            })}
          </div>
        ) : (
          !isTyping && (
            <div className="flex items-center justify-end text-slate-400 text-[11px] gap-1 mt-2 pt-1 font-mono">
              <span className="animate-pulse">Klik atau tekan untuk lanjut</span>
              <ChevronRight className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};
