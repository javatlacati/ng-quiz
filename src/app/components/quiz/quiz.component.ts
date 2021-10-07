import {Component, Input, OnInit} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {NEVER, Observable, Subscription} from "rxjs";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {

  questionsData: Question[] = []
  preguntaActual = 1
  laPreguntaActual: Question = new FillBlankQuestion("Yes");
  selectedAnswer: { value: number, label: string } | null = null
  completedQuiz = false
  private subscription: Subscription | null = null;

  firstFormGroup!: FormGroup

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private questionSuubscription: QuestionSubscription
  ) {

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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createItems(question: Question): { label: string; value: number }[] {
    let choices: string[] = (question as MultipleChoiceQuestion).choices;
    return choices.map((choice, idx) => {
      return {
        value: idx,
        label: choice
      }
    })
  }

  verifyCompletion(questions: Question[]): void {
    console.log(JSON.stringify(questions))
    console.log(questions[0].constructor.name)
    console.log(`completedness:${JSON.stringify(questions.map(q => q.userAnswer))}`)
    this.completedQuiz = questions.every((aQuestion) => aQuestion.userAnswer.length > 0);
    console.log(`completed:${this.completedQuiz}`)
  }

  questionChanged() {
    let daQuestion = this.questionsData[this.preguntaActual - 1] as unknown as Question;
    let savedAnswer: string = daQuestion['_userAnswer'];
    console.log(`saved user answer: ${savedAnswer}`)
    if (savedAnswer === '') {
      this.selectedAnswer = null
    } else {
      let className = daQuestion.constructor.name;
      console.log(`className:${className}`)
      switch (className) {
        case 'MultipleChoiceQuestion':
          // @ts-ignore
          let daQuestionElementElement = (daQuestion as MultipleChoiceQuestion)['_choices'][savedAnswer];
          console.log(`saved answer value:${daQuestionElementElement}`)
          this.selectedAnswer = {value: ~~savedAnswer, label: daQuestionElementElement}
          break;
      }
    }
  }

  public handleQuestionChange(event?: PageEvent) {
    this.preguntaActual = event?.pageIndex || 0;
    this.laPreguntaActual = this.questionsData[this.preguntaActual];
  }

  goToResults(questions: Question[]) {
    console.log(`questions sent:${JSON.stringify(questions)}`)
    //this.$router.push({name: 'Resultado', params: {questions} as any})
  }

}
