import { MCQuestion, TFQuestion, MatchingRound } from '../types';
import { MC_QUESTIONS, TF_QUESTIONS, MATCHING_ROUNDS } from '../data/questionsData';

/**
 * Fisher-Yates array shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Helper to strip question numbers / letter prefixes (e.g. "22、", "A、", "1.")
 */
export function stripPrefix(text: string): string {
  return text.replace(/^([\d一二三四五六七八九十|A-Za-z]+[\s\u3000]*[、\.\,\:\s]*)+/, '').trim();
}

/**
 * Randomize Exercise 1 (Multiple Choice):
 * - Randomize question order (1-30)
 * - Randomize option order (A-D) for each question
 */
export function generateRandomizedMCQuestions(questions: MCQuestion[] = MC_QUESTIONS): MCQuestion[] {
  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  const processed = questions.map((q) => {
    const cleanQuestionText = stripPrefix(q.question);

    // Find text of correct answer
    const correctText = q.options.find((opt) => opt.key === q.answer)?.text;

    // Shuffle options array
    const shuffledOptions = shuffleArray(q.options);

    // Re-key shuffled options as A, B, C, D and find new answer key
    let newAnswerKey: 'A' | 'B' | 'C' | 'D' = 'A';
    const newOptions = shuffledOptions.map((opt, idx) => {
      const key = optionKeys[idx];
      const cleanOptionText = stripPrefix(opt.text);
      if (opt.text === correctText || cleanOptionText === stripPrefix(correctText || '')) {
        newAnswerKey = key;
      }
      return {
        key,
        text: cleanOptionText,
      };
    });

    return {
      ...q,
      question: cleanQuestionText,
      options: newOptions,
      answer: newAnswerKey,
    };
  });

  // Shuffle question order
  return shuffleArray(processed);
}

/**
 * Randomize Exercise 2 (True / False):
 * - Randomize question order (1-10)
 */
export function generateRandomizedTFQuestions(questions: TFQuestion[] = TF_QUESTIONS): TFQuestion[] {
  const processed = questions.map((q) => ({
    ...q,
    question: stripPrefix(q.question),
  }));
  return shuffleArray(processed);
}

/**
 * Randomize Exercise 3 (Matching):
 * - Randomize answer options order (A-F) for both rounds
 * - Ensure options are sequentially labeled A, B, C, D, E, F in display order
 */
export function generateRandomizedMatchingRounds(rounds: MatchingRound[] = MATCHING_ROUNDS): MatchingRound[] {
  const optionKeys = ['A', 'B', 'C', 'D', 'E', 'F'];

  return rounds.map((round) => {
    const cleanLeftItems = round.leftItems.map((item) => ({
      ...item,
      text: stripPrefix(item.text),
    }));

    // Shuffle right options
    const shuffledRightOptions = shuffleArray(round.rightOptions);

    // Map old option IDs to new assigned keys A-F based on shuffled position
    const oldToNewIdMap: Record<string, string> = {};
    const newRightOptions = shuffledRightOptions.map((opt, idx) => {
      const newId = optionKeys[idx] || opt.id;
      oldToNewIdMap[opt.id] = newId;
      return {
        id: newId,
        text: stripPrefix(opt.text),
      };
    });

    // Remap correctMap to new IDs
    const newCorrectMap: Record<string, string> = {};
    Object.entries(round.correctMap).forEach(([leftId, oldRightId]) => {
      newCorrectMap[leftId] = oldToNewIdMap[oldRightId] || oldRightId;
    });

    // Remap redHerringId to new ID
    const newRedHerringId = round.redHerringId ? oldToNewIdMap[round.redHerringId] || round.redHerringId : round.redHerringId;

    return {
      ...round,
      leftItems: cleanLeftItems,
      rightOptions: newRightOptions,
      correctMap: newCorrectMap,
      redHerringId: newRedHerringId,
    };
  });
}

