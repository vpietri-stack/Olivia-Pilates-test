import React from 'react';
import { X, Flag, Check, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestionNavItem } from '../types';

interface QuestionSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuestionNavItem[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onSubmitClick: () => void;
  remainingSeconds: number;
}

export const QuestionSheetModal: React.FC<QuestionSheetModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectQuestion,
  onSubmitClick,
}) => {
  if (!isOpen) return null;

  // Group items by section
  const mcItems = items.filter((i) => i.type === 'mc');
  const tfItems = items.filter((i) => i.type === 'tf');
  const matchingItems = items.filter((i) => i.type === 'matching');

  const answeredCount = items.filter((i) => i.isAnswered).length;
  const totalCount = items.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
        {/* Backdrop click to dismiss */}
        <div className="flex-1" onClick={onClose} />

        {/* Bottom Sheet Drawer */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-t border-slate-200"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-800 text-base">答题卡（全卷题表）</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                已作答 <span className="font-semibold text-blue-600">{answeredCount}</span> / {totalCount} 题
              </p>
            </div>
            <button
              id="close-question-sheet-button"
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Legend */}
          <div className="px-4 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center justify-around text-xs text-slate-600 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">✓</span>
              <span>已答</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-200 border border-slate-300"></span>
              <span>未答</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md ring-2 ring-blue-600 bg-blue-50"></span>
              <span>当前题</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-100 border border-amber-300 text-amber-600 flex items-center justify-center">
                <Flag className="w-2.5 h-2.5" />
              </span>
              <span>已标记</span>
            </div>
          </div>

          {/* Question Grid List */}
          <div className="p-4 overflow-y-auto space-y-5 flex-1">
            {/* Section 1: MC */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>一、单项选择题（1 - 30 题）</span>
                <span className="text-slate-400 font-normal text-[11px]">每题 2 分</span>
              </h4>
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {mcItems.map((item) => {
                  const globalIdx = items.findIndex((i) => i.globalId === item.globalId);
                  const isCurrent = globalIdx === currentIndex;

                  return (
                    <button
                      key={item.globalId}
                      type="button"
                      onClick={() => {
                        onSelectQuestion(globalIdx);
                        onClose();
                      }}
                      className={`relative aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-blue-600 ring-offset-1 bg-blue-50 text-blue-800'
                          : item.isAnswered
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.itemIndex + 1}
                      {item.isFlagged && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-white rounded-full flex items-center justify-center border border-white">
                          <Flag className="w-2 h-2" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: TF */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>二、判断题（31 - 40 题）</span>
                <span className="text-slate-400 font-normal text-[11px]">每题 2 分</span>
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {tfItems.map((item) => {
                  const globalIdx = items.findIndex((i) => i.globalId === item.globalId);
                  const isCurrent = globalIdx === currentIndex;

                  return (
                    <button
                      key={item.globalId}
                      type="button"
                      onClick={() => {
                        onSelectQuestion(globalIdx);
                        onClose();
                      }}
                      className={`relative aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-blue-600 ring-offset-1 bg-blue-50 text-blue-800'
                          : item.isAnswered
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {30 + item.itemIndex + 1}
                      {item.isFlagged && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-white rounded-full flex items-center justify-center border border-white">
                          <Flag className="w-2 h-2" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Matching */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>三、配对题（41 - 42 题组，共 10 小题）</span>
                <span className="text-slate-400 font-normal text-[11px]">每配对 2 分</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {matchingItems.map((item) => {
                  const globalIdx = items.findIndex((i) => i.globalId === item.globalId);
                  const isCurrent = globalIdx === currentIndex;

                  return (
                    <button
                      key={item.globalId}
                      type="button"
                      onClick={() => {
                        onSelectQuestion(globalIdx);
                        onClose();
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                          : item.isAnswered
                          ? 'border-blue-300 bg-blue-50/30'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          配对第 {item.itemIndex + 1} 组
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.isAnswered ? '已完成配对' : '未完全匹配'}
                        </span>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.isAnswered ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.isAnswered ? <Check className="w-3.5 h-3.5" /> : item.itemIndex + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Submit Action */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSubmitClick();
              }}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 text-sm transition-all active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>检查完毕，确认交卷</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
