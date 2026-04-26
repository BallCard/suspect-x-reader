import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Clue } from '../types/story';
import { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

interface CluePanelProps {
  clues: Clue[];
  collectedClueIds: string[];
  unlockedChapterIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function CluePanel({ clues, collectedClueIds, unlockedChapterIds, isOpen, onClose }: CluePanelProps) {
  const { open, close } = useAudio();

  // Play open sound when panel opens
  useEffect(() => {
    if (isOpen) {
      open();
    }
  }, [isOpen, open]);

  // Play close sound when closing (via onClose handler)
  const handleClose = () => {
    close();
    onClose();
  };
  // 只显示已解锁章节的线索
  const visibleClues = clues.filter(c => unlockedChapterIds.includes(c.chapterId));
  const collectedClues = visibleClues.filter(c => collectedClueIds.includes(c.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[100] bg-brand-dark/95 backdrop-blur-xl border-l border-white/5 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div>
                  <span className="text-[10px] tracking-[0.3em] opacity-30 uppercase block mb-2">
                    Evidence Board
                  </span>
                  <h2 className="serif text-3xl font-bold">线索库</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 opacity-40 hover:opacity-100 transition-opacity"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-12">
                <div>
                  <div className="serif text-3xl font-bold">{collectedClues.length}</div>
                  <div className="text-[10px] tracking-[0.2em] opacity-30 uppercase mt-1">
                    Collected
                  </div>
                </div>
                <div>
                  <div className="serif text-3xl font-bold opacity-30">{visibleClues.length}</div>
                  <div className="text-[10px] tracking-[0.2em] opacity-30 uppercase mt-1">
                    Total
                  </div>
                </div>
              </div>

              {/* Clue List */}
              <div className="space-y-4">
                {visibleClues.map((clue) => {
                  const isCollected = collectedClueIds.includes(clue.id);
                  return (
                    <motion.div
                      key={clue.id}
                      initial={false}
                      className={`
                        p-5 rounded-xl border transition-all duration-500
                        ${isCollected
                          ? 'border-white/10 bg-white/[0.03]'
                          : 'border-white/[0.03] bg-transparent'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Indicator */}
                        <div className={`
                          w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-500
                          ${isCollected ? 'bg-white' : 'bg-white/10'}
                        `} />

                        <div className="flex-1">
                          {isCollected ? (
                            <>
                              <h4 className="text-sm font-bold mb-1">{clue.title}</h4>
                              <p className="text-[12px] opacity-50 leading-relaxed">
                                {clue.description}
                              </p>
                              <span className={`
                                inline-block mt-2 text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border
                                ${clue.importance === 'critical'
                                  ? 'border-red-500/30 text-red-400/60'
                                  : clue.importance === 'important'
                                  ? 'border-amber-500/30 text-amber-400/60'
                                  : 'border-white/10 text-white/30'
                                }
                              `}>
                                {clue.importance === 'critical' ? '关键' : clue.importance === 'important' ? '重要' : '次要'}
                              </span>
                            </>
                          ) : (
                            <>
                              <h4 className="text-sm opacity-20">???</h4>
                              <p className="text-[10px] opacity-10 mt-1">未发现</p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
