/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Sun, Sunset, Moon, CloudSun, Check, Sparkles, BookOpen } from 'lucide-react';
import {
  PlayerState,
  Archetype,
  DialogueChoice,
  CharacterId,
  ChatMessage,
} from './types/game';
import { STORY_NODES } from './data/storyScript';
import { CHARACTERS } from './data/characters';
import { sound } from './utils/audio';

import { BackgroundScene } from './components/BackgroundScene';
import { CharacterSprite } from './components/CharacterSprite';
import { DialogueBox } from './components/DialogueBox';
import { SmartphoneModal } from './components/SmartphoneModal';
import { HistoryLogModal } from './components/HistoryLogModal';
import { LockerGame } from './components/MiniGames/LockerGame';
import { DressUpGame } from './components/MiniGames/DressUpGame';
import { StudyQuizGame } from './components/MiniGames/StudyQuizGame';
import { CharacterCreation } from './components/CharacterCreation';
import { EndingScreen } from './components/EndingScreen';

const SAVE_KEY = 'kisah_seragam_save';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function App() {
  const [gameState, setGameState] = useState<PlayerState | null>(null);
  const [hasSaveData, setHasSaveData] = useState<boolean>(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [activeMiniGame, setActiveMiniGame] = useState<'loker' | 'dressup' | 'quiz' | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(false);
  const [saveIndicator, setSaveIndicator] = useState<boolean>(false);

  // Check saved game on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        setHasSaveData(true);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save state helper
  const saveToLocalStorage = useCallback((state: PlayerState) => {
    try {
      const stateToSave = {
        ...state,
        savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 2000);
    } catch {
      // Ignore
    }
  }, []);

  // Start new game
  const handleStartGame = (name: string, archetype: Archetype) => {
    const startingAcademic = archetype === 'ketua_osis' ? 75 : 55;
    const initialStoryNode = 'ch1_start';
    const firstNode = STORY_NODES[initialStoryNode];

    const newState: PlayerState = {
      name,
      gender: 'kamu',
      archetype,
      chapter: 1,
      currentNodeId: initialStoryNode,
      affinity: { rian: 10, alya: 10, reza: 15 },
      friendship: 20,
      academicScore: startingAcademic,
      unlockedMemories: ['mem_mos'],
      chatMessages: [
        {
          id: 'welcome_reza',
          sender: 'reza',
          senderName: 'Reza Pratama',
          text: `Semangat hari pertama MOS, ${name}! Nanti istirahat kabarin gue ya.`,
          timestamp: '06:45',
          isRead: false,
          avatarColor: 'reza',
        },
      ],
      unreadChatCount: 1,
      historyLog: [
        {
          speaker: firstNode.speaker,
          text: firstNode.text,
          characterId: firstNode.characterId,
        },
      ],
      completedMiniGames: {},
      isGameOver: false,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGameState(newState);
    saveToLocalStorage(newState);
  };

  // Continue existing saved game
  const handleContinueGame = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlayerState;
        setGameState(parsed);
      }
    } catch {
      // Ignore
    }
  };

  // Trigger floating heart effect
  const spawnHearts = (color: string = '#F43F5E') => {
    const newHearts: FloatingHeart[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30, // 35% - 65% width
      y: 60 + Math.random() * 20,
      color,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1500);
  };

  // Advance dialogue node
  const advanceToNode = (targetNodeId: string, choiceMade?: DialogueChoice) => {
    if (!gameState) return;
    const nextNode = STORY_NODES[targetNodeId];
    if (!nextNode) {
      if (targetNodeId === 'ch4_calculate_ending') {
        setGameState((prev) => (prev ? { ...prev, isGameOver: true } : null));
      }
      return;
    }

    setGameState((prev) => {
      if (!prev) return null;

      const affinityMultiplier = prev.archetype === 'murid_baru' ? 1.25 : 1.0;
      const newAffinity = { ...prev.affinity };

      if (choiceMade?.targetCharacter && choiceMade.affinityDelta) {
        const added = Math.round(choiceMade.affinityDelta * affinityMultiplier);
        newAffinity[choiceMade.targetCharacter] = Math.min(
          100,
          newAffinity[choiceMade.targetCharacter] + added
        );
        spawnHearts(CHARACTERS[choiceMade.targetCharacter].accentColor);
        sound.playHeartSparkle();
      }

      const newFriendship = prev.friendship + (choiceMade?.friendshipDelta || 0);
      const newAcademic = Math.min(100, prev.academicScore + (choiceMade?.academicDelta || 0));

      const newMemories = [...prev.unlockedMemories];
      const memToUnlock = nextNode.unlockMemoryId || choiceMade?.unlockMemoryId;
      if (memToUnlock && !newMemories.includes(memToUnlock)) {
        newMemories.push(memToUnlock);
      }

      // Check incoming phone chat
      const newChats = [...prev.chatMessages];
      let newUnreadCount = prev.unreadChatCount;
      if (nextNode.triggerChat) {
        newChats.push({
          id: nextNode.triggerChat.id,
          sender: nextNode.triggerChat.sender,
          senderName: nextNode.triggerChat.senderName,
          text: nextNode.triggerChat.text,
          timestamp: nextNode.triggerChat.time,
          isRead: false,
          avatarColor: nextNode.triggerChat.sender,
        });
        newUnreadCount += 1;
        sound.playNotification();
      }

      // Log
      const newLogs = [
        ...prev.historyLog,
        ...(choiceMade
          ? [{ speaker: prev.name, text: choiceMade.text, characterId: 'player' as const }]
          : []),
        {
          speaker: nextNode.speaker,
          text: nextNode.text,
          characterId: nextNode.characterId,
        },
      ];

      // Mini-game check
      if (nextNode.triggerMiniGame && !prev.completedMiniGames[nextNode.triggerMiniGame]) {
        setActiveMiniGame(nextNode.triggerMiniGame);
      }

      // Ending trigger check
      const isEnding = nextNode.id === 'ch4_calculate_ending';

      const updated: PlayerState = {
        ...prev,
        chapter: nextNode.chapter,
        currentNodeId: nextNode.id,
        affinity: newAffinity,
        friendship: newFriendship,
        academicScore: newAcademic,
        unlockedMemories: newMemories,
        chatMessages: newChats,
        unreadChatCount: newUnreadCount,
        historyLog: newLogs.slice(-50), // keep last 50
        isGameOver: isEnding,
        savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      saveToLocalStorage(updated);
      return updated;
    });
  };

  // Choice handler
  const handleChoiceSelect = (choice: DialogueChoice) => {
    advanceToNode(choice.nextNodeId, choice);
  };

  // Next click handler
  const handleNextDialogue = () => {
    if (!gameState) return;
    const currentNode = STORY_NODES[gameState.currentNodeId];
    if (currentNode?.nextNodeId) {
      advanceToNode(currentNode.nextNodeId);
    } else if (gameState.currentNodeId === 'ch4_calculate_ending') {
      setGameState((prev) => (prev ? { ...prev, isGameOver: true } : null));
    }
  };

  // Mini-game completions
  const handleLockerComplete = (bonusScore: number) => {
    setActiveMiniGame(null);
    setGameState((prev) => {
      if (!prev) return null;
      const updated: PlayerState = {
        ...prev,
        affinity: {
          ...prev.affinity,
          rian: Math.min(100, prev.affinity.rian + bonusScore),
          alya: Math.min(100, prev.affinity.alya + bonusScore),
          reza: Math.min(100, prev.affinity.reza + bonusScore),
        },
        completedMiniGames: { ...prev.completedMiniGames, loker: true },
      };
      saveToLocalStorage(updated);
      return updated;
    });
    // Continue next node
    advanceToNode('ch1_selesai');
  };

  const handleDressUpComplete = (outfit: 'casual' | 'seragam' | 'formal', bonusScore: number) => {
    setActiveMiniGame(null);
    setGameState((prev) => {
      if (!prev) return null;
      const updated: PlayerState = {
        ...prev,
        outfitChoice: outfit,
        friendship: prev.friendship + bonusScore,
        completedMiniGames: { ...prev.completedMiniGames, dressup: true },
      };
      saveToLocalStorage(updated);
      return updated;
    });
    advanceToNode('ch2_festival_stroll');
  };

  const handleQuizComplete = (bonusScore: number) => {
    setActiveMiniGame(null);
    setGameState((prev) => {
      if (!prev) return null;
      const updated: PlayerState = {
        ...prev,
        academicScore: Math.min(100, prev.academicScore + bonusScore),
        affinity: {
          rian: Math.min(100, prev.affinity.rian + 10),
          alya: Math.min(100, prev.affinity.alya + 12),
          reza: Math.min(100, prev.affinity.reza + 10),
        },
        completedMiniGames: { ...prev.completedMiniGames, quiz: true },
      };
      saveToLocalStorage(updated);
      return updated;
    });
    advanceToNode('ch3_after_quiz');
  };

  // Chat message send handler
  const handleSendMessage = (target: CharacterId, text: string) => {
    if (!gameState) return;
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'player',
      senderName: gameState.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      avatarColor: target,
    };

    setGameState((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        chatMessages: [...prev.chatMessages, userMsg],
      };
      saveToLocalStorage(updated);
      return updated;
    });

    // Simulated auto-reply from crush after 1 second!
    setTimeout(() => {
      sound.playNotification();
      let replyText = 'Haha iya bener banget! Kamu selalu ngerti deh.';
      if (target === 'rian') {
        replyText = 'Besok pulang sekolah nonton gue latihan basket yuk!';
      } else if (target === 'alya') {
        replyText = 'Senang sekali bisa bertukar pesan denganmu malam ini...';
      } else if (target === 'reza') {
        replyText = 'Wkwk dasar lu! Jangan lupa PR besok pagi ya!';
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: target,
        senderName: CHARACTERS[target].name,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        avatarColor: target,
      };

      setGameState((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          chatMessages: [...prev.chatMessages, botMsg],
          unreadChatCount: prev.unreadChatCount + 1,
        };
        saveToLocalStorage(updated);
        return updated;
      });
    }, 1200);
  };

  // Toggle BGM
  const handleToggleBgm = () => {
    const newState = sound.toggleBgm();
    setBgmEnabled(newState);
  };

  // Reset Game
  const handleResetGame = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // Ignore
    }
    setGameState(null);
    setHasSaveData(false);
    setIsPhoneOpen(false);
    setIsHistoryOpen(false);
    setActiveMiniGame(null);
  };

  // Time of Day icon helper
  const getTimeIcon = (time: string) => {
    switch (time) {
      case 'pagi':
        return <Sun className="w-3.5 h-3.5 text-amber-300" />;
      case 'siang':
        return <CloudSun className="w-3.5 h-3.5 text-sky-300" />;
      case 'senja':
        return <Sunset className="w-3.5 h-3.5 text-orange-400" />;
      case 'malam':
        return <Moon className="w-3.5 h-3.5 text-indigo-300" />;
      default:
        return null;
    }
  };

  // If no game active, show Character Creation Screen
  if (!gameState) {
    return (
      <CharacterCreation
        onStart={handleStartGame}
        hasSavedGame={hasSaveData}
        onContinue={handleContinueGame}
      />
    );
  }

  // If game is over, show Ending Screen
  if (gameState.isGameOver) {
    return (
      <EndingScreen
        playerState={gameState}
        onRestart={handleResetGame}
        onOpenGallery={() => setIsPhoneOpen(true)}
      />
    );
  }

  const currentNode = STORY_NODES[gameState.currentNodeId] || STORY_NODES['ch1_start'];

  return (
    <div className="relative w-screen h-screen bg-slate-950 flex items-center justify-center overflow-hidden font-sans select-none">
      {/* 16:9 Aspect Ratio Container for Cinematic Visual Novel Experience */}
      <div className="relative w-full h-full max-w-6xl max-h-[820px] shadow-2xl overflow-hidden flex flex-col justify-between border-slate-800 md:border-2 md:rounded-3xl bg-slate-950">
        
        {/* Background Scene */}
        <div className="absolute inset-0 z-0">
          <BackgroundScene scene={currentNode.scene} timeOfDay={currentNode.timeOfDay} />
        </div>

        {/* Floating Heart Particles */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {floatingHearts.map((h) => (
            <div
              key={h.id}
              className="absolute animate-float-heart"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 drop-shadow-lg" />
            </div>
          ))}
        </div>

        {/* Top Game HUD Bar */}
        <header className="relative z-20 w-full px-4 py-3 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-slate-900/80 backdrop-blur border border-slate-700/80 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>{currentNode.chapterTitle}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 backdrop-blur border border-slate-700/80 rounded-xl text-xs text-slate-300 font-medium">
              {getTimeIcon(currentNode.timeOfDay)}
              <span className="capitalize">{currentNode.timeOfDay}</span>
            </div>
          </div>

          {/* Quick Affinity HUD indicators */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 bg-slate-900/80 backdrop-blur border border-slate-700/80 px-3 py-1 rounded-xl text-xs">
              <div className="flex items-center gap-1" title="Rian Baskara Affinity">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="text-orange-300 font-mono font-bold">{gameState.affinity.rian}%</span>
              </div>
              <div className="flex items-center gap-1" title="Alya Safira Affinity">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="text-sky-300 font-mono font-bold">{gameState.affinity.alya}%</span>
              </div>
              <div className="flex items-center gap-1" title="Reza Pratama Affinity">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span className="text-pink-300 font-mono font-bold">{gameState.affinity.reza}%</span>
              </div>
            </div>

            {/* Auto-save Toast indicator */}
            {saveIndicator && (
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                <Check className="w-3 h-3" /> Tersimpan
              </span>
            )}
          </div>
        </header>

        {/* Center Character Sprites Area */}
        <div className="relative flex-1 flex items-end justify-center z-10 px-4">
          <CharacterSprite
            characterId={currentNode.characterId}
            expression={currentNode.expression}
          />
        </div>

        {/* Bottom Dialogue Box & Controls */}
        <footer className="relative z-20 w-full p-3 md:p-6 pb-4">
          <DialogueBox
            speaker={currentNode.speaker}
            characterId={currentNode.characterId}
            text={currentNode.text}
            choices={currentNode.choices}
            playerArchetype={gameState.archetype}
            onChoiceSelect={handleChoiceSelect}
            onNext={handleNextDialogue}
            onOpenSmartphone={() => {
              sound.playClick();
              setIsPhoneOpen(true);
              // Clear unread badge
              setGameState((prev) => (prev ? { ...prev, unreadChatCount: 0 } : null));
            }}
            onOpenHistory={() => {
              sound.playClick();
              setIsHistoryOpen(true);
            }}
            onToggleBgm={handleToggleBgm}
            bgmEnabled={bgmEnabled}
            unreadCount={gameState.unreadChatCount}
          />
        </footer>
      </div>

      {/* Interactive Smartphone Modal HUD */}
      <SmartphoneModal
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        playerState={gameState}
        onSendMessage={handleSendMessage}
        onToggleBgm={handleToggleBgm}
        bgmEnabled={bgmEnabled}
        onResetGame={handleResetGame}
      />

      {/* History Log Modal */}
      <HistoryLogModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        logs={gameState.historyLog}
      />

      {/* Mini-Games Modals */}
      <AnimatePresence>
        {activeMiniGame === 'loker' && (
          <LockerGame onComplete={handleLockerComplete} />
        )}
        {activeMiniGame === 'dressup' && (
          <DressUpGame onComplete={handleDressUpComplete} />
        )}
        {activeMiniGame === 'quiz' && (
          <StudyQuizGame onComplete={handleQuizComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
