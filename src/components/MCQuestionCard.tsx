import React from 'react';
import { Flag, Check } from 'lucide-react';
import { MCQuestion } from '../types';

interface MCQuestionCardProps {
  question: MCQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  onSelectOption: (option: 'A' | 'B' | 'C' | 'D') => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const MCQuestionCard: React.FC<MCQuestionCardProps> = ({
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
      {/* Top Question Header & Flag Button */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
            单项选择题
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
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-5">
        {question.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectOption(opt.key)}
              className={`w-full text-left p-4 rounded-xl border-2 flex items-center justify-between gap-3 transition-all transform active:scale-[0.99] ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-950 font-medium shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base pt-0.5 leading-relaxed">
                  {opt.text}
                </span>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
