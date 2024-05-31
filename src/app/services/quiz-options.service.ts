import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { QuizSelectedOptions } from '../core/interfaces/quiz-selected-options';
import { categories, difficultyOptions } from '../modules/landing/constants/options.constants';

@Injectable({
  providedIn: 'root'
})
export class QuizOptionsService {

  quizOptions: WritableSignal<QuizSelectedOptions> = signal({ amount: 5, category: '', difficulty: '' });

  categoryLabel: Signal<string> = computed(() => {
    if (this.quizOptions()?.category) {
      const selected = categories.find(category => category.value === this.quizOptions().category);
      return selected ? selected.label : 'Any Category';
    }
    return 'Any Category';
  });

  difficultyLabel: Signal<string> = computed(() => {
    if (this.quizOptions()?.difficulty) {
      const selected = difficultyOptions.find(difficulty => difficulty.value === this.quizOptions().difficulty);
      return selected ? selected.label : 'Any Difficulty';
    }
    return 'Any Difficulty';
  });

  setSelectedOptions(options: QuizSelectedOptions) {
    this.quizOptions.set(options);
  }
}
