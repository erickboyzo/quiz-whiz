import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AsideProgressComponent } from './core/components/aside-progress/aside-progress.component';
import { QuizProgressService } from './services/quiz-progress.service';
import { Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsideProgressComponent, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'QuizWhiz';
  subTitle = 'Collection of random quizzes to test if you are indeed a quiz whiz.';

  quizProgress: QuizProgressService = inject(QuizProgressService);
  $subscription: Subscription = new Subscription();
  router: Router = inject(Router);


  ngOnInit(): void {
    this.$subscription.add(
      this.quizProgress.$quizQuestions.subscribe({
        next: value => {
          if (value.length) {
            this.router.navigate(['quiz-in-progress']).then();
          } else {
            this.router.navigate(['']).then();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

}
