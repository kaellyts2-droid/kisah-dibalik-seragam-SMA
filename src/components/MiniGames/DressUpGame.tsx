import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shirt, Check, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

interface DressUpGameProps {
  onComplete: (outfit: 'casual' | 'seragam' | 'formal', bonusScore: number) => void;
}

interface OutfitOption {
  id: 'casual' | 'seragam' | 'formal';
  name: string;
  tagline: string;
  description: string;
  preferredBy: string;
  colorScheme: string;
  accentBadge: string;
}

const OUTFITS: OutfitOption[] = [
  {
    id: 'casual',
    name: 'Casual Retro Denim & Sneakers',
    tagline: 'Santai, Modis & Enerjik',
    description: 'Jaket denim vintage dengan kaos putih polos dan sneakers kanvas. Nyaman untuk diajak lari-lari berburu street food di festival!',
    preferredBy: 'Disukai Rian & Reza (Bonus Kelincahan & Candaan)',
    colorScheme: 'from-blue-600/30 to-indigo-800/30 border-blue-500/50',
    accentBadge: 'Gaya Gaul Populer',
  },
  {
    id: 'seragam',
    name: 'Seragam Modif Khas OSIS & Rompi Navy',
    tagline: 'Rapi, Intelek & Anggun',
    description: 'Kemeja putih lengan tergulung rapi dipadu rompi knitwear warna navy malam dengan pin lambang sekolah bersepuh emas.',
    preferredBy: 'Disukai Alya (Bonus Nilai Intelektual & Wibawa)',
    colorScheme: 'from-indigo-600/30 to-sky-800/30 border-indigo-500/50',
    accentBadge: 'Kharisma Teladan',
  },
  {
    id: 'formal',
    name: 'Batik Etnik Modern & Sentuhan Seni',
    tagline: 'Elegan, Berkarakter & Memikat',
    description: 'Kemeja batik tenun kontemporer motif mega mendung dengan potongan slim dan gelang anyam perak. Memancarkan aura seniman berkelas.',
    preferredBy: 'Disukai Semua Karakter (+Bonus Daya Tarik Hati Tertinggi)',
    colorScheme: 'from-amber-600/30 to-rose-800/30 border-amber-500/50',
    accentBadge: 'Karya Seni Hidup',
  },
];

const ACCESSORIES = [
  { id: 'bando', label: 'Bando Kucing Berpendar', icon: '🐱', hint: 'Kesan menggemaskan di bawah lampion' },
  { id: 'pin', label: 'Pin Gitar Akustik Indie', icon: '🎸', hint: 'Menunjukkan selera musik berkelas' },
  { id: 'gelang', label: 'Gelang Anyam Etnik', icon: '✨', hint: 'Aksen manis di pergelangan tangan' },
];

export const DressUpGame: React.FC<DressUpGameProps> = ({ onComplete }) => {
  const [selectedOutfit, setSelectedOutfit] = useState<'casual' | 'seragam' | 'formal'>('casual');
  const [selectedAcc, setSelectedAcc] = useState<string>('pin');

  const handleSelectOutfit = (id: 'casual' | 'seragam' | 'formal') => {
    sound.playClick();
    setSelectedOutfit(id);
  };

  const handleSelectAcc = (id: string) => {
    sound.playClick();
    setSelectedAcc(id);
  };

  const handleConfirm = () => {
    sound.playHeartSparkle();
    const bonus = selectedOutfit === 'formal' ? 20 : 15;
    onComplete(selectedOutfit, bonus);
  };

  const currentOutfitObj = OUTFITS.find((o) => o.id === selectedOutfit)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-slate-900 border-2 border-pink-500/40 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Shirt className="w-5 h-5 text-pink-400" />
              Pilih Baju Pensi (Festival Outfit Selector)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilihan gayamu malam ini akan memikat pandangan dan reaksi ketiga sahabatmu!
            </p>
          </div>
          <span className="text-xs bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-1 rounded-full font-medium">
            Festival Malam Pensi
          </span>
        </div>

        {/* Outfit Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {OUTFITS.map((outfit) => {
            const isSelected = selectedOutfit === outfit.id;
            return (
              <motion.button
                key={outfit.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectOutfit(outfit.id)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-b ${outfit.colorScheme} border-pink-400 shadow-lg shadow-pink-500/20`
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wide">
                      {outfit.accentBadge}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{outfit.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {outfit.description}
                  </p>
                </div>
                <div className="text-[10px] text-amber-300/90 font-medium border-t border-slate-700/60 pt-1.5 mt-auto">
                  💡 {outfit.preferredBy}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Accessories Selection */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 mb-2 block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Tambah Aksesoris Pemanis:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ACCESSORIES.map((acc) => {
              const isSelected = selectedAcc === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => handleSelectAcc(acc.id)}
                  className={`py-2 px-3 rounded-lg border text-xs flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-pink-600/30 border-pink-400 text-white font-bold'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-base">{acc.icon}</span>
                  <span className="truncate">{acc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Summary */}
        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl mb-4 text-xs text-slate-300 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-pink-500" />
          </div>
          <div>
            <span className="font-bold text-white">Gaya Terpilih: </span>
            <span className="text-pink-300 font-semibold">{currentOutfitObj.name}</span>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Siap memukau di panggung pensi dan membuat hati si dia berdegup kencang!
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Kenakan Pakaian & Menuju Pensi!
        </button>
      </motion.div>
    </div>
  );
};
