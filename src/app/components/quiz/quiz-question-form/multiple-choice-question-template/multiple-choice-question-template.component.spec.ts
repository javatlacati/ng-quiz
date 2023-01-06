import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionTemplateComponent } from './multiple-choice-question-template.component';

describe('MultipleChoiceQuestionTemplateComponent', () => {
  let component: MultipleChoiceQuestionTemplateComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceQuestionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuestionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
