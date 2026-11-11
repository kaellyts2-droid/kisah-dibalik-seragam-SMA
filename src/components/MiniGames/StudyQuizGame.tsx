import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, XCircle, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { STUDY_QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizzes';
import { sound } from '../../utils/audio';

interface StudyQuizGameProps {
  onComplete: (score: number) => void;
}

export const StudyQuizGame: React.FC<StudyQuizGameProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = STUDY_QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < STUDY_QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      sound.playHeartSparkle();
    }
  };

  const handleFinish = () => {
    // Score based on correct answers: 3/3 => 20, 2/3 => 15, 1/3 => 10
    const finalScore = Math.max(10, correctCount * 7);
    onComplete(finalScore);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Kuis Belajar Kelompok (Tryout UN)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Jawab 3 soal materi SMA bersama Rian, Alya, dan Reza!
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-lg">
              Soal {currentIndex + 1} / {STUDY_QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>

        {!isFinished ? (
          <div>
            {/* Subject Tag */}
            <div className="inline-block px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-[11px] font-semibold mb-2">
              📚 {currentQ.subject}
            </div>

            {/* Question Text */}
            <h3 className="text-sm md:text-base font-bold text-slate-100 mb-4 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2 mb-4">
              {currentQ.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-850/40 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3 rounded-xl border-2 text-xs md:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isChosen && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Crush Reactions */}
            <AnimatePresence>
              {hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Explanation */}
                  <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-300">
                    <span className="font-bold text-amber-300 block mb-1">💡 Pembahasan:</span>
                    {currentQ.explanation}
                  </div>

                  {/* Friends commentary */}
                  <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs space-y-1.5">
                    <div className="text-amber-300 font-semibold text-[11px] uppercase tracking-wide">
                      Komentar Teman Belajar:
                    </div>
                    <p className="text-orange-300">
                      <span className="font-bold">🏀 Rian:</span> "{currentQ.crushReaction.rian}"
                    </p>
                    <p className="text-sky-300">
                      <span className="font-bold">📖 Alya:</span> "{currentQ.crushReaction.alya}"
                    </p>
                    <p className="text-pink-300">
                      <span className="font-bold">🎒 Reza:</span> "{currentQ.crushReaction.reza}"
                    </p>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all text-xs md:text-sm flex items-center justify-center gap-2"
                  >
                    {currentIndex + 1 < STUDY_QUIZ_QUESTIONS.length ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Finished State */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Sesi Belajar Tuntas!</h3>
            <p className="text-xs text-slate-300 mb-4">
              Kamu berhasil menjawab benar <span className="text-amber-400 font-bold">{correctCount}</span> dari 3 soal!
              Kemampuan akademik dan kekompakan kalian meningkat pesat.
            </p>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 mb-4">
              ✨ Nilai Akademik +{Math.max(10, correctCount * 7)} Poin • Hati Teman Belajar +15 Poin
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
            >
              Kembali ke Cerita Bersama
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
