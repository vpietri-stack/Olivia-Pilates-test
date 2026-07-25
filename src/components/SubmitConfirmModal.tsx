import React from 'react';
import { Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatSeconds } from '../utils/formatTime';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void; // "我想检查答案"
  onConfirmSubmit: () => void; // "我做好了，提交答案"
  remainingSeconds: number;
  answeredCount: number;
  totalQuestions: number;
  unansweredCount: number;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  remainingSeconds,
  answeredCount,
  totalQuestions,
  unansweredCount,
}) => {
  if (!isOpen) return null;

  const formattedTimeLeft = formatSeconds(remainingSeconds);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-slate-800"
        >
          {/* Top Icon */}
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>

          {/* Main Prompt Text matching prompt requirement */}
          <h3 className="text-lg font-bold text-center text-slate-900 mb-2 leading-snug">
            确定要提交答案吗？您还剩 <span className="text-blue-600 font-mono">{formattedTimeLeft}</span>
          </h3>

          <p className="text-xs text-center text-slate-500 mb-4">
            提交后将立即计算总得分并无法更改答案。
          </p>

          {/* Unanswered warning box */}
          {unansweredCount > 0 ? (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 mb-5 flex items-start gap-2 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">尚有 {unansweredCount} 题未解答！</p>
                <p className="text-amber-700/90 text-[11px] mt-0.5">
                  已完成：{answeredCount} / {totalQuestions} 题。未作答题目将不得分。
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 mb-5 flex items-center gap-2 text-xs text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">您已完成全卷所有 {totalQuestions} 题作答！</span>
            </div>
          )}

          {/* Action Buttons as explicitly requested */}
          <div className="space-y-2.5">
            <button
              id="confirm-submit-button"
              type="button"
              onClick={onConfirmSubmit}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 text-sm transition-all"
            >
              我做好了，提交答案
            </button>

            <button
              id="cancel-submit-button"
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-600 font-medium rounded-xl text-sm transition-all"
            >
              我想检查答案
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
