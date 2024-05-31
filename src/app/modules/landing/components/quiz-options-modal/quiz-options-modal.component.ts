import { Component, EventEmitter, Output } from '@angular/core';
import { AsideQuizOptionsComponent } from '../aside-quiz-options/aside-quiz-options.component';

@Component({
  selector: 'app-quiz-options-modal',
  standalone: true,
  imports: [
    AsideQuizOptionsComponent
  ],
  templateUrl: './quiz-options-modal.component.html',
  styleUrl: './quiz-options-modal.component.scss'
})
export class QuizOptionsModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
}
