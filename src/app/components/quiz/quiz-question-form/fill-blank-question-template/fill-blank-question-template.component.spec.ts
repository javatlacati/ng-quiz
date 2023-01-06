import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankQuestionTemplateComponent } from './fill-blank-question-template.component';

describe('FillBlankQuestionTemplateComponent', () => {
  let component: FillBlankQuestionTemplateComponent;
  let fixture: ComponentFixture<FillBlankQuestionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillBlankQuestionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankQuestionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
