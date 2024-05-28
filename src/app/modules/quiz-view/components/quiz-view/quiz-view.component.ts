import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { QuizProgressService } from '../../../../services/quiz-progress.service';
import { AsideQuizOptionsComponent } from '../../../landing/components/aside-quiz-options/aside-quiz-options.component';
import { QuizQuestion } from '../../../../core/interfaces/quiz-question';
import { NgIf } from '@angular/common';
import { QuizReviewComponent } from '../quiz-review/quiz-review.component';

@Component({
  selector: 'app-quiz-view',
  standalone: true,
  imports: [
    QuizQuestionComponent,
    AsideQuizOptionsComponent,
    NgIf,
    QuizReviewComponent
  ],
  templateUrl: './quiz-view.component.html',
  styleUrl: './quiz-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizViewComponent {
  quizProgressService: QuizProgressService = inject(QuizProgressService);
  update?: QuizQuestion;

  onQuestionChange(event: QuizQuestion) {
    this.update = event;
  }

  next() {
    const currentIndex = this.quizProgressService.nextQuestionNumber() - 1
    this.quizProgressService.updateAnswer(this.update as QuizQuestion, currentIndex);
    this.update = undefined;
  }

  review() {
    this.next();
    this.quizProgressService.updateReviewQuestionIndex(0);
  }

  endQuiz() {
    this.quizProgressService.setQuestions([]);
  }
}
