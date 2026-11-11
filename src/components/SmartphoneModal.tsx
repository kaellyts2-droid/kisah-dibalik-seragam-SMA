import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Heart,
  Image as ImageIcon,
  Settings,
  X,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  GraduationCap,
  Users,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';
import { PlayerState, CharacterId, MemoryCard } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { MEMORY_CARDS } from '../data/memories';
import { sound } from '../utils/audio';

interface SmartphoneModalProps {
  playerState: PlayerState;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (target: CharacterId, text: string) => void;
  onToggleBgm: () => void;
  bgmEnabled: boolean;
  onResetGame: () => void;
}

export const SmartphoneModal: React.FC<SmartphoneModalProps> = ({
  playerState,
  isOpen,
  onClose,
  onSendMessage,
  onToggleBgm,
  bgmEnabled,
  onResetGame,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'love' | 'gallery' | 'settings'>('chat');
  const [selectedContact, setSelectedContact] = useState<CharacterId>('reza');
  const [replyInput, setReplyInput] = useState<string>('');
  const [previewMemory, setPreviewMemory] = useState<MemoryCard | null>(null);

  if (!isOpen) return null;

  const handleSendReply = () => {
    if (!replyInput.trim() || !onSendMessage) return;
    sound.playClick();
    onSendMessage(selectedContact, replyInput.trim());
    setReplyInput('');
  };

  const getAffinityStatus = (score: number) => {
    if (score >= 80) return { label: 'Jatuh Cinta Berat 💖', color: 'text-rose-400' };
    if (score >= 50) return { label: 'Saling Berdebar 💓', color: 'text-pink-400' };
    if (score >= 25) return { label: 'Teman Sangat Akrab ✨', color: 'text-amber-400' };
    return { label: 'Teman Sekelas Biasa 🌱', color: 'text-slate-400' };
  };

  const filteredChats = playerState.chatMessages.filter(
    (m) => m.sender === selectedContact || (m.sender === 'player' && m.avatarColor === selectedContact)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm h-[620px] bg-slate-950 border-4 border-slate-700 rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Smartphone Notch & Speaker Bar */}
        <div className="relative w-full h-7 bg-slate-900 flex items-center justify-between px-6 pt-1 text-[11px] font-mono text-slate-400 select-none">
          <span>07:45</span>
          <div className="w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header App Bar */}
        <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-indigo-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-wide">
              {activeTab === 'chat' && '💬 Chat Nusantara'}
              {activeTab === 'love' && '💖 Radar Hati & Prestasi'}
              {activeTab === 'gallery' && '📸 Album Kenangan'}
              {activeTab === 'settings' && '⚙️ Pengaturan Ponsel'}
            </span>
          </div>
          <span className="text-[10px] text-rose-300 font-mono bg-rose-500/20 px-2 py-0.5 rounded-full">
            {playerState.name}
          </span>
        </div>

        {/* Content Body Area */}
        <div className="flex-1 overflow-y-auto p-3 text-slate-200">
          {/* TAB 1: CHAT APP */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              {/* Contact Switcher Buttons */}
              <div className="grid grid-cols-3 gap-1 mb-2.5 pb-2 border-b border-slate-800">
                {(['rian', 'alya', 'reza'] as CharacterId[]).map((cid) => {
                  const char = CHARACTERS[cid];
                  const isSelected = selectedContact === cid;
                  return (
                    <button
                      key={cid}
                      onClick={() => {
                        sound.playClick();
                        setSelectedContact(cid);
                      }}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-400'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: char.accentColor }}></span>
                      {char.name}
                    </button>
                  );
                })}
              </div>

              {/* Chat Thread Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-2">
                {filteredChats.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Belum ada pesan obrolan baru dengan {CHARACTERS[selectedContact].name}. Lanjutkan ceritamu!
                  </div>
                ) : (
                  filteredChats.map((msg) => {
                    const isPlayer = msg.sender === 'player';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isPlayer ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow ${
                            isPlayer
                              ? 'bg-rose-600 text-white rounded-br-none'
                              : 'bg-slate-850 border border-slate-750 text-slate-200 rounded-bl-none'
                          }`}
                        >
                          {!isPlayer && (
                            <span className="text-[10px] font-bold text-rose-300 block mb-0.5">
                              {msg.senderName}
                            </span>
                          )}
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Reply Form */}
              <div className="pt-2 border-t border-slate-800 flex gap-1.5 items-center">
                <input
                  type="text"
                  placeholder={`Kirim balasan ke ${CHARACTERS[selectedContact].name}...`}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  className="flex-1 bg-slate-900 border border-slate-750 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  onClick={handleSendReply}
                  className="w-8 h-8 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shrink-0 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LOVE METER & ACADEMIC STATS */}
          {activeTab === 'love' && (
            <div className="space-y-4 py-1">
              {/* Crushes Affinity Gauges */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" /> Pengukur Hati Karakter
                </h3>
                {(['rian', 'alya', 'reza'] as CharacterId[]).map((cid) => {
                  const char = CHARACTERS[cid];
                  const score = Math.min(100, playerState.affinity[cid]);
                  const status = getAffinityStatus(score);
                  return (
                    <div
                      key={cid}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: char.accentColor }}
                          ></span>
                          {char.fullName}
                        </span>
                        <span className="font-mono font-bold text-rose-400">{score}%</span>
                      </div>
                      {/* Bar */}
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${char.accentColor}, #F43F5E)`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className={status.color}>{status.label}</span>
                        <span className="text-slate-500">{char.badge}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* School Academic Score */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-400" /> Nilai Akademik & Rapor
                  </span>
                  <span className="font-mono font-bold text-indigo-300">
                    {playerState.academicScore} / 100
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, playerState.academicScore)}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  {playerState.academicScore >= 80
                    ? 'Prestasi gemilang! Peluang lolos PTN & Beasiswa Unggulan sangat tinggi.'
                    : playerState.academicScore >= 60
                    ? 'Nilai aman dan stabil. Terus belajar bersama teman-teman!'
                    : 'Perlu bimbingan belajar tambahan dari Alya agar tidak remedial.'}
                </p>
              </div>

              {/* Friendship Bond */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" /> Ikatan Sahabat Angkatan
                  </span>
                  <span className="font-mono font-bold text-emerald-300">
                    {playerState.friendship} Poin
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${Math.min(100, playerState.friendship)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTO ALBUM (MEMORY CARDS) */}
          {activeTab === 'gallery' && (
            <div className="space-y-3 py-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Album Kenangan Polaroid</span>
                <span>
                  {playerState.unlockedMemories.length} / {MEMORY_CARDS.length} Terbuka
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {MEMORY_CARDS.map((card) => {
                  const isUnlocked = playerState.unlockedMemories.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        if (isUnlocked) {
                          sound.playClick();
                          setPreviewMemory(card);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isUnlocked
                          ? 'bg-slate-900 border-amber-500/40 hover:border-amber-400 cursor-pointer shadow-md'
                          : 'bg-slate-950 border-slate-800 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="aspect-[4/3] rounded-lg bg-slate-850 mb-2 flex items-center justify-center overflow-hidden relative border border-slate-750">
                        {isUnlocked ? (
                          <div className="w-full h-full bg-gradient-to-br from-amber-900/40 via-rose-900/30 to-slate-900 flex flex-col items-center justify-center p-2 text-center">
                            <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
                            <span className="text-[9px] text-amber-200 font-bold uppercase tracking-wider">
                              Polaroid
                            </span>
                          </div>
                        ) : (
                          <div className="text-slate-600 text-xl font-mono">🔒</div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {isUnlocked ? card.title : 'Memori Terkunci'}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {isUnlocked ? card.characterName : 'Selesaikan bab cerita'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Polaroid Expanded Modal View */}
              {previewMemory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
                  <div className="w-full max-w-xs bg-amber-50 rounded-2xl p-4 shadow-2xl text-slate-900 border-8 border-white">
                    <div className="w-full aspect-square bg-slate-850 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden border">
                      <div className="w-full h-full bg-gradient-to-tr from-amber-800 via-rose-800 to-indigo-900 flex flex-col items-center justify-center text-center p-4">
                        <Sparkles className="w-10 h-10 text-amber-300 mb-2" />
                        <span className="text-white font-bold text-sm">{previewMemory.title}</span>
                        <span className="text-amber-200 text-xs mt-1">SMA Nusantara Memori</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{previewMemory.title}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed mb-3">
                      {previewMemory.description}
                    </p>
                    <p className="font-handwriting text-lg text-rose-700 leading-tight italic">
                      {previewMemory.quote}
                    </p>
                    <button
                      onClick={() => setPreviewMemory(null)}
                      className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                    >
                      Tutup Kenangan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 py-2">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Pengaturan Suara
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Musik Lofi Akustik (BGM)</span>
                  <button
                    onClick={onToggleBgm}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                      bgmEnabled
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {bgmEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    {bgmEnabled ? 'Aktif' : 'Mati'}
                  </button>
                </div>
              </div>

              {/* Progress & Save Info */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Status Penyimpanan:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Auto-Saved
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Tersimpan di browser: {playerState.savedAt || 'Baru saja'}
                </div>
              </div>

              {/* Reset Game */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onResetGame}
                  className="w-full py-2.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Mulai Cerita dari Awal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Smartphone Navigation Bar */}
        <div className="bg-slate-900 border-t border-slate-800 grid grid-cols-4 py-2 px-1">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('chat');
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-medium transition-all ${
              activeTab === 'chat' ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('love');
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-medium transition-all ${
              activeTab === 'love' ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-5 h-5 mb-0.5" />
            <span>Radar Hati</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('gallery');
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-medium transition-all ${
              activeTab === 'gallery' ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-5 h-5 mb-0.5" />
            <span>Album</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('settings');
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-medium transition-all ${
              activeTab === 'settings' ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span>Setelan</span>
          </button>
        </div>

        {/* Smartphone Home Indicator bar */}
        <div className="h-4 bg-slate-950 flex items-center justify-center">
          <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};
