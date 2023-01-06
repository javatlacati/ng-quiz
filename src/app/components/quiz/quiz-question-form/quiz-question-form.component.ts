import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Question from "../../../model/Question";
import {MatSelectChange} from "@angular/material/select";
import FillBlankQuestion from "../../../model/FillBlankQuestion";
import {
  MultipleChoiceQuestionTemplate
} from "./multiple-choice-question-template/multiple-choice-question-template.component";
import {
  FillBlankQuestionTemplateComponent
} from "./fill-blank-question-template/fill-blank-question-template.component";
import {
  MultipleAnswerQuestionTemplateComponent
} from "./multiple-answer-question-template/multiple-answer-question-template.component";

@Component({
  selector: 'app-quiz-question-form',
  templateUrl: './quiz-question-form.component.html',
  styleUrls: ['./quiz-question-form.component.scss']
})
export class QuizQuestionFormComponent {

  @Input()
  firstFormGroup!: FormGroup;

  @Input()
  currentQuestionAlv!: Question;

  @Input()
  mulAnswerSelectionChanged!: (event: MatSelectChange) => void;

  @Input()
  currentQuestionOptions: { label: string; value: number }[] = [];

  @Input()
  value: string[] = [];

  @Output()
  valueChange = new EventEmitter<string[]>();

  @Input()
  completedQuiz: boolean = false;

  @ViewChild(MultipleChoiceQuestionTemplate)
  multipleChoiceQuestionTemplate!: MultipleChoiceQuestionTemplate;
  @ViewChild(FillBlankQuestionTemplateComponent)
  fillBlankQuestionTemplateComponent!: FillBlankQuestionTemplateComponent;
  @ViewChild(MultipleAnswerQuestionTemplateComponent)
  multipleAnswerQuestionTemplateComponent!: MultipleAnswerQuestionTemplateComponent;

  constructor() {
  }


  unescape(label: string): string {
    return new DOMParser().parseFromString(label, 'text/html').documentElement.textContent || '';
  }


  public handleQuestionChange(): void {
    let subtype = this.currentQuestionAlv.constructor.name;
    switch (subtype) {
      case 'OneExampleQuestion':
      case 'MultipleChoiceQuestion':
        this.multipleChoiceQuestionTemplate.handleQuestionChange()
        break;
      case 'FillBlankQuestion':
        this.fillBlankQuestionTemplateComponent.handleQuestionChange()
        break;
      case 'MultipleAnswerQuestion':
        this.multipleAnswerQuestionTemplateComponent.handleQuestionChange()
        break;
    }
  }
}
