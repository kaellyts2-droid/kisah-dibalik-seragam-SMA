import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Award, Sparkles, RotateCcw, Share2, BookOpen } from 'lucide-react';
import { PlayerState, CharacterId } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { sound } from '../utils/audio';

interface EndingScreenProps {
  playerState: PlayerState;
  onRestart: () => void;
  onOpenGallery: () => void;
}

interface EndingDetails {
  title: string;
  badge: string;
  subtitle: string;
  storyText: string;
  themeColor: string;
  characterId?: CharacterId;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  playerState,
  onRestart,
  onOpenGallery,
}) => {
  // Determine ending based on state
  const determineEnding = (): EndingDetails => {
    const { rian, alya, reza } = playerState.affinity;
    const maxAffinity = Math.max(rian, alya, reza);

    // True Romantic Endings (>75% affinity)
    if (rian >= 75 && rian === maxAffinity) {
      return {
        title: 'True Ending: Janji di Lapangan Basket',
        badge: 'Kisah Cinta Rian Baskara ❤️',
        subtitle: 'Kapten Basket & Bintang Hatimu',
        storyText: `Beberapa tahun setelah hari wisuda itu, Rian kini bermain di liga basket profesional kampus. Namun setiap kali memenangkan pertandingan besar, ia selalu melambaikan tangan ke bangku tribun tempatmu duduk tersenyum.\n\n"Piala ini cuma bonus, ${playerState.name}. Kemenangan terbesarku adalah bisa menggenggam tanganmu sejak hari pertama kita bertabrakan di kantin sekolah."`,
        themeColor: '#EA580C',
        characterId: 'rian',
      };
    }

    if (alya >= 75 && alya === maxAffinity) {
      return {
        title: 'True Ending: Bab Terakhir di Sudut Perpustakaan',
        badge: 'Kisah Cinta Alya Safira 💙',
        subtitle: 'Penulis Novel & Belahan Jiwa',
        storyText: `Novel romantis perdana Alya akhirnya resmi diterbitkan secara nasional dan menjadi best-seller. Pada lembar persembahan pertama, tertulis sebuah kalimat emas yang membuat matamu berkaca-kaca:\n\n"Untuk ${playerState.name}, tokoh utama dalam hidupku. Terima kasih telah mengajarkanku bahwa cinta sejati bukan hanya dongeng di dalam rak buku perpustakaan."`,
        themeColor: '#0284C7',
        characterId: 'alya',
      };
    }

    if (reza >= 75 && reza === maxAffinity) {
      return {
        title: 'True Ending: Bukan Lagi Sekadar Sahabat',
        badge: 'Kisah Cinta Reza Pratama 💖',
        subtitle: 'Sahabat Masa Kecil Jadi Pasangan Sejati',
        storyText: `Reza menepati semua janji manisnya. Persahabatan bertahun-tahun itu kini telah mekar menjadi cinta paling dewasa dan saling melengkapi. Kalian berdua masih sering jajan cilok berdua, namun sekarang dengan genggaman jemari yang bertaut erat.\n\n"Dari bangku belakang kelas sampai pelaminan nanti, cuma kamu satu-satunya orang yang gak pernah bikin gue bosan, ${playerState.name}."`,
        themeColor: '#EC4899',
        characterId: 'reza',
      };
    }

    // Best Friends Forever Ending (>60% friendship and good academic score)
    if (playerState.friendship >= 50 || playerState.academicScore >= 70) {
      return {
        title: 'BFF Ending: Geng Kantin Selamanya',
        badge: 'Persahabatan Abadi SMA 🌟',
        subtitle: 'Empat Sahabat Menggapai Bintang',
        storyText: `Meskipun masing-masing menempuh jurusan dan universitas berbeda di kota yang berjauhan, kalian berempat tak pernah putus kabar. Setiap liburan semester, meja kantin legendaris Bu Sri selalu menjadi saksi reuni penuh tawa dan rindu yang hangat.\n\n"Seragam putih abu-abu boleh tersimpan rapi di lemari, tapi persaudaraan kita akan abadi melintasi waktu."`,
        themeColor: '#10B981',
      };
    }

    // Bittersweet Separation Ending
    return {
      title: 'Bittersweet Ending: Lagu yang Tak Sempat Tuntas',
      badge: 'Nostalgia Perpisahan 🍂',
      subtitle: 'Sebuah Rasa yang Tersimpan Rapi di Sudut Hati',
      storyText: `Langkah kaki membawa kalian ke persimpangan jalan yang berbeda. Tidak ada kata cinta yang sempat terucap di hari kelulusan, namun di setiap senja yang jatuh di loteng sekolah, kamu selalu tersenyum mengenang masa-masa indah berseragam SMA.\n\n"Beberapa pertemuan ditakdirkan bukan untuk bersatu, melainkan untuk membuat kita tumbuh menjadi pribadi yang lebih bijak."`,
      themeColor: '#8B5CF6',
    };
  };

  const ending = determineEnding();

  useEffect(() => {
    sound.playHeartSparkle();
    // Confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FB7185', '#F43F5E', '#FBBF24', '#38BDF8', '#A855F7'],
      });
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-950 select-none overflow-y-auto">
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${ending.themeColor}, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900/95 border-2 border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col text-center my-6"
      >
        {/* Ending Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mx-auto mb-3 shadow-md"
          style={{
            backgroundColor: `${ending.themeColor}25`,
            borderColor: ending.themeColor,
            color: ending.themeColor,
            borderWidth: '1px',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {ending.badge}
        </div>

        {/* Ending Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
          {ending.title}
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium">
          {ending.subtitle}
        </p>

        {/* Story Card */}
        <div className="p-5 md:p-6 bg-slate-950/70 border border-slate-800 rounded-2xl text-left mb-6 relative shadow-inner">
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-serif italic">
            {ending.storyText}
          </p>
        </div>

        {/* Final Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Hati Rian</span>
            <span className="text-base font-bold text-orange-400 font-mono">
              {playerState.affinity.rian}%
            </span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Hati Alya</span>
            <span className="text-base font-bold text-sky-400 font-mono">
              {playerState.affinity.alya}%
            </span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Hati Reza</span>
            <span className="text-base font-bold text-pink-400 font-mono">
              {playerState.affinity.reza}%
            </span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Nilai Rapor</span>
            <span className="text-base font-bold text-indigo-400 font-mono">
              {playerState.academicScore}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onOpenGallery();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            Buka Album Polaroid Kenangan
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            Main Ulang & Pilih Cinta Lain
          </button>
        </div>
      </motion.div>
    </div>
  );
};
