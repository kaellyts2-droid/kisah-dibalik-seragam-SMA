import React from 'react';
import { SceneLocation, TimeOfDay } from '../types/game';

interface BackgroundSceneProps {
  scene: SceneLocation;
  timeOfDay: TimeOfDay;
}

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({ scene, timeOfDay }) => {
  // Ambient overlay colors based on time of day
  const getTimeFilter = () => {
    switch (timeOfDay) {
      case 'pagi':
        return 'bg-amber-400/10 mix-blend-soft-light';
      case 'siang':
        return 'bg-sky-400/5';
      case 'senja':
        return 'bg-gradient-to-t from-orange-600/30 via-rose-500/20 to-purple-900/40 mix-blend-color-burn';
      case 'malam':
        return 'bg-slate-950/60 mix-blend-multiply';
      default:
        return '';
    }
  };

  const renderSceneIllustration = () => {
    switch (scene) {
      case 'gerbang':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 overflow-hidden">
            {/* School Gate Arch & Trees */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
              <div className="px-6 py-2 bg-slate-900/80 backdrop-blur border-2 border-amber-400/80 rounded-xl shadow-xl">
                <span className="text-xs md:text-sm tracking-widest text-amber-300 font-bold uppercase">
                  SMA NUSANTARA JAKARTA
                </span>
              </div>
            </div>
            {/* Gate Pillars */}
            <div className="absolute bottom-0 left-8 md:left-24 w-12 md:w-20 h-64 bg-slate-700 border-r-4 border-slate-600 shadow-2xl rounded-t-lg">
              <div className="h-6 bg-amber-400/40 w-full mb-4"></div>
            </div>
            <div className="absolute bottom-0 right-8 md:right-24 w-12 md:w-20 h-64 bg-slate-700 border-l-4 border-slate-600 shadow-2xl rounded-t-lg">
              <div className="h-6 bg-amber-400/40 w-full mb-4"></div>
            </div>
            {/* School Building Silhouette in background */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-slate-800/40 backdrop-blur-sm rounded-t-3xl border-t border-slate-700/50 flex justify-around items-center px-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-10 h-16 bg-sky-200/50 rounded-md border border-slate-600/30"></div>
              ))}
            </div>
            {/* Ground Asphalt */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 border-t-4 border-amber-400/40"></div>
          </div>
        );

      case 'kelas':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 overflow-hidden">
            {/* Windows on the left */}
            <div className="absolute top-8 left-6 w-32 md:w-48 h-64 bg-sky-200/80 border-4 border-amber-800/40 rounded-lg shadow-inner overflow-hidden grid grid-cols-2 grid-rows-3 gap-1 p-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-sky-100/90 rounded border border-sky-300/60"></div>
              ))}
            </div>
            {/* Light beam from window */}
            <div className="absolute -top-10 left-10 w-96 h-96 bg-amber-300/20 rotate-45 pointer-events-none blur-2xl"></div>
            {/* Blackboard */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/5 max-w-lg h-36 bg-emerald-900 border-8 border-amber-900 rounded-lg shadow-2xl flex flex-col justify-center items-center text-emerald-100/90 p-4 font-mono text-center">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">XII MIPA 1 • SMA NUSANTARA</span>
              <p className="text-xs italic mt-1 text-emerald-200">"Masa depan milik mereka yang percaya pada keindahan mimpi-mimpinya."</p>
            </div>
            {/* Wooden Classroom Desks */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-amber-950 via-amber-900 to-amber-800 border-t-8 border-amber-700"></div>
          </div>
        );

      case 'kantin':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-orange-200 via-amber-100 to-orange-200 overflow-hidden">
            {/* Canteen Banner */}
            <div className="absolute top-8 inset-x-12 h-14 bg-rose-600 rounded-lg shadow-lg flex items-center justify-between px-6 text-white font-bold text-sm md:text-base border-b-4 border-rose-800">
              <span>☕ KANTIN KEJUJURAN SMA NUSANTARA</span>
              <span className="hidden md:inline text-xs bg-rose-800 px-3 py-1 rounded-full">Menu: Es Teh Jumbo • Bakso • Siomay</span>
            </div>
            {/* Stalls in background */}
            <div className="absolute bottom-24 inset-x-10 flex justify-around">
              <div className="w-24 md:w-36 h-36 bg-amber-700 rounded-t-xl border-t-4 border-amber-500 shadow-md flex flex-col items-center justify-center text-white text-xs font-semibold p-2 text-center">
                <span>🥤 Stan Es & Jus Segar Bu Sri</span>
              </div>
              <div className="w-28 md:w-44 h-40 bg-orange-700 rounded-t-xl border-t-4 border-orange-500 shadow-md flex flex-col items-center justify-center text-white text-xs font-semibold p-2 text-center">
                <span>🍜 Mie Ayam & Bakso Pak Kumis</span>
              </div>
              <div className="w-24 md:w-36 h-36 bg-amber-800 rounded-t-xl border-t-4 border-amber-600 shadow-md flex flex-col items-center justify-center text-white text-xs font-semibold p-2 text-center">
                <span>🍢 Aneka Gorengan & Cilok</span>
              </div>
            </div>
            {/* Wooden bench tables */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-amber-900 border-t-8 border-amber-700"></div>
          </div>
        );

      case 'perpustakaan':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-amber-950/80 to-stone-950 overflow-hidden">
            {/* Warm Bookshelves left & right */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-amber-950 border-r-4 border-amber-800 flex flex-col justify-around py-6 px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-amber-900 border-b-2 border-amber-700 flex gap-1 items-end px-1">
                  <div className="w-2 h-6 bg-red-700 rounded-t-xs"></div>
                  <div className="w-3 h-7 bg-blue-700 rounded-t-xs"></div>
                  <div className="w-2 h-5 bg-emerald-600 rounded-t-xs"></div>
                  <div className="w-2.5 h-6.5 bg-amber-500 rounded-t-xs"></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-amber-950 border-l-4 border-amber-800 flex flex-col justify-around py-6 px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-amber-900 border-b-2 border-amber-700 flex gap-1 items-end px-1">
                  <div className="w-2 h-5 bg-indigo-700 rounded-t-xs"></div>
                  <div className="w-3 h-7 bg-amber-600 rounded-t-xs"></div>
                  <div className="w-2.5 h-6 bg-rose-700 rounded-t-xs"></div>
                  <div className="w-2 h-5.5 bg-teal-600 rounded-t-xs"></div>
                </div>
              ))}
            </div>
            {/* Central warm lamp glow */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl"></div>
            {/* Reading sign */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-stone-800/90 border border-amber-500/40 rounded-full text-xs text-amber-300 font-medium">
              📖 RUANG BACA TENANG & LITERATUR
            </div>
            {/* Polished library table */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-900 to-amber-950 border-t-4 border-amber-600/60"></div>
          </div>
        );

      case 'loker':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
            {/* School Corridor Lockers Wall */}
            <div className="absolute inset-y-12 inset-x-6 md:inset-x-20 grid grid-cols-4 md:grid-cols-8 gap-2 p-4 bg-slate-900/60 rounded-xl border-4 border-slate-600 shadow-2xl">
              {[...Array(16)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-sky-800 to-slate-800 border-2 border-sky-600/40 rounded flex flex-col items-center justify-between p-2 shadow"
                >
                  <div className="w-6 h-1 bg-slate-950 rounded-full mb-1"></div>
                  <span className="text-[10px] text-sky-200 font-mono font-bold">{idx + 10}</span>
                  <div className="w-3 h-3 rounded-full bg-amber-400/70 border border-slate-900"></div>
                </div>
              ))}
            </div>
            {/* Polished floor */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-slate-950 border-t-2 border-sky-500/30"></div>
          </div>
        );

      case 'pensi':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 overflow-hidden">
            {/* Stage festival spot lights */}
            <div className="absolute top-0 left-1/4 w-32 h-96 bg-pink-500/20 rotate-12 blur-3xl pointer-events-none"></div>
            <div className="absolute top-0 right-1/4 w-32 h-96 bg-cyan-500/20 -rotate-12 blur-3xl pointer-events-none"></div>
            {/* Hanging Festival Fairy Lights */}
            <div className="absolute top-4 inset-x-4 flex justify-between px-6">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full shadow-lg animate-pulse ${
                    i % 3 === 0
                      ? 'bg-amber-300 shadow-amber-300/80'
                      : i % 3 === 1
                      ? 'bg-pink-400 shadow-pink-400/80'
                      : 'bg-cyan-300 shadow-cyan-300/80'
                  }`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
            {/* Stage Truss & Speakers */}
            <div className="absolute bottom-16 inset-x-8 md:inset-x-24 h-36 bg-gradient-to-t from-slate-900 to-purple-900/60 rounded-t-2xl border-t-4 border-pink-500/80 shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-pink-300 font-bold block">
                  ✨ PENSI SMA NUSANTARA FESTIVAL ✨
                </span>
                <span className="text-lg md:text-2xl font-extrabold text-white tracking-wide drop-shadow">
                  "Melodi Masa Depan & Kisah Kita"
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-slate-950"></div>
          </div>
        );

      case 'rooftop':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-orange-600 to-amber-400 overflow-hidden">
            {/* Giant Setting Sun */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-t from-amber-200 to-yellow-100 blur-sm shadow-2xl opacity-90"></div>
            {/* Distant City Skyline Silhouettes */}
            <div className="absolute bottom-16 inset-x-0 flex items-end justify-between px-4 opacity-40">
              <div className="w-16 h-28 bg-slate-950"></div>
              <div className="w-12 h-36 bg-slate-950"></div>
              <div className="w-20 h-44 bg-slate-950"></div>
              <div className="w-14 h-32 bg-slate-950"></div>
              <div className="w-18 h-40 bg-slate-950"></div>
              <div className="w-16 h-24 bg-slate-950"></div>
            </div>
            {/* Rooftop Chain-link Fence */}
            <div className="absolute bottom-8 inset-x-0 h-28 border-b-4 border-slate-700 bg-[linear-gradient(45deg,transparent_46%,#475569_49%,#475569_51%,transparent_54%),linear-gradient(-45deg,transparent_46%,#475569_49%,#475569_51%,transparent_54%)] bg-[length:14px_14px] opacity-70"></div>
            {/* Concrete Rooftop Ledge */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-slate-800 border-t-4 border-slate-600"></div>
          </div>
        );

      case 'wisuda':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 overflow-hidden">
            {/* Velvet Curtains & Flower Garlands */}
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-r from-red-900 via-rose-800 to-red-900 border-b-4 border-amber-400 flex items-center justify-center">
              <span className="text-amber-200 font-bold tracking-widest text-xs md:text-sm uppercase drop-shadow">
                🎓 MALAM PELEPASAN & WISUDA ANGKATAN KELULUSAN
              </span>
            </div>
            {/* Graduation Banners */}
            <div className="absolute top-20 inset-x-8 md:inset-x-32 flex justify-between">
              <div className="w-16 md:w-28 h-48 bg-amber-500/20 border border-amber-400/40 rounded-b-lg flex flex-col items-center justify-center p-2 text-center text-xs text-amber-200">
                <span>SEKOLAH TERCINTA</span>
              </div>
              <div className="w-16 md:w-28 h-48 bg-amber-500/20 border border-amber-400/40 rounded-b-lg flex flex-col items-center justify-center p-2 text-center text-xs text-amber-200">
                <span>ANGKATAN EMAS</span>
              </div>
            </div>
            {/* Celebration stage floor */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950 via-rose-950/40 to-slate-900 border-t-4 border-amber-400/60"></div>
          </div>
        );

      default:
        return <div className="absolute inset-0 bg-slate-900"></div>;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {renderSceneIllustration()}
      {/* Dynamic ambient time-of-day overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${getTimeFilter()}`} />
    </div>
  );
};
