import {Component, OnInit} from '@angular/core';
import {QuestionTemplate} from "../../QuestionTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {QuestionSubscription} from "../../../../subscriptions/QuestionSubscription";

@Component({
  selector: 'app-one-example-question-template',
  templateUrl: './one-example-question-template.component.html',
  styleUrls: ['./one-example-question-template.component.scss']
})
export class OneExampleQuestionTemplateComponent extends QuestionTemplate {
  constructor(
    router: Router,
    activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    questionSuubscription: QuestionSubscription,
  ) {
    super(router, activatedroute, formBuilder, questionSuubscription);
  }

  handleQuestionChange(): void {
    console.log(`handling question change for oe: ${JSON.stringify(this.currentQuestionAlv)}`)
  }


}
