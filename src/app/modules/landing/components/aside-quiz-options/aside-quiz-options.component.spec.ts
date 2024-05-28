import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideQuizOptionsComponent } from './aside-quiz-options.component';

describe('AsideQuizOptionsComponent', () => {
  let component: AsideQuizOptionsComponent;
  let fixture: ComponentFixture<AsideQuizOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideQuizOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsideQuizOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
