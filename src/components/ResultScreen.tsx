import React, { useState } from 'react';
import { Award, Clock, User, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp, FileSpreadsheet } from 'lucide-react';
import { motion } from 'motion/react';
import { TestResult, UserAnswers, MCQuestion, TFQuestion, MatchingRound } from '../types';
import { MC_QUESTIONS, TF_QUESTIONS, MATCHING_ROUNDS } from '../data/questionsData';
import { formatSeconds } from '../utils/formatTime';

interface ResultScreenProps {
  result: TestResult;
  answers: UserAnswers;
  onRestart: () => void;
  mcQuestions?: MCQuestion[];
  tfQuestions?: TFQuestion[];
  matchingRounds?: MatchingRound[];
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  answers,
  onRestart,
  mcQuestions: propMcQuestions,
  tfQuestions: propTfQuestions,
  matchingRounds: propMatchingRounds,
}) => {
  const [showReview, setShowReview] = useState(false);

  const mcQuestions = result.mcQuestions || propMcQuestions || MC_QUESTIONS;
  const tfQuestions = result.tfQuestions || propTfQuestions || TF_QUESTIONS;
  const matchingRounds = result.matchingRounds || propMatchingRounds || MATCHING_ROUNDS;

  // Calculate stats
  const mcCorrect = mcQuestions.filter((q) => answers.mc[q.id] === q.answer).length;
  const tfCorrect = tfQuestions.filter((q) => answers.tf[q.id] === q.answer).length;

  let matchingCorrectCount = 0;
  matchingRounds.forEach((round) => {
    const userRoundAnswers = answers.matching[round.id] || {};
    round.leftItems.forEach((item) => {
      if (userRoundAnswers[item.id] === round.correctMap[item.id]) {
        matchingCorrectCount += 1;
      }
    });
  });

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: '优秀（Excellent）', color: 'bg-emerald-500 text-white' };
    if (score >= 80) return { label: '良好（Good）', color: 'bg-teal-600 text-white' };
    if (score >= 60) return { label: '合格（Passed）', color: 'bg-blue-600 text-white' };
    return { label: '需加强（Needs Improvement）', color: 'bg-amber-600 text-white' };
  };

  const badge = getScoreBadge(result.totalScore);

  return (
    <div className="min-h-dvh bg-slate-50 py-6 px-4 sm:px-6 text-slate-800 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Hero Score Card */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 text-center relative overflow-hidden"
        >
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-3 border border-blue-100 shadow-xs">
            <Award className="w-9 h-9" />
          </div>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            普拉提理论知识测试成绩单
          </p>

          {/* Big Score */}
          <div className="flex items-baseline justify-center gap-1 my-2">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {result.totalScore}
            </span>
            <span className="text-lg font-bold text-slate-400">/ 100 分</span>
          </div>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${badge.color}`}>
            {badge.label}
          </span>

          {/* Student Meta Info */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-100">
            <div className="flex items-center gap-1.5 justify-center">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>考生：<b>{result.studentName}</b></span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>用时：<b>{formatSeconds(result.timeSpentSeconds)}</b></span>
            </div>
            <div className="flex items-center gap-1.5 justify-center col-span-2 pt-2 border-t border-slate-200/60 text-slate-600">
              <RotateCcw className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>本设备开启次数：<b className={result.attemptCount && result.attemptCount > 1 ? 'text-amber-600 font-bold' : 'text-slate-800'}>第 {result.attemptCount || 1} 次开启</b></span>
            </div>
          </div>
        </motion.div>

        {/* Exercises Score Breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>模块得分明细</span>
          </h3>

          {/* Exercise 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-800">一、单项选择题（30 题）</p>
              <p className="text-slate-500 text-[11px]">答对 {mcCorrect} / 30 题</p>
            </div>
            <span className="font-mono font-bold text-sm text-blue-700">
              {result.mcScore} / 60 分
            </span>
          </div>

          {/* Exercise 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-800">二、判断题（10 题）</p>
              <p className="text-slate-500 text-[11px]">答对 {tfCorrect} / 10 题</p>
            </div>
            <span className="font-mono font-bold text-sm text-blue-700">
              {result.tfScore} / 20 分
            </span>
          </div>

          {/* Exercise 3 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-800">三、配对题（2 轮共 10 组）</p>
              <p className="text-slate-500 text-[11px]">答对 {matchingCorrectCount} / 10 组</p>
            </div>
            <span className="font-mono font-bold text-sm text-blue-700">
              {result.matchingScore} / 20 分
            </span>
          </div>
        </div>

        {/* Detailed Question Review Toggle Button */}
        <button
          type="button"
          onClick={() => setShowReview(!showReview)}
          className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-sm transition-colors"
        >
          <span>查看完整试题与正确答案对钩解析</span>
          {showReview ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {/* Review Section */}
        {showReview && (
          <div className="space-y-4 pt-2">
            {/* Section 1 Review: MC */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">
                一、单项选择题核对（30 题）
              </h4>
              <div className="space-y-3">
                {mcQuestions.map((q, idx) => {
                  const userAns = answers.mc[q.id];
                  const isRight = userAns === q.answer;

                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                        isRight ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 font-bold text-slate-900">
                        <span>{idx + 1}、 {q.question}</span>
                        {isRight ? (
                          <span className="flex items-center gap-1 text-emerald-600 shrink-0 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 正确
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-600 shrink-0 text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> 错误
                          </span>
                        )}
                      </div>

                      <div className="text-slate-600 space-y-0.5">
                        <p>
                          您的选择：
                          <b className={isRight ? 'text-emerald-700' : 'text-rose-600'}>
                            {userAns ? `${userAns}` : '未作答'}
                          </b>
                        </p>
                        <p>
                          正确答案：<b className="text-emerald-700">{q.answer}</b>（
                          {q.options.find((o) => o.key === q.answer)?.text}）
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2 Review: TF */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">
                二、判断题核对（10 题）
              </h4>
              <div className="space-y-3">
                {tfQuestions.map((q, idx) => {
                  const userAns = answers.tf[q.id];
                  const isRight = userAns === q.answer;

                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                        isRight ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 font-bold text-slate-900">
                        <span>{idx + 1}、 {q.question}</span>
                        {isRight ? (
                          <span className="flex items-center gap-1 text-emerald-600 shrink-0 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 正确
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-600 shrink-0 text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> 错误
                          </span>
                        )}
                      </div>

                      <div className="text-slate-600 space-y-0.5">
                        <p>
                          您的回答：
                          <b className={isRight ? 'text-emerald-700' : 'text-rose-600'}>
                            {userAns === undefined ? '未作答' : userAns ? '正确 (T)' : '错误 (F)'}
                          </b>
                        </p>
                        <p>
                          正确答案：<b className="text-emerald-700">{q.answer ? '正确 (T)' : '错误 (F)'}</b>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3 Review: Matching */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">
                三、配对题核对（2 轮共 10 组）
              </h4>
              <div className="space-y-4">
                {matchingRounds.map((round) => {
                  const userRoundAns = answers.matching[round.id] || {};

                  return (
                    <div key={round.id} className="space-y-2">
                      <p className="text-xs font-bold text-slate-700">{round.title}</p>
                      {round.leftItems.map((item) => {
                        const userRightId = userRoundAns[item.id];
                        const correctRightId = round.correctMap[item.id];
                        const isRight = userRightId === correctRightId;

                        return (
                          <div
                            key={item.id}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              isRight ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>{item.id}、 {item.text}</span>
                              {isRight ? (
                                <span className="text-emerald-600 text-[11px]">✓ 匹配正确</span>
                              ) : (
                                <span className="text-rose-600 text-[11px]">✕ 匹配错误</span>
                              )}
                            </div>
                            <p className="text-slate-600">
                              您的匹配：<b>{userRightId || '未配对'}</b> | 正确匹配：
                              <b className="text-emerald-700">{correctRightId}</b>（
                              {round.rightOptions.find((o) => o.id === correctRightId)?.text}）
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Restart Test Button */}
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-base transition-all active:scale-[0.99]"
        >
          <RotateCcw className="w-5 h-5" />
          <span>重新开始考试</span>
        </button>
      </div>
    </div>
  );
};
