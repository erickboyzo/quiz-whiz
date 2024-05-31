import { Component, inject, Input } from '@angular/core';
import { QuizProgressService } from '../../../services/quiz-progress.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';

  quizProgressService: QuizProgressService = inject(QuizProgressService);
}
