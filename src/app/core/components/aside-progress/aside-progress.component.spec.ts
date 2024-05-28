import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideProgressComponent } from './aside-progress.component';

describe('AsideProgressComponent', () => {
  let component: AsideProgressComponent;
  let fixture: ComponentFixture<AsideProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsideProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
