import { UserAnswers, TestResult, MCQuestion, TFQuestion, MatchingRound } from '../types';
import { MC_QUESTIONS, TF_QUESTIONS, MATCHING_ROUNDS } from '../data/questionsData';

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m}分${s < 10 ? '0' : ''}${s}秒`;
  }
  return `${s}秒`;
}

export function formatTimerDisplay(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

export function calculateTestResult(
  studentName: string,
  answers: UserAnswers,
  timeSpentSeconds: number,
  mcQuestions: MCQuestion[] = MC_QUESTIONS,
  tfQuestions: TFQuestion[] = TF_QUESTIONS,
  matchingRounds: MatchingRound[] = MATCHING_ROUNDS,
  attemptCount: number = 1
): TestResult {
  let mcScore = 0;
  mcQuestions.forEach((q) => {
    if (answers.mc[q.id] === q.answer) {
      mcScore += 2;
    }
  });

  let tfScore = 0;
  tfQuestions.forEach((q) => {
    if (answers.tf[q.id] === q.answer) {
      tfScore += 2;
    }
  });

  let matchingScore = 0;
  matchingRounds.forEach((round) => {
    const userRoundAnswers = answers.matching[round.id] || {};
    round.leftItems.forEach((item) => {
      const correctOptionId = round.correctMap[item.id];
      if (userRoundAnswers[item.id] === correctOptionId) {
        matchingScore += 2;
      }
    });
  });

  const totalScore = mcScore + tfScore + matchingScore;

  const now = new Date();
  const submitTimeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return {
    studentName,
    totalScore,
    mcScore,
    tfScore,
    matchingScore,
    timeSpentSeconds,
    submitTime: submitTimeStr,
    attemptCount,
    mcQuestions,
    tfQuestions,
    matchingRounds,
  };
}
