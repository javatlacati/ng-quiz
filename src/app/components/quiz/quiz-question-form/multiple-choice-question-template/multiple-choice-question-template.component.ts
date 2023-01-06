import {Component, Input} from '@angular/core';
import MultipleAnswerQuestion from "../../../../model/MultipleAnswerQuestion";
import {QuestionTemplate} from "../../QuestionTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {QuestionSubscription} from "../../../../subscriptions/QuestionSubscription";
import MultipleChoiceQuestion from "../../../../model/MultipleChoiceQuestion";

@Component({
  selector: 'app-multiple-choice-question-template',
  templateUrl: './multiple-choice-question-template.component.html',
  styleUrls: ['./multiple-choice-question-template.component.scss']
})
export class MultipleChoiceQuestionTemplate extends QuestionTemplate {

  @Input()
  unescape!: (label: string) => string;

  constructor(
    router: Router,
    activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    questionSuubscription: QuestionSubscription,
  ) {
    super(router, activatedroute, formBuilder, questionSuubscription);
  }

  public handleQuestionChange(): void {
    console.log(`handling question change for multiple choice: ${JSON.stringify(this.currentQuestionAlv)}`)
    let choices: string[] = (this.currentQuestionAlv as MultipleChoiceQuestion).choices;
    this.currentQuestionOptions = choices.map((choice, idx) => {
      return {
        value: idx,
        label: choice
      }
    });
  }

}
