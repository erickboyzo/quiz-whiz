import { Component, inject } from '@angular/core';
import { QuizProgressService } from '../../../../services/quiz-progress.service';
import { QuizService } from '../../../../core/services/quiz.service';
import { AsideQuizOptionsComponent } from '../aside-quiz-options/aside-quiz-options.component';
import { QuizOptionsModalComponent } from '../quiz-options-modal/quiz-options-modal.component';
import { NgIf } from '@angular/common';
import { QuizSelectedOptions } from '../../../../core/interfaces/quiz-selected-options';
import { QuizOptionsService } from '../../../../services/quiz-options.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    AsideQuizOptionsComponent,
    QuizOptionsModalComponent,
    NgIf
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  quizOptionsService: QuizOptionsService = inject(QuizOptionsService);
  quizProgressService: QuizProgressService = inject(QuizProgressService);
  quizService: QuizService = inject(QuizService);
  openOptions = false;

  startQuiz() {
    this.quizService.getQuiz(this.quizOptionsService.quizOptions())
      .subscribe({
        next: value => {
          this.quizProgressService.setQuestions(value);
        },
        error: error => {
        }
      });
  }

  open(): void {
    this.openOptions = true;
  }

  close(): void {
    this.openOptions = false;
  }
}
