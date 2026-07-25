import React from 'react';
import { Flag, CheckCircle, XCircle } from 'lucide-react';
import { TFQuestion } from '../types';

interface TFQuestionCardProps {
  question: TFQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: boolean; // true = T, false = F
  onSelectOption: (option: boolean) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const TFQuestionCard: React.FC<TFQuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  isFlagged,
  onToggleFlag,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-4">
      {/* Question Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
            判断题
          </span>
          <span className="text-xs text-slate-500 font-medium">
            第 {currentIndex + 1} / {totalQuestions} 题（2 分）
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleFlag}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
            isFlagged
              ? 'bg-amber-50 text-amber-700 border-amber-300 font-medium'
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400 text-amber-500' : ''}`} />
          <span>{isFlagged ? '已标记' : '标记此题'}</span>
        </button>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
        {question.question}
      </h3>

      {/* True / False Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* True Button */}
        <button
          type="button"
          onClick={() => onSelectOption(true)}
          className={`py-5 px-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
            selectedOption === true
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-600/30 shadow-xs'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <CheckCircle
            className={`w-8 h-8 ${
              selectedOption === true ? 'text-emerald-600' : 'text-slate-300'
            }`}
          />
          <span className="text-base font-bold">正确 (T)</span>
        </button>

        {/* False Button */}
        <button
          type="button"
          onClick={() => onSelectOption(false)}
          className={`py-5 px-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
            selectedOption === false
              ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-600/30 shadow-xs'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <XCircle
            className={`w-8 h-8 ${
              selectedOption === false ? 'text-rose-600' : 'text-slate-300'
            }`}
          />
          <span className="text-base font-bold">错误 (F)</span>
        </button>
      </div>
    </div>
  );
};
