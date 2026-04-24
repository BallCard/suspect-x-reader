import { motion } from 'motion/react';
import type { Chapter } from '../types/story';
import { getPerspectiveName } from '../data/chapters';

interface ChapterSelectorProps {
  chapters: Chapter[];
  unlockedChapters: string[];
  completedChapters: string[];
  collectedClues: string[];
  onSelectChapter: (chapterId: string) => void;
}

export function ChapterSelector({
  chapters,
  unlockedChapters,
  completedChapters,
  collectedClues,
  onSelectChapter,
}: ChapterSelectorProps) {
  const isChapterUnlocked = (chapter: Chapter) =>
    unlockedChapters.includes(chapter.id);

  const isChapterComplete = (chapterId: string) =>
    completedChapters.includes(chapterId);

  const getMissingClues = (chapter: Chapter) =>
    chapter.requiredClues.filter(id => !collectedClues.includes(id));

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <span className="text-[10px] tracking-[0.3em] opacity-30 uppercase block mb-4">
          Select Chapter
        </span>
        <h2 className="serif text-5xl md:text-7xl font-bold tracking-tight">
          CHAPTERS
        </h2>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter, i) => {
          const unlocked = isChapterUnlocked(chapter);
          const complete = isChapterComplete(chapter.id);
          const missingClues = getMissingClues(chapter);

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => unlocked && onSelectChapter(chapter.id)}
              className={`
                group border-b border-white/5 pb-6 transition-all duration-300
                ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] tracking-[0.2em] opacity-30 uppercase font-bold">
                      0{i + 1}
                    </span>
                    <span className={`
                      text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border
                      ${chapter.perspective === 'ishigami'
                        ? 'border-blue-500/30 text-blue-400/60'
                        : 'border-amber-500/30 text-amber-400/60'
                      }
                    `}>
                      {getPerspectiveName(chapter.perspective)}
                    </span>
                    {complete && (
                      <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-green-500/30 text-green-400/60">
                        已读
                      </span>
                    )}
                  </div>

                  {unlocked ? (
                    <h3 className="serif text-2xl md:text-4xl font-light group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                      {chapter.title}
                    </h3>
                  ) : (
                    <div>
                      <h3 className="serif text-2xl md:text-4xl font-light opacity-30">
                        ???
                      </h3>
                      {missingClues.length > 0 && (
                        <p className="text-[10px] tracking-widest opacity-20 uppercase mt-1">
                          需要线索：{missingClues.length > 2
                            ? `${missingClues.length} 条`
                            : missingClues.map((_, idx) => `线索 ${idx + 1}`).join('、')
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 箭头 */}
                {unlocked && (
                  <div className="text-white/20 group-hover:text-white/60 transition-colors">
                    →
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
