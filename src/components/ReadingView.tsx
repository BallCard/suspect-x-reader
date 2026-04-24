import { useState, useRef, useEffect, useCallback } from 'react';
import type { Paragraph } from '../types/story';
import { motion, AnimatePresence } from 'motion/react';
import type { Clue } from '../types/story';
import { paragraphImages, type StoryImage } from '../data/images';

interface ReadingViewProps {
  paragraphs: Paragraph[];
  clues: Clue[];
  collectedClues: string[];
  onClueTrigger: (clueId: string) => void;
  onChapterComplete: () => void;
  chapterTitle: string;
  chapterNumber: number;
  nextChapterId?: string;
  onNextChapter?: (chapterId: string) => void;
}

const chapterOrdinals = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

export function ReadingView({
  paragraphs,
  clues,
  collectedClues,
  onClueTrigger,
  onChapterComplete,
  chapterTitle,
  chapterNumber,
  nextChapterId,
  onNextChapter,
}: ReadingViewProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const hasCompleted = useRef(false);
  const isRevealing = useRef(false);
  const lastScrollY = useRef(0);

  // 触发线索
  const triggerClue = useCallback((clueId: string) => {
    const clue = clues.find(c => c.id === clueId);
    if (clue && !collectedClues.includes(clue.id)) {
      onClueTrigger(clue.id);
      setActiveClue(clue);
      setTimeout(() => setActiveClue(null), 4000);
    }
  }, [clues, collectedClues, onClueTrigger]);

  // 显示下一段
  const revealNext = useCallback(() => {
    if (isRevealing.current || visibleCount >= paragraphs.length) return;
    isRevealing.current = true;

    const newIndex = visibleCount;
    setVisibleCount(newIndex + 1);

    // 检查新显示的段落是否触发线索
    const paragraph = paragraphs[newIndex];
    if (paragraph?.clueTrigger) {
      setTimeout(() => triggerClue(paragraph.clueTrigger!), 800);
    }

    // 检查是否读完
    if (newIndex + 1 >= paragraphs.length && !hasCompleted.current) {
      hasCompleted.current = true;
      setTimeout(() => onChapterComplete(), 1500);
    }

    setTimeout(() => {
      isRevealing.current = false;
    }, 300);
  }, [visibleCount, paragraphs, triggerClue, onChapterComplete]);

  // 监听滚动：滚动到底部时加载下一段
  useEffect(() => {
    const handleScroll = () => {
      if (visibleCount >= paragraphs.length) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 距离底部 300px 以内时触发
      if (scrollTop + windowHeight >= docHeight - 300) {
        // 确保是向下滚动，或页面不可滚动时也触发
        if (scrollTop > lastScrollY.current || docHeight <= windowHeight) {
          revealNext();
        }
      }
      lastScrollY.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, paragraphs.length, revealNext]);

  // 键盘支持：空格/回车触发下一段
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        // 避免在输入框中触发
        if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
        e.preventDefault();
        revealNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealNext]);

  // 页面不可滚动时自动加载下一段
  useEffect(() => {
    if (visibleCount >= paragraphs.length) return;
    const checkScrollable = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      if (docHeight <= windowHeight) {
        revealNext();
      }
    };
    // 等待渲染完成后检测
    const timer = setTimeout(checkScrollable, 500);
    return () => clearTimeout(timer);
  }, [visibleCount, paragraphs.length, revealNext]);

  // 获取段落的图片
  const getParagraphImage = (paragraphId: string): StoryImage | null => {
    if (imageErrors.has(paragraphId)) return null;
    return paragraphImages[paragraphId] || null;
  };

  const handleImageError = (paragraphId: string) => {
    setImageErrors(prev => new Set(prev).add(paragraphId));
  };

  const progressPercent = Math.round((visibleCount / paragraphs.length) * 100);

  return (
    <div className="relative min-h-screen">
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-white/30"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-24 min-h-screen">
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="text-[10px] tracking-[0.3em] opacity-30 uppercase mb-4">
            Chapter {chapterOrdinals[chapterNumber - 1] || chapterNumber}
          </div>
          <h1 className="serif text-4xl md:text-6xl font-bold tracking-tight">
            {chapterTitle}
          </h1>
          <div className="w-16 h-[1px] bg-white/20 mt-8" />
        </motion.div>

        {/* 段落列表 */}
        <div className="space-y-8 leading-[2] text-[15px] md:text-base opacity-80">
          {paragraphs.slice(0, visibleCount).map((p, i) => {
            const image = getParagraphImage(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* 图片（如果有） */}
                {image && (
                  <motion.figure
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="mb-6 -mx-6 md:mx-0"
                  >
                    <div className="relative overflow-hidden rounded-sm border border-white/5">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        loading="lazy"
                        onError={() => handleImageError(p.id)}
                      />
                      {image.caption && (
                        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                          <span className="text-[10px] tracking-widest opacity-60 uppercase">
                            {image.caption}
                          </span>
                        </figcaption>
                      )}
                    </div>
                  </motion.figure>
                )}

                {/* 段落文字 */}
                <p className={p.clueTrigger ? 'relative' : ''}>
                  {p.content}
                  {p.clueTrigger && collectedClues.includes(p.clueTrigger) && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/30 ml-1 align-middle" />
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 滚动提示 */}
        {visibleCount < paragraphs.length && (
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={revealNext}
            className="mt-16 flex items-center justify-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[10px] tracking-[0.3em] opacity-30 uppercase">
              Scroll
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </motion.div>
        )}

        {/* 章节完成 */}
        {visibleCount >= paragraphs.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-24 text-center"
          >
            <div className="w-16 h-[1px] bg-white/10 mx-auto mb-8" />
            <p className="text-[10px] tracking-[0.3em] opacity-20 uppercase">
              Chapter Complete
            </p>

            {nextChapterId && onNextChapter && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => onNextChapter(nextChapterId)}
                className="mt-8 serif text-lg italic opacity-40 hover:opacity-100 transition-opacity duration-500"
              >
                Continue to next chapter →
              </motion.button>
            )}
          </motion.div>
        )}
      </div>

      {/* 线索浮层 */}
      <AnimatePresence>
        {activeClue && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-12 left-1/2 max-w-md w-[90vw] z-50"
          >
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                  Clue Discovered
                </span>
              </div>
              <h3 className="serif text-xl font-bold mb-2">{activeClue.title}</h3>
              <p className="text-[13px] opacity-60 leading-relaxed">
                {activeClue.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
