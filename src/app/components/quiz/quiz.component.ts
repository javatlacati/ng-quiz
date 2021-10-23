import {Component, OnInit} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
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
  completedQuiz = true
  private subscription: Subscription | null = null;

  firstFormGroup!: FormGroup

  currentQuestionOptions: { label: string; value: number }[] = []

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private questionSuubscription: QuestionSubscription,
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
    this.handleQuestionChange();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createItems(selection: number): void {
    console.log('respuesta elegida:', selection)
    this.laPreguntaActual.userAnswer = `${selection}`;
    console.log('saving answer:', this.laPreguntaActual.userAnswer)
    let className = this.laPreguntaActual.constructor.name;
    console.log(`className:${className}`)
    switch (className) {
      case 'MultipleChoiceQuestion':
        this.laPreguntaActual.answer = `${selection}`;
        console.log(this.laPreguntaActual.answer)
        //this.firstFormGroup.get('firstFormGroup.firstCtrl')?.setValue(this.laPreguntaActual.answer);
        break;
      case 'MultipleAnswerQuestion':
        this.laPreguntaActual.answer = `${selection}`;
        console.log(this.laPreguntaActual.answer)
        break;
    }

    // TODO update answer for preguntaActual for fill in the blanks
  }

  verifyCompletion(questions: Question[]): void {
    console.log(JSON.stringify(questions))
    // console.log(questions[0].constructor.name)
    console.log(`completedness:${JSON.stringify(questions.map(q => q.userAnswer))}`)
    this.completedQuiz = questions.every((aQuestion) => aQuestion.userAnswer.length > 0);
    console.log(`completed:${this.completedQuiz}`)
  }

  questionChanged() {
    let daQuestion = this.laPreguntaActual || '';
    let savedAnswer: string = daQuestion.userAnswer;
    console.log(`saved user answer: ${savedAnswer}`)
    let className = daQuestion.constructor.name;
    if (savedAnswer && savedAnswer !== '') {
      console.log(`className:${className}`)
      switch (className) {
        case 'MultipleChoiceQuestion':
          // @ts-ignore
          let daQuestionElementElement = (daQuestion as MultipleChoiceQuestion)['_choices'][savedAnswer];
          console.log(`saved answer value:${daQuestionElementElement}`)
          // this.selectedAnswer = {value: ~~savedAnswer, label: daQuestionElementElement}
          this.laPreguntaActual.userAnswer = savedAnswer
          // this.firstFormGroup.get('firstFormGroup.firstCtrl')?.setValue(this.laPreguntaActual);
          //this.firstFormGroup.markAllAsTouched();
          break;
      }
    } else {
      switch (className) {
        case 'MultipleChoiceQuestion':
          // this.firstFormGroup.get('firstFormGroup.firstCtrl')?.setValue(null);
          break;
      }
    }
  }

  public handleQuestionChange(event?: PageEvent) {
    this.preguntaActual = event?.pageIndex || 0;
    this.laPreguntaActual = this.questionsData[this.preguntaActual];
    let subtype = this.laPreguntaActual.constructor.name;
    switch (subtype) {
      case 'FillBlankQuestion':
        this.currentQuestionOptions = [];
        // TODO detectar el número de espacios a llenar requeridos y ponerlo en el texto de la pregunta como inputs
        break;
      case 'MultipleAnswerQuestion':
      case 'MultipleChoiceQuestion':
        let choices: string[] = (this.laPreguntaActual as MultipleChoiceQuestion).choices;
        this.currentQuestionOptions = choices.map((choice, idx) => {
          return {
            value: idx,
            label: choice
          }
        });
        this.questionChanged();
        break;
    }
  }

  goToResults() {
    console.log(`questions sent:${JSON.stringify(this.questionsData)}`)
    this.verifyCompletion(this.questionsData);
    if (this.completedQuiz)
      this.questionSuubscription.updateSharedQuestions(this.questionsData);
    this.router.navigate(['/result'])
    //this.$router.push({name: 'Resultado', params: {questions} as any})
  }

  isInLastPage() {
    console.log('questions: ', this.questionsData.length)
    console.log('preguntaActual: ', (this.preguntaActual + 1))
    this.questionsData.length === (this.preguntaActual + 1 || 0);
  }

  unescape(label: string): string {
    return new DOMParser().parseFromString(label, 'text/html').documentElement.textContent || '';
  }
}
