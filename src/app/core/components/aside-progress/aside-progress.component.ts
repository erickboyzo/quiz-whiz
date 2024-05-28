import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { QuizProgressService } from '../../../services/quiz-progress.service';
import {
  AsideQuizOptionsComponent
} from '../../../modules/landing/components/aside-quiz-options/aside-quiz-options.component';

@Component({
  selector: 'app-aside-progress',
  standalone: true,
  imports: [
    NgIf,
    AsideQuizOptionsComponent,
    NgClass
  ],
  templateUrl: './aside-progress.component.html',
  styleUrl: './aside-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideProgressComponent {

  quizProgressService: QuizProgressService = inject(QuizProgressService);

  endQuiz() {
    this.quizProgressService.setQuestions([]);
  }

  reviewQuestion(index: number) {
    this.quizProgressService.updateReviewQuestionIndex(index);
  }

}
