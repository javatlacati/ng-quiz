import {Component, OnDestroy, OnInit} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit, OnDestroy {

  questionsData: Question[] = []
  preguntaActual = 1
  currentQuestionAlv: Question = new FillBlankQuestion("Yes");
  completedQuiz = true
  private subscription: Subscription | null = null;

  currentQuestionOptions: { label: string; value: number }[] = []

  firstFormGroup!: FormGroup;

  selectedAnswers: string[] = [];

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private questionSuubscription: QuestionSubscription,
  ) {
    this.firstFormGroup = _formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['']
    })
  }

  ngOnInit(): void {
    this.subscription = this.questionSuubscription
      .currentSharedQuestions
      .subscribe((theQuestions: Question[]) => {
        if (theQuestions.length > 0) {
          this.currentQuestionAlv = theQuestions[0];
        }
        return this.questionsData = theQuestions;
      });
    this.handleQuestionChange();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  mulAnswerSelectionChanged(event: MatSelectChange): void {
    // [(value)]="currentQuestionAlv.userAnswer"
    console.log(`event=${event.value}`)
    let selection = event.value as number
    console.log('respuesta elegida:', selection)
    console.log('respuesta elegida en formulario:', this.firstFormGroup.get('firstCtrl')?.value)
    this.currentQuestionAlv.userAnswer = `${selection}`;
    console.log('saving answer:', this.currentQuestionAlv.userAnswer)
    let className = this.currentQuestionAlv.constructor.name;
    console.log(`className:${className}`)
    switch (className) {
      case 'OneExampleQuestion':
      case 'MultipleChoiceQuestion':
        this.currentQuestionAlv.userAnswer = `${selection}`;
        console.log(this.currentQuestionAlv.answer)
        //this.firstFormGroup.get('firstFormGroup.firstCtrl')?.setValue(this.laPreguntaActual.answer);
        break;
      case 'MultipleAnswerQuestion':
        this.currentQuestionAlv.userAnswer = `${selection}`;
        console.log(`this.selectedAnswers = ${this.currentQuestionAlv.userAnswer.split(',')}`)
        //this.selectedAnswers = this.currentQuestionAlv.userAnswer.split(',')
        this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.currentQuestionAlv.userAnswer?this.currentQuestionAlv.userAnswer.split(','):'')
        console.log(`this.selectedAnswers=${this.selectedAnswers}`)
        //this.selectedAnswers=this.currentQuestionAlv.userAnswer.split(',')
        break;
    }

    // TODO update answer for preguntaActual for fill in the blanks
  }

  verifyCompletion(questions: Question[]): void {
    console.log(JSON.stringify(questions))
    // console.log(questions[0].constructor.name)
    console.log(`completedness:${JSON.stringify(questions.map(q => q.userAnswer))}`)
    this.completedQuiz = questions.every((aQuestion) => aQuestion.userAnswer);
    console.log(`completed:${this.completedQuiz}`)
  }

  savedAnswerValue(preguntaActual: number, preguntaSiguiente: number) {
    let daQuestion = this.currentQuestionAlv;
    let savedAnswer: string = daQuestion.userAnswer;
    console.log(`saved user answer: ${savedAnswer}`)
    let className = daQuestion.constructor.name;
    if (savedAnswer && savedAnswer !== '') {
      console.log(`className:${className}`)
      switch (className) {
        case 'MultipleChoiceQuestion':
          // @ts-ignore
          // let daQuestionElementElement = (daQuestion as MultipleChoiceQuestion)['_choices'][savedAnswer];
          // console.log(`saved answer value:${daQuestionElementElement}`)
          // this.selectedAnswer = {value: ~~savedAnswer, label: daQuestionElementElement}
          this.currentQuestionAlv.userAnswer = savedAnswer
          this.firstFormGroup.get('firstCtrl')!.setValue(parseInt(savedAnswer));
          console.log("valor puesto:",this.currentQuestionAlv.userAnswer)
          //this.firstFormGroup.markAllAsTouched();
          break;
        case 'MultipleAnswerQuestion':
          this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.currentQuestionAlv.userAnswer?this.currentQuestionAlv.userAnswer.split(','):''))
          console.log(`this.selectedAnswers setting saved ${this.selectedAnswers}`)
          this.selectedAnswers=this.currentQuestionAlv.userAnswer.split(',')
          break;
      }
    } else {
      console.log('pregunta no previamente guardada')
      switch (className) {
        case 'MultipleChoiceQuestion':
           console.log('borrando first control')
           this.firstFormGroup.get('firstCtrl')?.setValue('');
          break;
      }
    }
  }

  public handleQuestionChange(event?: PageEvent) {
    console.log(`this.selectedAnswers=${this.selectedAnswers} deleted`)
    this.selectedAnswers = []
    this.preguntaActual = event?.pageIndex || 0;
    this.currentQuestionAlv = this.questionsData[this.preguntaActual];
    this.savedAnswerValue(this.preguntaActual, this.preguntaActual+1);
    let subtype = this.currentQuestionAlv.constructor.name;
    switch (subtype) {
      case 'FillBlankQuestion':
        let fillblanksRequired: number = (this.currentQuestionAlv as FillBlankQuestion)._correctAnswers.length;
        this.currentQuestionOptions = [];
        console.log("fillblanks required:",fillblanksRequired)
        // TODO detectar el número de espacios a llenar requeridos y ponerlo en el texto de la pregunta como inputs
        break;
      case 'MultipleAnswerQuestion':
        let daChoices: string[] = (this.currentQuestionAlv as MultipleAnswerQuestion).choices;
        this.currentQuestionOptions = daChoices.map((choice, idx) => {
          return {
            value: idx,
            label: choice
          }
        });
        console.log(`this.selectedAnswers is ${this.currentQuestionAlv.userAnswer.split(',')}`)
        this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue('')
        break;
      case 'MultipleChoiceQuestion':
        let choices: string[] = (this.currentQuestionAlv as MultipleChoiceQuestion).choices;
        this.currentQuestionOptions = choices.map((choice, idx) => {
          return {
            value: idx,
            label: choice
          }
        });
        break;
    }
  }

  goToResults() {
    console.log(`questions sent:${JSON.stringify(this.questionsData)}`)
    this.verifyCompletion(this.questionsData);
    if (this.completedQuiz) {
      this.questionSuubscription.updateSharedQuestions(this.questionsData);
      this.router.navigate(['/result'])
    }
  }

  // isInLastPage() {
  //   console.log('questions: ', this.questionsData.length)
  //   console.log('preguntaActual: ', (this.preguntaActual + 1))
  //   this.questionsData.length === (this.preguntaActual + 1 || 0);
  // }

  unescape(label: string): string {
    return new DOMParser().parseFromString(label, 'text/html').documentElement.textContent || '';
  }
}
