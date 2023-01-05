import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionHeaderComponent } from './quiz-question-header.component';

describe('QuizQuestionHeaderComponent', () => {
  let component: QuizQuestionHeaderComponent;
  let fixture: ComponentFixture<QuizQuestionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
