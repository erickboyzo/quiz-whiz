import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../../../core/interfaces/quiz-question';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})
export class QuizQuestionComponent {
  @Input() question!: QuizQuestion;
  @Input() reviewMode: boolean = false;
  @Input() questionNumber!: number;
  @Output() updateQuestion = new EventEmitter<QuizQuestion>();

  answerChange(event: Event, item: string) {
    const checked = (<HTMLInputElement>event.target).checked;
    this.question.selectedAnswer = checked ? item : '';
    this.updateQuestion.emit(this.question);
  }

}
