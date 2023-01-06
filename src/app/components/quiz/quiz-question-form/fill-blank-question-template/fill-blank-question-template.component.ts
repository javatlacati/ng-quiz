import {Component, OnInit} from '@angular/core';
import {QuestionTemplate} from "../../QuestionTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {QuestionSubscription} from "../../../../subscriptions/QuestionSubscription";
import FillBlankQuestion from "../../../../model/FillBlankQuestion";

@Component({
  selector: 'app-fill-blank-question-template',
  templateUrl: './fill-blank-question-template.component.html',
  styleUrls: ['./fill-blank-question-template.component.scss']
})
export class FillBlankQuestionTemplateComponent extends QuestionTemplate {

  constructor(
    router: Router,
    activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    questionSuubscription: QuestionSubscription,
  ) {
    super(router, activatedroute, formBuilder, questionSuubscription);
  }

  handleQuestionChange(): void {
    console.log(`handling question change for fb: ${JSON.stringify(this.currentQuestionAlv)}`)
    let fillblanksRequired: number = (this.currentQuestionAlv as FillBlankQuestion)._correctAnswers.length;
    this.currentQuestionOptions = [];
    console.log("fillblanks required:", fillblanksRequired)
    // TODO detectar el número de espacios a llenar requeridos y ponerlo en el texto de la pregunta como inputs
  }


}
