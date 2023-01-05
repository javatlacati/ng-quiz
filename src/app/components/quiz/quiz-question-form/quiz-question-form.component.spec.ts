import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionFormComponent } from './quiz-question-form.component';

describe('QuizQuestionFormComponent', () => {
  let component: QuizQuestionFormComponent;
  let fixture: ComponentFixture<QuizQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
