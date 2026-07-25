import React from 'react';
import { Clock, LayoutGrid, User } from 'lucide-react';
import { formatTimerDisplay } from '../utils/formatTime';

interface ExamHeaderProps {
  studentName: string;
  remainingSeconds: number;
  answeredCount: number;
  totalQuestions: number;
  onOpenSheet: () => void;
  onSubmitClick: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  studentName,
  remainingSeconds,
  answeredCount,
  totalQuestions,
  onOpenSheet,
  onSubmitClick,
}) => {
  const isUrgent = remainingSeconds <= 300; // < 5 mins warning

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-3 sm:px-4 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Student Name */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
            {studentName}
          </span>
        </div>

        {/* Timer Badge */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs sm:text-sm font-mono font-bold transition-all ${
            isUrgent
              ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-600' : 'text-blue-600'}`} />
          <span>{formatTimerDisplay(remainingSeconds)}</span>
        </div>

        {/* Answered Progress & Card Button */}
        <div className="flex items-center gap-1.5">
          <button
            id="open-question-sheet-button"
            type="button"
            onClick={onOpenSheet}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-medium transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
            <span>答题卡</span>
            <span className="bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded-full text-[11px] font-semibold">
              {answeredCount}/{totalQuestions}
            </span>
          </button>

          <button
            id="header-submit-button"
            type="button"
            onClick={onSubmitClick}
            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            交卷
          </button>
        </div>
      </div>
    </header>
  );
};
