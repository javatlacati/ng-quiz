import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAnswerQuestionTemplateComponent } from './multiple-answer-question-template.component';

describe('MultipleAnswerQuestionTemplateComponent', () => {
  let component: MultipleAnswerQuestionTemplateComponent;
  let fixture: ComponentFixture<MultipleAnswerQuestionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAnswerQuestionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAnswerQuestionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
