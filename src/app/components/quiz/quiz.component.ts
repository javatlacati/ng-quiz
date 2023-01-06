import {Component, ViewChild} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {ActivatedRoute, Router} from "@angular/router";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {FormBuilder} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {QuestionTemplate} from "./QuestionTemplate";
import {QuizQuestionFormComponent} from "./quiz-question-form/quiz-question-form.component";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent extends QuestionTemplate {


  @ViewChild(QuizQuestionFormComponent)
  quizQuestionFormComponent!: QuizQuestionFormComponent;

  constructor(
    router: Router,
    activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    questionSuubscription: QuestionSubscription,
  ) {
    super(router, activatedroute, formBuilder, questionSuubscription);
  }

  verifyCompletion(questions: Question[]): void {
    console.log(JSON.stringify(questions))
    // console.log(questions[0].constructor.name)
    console.log(`completedness:${JSON.stringify(questions.map(q => q.userAnswer))}`)
    this.completedQuiz = questions.every((aQuestion) => aQuestion.userAnswer);
    console.log(`completed:${this.completedQuiz}`)
  }

  private savedAnswerValue(preguntaActual: number, preguntaSiguiente: number) {
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
          console.log("valor puesto:", this.currentQuestionAlv.userAnswer)
          //this.firstFormGroup.markAllAsTouched();
          break;
        case 'MultipleAnswerQuestion':
          this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.firstFormGroup.get('firstFormGroup.secondCtrl')?.setValue(this.currentQuestionAlv.userAnswer ? this.currentQuestionAlv.userAnswer.split(',') : ''))
          console.log(`this.selectedAnswers setting saved ${this.selectedAnswers}`)
          this.selectedAnswers = this.currentQuestionAlv.userAnswer.split(',')
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
    this.savedAnswerValue(this.preguntaActual, this.preguntaActual + 1);
    this.quizQuestionFormComponent.handleQuestionChange();
    //   let subtype = this.currentQuestionAlv.constructor.name;
    //   switch (subtype) {
    //     case 'FillBlankQuestion':
    //       let fillblanksRequired: number = (this.currentQuestionAlv as FillBlankQuestion)._correctAnswers.length;
    //       this.currentQuestionOptions = [];
    //       console.log("fillblanks required:",fillblanksRequired)
    //       // TODO detectar el número de espacios a llenar requeridos y ponerlo en el texto de la pregunta como inputs
    //       break;
    //     case 'MultipleChoiceQuestion':
    //       let choices: string[] = (this.currentQuestionAlv as MultipleChoiceQuestion).choices;
    //       this.currentQuestionOptions = choices.map((choice, idx) => {
    //         return {
    //           value: idx,
    //           label: choice
    //         }
    //       });
    //       break;
    //   }
  }


  goToResults() {
    console.log(`questions sent:${JSON.stringify(this.questionsData)}`)
    this.verifyCompletion(this.questionsData);
    if (this.completedQuiz) {
      this.questionSuubscription.updateSharedQuestions(this.questionsData);
      this.router.navigate(['/result'])
    }
  }

}
