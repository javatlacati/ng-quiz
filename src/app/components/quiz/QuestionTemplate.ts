import Question from "../../model/Question";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {MatSelectChange} from "@angular/material/select";
import {Injectable, OnDestroy, OnInit} from "@angular/core";

@Injectable()
export abstract class QuestionTemplate implements OnInit, OnDestroy {
  questionsData: Question[] = []
  preguntaActual = 1


  currentQuestionAlv!: Question;
  completedQuiz = true
  private subscription: Subscription | null = null;

  currentQuestionOptions: { label: string; value: number }[] = []

  firstFormGroup!: FormGroup;

  selectedAnswers: string[] = [];

  constructor(
    protected router: Router,
    private activatedroute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    protected questionSuubscription: QuestionSubscription,
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
        this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.currentQuestionAlv.userAnswer ? this.currentQuestionAlv.userAnswer.split(',') : '')
        console.log(`this.selectedAnswers=${this.selectedAnswers}`)
        //this.selectedAnswers=this.currentQuestionAlv.userAnswer.split(',')
        break;
    }

    // TODO update answer for preguntaActual for fill in the blanks
  }

  abstract handleQuestionChange(): void;
}
