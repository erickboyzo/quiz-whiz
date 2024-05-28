import { QuestionType } from '../enums/question-type';

export interface QuizQuestion {
  type: QuestionType;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers: string[];
  selectedAnswer?: string;
}

export interface QuizQuestionsResponse {
  response_code: number;
  results: QuizQuestion[]
}
