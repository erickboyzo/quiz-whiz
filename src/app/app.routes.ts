import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { QuizProgressService } from './services/quiz-progress.service';

export const routes: Routes = [
  {
    'path': 'start-quiz', loadComponent: () =>
      import('../app/modules/landing/components/landing/landing.component').then(
        (mod) => mod.LandingComponent
      ),
  },
  {
    'path': 'quiz-in-progress',
    loadComponent: () =>
      import('../app/modules/quiz-view/components/quiz-view/quiz-view.component').then(
        (mod) => mod.QuizViewComponent
      ),
    canActivate: [() => {
      const quizInProgress: boolean = inject(QuizProgressService).quizInProgress();
      const route: Router = inject(Router);
      if (!quizInProgress) {
        route.navigate(['start-quiz']).then();
      }
      return quizInProgress;
    }]
  },
  { 'path': '**', redirectTo: 'start-quiz' },
];
