import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Music, Key, Sparkles, Heart, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface LockerGameProps {
  onComplete: (score: number) => void;
}

interface CardItem {
  id: number;
  pairId: number;
  label: string;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS_CONFIG = [
  { pairId: 1, label: 'Surat Cinta Origami', icon: Mail, color: 'text-rose-400 bg-rose-500/20' },
  { pairId: 2, label: 'Kaset Melodi Indie', icon: Music, color: 'text-amber-400 bg-amber-500/20' },
  { pairId: 3, label: 'Kunci Loker Rahasia', icon: Key, color: 'text-yellow-400 bg-yellow-500/20' },
  { pairId: 4, label: 'Gantungan Bintang', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/20' },
  { pairId: 5, label: 'Foto Polaroid Kenangan', icon: Camera, color: 'text-emerald-400 bg-emerald-500/20' },
  { pairId: 6, label: 'Lipatan Hati Kertas', icon: Heart, color: 'text-pink-400 bg-pink-500/20' },
];

export const LockerGame: React.FC<LockerGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Initialize deck with 6 pairs shuffled
  useEffect(() => {
    const deck: CardItem[] = [];
    let idCounter = 1;
    ICONS_CONFIG.forEach((item) => {
      // First copy
      deck.push({
        id: idCounter++,
        pairId: item.pairId,
        label: item.label,
        iconName: item.label,
        isFlipped: false,
        isMatched: false,
      });
      // Second copy
      deck.push({
        id: idCounter++,
        pairId: item.pairId,
        label: item.label,
        iconName: item.label,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isWon || isGameOver) return;
    if (timeLeft <= 0) {
      setIsGameOver(true);
      sound.playWrong();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isWon, isGameOver]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    sound.playClick();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        // Matched!
        setTimeout(() => {
          sound.playHeartSparkle();
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
          setFlippedIndices([]);

          // Check if all matched
          const allMatched = newCards.every((c, i) =>
            i === firstIdx || i === secondIdx ? true : c.isMatched
          );
          if (allMatched) {
            setIsWon(true);
            sound.playCorrect();
          }
        }, 350);
      } else {
        // Not matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const getIconComponent = (pairId: number) => {
    const item = ICONS_CONFIG.find((c) => c.pairId === pairId);
    if (!item) return null;
    const IconComponent = item.icon;
    return <IconComponent className="w-6 h-6 md:w-8 md:h-8" />;
  };

  const matchedCount = cards.filter((c) => c.isMatched).length / 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-slate-900 border-2 border-rose-500/40 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-rose-400" />
              Misi: Titip Catatan Loker Rahasia
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cocokkan 6 pasang simbol kenangan sebelum Pak Bambang piket berkeliling!
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-sm md:text-base font-mono font-bold px-3 py-1 rounded-lg border ${
                timeLeft <= 10
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                  : 'bg-slate-800 text-amber-300 border-slate-700'
              }`}
            >
              ⏳ {timeLeft}d
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>Pasangan Terbuka: {matchedCount} / 6</span>
          <span className="text-rose-400 font-medium">Loker No. 17</span>
        </div>

        {/* Grid Cards (3x4) */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 my-2">
          {cards.map((card, idx) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(idx)}
              disabled={card.isMatched || card.isFlipped}
              className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center p-1 relative overflow-hidden ${
                card.isMatched
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : card.isFlipped
                  ? 'bg-slate-800 border-rose-400 text-white shadow-lg'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-400 cursor-pointer'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-1">{getIconComponent(card.pairId)}</div>
                  <span className="text-[9px] md:text-[11px] font-medium leading-tight">
                    {card.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold font-mono text-slate-500">?</span>
                  <span className="text-[9px] text-slate-500 font-mono">Loker</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Win / Lose Modals */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base mb-1">
                <CheckCircle2 className="w-5 h-5" /> Misi Berhasil! Surat Terselip Rapi!
              </div>
              <p className="text-xs text-emerald-200 mb-3">
                Kamu berhasil menyelipkan surat lipat origami cinta ke dalam loker tanpa ketahuan.
                Detak jantungmu berdebar bahagia! (+15 Poin Hati)
              </p>
              <button
                onClick={() => onComplete(15)}
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
              >
                Lanjutkan Cerita ✨
              </button>
            </motion.div>
          )}

          {isGameOver && !isWon && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-rose-950/80 border border-rose-500/50 rounded-xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-base mb-1">
                <AlertCircle className="w-5 h-5" /> Waktu Habis! Langkah Kaki Pak Bambang Terdengar!
              </div>
              <p className="text-xs text-rose-200 mb-3">
                Kamu buru-buru memasukkan surat ke sela loker terdekat dan pura-pura mengikat tali sepatu.
                Untung saja masih sempat terselip! (+8 Poin Hati)
              </p>
              <button
                onClick={() => onComplete(8)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-all text-sm"
              >
                Tetap Lanjutkan Cerita
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
