import {Component, ChangeDetectionStrategy, computed, inject} from '@angular/core';
import Question from "../../model/Question";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import {Router} from "@angular/router";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";
import {MatCard, MatCardHeader, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardHeader, MatCardContent, MatButton]
})
export class ResultadoComponent {
  private questionSubscription = inject(QuestionSubscription);
  private router = inject(Router);

  questionsData = this.questionSubscription.currentSharedQuestions;

  score = computed(() => {
    let total = 0;
    for (let currentQuestion of this.questionsData()) {
      total += (currentQuestion as any as Question).checkQuestion();
    }
    return total;
  });

  vettedScore = computed(() => {
    let total = 0;
    for (let currentQuestion of this.questionsData()) {
      if ((currentQuestion as any as Question).gradeQuestion()) {
        total += (currentQuestion as any as Question).checkQuestion();
      }
    }
    return total;
  });

  totalVetted = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if ((currentQuestion as any as Question).gradeQuestion()) {
        count++;
      }
    }
    return count;
  });

  totalCorrectVetted = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if ((currentQuestion as any as Question).gradeQuestion()) {
        if ((currentQuestion as any as Question).checkQuestion() > 0) {
          count++;
        }
      }
    }
    return count;
  });

  totalIncorrectVetted = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if ((currentQuestion as any as Question).gradeQuestion()) {
        if ((currentQuestion as any as Question).checkQuestion() === 0) {
          count++;
        }
      }
    }
    return count;
  });

  totalTrial = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if (!(currentQuestion as any as Question).gradeQuestion()) {
        count++;
      }
    }
    return count;
  });

  trialScore = computed(() => {
    let total = 0;
    for (let currentQuestion of this.questionsData()) {
      if (!(currentQuestion as any as Question).gradeQuestion()) {
        total += (currentQuestion as any as Question).checkQuestion();
      }
    }
    return total;
  });

  totalCorrectTrial = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if (!(currentQuestion as any as Question).gradeQuestion()) {
        if ((currentQuestion as any as Question).checkQuestion() > 0) {
          count++;
        }
      }
    }
    return count;
  });

  totalIncorrectTrial = computed(() => {
    let count = 0;
    for (let currentQuestion of this.questionsData()) {
      if (!(currentQuestion as any as Question).gradeQuestion()) {
        if ((currentQuestion as any as Question).checkQuestion() === 0) {
          count++;
        }
      }
    }
    return count;
  });

  totalCorrect = computed(() => this.totalCorrectVetted() + this.totalCorrectTrial());
  totalIncorrect = computed(() => this.totalIncorrectVetted() + this.totalIncorrectTrial());


  incorrectQuestionsData(questions: Question[]) {
    console.log(`filering incorrect questions from:${JSON.stringify(questions)}`);
    //
    let theQuestions = (questions as any[] as Question[]).map(obj => {
      switch (obj.constructor.name) {
        case 'MultipleChoiceQuestion':
          return Object.assign(new MultipleChoiceQuestion('vetted'), obj);
        case 'FillBlankQuestion':
          return Object.assign(new FillBlankQuestion('vetted'), obj);
        case 'OneExampleQuestion':
          return Object.assign(new OneExampleQuestion('vetted'), obj);
        case 'MultipleAnswerQuestion':
          return Object.assign(new MultipleAnswerQuestion('vetted'), obj);
        case '':
          return Object.assign(new MultipleAnswerQuestion('vetted'), obj);
        default:
          throw new Error('unparseable question type:' + obj.constructor.name + '\n\n' + JSON.stringify(obj));
      }
    });
    console.log(`filering incorrect questions parsed:${JSON.stringify(theQuestions)}`);
    return theQuestions.filter((question) =>
      question.checkQuestion() < question.maxPoints
    );
  }

  goToFeedback() {
    let questions = this.incorrectQuestionsData(this.questionsData());
    console.log(`questions sent to feedback:${JSON.stringify(questions)}`)
    this.questionSubscription.updateSharedQuestions(questions);
    this.router.navigate(['/feedback'])
  }


}
