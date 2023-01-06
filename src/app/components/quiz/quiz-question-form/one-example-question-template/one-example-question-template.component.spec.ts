import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneExampleQuestionTemplateComponent } from './one-example-question-template.component';

describe('OneExampleQuestionTemplateComponent', () => {
  let component: OneExampleQuestionTemplateComponent;
  let fixture: ComponentFixture<OneExampleQuestionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneExampleQuestionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneExampleQuestionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
