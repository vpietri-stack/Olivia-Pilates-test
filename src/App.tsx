import { useState, useEffect, useRef } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ExamHeader } from './components/ExamHeader';
import { ExamFooter } from './components/ExamFooter';
import { QuestionSheetModal } from './components/QuestionSheetModal';
import { MCQuestionCard } from './components/MCQuestionCard';
import { TFQuestionCard } from './components/TFQuestionCard';
import { MatchingQuestionCard } from './components/MatchingQuestionCard';
import { SubmitConfirmModal } from './components/SubmitConfirmModal';
import { ResultScreen } from './components/ResultScreen';

import { MCQuestion, TFQuestion, MatchingRound, UserAnswers, QuestionNavItem, TestResult } from './types';
import { calculateTestResult } from './utils/formatTime';
import {
  generateRandomizedMCQuestions,
  generateRandomizedTFQuestions,
  generateRandomizedMatchingRounds,
} from './utils/randomizeQuestions';

const EXAM_DURATION_SECONDS = 3600; // 1 hour

export default function App() {
  const [studentName, setStudentName] = useState<string>('');
  const [status, setStatus] = useState<'login' | 'testing' | 'completed'>('login');

  const [mcQuestions, setMcQuestions] = useState<MCQuestion[]>(() => generateRandomizedMCQuestions());
  const [tfQuestions, setTfQuestions] = useState<TFQuestion[]>(() => generateRandomizedTFQuestions());
  const [matchingRounds, setMatchingRounds] = useState<MatchingRound[]>(() => generateRandomizedMatchingRounds());

  const [remainingSeconds, setRemainingSeconds] = useState<number>(EXAM_DURATION_SECONDS);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  const [answers, setAnswers] = useState<UserAnswers>({
    mc: {},
    tf: {},
    matching: {},
    flagged: {},
  });

  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved last result from local storage if exists
  useEffect(() => {
    try {
      const savedResult = localStorage.getItem('pilates_exam_last_result');
      if (savedResult) {
        setLastResult(JSON.parse(savedResult));
      }
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (status === 'testing') {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmitOnTimeOut();
            return 0;
          }
          return prev - 1;
        });

        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  // Handle start exam
  const handleStartExam = (name: string) => {
    setStudentName(name);
    setMcQuestions(generateRandomizedMCQuestions());
    setTfQuestions(generateRandomizedTFQuestions());
    setMatchingRounds(generateRandomizedMatchingRounds());
    setRemainingSeconds(EXAM_DURATION_SECONDS);
    setTimeSpentSeconds(0);
    setCurrentIndex(0);
    setAnswers({
      mc: {},
      tf: {},
      matching: {},
      flagged: {},
    });
    setStatus('testing');
  };

  // Handle auto submit when time expires
  const handleAutoSubmitOnTimeOut = () => {
    const res = calculateTestResult(
      studentName,
      answers,
      EXAM_DURATION_SECONDS,
      mcQuestions,
      tfQuestions,
      matchingRounds
    );
    setLastResult(res);
    try {
      localStorage.setItem('pilates_exam_last_result', JSON.stringify(res));
    } catch (e) {
      console.error(e);
    }
    setIsSubmitModalOpen(false);
    setIsSheetOpen(false);
    setStatus('completed');
  };

  // Handle manual submit confirm
  const handleConfirmSubmit = () => {
    const res = calculateTestResult(
      studentName,
      answers,
      timeSpentSeconds,
      mcQuestions,
      tfQuestions,
      matchingRounds
    );
    setLastResult(res);
    try {
      localStorage.setItem('pilates_exam_last_result', JSON.stringify(res));
    } catch (e) {
      console.error(e);
    }
    setIsSubmitModalOpen(false);
    setIsSheetOpen(false);
    setStatus('completed');
  };

  // Answer handlers
  const handleSelectMCOption = (qId: number, opt: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      mc: {
        ...prev.mc,
        [qId]: opt,
      },
    }));
  };

  const handleSelectTFOption = (qId: number, opt: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      tf: {
        ...prev.tf,
        [qId]: opt,
      },
    }));
  };

  const handleSelectMatchingPair = (roundId: number, leftId: string, rightId: string) => {
    setAnswers((prev) => {
      const currentRoundPairs = { ...(prev.matching[roundId] || {}) };
      // If rightId is already assigned to another left item in this round, clear that item's assignment
      Object.keys(currentRoundPairs).forEach((k) => {
        if (currentRoundPairs[k] === rightId) {
          delete currentRoundPairs[k];
        }
      });

      // Toggle off if clicking the same choice
      if (currentRoundPairs[leftId] === rightId) {
        delete currentRoundPairs[leftId];
      } else {
        currentRoundPairs[leftId] = rightId;
      }

      return {
        ...prev,
        matching: {
          ...prev.matching,
          [roundId]: currentRoundPairs,
        },
      };
    });
  };

  const handleClearMatchingPairs = (roundId: number) => {
    setAnswers((prev) => ({
      ...prev,
      matching: {
        ...prev.matching,
        [roundId]: {},
      },
    }));
  };

  const handleToggleFlag = (globalKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      flagged: {
        ...prev.flagged,
        [globalKey]: !prev.flagged[globalKey],
      },
    }));
  };

  // Build items list for question drawer / palette
  const navItems: QuestionNavItem[] = [];

  // MC Items (0 to 29)
  mcQuestions.forEach((q, idx) => {
    const isAnswered = answers.mc[q.id] !== undefined;
    const key = `mc-${q.id}`;
    navItems.push({
      type: 'mc',
      sectionIndex: 1,
      itemIndex: idx,
      displayLabel: `单选 ${idx + 1}`,
      globalId: key,
      isAnswered,
      isFlagged: Boolean(answers.flagged[key]),
    });
  });

  // TF Items (30 to 39)
  tfQuestions.forEach((q, idx) => {
    const isAnswered = answers.tf[q.id] !== undefined;
    const key = `tf-${q.id}`;
    navItems.push({
      type: 'tf',
      sectionIndex: 2,
      itemIndex: idx,
      displayLabel: `判断 ${idx + 1}`,
      globalId: key,
      isAnswered,
      isFlagged: Boolean(answers.flagged[key]),
    });
  });

  // Matching Rounds (40 to 41)
  matchingRounds.forEach((round, idx) => {
    const roundPairs = answers.matching[round.id] || {};
    const isAnswered = Object.keys(roundPairs).length === 5; // All 5 pairs set
    const key = `matching-${round.id}`;
    navItems.push({
      type: 'matching',
      sectionIndex: 3,
      itemIndex: idx,
      displayLabel: `配对 ${idx + 1}`,
      globalId: key,
      isAnswered,
      isFlagged: Boolean(answers.flagged[key]),
    });
  });

  // Scoring item completion stats: 30 MC + 10 TF + 10 Matching pairs = 50 total scoring items
  let mcAnsweredCount = Object.keys(answers.mc).length;
  let tfAnsweredCount = Object.keys(answers.tf).length;
  let matchingPairsAnsweredCount = 0;
  matchingRounds.forEach((round) => {
    matchingPairsAnsweredCount += Object.keys(answers.matching[round.id] || {}).length;
  });

  const totalAnsweredItems = mcAnsweredCount + tfAnsweredCount + matchingPairsAnsweredCount;
  const TOTAL_SCORING_ITEMS = 50;
  const unansweredCount = TOTAL_SCORING_ITEMS - totalAnsweredItems;

  // Identify current section
  let currentSection: 'mc' | 'tf' | 'matching' = 'mc';
  if (currentIndex >= 30 && currentIndex < 40) {
    currentSection = 'tf';
  } else if (currentIndex >= 40) {
    currentSection = 'matching';
  }

  const handleJumpToSection = (section: 'mc' | 'tf' | 'matching') => {
    if (section === 'mc') setCurrentIndex(0);
    if (section === 'tf') setCurrentIndex(30);
    if (section === 'matching') setCurrentIndex(40);
  };

  if (status === 'login') {
    return (
      <LoginScreen
        onStartExam={handleStartExam}
        lastResult={lastResult}
        onViewLastResult={() => setStatus('completed')}
      />
    );
  }

  if (status === 'completed' && lastResult) {
    return (
      <ResultScreen
        result={lastResult}
        answers={answers}
        onRestart={() => setStatus('login')}
        mcQuestions={mcQuestions}
        tfQuestions={tfQuestions}
        matchingRounds={matchingRounds}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-slate-100/70 flex flex-col justify-between text-slate-800 pb-28">
      {/* Top Sticky Header */}
      <ExamHeader
        studentName={studentName}
        remainingSeconds={remainingSeconds}
        answeredCount={totalAnsweredItems}
        totalQuestions={TOTAL_SCORING_ITEMS}
        onOpenSheet={() => setIsSheetOpen(true)}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Question Card Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-3 sm:p-4 my-auto">
        {currentIndex < 30 && mcQuestions[currentIndex] && (
          <MCQuestionCard
            question={mcQuestions[currentIndex]}
            currentIndex={currentIndex}
            totalQuestions={30}
            selectedOption={answers.mc[mcQuestions[currentIndex].id]}
            onSelectOption={(opt) => handleSelectMCOption(mcQuestions[currentIndex].id, opt)}
            isFlagged={Boolean(answers.flagged[`mc-${mcQuestions[currentIndex].id}`])}
            onToggleFlag={() => handleToggleFlag(`mc-${mcQuestions[currentIndex].id}`)}
          />
        )}

        {currentIndex >= 30 && currentIndex < 40 && tfQuestions[currentIndex - 30] && (
          <TFQuestionCard
            question={tfQuestions[currentIndex - 30]}
            currentIndex={currentIndex - 30}
            totalQuestions={10}
            selectedOption={answers.tf[tfQuestions[currentIndex - 30].id]}
            onSelectOption={(opt) => handleSelectTFOption(tfQuestions[currentIndex - 30].id, opt)}
            isFlagged={Boolean(answers.flagged[`tf-${tfQuestions[currentIndex - 30].id}`])}
            onToggleFlag={() => handleToggleFlag(`tf-${tfQuestions[currentIndex - 30].id}`)}
          />
        )}

        {currentIndex >= 40 && matchingRounds[currentIndex - 40] && (
          <MatchingQuestionCard
            round={matchingRounds[currentIndex - 40]}
            roundIndex={currentIndex - 40}
            totalRounds={2}
            selectedPairs={answers.matching[matchingRounds[currentIndex - 40].id] || {}}
            onSelectPair={(leftId, rightId) =>
              handleSelectMatchingPair(matchingRounds[currentIndex - 40].id, leftId, rightId)
            }
            onClearPairs={() => handleClearMatchingPairs(matchingRounds[currentIndex - 40].id)}
            isFlagged={Boolean(answers.flagged[`matching-${matchingRounds[currentIndex - 40].id}`])}
            onToggleFlag={() => handleToggleFlag(`matching-${matchingRounds[currentIndex - 40].id}`)}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <ExamFooter
        currentIndex={currentIndex}
        totalQuestions={42}
        onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentIndex((prev) => Math.min(41, prev + 1))}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        currentSection={currentSection}
        onJumpToSection={handleJumpToSection}
      />

      {/* Question Map / Drawer Modal */}
      <QuestionSheetModal
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        items={navItems}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        remainingSeconds={remainingSeconds}
      />

      {/* Submission Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        remainingSeconds={remainingSeconds}
        answeredCount={totalAnsweredItems}
        totalQuestions={TOTAL_SCORING_ITEMS}
        unansweredCount={unansweredCount}
      />
    </div>
  );
}
