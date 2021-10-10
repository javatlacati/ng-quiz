import {Component, OnInit} from '@angular/core';
import Question from "../../model/Question";
import {Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.sass']
})
export class ResultadoComponent implements OnInit {

  questionsData: Question[] = []
  score = 0;
  vettedScore = 0
  totalVetted = 0
  totalCorrectVetted = 0
  totalIncorrectVetted = 0
  totalTrial = 0
  trialScore = 0
  totalCorrectTrial = 0
  totalIncorrectTrial = 0
  totalCorrect = 0;
  totalIncorrect = 0;
  private subscription: Subscription | null = null;

  constructor(private questionSuubscription: QuestionSubscription) {
  }

  ngOnInit(): void {
    this.subscription = this.questionSuubscription
      .currentSharedQuestions
      .subscribe((theQuestions: Question[]) => {
        // if (theQuestions.length > 0) {
        //   this.laPreguntaActual = theQuestions[0];
        // }
        return this.questionsData = theQuestions;
      });

    // console.log(this.questionsData)
    //For every question in questions
    for (let currentQuestion of this.questionsData) {

      //TODO perhaps instead of
      //currentQuestion.checkQuestionProvidingAnswer(input) userAnswer
      //could be just setted


      //Add points to total score
      let questionElement: string = currentQuestion['_userAnswer'];
      console.log(questionElement)
      // = currentQuestion.checkQuestionProvidingAnswer(questionElement);
      let puntosRespuesta = (currentQuestion as any as Question)['checkQuestion']();
      this.score += puntosRespuesta;

      //Was the answer vetted/trial and correct, partially correct, or incorrect?
      if ((currentQuestion as any as Question).gradeQuestion()) {
        this.countForVetted(puntosRespuesta);
      } else {
        this.countForTrial(puntosRespuesta);
      }

    }


    this.totalCorrect = this.totalCorrectVetted + this.totalCorrectTrial;
    this.totalIncorrect = this.totalIncorrectVetted + this.totalIncorrectTrial;

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  incorrectQuestionsData(questions: Question[]) {
    console.log(`filering incorrect questions from:${JSON.stringify(questions)}`);
    //
    let theQuestions = (questions as any[] as Question[]).map(obj => {
      switch (obj.constructor.name) {
        case 'MultipleChoiceQuestion':
          return Object.assign(new MultipleChoiceQuestion('vetted'), obj);
        case 'FillBlankQuestion':
          return Object.assign(new FillBlankQuestion('vetted'), obj);
        case '':
          return Object.assign(new MultipleAnswerQuestion('vetted'), obj);
        default:
          throw new Error('unparseable question type:' + obj);
      }
    });
    console.log(`filering incorrect questions parsed:${theQuestions}`);
    return theQuestions.filter((question) =>
      question.checkQuestion() < question.maxPoints
    );
  }

  goToFeedback(allQuestions: Question[]) {
    let questions = this.incorrectQuestionsData(allQuestions);
    console.log(`questions sent to feedback:${JSON.stringify(questions)}`)
    // this.$router.push({name: 'Feedback', params: {questions} as any})
  }

  countForVetted(puntosRespuesta: number) {
    //Count vetted questions
    this.totalVetted++;

    //Add to vetted score
    this.vettedScore += puntosRespuesta;

    //Was question correct, partially corrct, or incorrct?
    //Question is vetted
    if (puntosRespuesta > 0) {
      //Count correct/partial vetted
      this.totalCorrectVetted++;
    } else {
      //Count incorrect vetted
      this.totalIncorrectVetted++;
    }
  }

  countForTrial(puntosRespuesta: number) {

    //Count trial questions
    this.totalTrial++;

    //Add to trial score
    this.trialScore += puntosRespuesta;

    //Was question correct, partially correct, or incorrect?
    //Question is trial
    if (puntosRespuesta > 0) {
      //Count correct/partial trial
      this.totalCorrectTrial++;
    } else {
      //Count incorrect trial
      this.totalIncorrectTrial++;
    }
  }

}
