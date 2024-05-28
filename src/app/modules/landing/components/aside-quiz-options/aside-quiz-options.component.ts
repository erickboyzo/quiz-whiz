import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizSelectedOptions } from '../../../../core/interfaces/quiz-selected-options';
import { categories, difficultyOptions, numberOfQuestion } from '../../constants/options.constants';
import { QuizOptionsService } from '../../../../services/quiz-options.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-aside-quiz-options',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './aside-quiz-options.component.html',
  styleUrl: './aside-quiz-options.component.scss'
})
export class AsideQuizOptionsComponent {
  quizOptionsService: QuizOptionsService = inject(QuizOptionsService);
  optionSelections: QuizSelectedOptions = { ...this.quizOptionsService.quizOptions() };
  numberOfQuestion = numberOfQuestion;
  categories = categories;
  difficultyOptions = difficultyOptions;

  onChange(): void {
    this.quizOptionsService.setSelectedOptions({ ...this.optionSelections });
  }

  selectNumberOfQuestions(option: number): void {
    this.optionSelections.amount = option;
    this.onChange();
  }

  selectDifficulty(option: string): void {
    this.optionSelections.difficulty = option;
    this.onChange();
  }
}
