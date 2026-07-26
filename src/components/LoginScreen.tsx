import React, { useState } from 'react';
import { User, Clock, Award, FileText, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onStartExam: (name: string) => void;
  lastResult?: { studentName: string; totalScore: number } | null;
  onViewLastResult?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onStartExam,
  lastResult,
  onViewLastResult,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [deviceStartsCount, setDeviceStartsCount] = useState<number>(0);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('pilates_exam_starts_count');
      if (stored) {
        setDeviceStartsCount(parseInt(stored, 10) || 0);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('请输入您的姓名以开始考试');
      return;
    }
    setError('');
    onStartExam(trimmed);
  };

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col justify-between p-4 sm:p-6 text-slate-800">
      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* Header Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/25 mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
            普拉提理论知识测试
          </h1>
          <p className="text-sm text-slate-500">
            专业理论水平评估 · 限时 60 分钟
          </p>
        </motion.div>

        {/* Previous Score Banner */}
        {lastResult && onViewLastResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-blue-700 font-medium">上次测试记录</p>
              <p className="text-sm font-bold text-blue-950">
                考生：{lastResult.studentName} （得分：{lastResult.totalScore}分）
              </p>
            </div>
            <button
              type="button"
              onClick={onViewLastResult}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              查看结果
            </button>
          </motion.div>
        )}

        {/* Main Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 mb-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="student-name-input"
                className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-blue-600" />
                考生姓名 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="student-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="请输入您的真实姓名"
                  maxLength={20}
                  className={`w-full px-4 py-3.5 rounded-xl border ${
                    error ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600'
                  } text-base bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {error && (
                <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                  {error}
                </p>
              )}
            </div>

            {/* Exam Information Summary */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-xs text-slate-600 space-y-2.5">
              <div className="flex items-center gap-2 font-medium text-slate-700 pb-2 border-b border-slate-200/60">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>考试说明与规则</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>考试时长：<b>1 小时</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>试卷满分：<b>100 分</b></span>
                </div>
              </div>
              <div className="space-y-1 pt-1 text-slate-500 leading-relaxed">
                <p className="flex items-start gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>一、单项选择题：30 题（每题 2 分，共 60 分）</span>
                </p>
                <p className="flex items-start gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>二、判断题：10 题（每题 2 分，共 20 分）</span>
                </p>
                <p className="flex items-start gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>三、配对题：2 轮共 10 组（每对 2 分，共 20 分）</span>
                </p>
                <p className="text-amber-600 pt-1 font-medium">
                  * 输入姓名后点击“开始考试”，倒计时将立即开启。答题过程中可随时返回检查修改。
                </p>
                {deviceStartsCount > 0 && (
                  <div className="mt-2 p-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-900 font-medium text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>提示：本设备已记录 <b>{deviceStartsCount}</b> 次考试开启记录，再次开启将被记为第 <b>{deviceStartsCount + 1}</b> 次开启。</span>
                  </div>
                )}
              </div>
            </div>

            <button
              id="start-exam-button"
              type="submit"
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-base transition-all transform active:scale-[0.99]"
            >
              <span>开始考试</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-2">
        普拉提理论在线测评系统 · 适用于微信移动端视图
      </footer>
    </div>
  );
};
