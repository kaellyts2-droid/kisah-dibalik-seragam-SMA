export type Archetype = 'murid_baru' | 'ketua_osis' | 'klub_seni';

export type CharacterId = 'rian' | 'alya' | 'reza';

export type SceneLocation = 
  | 'gerbang' 
  | 'kelas' 
  | 'kantin' 
  | 'perpustakaan' 
  | 'loker' 
  | 'rooftop' 
  | 'pensi' 
  | 'wisuda';

export type TimeOfDay = 'pagi' | 'siang' | 'senja' | 'malam';

export type CharacterExpression = 'normal' | 'senyum' | 'blush' | 'kaget' | 'fokus' | 'sedih';

export interface DialogueChoice {
  id: string;
  text: string;
  type: 'sweet' | 'casual' | 'bold' | 'archetype_secret';
  targetCharacter?: CharacterId;
  affinityDelta?: number;
  friendshipDelta?: number;
  academicDelta?: number;
  requiredArchetype?: Archetype;
  reactionText?: string;
  reactionSpeaker?: string;
  reactionExpression?: CharacterExpression;
  nextNodeId: string;
  unlockMemoryId?: string;
}

export interface DialogueNode {
  id: string;
  chapter: 1 | 2 | 3 | 4;
  chapterTitle: string;
  scene: SceneLocation;
  timeOfDay: TimeOfDay;
  speaker: string;
  characterId?: CharacterId | 'narator' | 'guru' | 'player';
  expression?: CharacterExpression;
  text: string;
  choices?: DialogueChoice[];
  nextNodeId?: string;
  triggerMiniGame?: 'loker' | 'dressup' | 'quiz';
  triggerChat?: {
    id: string;
    sender: CharacterId;
    senderName: string;
    text: string;
    time: string;
  };
  unlockMemoryId?: string;
}

export interface ChatMessage {
  id: string;
  sender: CharacterId | 'player';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  avatarColor: string;
}

export interface MemoryCard {
  id: string;
  title: string;
  characterId: CharacterId | 'all';
  characterName: string;
  description: string;
  quote: string;
  unlockedAt?: string;
  sceneType: string;
}

export interface PlayerState {
  name: string;
  gender: 'dia' | 'kamu';
  archetype: Archetype;
  chapter: 1 | 2 | 3 | 4;
  currentNodeId: string;
  affinity: {
    rian: number;
    alya: number;
    reza: number;
  };
  friendship: number;
  academicScore: number;
  unlockedMemories: string[];
  chatMessages: ChatMessage[];
  unreadChatCount: number;
  historyLog: {
    speaker: string;
    text: string;
    characterId?: CharacterId | 'narator' | 'guru' | 'player';
  }[];
  outfitChoice?: 'casual' | 'seragam' | 'formal';
  completedMiniGames: {
    loker?: boolean;
    dressup?: boolean;
    quiz?: boolean;
  };
  isGameOver: boolean;
  endingType?: 'rian_true' | 'alya_true' | 'reza_true' | 'bff' | 'bittersweet';
  savedAt: string;
}
