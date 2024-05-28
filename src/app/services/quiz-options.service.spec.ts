import { TestBed } from '@angular/core/testing';

import { QuizOptionsService } from './quiz-options.service';

describe('QuizOptionsService', () => {
  let service: QuizOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
