export interface MCQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  answer: 'A' | 'B' | 'C' | 'D';
}

export interface TFQuestion {
  id: number;
  question: string;
  answer: boolean; // true for T (正确), false for F (错误)
}

export interface MatchingItem {
  id: string;
  text: string;
}

export interface MatchingOption {
  id: string;
  text: string;
}

export interface MatchingRound {
  id: number;
  title: string;
  leftItems: MatchingItem[];
  rightOptions: MatchingOption[];
  correctMap: Record<string, string>; // leftItem.id -> rightOption.id
  redHerringId: string; // The option ID that shouldn't be matched
}

export interface UserAnswers {
  mc: Record<number, 'A' | 'B' | 'C' | 'D'>;
  tf: Record<number, boolean>;
  matching: Record<number, Record<string, string>>; // round.id -> { leftItemId: rightOptionId }
  flagged: Record<string, boolean>; // e.g. "mc-1", "tf-2", "m-1-1"
}

export type SectionType = 'mc' | 'tf' | 'matching';

export interface QuestionNavItem {
  type: SectionType;
  sectionIndex: number; // 1, 2, or 3
  itemIndex: number; // index within section
  displayLabel: string; // e.g. "单选 1", "判断 3", "配对 1-1"
  globalId: string; // "mc-1", "tf-2", etc.
  isAnswered: boolean;
  isFlagged: boolean;
}

export interface TestResult {
  studentName: string;
  totalScore: number;
  mcScore: number;
  tfScore: number;
  matchingScore: number;
  timeSpentSeconds: number;
  submitTime: string;
  attemptCount?: number;
  mcQuestions?: MCQuestion[];
  tfQuestions?: TFQuestion[];
  matchingRounds?: MatchingRound[];
}
