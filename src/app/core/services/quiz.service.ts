import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizQuestion, QuizQuestionsResponse } from '../interfaces/quiz-question';
import { map, Observable } from 'rxjs';
import { QuizSelectedOptions } from '../interfaces/quiz-selected-options';
import { QuestionType } from '../enums/question-type';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  http: HttpClient = inject(HttpClient);

  getQuiz(params: QuizSelectedOptions): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestionsResponse>('https://opentdb.com/api.php', { params: params as any })
      .pipe(map(response => {
        response.results.forEach(q => {
          if (q.type === QuestionType.multiple) {
            q.allAnswers = [...q.incorrect_answers, ...[q.correct_answer]]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
          } else if (q.type === QuestionType.boolean) {
            q.allAnswers = [...q.incorrect_answers, ...[q.correct_answer]].sort().reverse()
          }
        })
        return response.results;
      }))
  }
}
