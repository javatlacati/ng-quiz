import {Component, OnInit} from '@angular/core';
import Question from "../../model/Question";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import {PageEvent} from "@angular/material/paginator";
import {Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import FillBlankQuestion from "../../model/FillBlankQuestion";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass']
})
export class FeedbackComponent implements OnInit {

  questionsData: Question[] = []
  preguntaActual = 1
  laPreguntaActual: Question = new FillBlankQuestion("Yes");
  private subscription: Subscription | null = null;

  constructor(private questionSuubscription: QuestionSubscription) {
  }

  ngOnInit(): void {
    this.subscription = this.questionSuubscription
      .currentSharedQuestions
      .subscribe((theQuestions: Question[]) => {
        if (theQuestions.length > 0) {
          this.laPreguntaActual = theQuestions[0];
        }
        return this.questionsData = theQuestions;
      });

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public handleQuestionChange(event?: PageEvent) {
    this.preguntaActual = event?.pageIndex || 0;
    this.laPreguntaActual = this.questionsData[this.preguntaActual];
  }

  // questionChanged() {
  //   let daQuestion: Question; //= this.$route.params.questions[this.preguntaActual - 1] as unknown as Question;
  //   let savedAnswer = daQuestion.userAnswer;
  //   console.log(`saved user answer: ${savedAnswer}`)
  //   if (savedAnswer === '') {
  //     this.selectedAnswer = null
  //   } else {
  //     let className = daQuestion.constructor.name;
  //     console.log(`className:${className}`)
  //     switch (className) {
  //       case 'MultipleChoiceQuestion':
  //         let daQuestionElementElement = (daQuestion as MultipleChoiceQuestion).choices[savedAnswer];
  //         console.log(`saved answer value:${daQuestionElementElement}`)
  //         console.log(`saved answer value:${daQuestionElementElement}`)
  //         this.selectedAnswer = {value: ~~savedAnswer, label: daQuestionElementElement}
  //         break;
  //     }
  //   }
  // }

}
