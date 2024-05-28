import { Component, inject } from '@angular/core';
import { NgClass, NgIf, PercentPipe } from '@angular/common';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { QuizProgressService } from '../../../../services/quiz-progress.service';

@Component({
  selector: 'app-quiz-review',
  standalone: true,
  imports: [
    NgIf,
    QuizQuestionComponent,
    PercentPipe,
    NgClass
  ],
  templateUrl: './quiz-review.component.html',
  styleUrl: './quiz-review.component.scss'
})
export class QuizReviewComponent {
  quizProgressService: QuizProgressService = inject(QuizProgressService);

  endQuiz() {
    this.quizProgressService.setQuestions([]);
  }

}
