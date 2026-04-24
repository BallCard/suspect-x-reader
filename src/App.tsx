import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useCallback, useRef } from 'react';
import { Menu, X, BookOpen, Search, RotateCcw } from 'lucide-react';
import { chapters, clues } from './data/chapters';
import { useProgress } from './hooks/useProgress';
import { ReadingView } from './components/ReadingView';
import { CluePanel } from './components/CluePanel';
import { ChapterSelector } from './components/ChapterSelector';

type Page = 'home' | 'chapters' | 'reading';

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: Page) => void; currentPage: Page }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Story', page: 'chapters' as Page },
    { name: 'Home', page: 'home' as Page },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-12 py-8 mix-blend-difference"
      >
        <button
          onClick={() => onNavigate('home')}
          className="serif text-2xl font-bold tracking-tighter hover:opacity-60 transition-opacity"
        >
          嫌疑人X
        </button>

        <div className="flex gap-12 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.page)}
              className={`text-[10px] tracking-[0.3em] font-bold uppercase transition-opacity ${
                currentPage === link.page ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="fixed top-6 right-6 z-[60] md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 glass rounded-full"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="fixed top-6 left-6 z-[60] md:hidden">
        <button onClick={() => onNavigate('home')} className="serif text-lg font-bold">
          嫌疑人X
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center md:hidden"
          >
            <div className="absolute inset-0 bg-noise pointer-events-none opacity-10" />
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    onNavigate(link.page);
                    setIsOpen(false);
                  }}
                  className="serif text-4xl font-bold uppercase hover:italic transition-all"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden border-b border-white/5">
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="serif text-huge italic -mb-4 md:-mb-8"
        >
          嫌疑人
        </motion.div>

        <div className="flex flex-col md:flex-row items-baseline md:items-end gap-4 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="serif text-huge font-bold"
          >
            X的献身
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-6 max-w-[280px]"
          >
            <p className="text-[10px] md:text-xs leading-relaxed opacity-60 tracking-wide uppercase">
              An interactive mystery experience. Read. Discover clues. Uncover the truth.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="serif text-huge outline-text -mt-4 md:-mt-10 ml-12 md:ml-32"
        >
          Devotion
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4">
        <button
          onClick={onStart}
          className="flex items-center gap-4 group"
        >
          <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 transition-all duration-500" />
          <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase group-hover:opacity-100 transition-opacity">
            Begin Reading
          </span>
        </button>
      </div>
    </section>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isCluePanelOpen, setIsCluePanelOpen] = useState(false);
  const { progress, collectClue, completeChapter, unlockChapter, setCurrentChapter, resetProgress } = useProgress();

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const startReading = useCallback(() => {
    navigateTo('chapters');
  }, [navigateTo]);

  const selectChapter = useCallback((chapterId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentChapter(chapterId);
    navigateTo('reading');
  }, [navigateTo, setCurrentChapter]);

  const handleChapterComplete = useCallback(() => {
    if (!currentChapterId) return;
    completeChapter(currentChapterId);

    const chapter = chapters.find(c => c.id === currentChapterId);
    if (chapter?.unlocksChapter) {
      unlockChapter(chapter.unlocksChapter);
    }
  }, [currentChapterId, completeChapter, unlockChapter]);

  const currentChapter = chapters.find(c => c.id === currentChapterId);

  return (
    <div className="relative bg-brand-dark overflow-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0" />

      <Navbar onNavigate={navigateTo} currentPage={currentPage} />

      {/* Floating Clue Button */}
      <AnimatePresence>
        {currentPage === 'reading' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsCluePanelOpen(true)}
            className="fixed bottom-8 right-8 z-[80] glass rounded-full p-4 flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Search size={16} />
            <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">
              {progress.collectedClues.length}/{clues.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Back to chapters button */}
      <AnimatePresence>
        {currentPage === 'reading' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigateTo('chapters')}
            className="fixed bottom-8 left-8 z-[80] text-[10px] tracking-[0.2em] uppercase opacity-30 hover:opacity-60 transition-opacity flex items-center gap-2"
          >
            <BookOpen size={14} />
            Chapters
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reset button on chapters page */}
      {currentPage === 'chapters' && progress.completedChapters.length > 0 && (
        <button
          onClick={resetProgress}
          className="fixed bottom-8 right-8 z-[80] text-[10px] tracking-[0.2em] uppercase opacity-30 hover:opacity-60 transition-opacity flex items-center gap-2"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      )}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Hero onStart={startReading} />
            </motion.div>
          )}

          {currentPage === 'chapters' && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-24"
            >
              <ChapterSelector
                chapters={chapters}
                unlockedChapters={progress.unlockedChapters}
                completedChapters={progress.completedChapters}
                collectedClues={progress.collectedClues}
                onSelectChapter={selectChapter}
              />
            </motion.div>
          )}

          {currentPage === 'reading' && currentChapter && (
            <motion.div
              key={currentChapter.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReadingView
                paragraphs={currentChapter.paragraphs}
                clues={clues.filter(c => c.chapterId === currentChapter.id)}
                collectedClues={progress.collectedClues}
                onClueTrigger={collectClue}
                onChapterComplete={handleChapterComplete}
                chapterTitle={currentChapter.title}
                chapterNumber={currentChapter.chapterNumber}
                nextChapterId={currentChapter.unlocksChapter}
                onNextChapter={selectChapter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clue Panel */}
      <CluePanel
        clues={clues}
        collectedClueIds={progress.collectedClues}
        unlockedChapterIds={progress.unlockedChapters}
        isOpen={isCluePanelOpen}
        onClose={() => setIsCluePanelOpen(false)}
      />
    </div>
  );
}
