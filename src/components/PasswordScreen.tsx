import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PasswordScreenProps {
  onSuccess: () => void;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '364521') {
      setError('');
      onSuccess();
    } else {
      setError('访问密码错误，请重新输入');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md mb-4 border border-white/20 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">普拉提理论考试系统</h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-1.5 opacity-90">
            请输入访问口令进入考试页面
          </p>
        </div>

        {/* Content Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="exam-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                考试访问密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  id="exam-password"
                  type="password"
                  inputMode="numeric"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="请输入6位访问密码"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base tracking-widest font-mono"
                  autoFocus
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-rose-600 flex items-center gap-1.5 font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm sm:text-base"
            >
              <span>验证并进入</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>受保护的考试内容 · 授权受试学员访问</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
