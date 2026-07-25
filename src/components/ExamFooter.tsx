import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface ExamFooterProps {
  currentIndex: number;
  totalQuestions: number; // total navigateable questions / steps
  onPrev: () => void;
  onNext: () => void;
  onSubmitClick: () => void;
  currentSection: 'mc' | 'tf' | 'matching';
  onJumpToSection: (section: 'mc' | 'tf' | 'matching') => void;
}

export const ExamFooter: React.FC<ExamFooterProps> = ({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmitClick,
  currentSection,
  onJumpToSection,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-3 py-2.5">
      <div className="max-w-md mx-auto space-y-2">
        {/* Section Fast Switch Tabs */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500">
          <button
            type="button"
            onClick={() => onJumpToSection('mc')}
            className={`px-2.5 py-1 rounded-full border transition-all ${
              currentSection === 'mc'
                ? 'bg-blue-700 text-white border-blue-700 font-bold'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
          >
            一、单选(1-30)
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('tf')}
            className={`px-2.5 py-1 rounded-full border transition-all ${
              currentSection === 'tf'
                ? 'bg-blue-700 text-white border-blue-700 font-bold'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
          >
            二、判断(31-40)
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('matching')}
            className={`px-2.5 py-1 rounded-full border transition-all ${
              currentSection === 'matching'
                ? 'bg-blue-700 text-white border-blue-700 font-bold'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
          >
            三、配对(41-42)
          </button>
        </div>

        {/* Main Prev / Next / Submit Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            id="prev-question-button"
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className={`flex-1 py-3 px-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-1 transition-all ${
              isFirst
                ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 active:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>上一题</span>
          </button>

          {isLast ? (
            <button
              id="footer-submit-button"
              type="button"
              onClick={onSubmitClick}
              className="flex-1 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-blue-200 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>提交答卷</span>
            </button>
          ) : (
            <button
              id="next-question-button"
              type="button"
              onClick={onNext}
              className="flex-1 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1 shadow-lg shadow-blue-200 transition-all"
            >
              <span>下一题</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
