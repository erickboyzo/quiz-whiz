import { computed, effect, EffectRef, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { QuizQuestion } from '../core/interfaces/quiz-question';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService {

  readonly sessionKey = 'quizwhiz_q';

  quizQuestions: WritableSignal<QuizQuestion[]> = signal([]);
  reviewQuestionIndex: WritableSignal<number> = signal(0);

  $quizQuestions: Observable<QuizQuestion[]> = toObservable(this.quizQuestions);

  quizInProgress: Signal<boolean> = computed(() => {
    return this.quizQuestions().length > 0;
  });
  nextQuestion: Signal<QuizQuestion | undefined> = computed(() => {
    return this.quizQuestions().find(q => !q.selectedAnswer)
  });
  totalNumberOfQuestions: Signal<number> = computed(() => {
    return this.quizQuestions().length;
  });
  nextQuestionIndex: Signal<number> = computed(() => {
    return this.quizQuestions().findIndex(q => !q.selectedAnswer)
  });
  nextQuestionNumber: Signal<number> = computed(() => {
    return this.nextQuestionIndex() >= 0 ? this.nextQuestionIndex() + 1 : 0;
  });
  progressPercentage: Signal<number> = computed(() => {
    const index = this.quizQuestions().findIndex(q => !q.selectedAnswer)
    return 100 * index / (this.quizQuestions().length - 1)
  });

  allQuestionsAnswered: Signal<boolean> = computed(() => {
    return this.quizQuestions().every(question => !!question.selectedAnswer);
  });

  reviewQuestionNumber: Signal<number> = computed(() => {
    return this.reviewQuestionIndex() + 1;
  });

  correctQuestions: Signal<number> = computed(() => {
    return this.quizQuestions().filter(question => question.selectedAnswer === question.correct_answer)?.length;
  });

  correctQuestionsPercentage: Signal<number> = computed(() => {
    const correctQuestions = this.correctQuestions();
    return (correctQuestions / this.quizQuestions().length) * 100;
  });

  correctQuestionsPercentageColor: Signal<string> = computed(() => {
    const percentage = this.correctQuestionsPercentage();
    if (percentage >= 80) {
      return 'is-success';
    } else if (percentage < 80 && percentage > 69) {
      return 'is-warning';
    } else {
      return 'is-danger';
    }
  });

  private quizQuestionEffect: EffectRef = effect(() => {
    sessionStorage.setItem('quizwhiz_q', JSON.stringify(this.quizQuestions()))
  });

  constructor() {
    this.getStoredQuiz();
  }

  setQuestions(quizQuestions: QuizQuestion[]): void {
    this.quizQuestions.set(quizQuestions);
  }

  updateAnswer(question: QuizQuestion, index: number): void {
    this.quizQuestions.update(questions => {
      const newQuestions = [...questions];
      newQuestions[index] = question
      return newQuestions;
    })
  }

  updateReviewQuestionIndex(index: number): void {
    this.reviewQuestionIndex.update(() => index);
  }

  private getStoredQuiz(): void {
    const data = sessionStorage.getItem(this.sessionKey);
    const parsed = data ? JSON.parse(data) : [];
    if (parsed.length) {
      this.quizQuestions.set(parsed);
    }
  }
}
