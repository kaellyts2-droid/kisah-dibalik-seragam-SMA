import React from 'react';
import { motion } from 'motion/react';
import { CharacterId, CharacterExpression } from '../types/game';

interface CharacterSpriteProps {
  characterId?: CharacterId | 'narator' | 'guru' | 'player';
  expression?: CharacterExpression;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  expression = 'normal',
}) => {
  if (!characterId || characterId === 'narator' || characterId === 'player') {
    return null;
  }

  // Expression mouth and eye configurations
  const renderEyesAndMouth = (type: CharacterId) => {
    switch (expression) {
      case 'senyum':
        return (
          <>
            {/* Happy Curved Eyes */}
            <path d="M 38 48 Q 44 42 50 48" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 62 48 Q 68 42 74 48" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Warm Smile Mouth */}
            <path d="M 46 68 Q 56 78 66 68" stroke="#1E293B" strokeWidth="2.5" fill="#E11D48" strokeLinecap="round" />
          </>
        );
      case 'blush':
        return (
          <>
            {/* Blinking / Shy Eyes */}
            <circle cx="44" cy="46" r="4.5" fill="#1E293B" />
            <circle cx="68" cy="46" r="4.5" fill="#1E293B" />
            {/* Soft Shy Smile */}
            <path d="M 48 68 Q 56 74 64 68" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Blush Patches */}
            <ellipse cx="36" cy="56" rx="7" ry="3.5" fill="#FB7185" opacity="0.75" />
            <ellipse cx="76" cy="56" rx="7" ry="3.5" fill="#FB7185" opacity="0.75" />
          </>
        );
      case 'kaget':
        return (
          <>
            {/* Wide Open Eyes */}
            <circle cx="44" cy="45" r="6" fill="#1E293B" />
            <circle cx="42" cy="43" r="2" fill="#FFFFFF" />
            <circle cx="68" cy="45" r="6" fill="#1E293B" />
            <circle cx="66" cy="43" r="2" fill="#FFFFFF" />
            {/* Open Surprised 'O' Mouth */}
            <ellipse cx="56" cy="70" rx="5" ry="7" fill="#881337" stroke="#1E293B" strokeWidth="2" />
          </>
        );
      case 'fokus':
        return (
          <>
            {/* Determined / Focused Eyes */}
            <path d="M 37 42 L 51 46" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="44" cy="48" r="3.5" fill="#1E293B" />
            <path d="M 75 42 L 61 46" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="68" cy="48" r="3.5" fill="#1E293B" />
            {/* Resolute Line Mouth */}
            <line x1="48" y1="68" x2="64" y2="68" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case 'sedih':
        return (
          <>
            {/* Drooping Eyebrows & Eyes */}
            <path d="M 38 42 Q 44 46 50 44" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="44" cy="48" r="3.5" fill="#1E293B" />
            <path d="M 74 42 Q 68 46 62 44" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="68" cy="48" r="3.5" fill="#1E293B" />
            {/* Downturned Mouth */}
            <path d="M 48 72 Q 56 64 64 72" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            {/* Normal Friendly Eyes */}
            <circle cx="44" cy="46" r="4.5" fill="#1E293B" />
            <circle cx="42.5" cy="44.5" r="1.5" fill="#FFFFFF" />
            <circle cx="68" cy="46" r="4.5" fill="#1E293B" />
            <circle cx="66.5" cy="44.5" r="1.5" fill="#FFFFFF" />
            {/* Gentle Smile */}
            <path d="M 48 66 Q 56 72 64 66" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  const renderCharacterSVG = () => {
    if (characterId === 'rian') {
      return (
        <svg viewBox="0 0 112 140" className="w-full h-full drop-shadow-2xl">
          {/* Hair back */}
          <path d="M 28 50 C 20 20, 92 20, 84 50 Z" fill="#292524" />
          {/* Athletic Torso / Indonesian School Uniform with Orange Varsity Jacket */}
          <path d="M 24 140 L 32 90 L 80 90 L 88 140 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          {/* School Uniform Collar */}
          <polygon points="46,90 56,104 66,90" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
          {/* Orange Varsity Jacket over uniform */}
          <path d="M 20 140 L 32 88 L 44 94 L 38 140 Z" fill="#EA580C" />
          <path d="M 92 140 L 80 88 L 68 94 L 74 140 Z" fill="#EA580C" />
          <circle cx="36" cy="112" r="3" fill="#FFFFFF" />
          {/* Head & Neck */}
          <rect x="48" y="72" width="16" height="22" fill="#FBCFE8" rx="2" />
          <path d="M 26 50 C 26 80, 86 80, 86 50 C 86 28, 26 28, 26 50 Z" fill="#FDE2E4" />
          {/* Spiky Sporty Hair front */}
          <path
            d="M 24 44 C 28 20, 52 14, 56 14 C 64 14, 88 22, 88 44 C 82 32, 70 34, 60 28 C 50 38, 38 32, 24 44 Z"
            fill="#332B25"
          />
          {/* Headband / Wristband touch */}
          <rect x="28" y="32" width="56" height="6" fill="#F97316" rx="3" />
          {renderEyesAndMouth('rian')}
        </svg>
      );
    }

    if (characterId === 'alya') {
      return (
        <svg viewBox="0 0 112 140" className="w-full h-full drop-shadow-2xl">
          {/* Long Hair back */}
          <path d="M 22 40 C 14 70, 16 130, 24 140 L 88 140 C 96 130, 98 70, 90 40 Z" fill="#1E293B" />
          {/* Uniform with Soft Pastel Sky Ribbon */}
          <path d="M 26 140 L 34 90 L 78 90 L 86 140 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          {/* School Uniform Collar */}
          <polygon points="46,90 56,106 66,90" fill="#E2E8F0" />
          {/* Sky Blue Ribbon Tie */}
          <polygon points="56,102 50,116 56,122 62,116" fill="#0284C7" />
          {/* Soft knit cardigan shoulders */}
          <path d="M 24 140 L 34 88 L 44 96 L 36 140 Z" fill="#BAE6FD" />
          <path d="M 88 140 L 78 88 L 68 96 L 76 140 Z" fill="#BAE6FD" />
          {/* Head & Neck */}
          <rect x="49" y="72" width="14" height="22" fill="#FDE2E4" rx="2" />
          <path d="M 28 50 C 28 78, 84 78, 84 50 C 84 26, 28 26, 28 50 Z" fill="#FFF1F2" />
          {/* Neat Fringe Bangs */}
          <path
            d="M 26 46 C 36 28, 76 28, 86 46 C 76 36, 68 38, 56 36 C 44 38, 36 36, 26 46 Z"
            fill="#1E293B"
          />
          {/* Glasses */}
          <rect x="36" y="42" width="16" height="11" rx="4" fill="none" stroke="#0284C7" strokeWidth="1.8" />
          <rect x="60" y="42" width="16" height="11" rx="4" fill="none" stroke="#0284C7" strokeWidth="1.8" />
          <line x1="52" y1="47" x2="60" y2="47" stroke="#0284C7" strokeWidth="1.8" />
          {renderEyesAndMouth('alya')}
        </svg>
      );
    }

    if (characterId === 'reza') {
      return (
        <svg viewBox="0 0 112 140" className="w-full h-full drop-shadow-2xl">
          {/* Tousled Brown Hair */}
          <path d="M 24 45 C 18 16, 94 16, 88 45 Z" fill="#451A03" />
          {/* Playful loose uniform with undone top button */}
          <path d="M 24 140 L 32 90 L 80 90 L 88 140 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Loosened Necktie */}
          <polygon points="54,92 58,92 60,118 56,124 52,118" fill="#BE185D" />
          {/* Head & Neck */}
          <rect x="48" y="72" width="16" height="22" fill="#FED7AA" rx="2" />
          <path d="M 26 50 C 26 80, 86 80, 86 50 C 86 28, 26 28, 26 50 Z" fill="#FFEDD5" />
          {/* Messy stylish fringe */}
          <path
            d="M 24 42 C 30 24, 60 18, 88 38 C 76 30, 68 36, 52 28 C 42 36, 32 34, 24 42 Z"
            fill="#5A2807"
          />
          {renderEyesAndMouth('reza')}
        </svg>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative z-10 w-44 md:w-64 h-64 md:h-96 flex items-end justify-center pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-end justify-center"
      >
        {renderCharacterSVG()}
      </motion.div>
    </motion.div>
  );
};
