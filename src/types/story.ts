// 视角类型
export type Perspective = 'ishigami' | 'police';

// 线索数据结构
export interface Clue {
  id: string;
  title: string;
  description: string;
  chapterId: string;
  perspective: Perspective;
  triggerParagraph: number; // 触发线索的段落索引
  importance: 'critical' | 'important' | 'minor'; // 线索重要程度
}

// 段落数据结构
export interface Paragraph {
  id: string;
  content: string;
  clueTrigger?: string; // 如果存在，阅读到此段落时触发的线索ID
}

// 章节数据结构
export interface Chapter {
  id: string;
  title: string;
  perspective: Perspective;
  chapterNumber: number;
  paragraphs: Paragraph[];
  requiredClues: string[]; // 解锁本章需要的线索ID列表
  unlocksChapter?: string; // 读完本章后解锁的章节ID
}

// 用户进度
export interface UserProgress {
  unlockedChapters: string[];
  collectedClues: string[];
  currentChapter: string | null;
  completedChapters: string[];
}
