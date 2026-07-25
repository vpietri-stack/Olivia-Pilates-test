import React from 'react';
import { Flag, Shuffle, HelpCircle } from 'lucide-react';
import { MatchingRound } from '../types';

interface MatchingQuestionCardProps {
  round: MatchingRound;
  roundIndex: number; // 0 or 1
  totalRounds: number; // 2
  selectedPairs: Record<string, string>; // leftItemId -> rightOptionId
  onSelectPair: (leftItemId: string, rightOptionId: string) => void;
  onClearPairs: () => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const MatchingQuestionCard: React.FC<MatchingQuestionCardProps> = ({
  round,
  roundIndex,
  totalRounds,
  selectedPairs,
  onSelectPair,
  onClearPairs,
  isFlagged,
  onToggleFlag,
}) => {
  // Find which right options are already assigned and to which left item
  const assignedOptionsMap: Record<string, string> = {}; // rightOptionId -> leftItem.id
  Object.keys(selectedPairs).forEach((leftId) => {
    const rightId = selectedPairs[leftId];
    if (rightId) {
      assignedOptionsMap[rightId] = leftId;
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-4 space-y-5">
      {/* Question Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 uppercase tracking-wider">
            第三部分：连线匹配 ({roundIndex + 1}/{totalRounds})
          </span>
          <span className="text-xs text-slate-500 font-medium">
            5 配对，共 10 分
          </span>
        </div>

        <div className="flex items-center gap-2">
          {Object.keys(selectedPairs).length > 0 && (
            <button
              type="button"
              onClick={onClearPairs}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              清空重选
            </button>
          )}
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
      </div>

      {/* Round Title & Red Herring Tip */}
      <div>
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
          {round.title}
        </h3>
        <div className="bg-blue-50/80 rounded-xl p-3 border border-blue-100 flex items-start gap-2 text-xs text-blue-900">
          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            注意：右侧 6 个选项中包含 <b>1 个多余的干扰项</b>。请为左侧 5 个项目分别选择正确的对应选项。
          </p>
        </div>
      </div>

      {/* Right Options List Reference */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
          <span>右侧待选功能/目标库（共 6 项）</span>
          <span className="text-slate-400 font-normal">A - F</span>
        </h4>
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          {round.rightOptions.map((opt) => {
            const assignedLeftId = assignedOptionsMap[opt.id];
            const isAssigned = Boolean(assignedLeftId);

            return (
              <div
                key={opt.id}
                className={`p-2 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                  isAssigned
                    ? 'bg-blue-100/60 border-blue-200 text-blue-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <span className="leading-snug">{opt.text}</span>
                {isAssigned ? (
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                    已配对项目 {assignedLeftId}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                    可选择
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Items Pairing Controls */}
      <div className="space-y-3 pt-1">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Shuffle className="w-4 h-4 text-blue-600" />
          <span>请进行一对一匹配：</span>
        </h4>

        {round.leftItems.map((item) => {
          const currentSelectedRightId = selectedPairs[item.id] || '';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                currentSelectedRightId
                  ? 'border-2 border-blue-600 bg-blue-50/70'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">
                  {item.text}
                </span>
                {currentSelectedRightId ? (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md font-bold">
                    匹配 选项 {currentSelectedRightId}
                  </span>
                ) : (
                  <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-md">
                    待选择
                  </span>
                )}
              </div>

              {/* Option Selector Buttons for this left item */}
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {round.rightOptions.map((opt) => {
                  const isSelectedForThis = currentSelectedRightId === opt.id;
                  const isSelectedForOther =
                    Boolean(assignedOptionsMap[opt.id]) && !isSelectedForThis;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectPair(item.id, opt.id)}
                      className={`py-2 px-1 rounded-lg font-bold text-xs border transition-all ${
                        isSelectedForThis
                          ? 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-600/30'
                          : isSelectedForOther
                          ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 active:bg-blue-50'
                      }`}
                    >
                      {opt.id}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
