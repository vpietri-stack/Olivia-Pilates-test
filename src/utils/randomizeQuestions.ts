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
 * Randomize Exercise 1 (Multiple Choice):
 * - Randomize question order (1-30)
 * - Randomize option order (A-D) for each question
 */
export function generateRandomizedMCQuestions(questions: MCQuestion[] = MC_QUESTIONS): MCQuestion[] {
  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  const processed = questions.map((q) => {
    // Find text of correct answer
    const correctText = q.options.find((opt) => opt.key === q.answer)?.text;

    // Shuffle options array
    const shuffledOptions = shuffleArray(q.options);

    // Re-key shuffled options as A, B, C, D and find new answer key
    let newAnswerKey: 'A' | 'B' | 'C' | 'D' = 'A';
    const newOptions = shuffledOptions.map((opt, idx) => {
      const key = optionKeys[idx];
      if (opt.text === correctText) {
        newAnswerKey = key;
      }
      return {
        key,
        text: opt.text,
      };
    });

    return {
      ...q,
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
  return shuffleArray(questions);
}

/**
 * Randomize Exercise 3 (Matching):
 * - Randomize answer options order (A-F) for both rounds
 */
export function generateRandomizedMatchingRounds(rounds: MatchingRound[] = MATCHING_ROUNDS): MatchingRound[] {
  const optionKeys = ['A', 'B', 'C', 'D', 'E', 'F'];

  return rounds.map((round) => {
    // Shuffle right options
    const shuffledRightOptions = shuffleArray(round.rightOptions);

    // Map old option IDs to new assigned keys A-F
    const oldToNewIdMap: Record<string, string> = {};
    const newRightOptions = shuffledRightOptions.map((opt, idx) => {
      const newId = optionKeys[idx] || opt.id;
      oldToNewIdMap[opt.id] = newId;
      return {
        id: newId,
        text: opt.text,
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
      rightOptions: newRightOptions,
      correctMap: newCorrectMap,
      redHerringId: newRedHerringId,
    };
  });
}
