import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiongenComponent } from './questiongen.component';

describe('QuestiongenComponent', () => {
  let component: QuestiongenComponent;
  let fixture: ComponentFixture<QuestiongenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestiongenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestiongenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
