import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, X } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { CharacterId } from '../types/game';

interface HistoryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: {
    speaker: string;
    text: string;
    characterId?: CharacterId | 'narator' | 'guru' | 'player';
  }[];
}

export const HistoryLogModal: React.FC<HistoryLogModalProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl max-h-[85vh] bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-sm md:text-base">
              Riwayat Percakapan (Dialogue Log)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {logs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Belum ada percakapan tercatat.
            </div>
          ) : (
            logs.map((log, index) => {
              const isNarrator = log.characterId === 'narator';
              const charColor =
                log.characterId && log.characterId in CHARACTERS
                  ? CHARACTERS[log.characterId as CharacterId].accentColor
                  : '#FB7185';

              return (
                <div
                  key={index}
                  className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    isNarrator
                      ? 'bg-slate-950/50 border-slate-800/80 italic text-slate-400'
                      : 'bg-slate-850/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 font-bold">
                    {!isNarrator && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: charColor }}
                      ></span>
                    )}
                    <span style={{ color: isNarrator ? '#94A3B8' : charColor }}>
                      {log.speaker}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{log.text}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 text-center">
          <button
            onClick={onClose}
            className="px-6 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all"
          >
            Kembali ke Permainan
          </button>
        </div>
      </motion.div>
    </div>
  );
};
