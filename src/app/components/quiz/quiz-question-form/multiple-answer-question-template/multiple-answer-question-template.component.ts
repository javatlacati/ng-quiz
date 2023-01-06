import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionTemplate} from "../../QuestionTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {QuestionSubscription} from "../../../../subscriptions/QuestionSubscription";
import MultipleAnswerQuestion from "../../../../model/MultipleAnswerQuestion";

@Component({
  selector: 'app-multiple-answer-question-template',
  templateUrl: './multiple-answer-question-template.component.html',
  styleUrls: ['./multiple-answer-question-template.component.scss']
})
export class MultipleAnswerQuestionTemplateComponent extends QuestionTemplate {

  @Input()
  unescape!: (label: string) => string;

  @Input()
  value: string[] = [];

  @Output()
  valueChange = new EventEmitter<string[]>();

  constructor(
    router: Router,
    activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    questionSuubscription: QuestionSubscription,
  ) {
    super(router, activatedroute, formBuilder, questionSuubscription);
  }

  handleQuestionChange(): void {
    console.log(`handling question change for multiple a: ${JSON.stringify(this.currentQuestionAlv)}`)
    console.log(`this.selectedAnswers=${this.selectedAnswers} deleted`)
    let daChoices: string[] = (this.currentQuestionAlv as MultipleAnswerQuestion).choices;
    this.currentQuestionOptions = daChoices.map((choice, idx) => {
      return {
        value: idx,
        label: choice
      }
    });
    console.log(`this.selectedAnswers is ${this.currentQuestionAlv.userAnswer.split(',')}`)
    this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue('')
  }


}
