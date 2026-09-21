import {Component, OnInit, signal, computed, inject} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {Router} from "@angular/router";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {PageEvent, MatPaginator} from "@angular/material/paginator";
import {MatCard} from '@angular/material/card';
import {QuizQuestionHeaderComponent} from './quiz-question-header/quiz-question-header.component';
import {QuizQuestionFormComponent} from './quiz-question-form/quiz-question-form.component';
import {FieldTree, form} from "@angular/forms/signals";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass'],
  imports: [MatCard, QuizQuestionHeaderComponent, QuizQuestionFormComponent, MatPaginator]
})
export class QuizComponent implements OnInit {

  currentQuestionIndex = signal(1)
  currentQuestionAlv = signal<Question>(new FillBlankQuestion("Yes"));
  selectedAnswers: string[] = [];

  modelQuiz = signal({
    multipleChoiceCtrl: '',
    multipleAnswerCtrl: [] as string[],
    exampleCtrl: '',
    fillBlankCtrl: ''
  })

  quizForm: FieldTree<{
    multipleChoiceCtrl: string;
    multipleAnswerCtrl: string[];
    exampleCtrl: string;
    fillBlankCtrl: string;
  }, string | number, "writable"> = form(this.modelQuiz)
  //currentQuestionOptions = signal<{ label: string; value: number }[]>([]) this should be a computed signal
  currentQuestionOptions = computed(() => {
    if (this.currentQuestionAlv() instanceof MultipleChoiceQuestion || this.currentQuestionAlv() instanceof MultipleAnswerQuestion || this.currentQuestionAlv() instanceof OneExampleQuestion) {
      let choices: string[] = (this.currentQuestionAlv() as MultipleChoiceQuestion).choices;
      return choices.map((choice, idx) => {
        return {
          value: idx,
          label: choice
        }
      })
    }
    return []
  })
  protected readonly JSON = JSON;
  private questionSubscription = inject(QuestionSubscription);
  questionsData = this.questionSubscription.currentSharedQuestions;
  completedQuiz = computed(() => this.questionsData().every((aQuestion) => aQuestion.userAnswer != ''));

  // constructor(
  //   private activatedroute: ActivatedRoute,
  // ) {
  //
  // }
  private router = inject(Router);

  ngOnInit(): void {
    if (this.questionsData().length > 0) {
      this.currentQuestionAlv.set(this.questionsData()[0]);
    }
    this.handleQuestionChange();
  }

  onFormChange(event?: any): void {
    console.log('onFormChange called with event:', event);
    const formValues = this.modelQuiz();
    const question = this.currentQuestionAlv();
    const className = question.constructor.name;

    console.log('onFormChange called, formValues:', formValues);
    console.log('question type:', className);

    switch (className) {
      case 'MultipleChoiceQuestion':
        console.log("Valor del control multipleChoiceCtrl: " + formValues.multipleChoiceCtrl)
        question.userAnswer = event+'';
        console.log('userAnswer:', question.userAnswer);
        console.log('Set question.userAnswer to:', event);
        break;
      case 'OneExampleQuestion':
        question.userAnswer = formValues.exampleCtrl;
        console.log('Set userAnswer to:', question.userAnswer);
        break;
      case 'MultipleAnswerQuestion':
        question.userAnswer = event.join(',');
        console.log('Set userAnswer to:', event);
        break;
      case 'FillBlankQuestion':
        question.userAnswer = formValues.fillBlankCtrl;
        console.log('Set userAnswer to:', question.userAnswer);
        break;
    }

    console.log('question after update:', JSON.stringify(question));

    // Update the signal to trigger computed recalculation
    const updatedQuestions = [...this.questionsData()];
    this.currentQuestionAlv.set(question);
    console.log('currentQuestionAlv:', JSON.stringify(this.currentQuestionAlv()));
    updatedQuestions[this.currentQuestionIndex()] = this.currentQuestionAlv();
    this.questionSubscription.updateSharedQuestions(updatedQuestions);
    console.log('Updated questionsData');
  }


  public handleQuestionChange(event?: PageEvent) {
    console.log('completedQuiz: ' + this.completedQuiz())
    console.log(`this.selectedAnswers=${this.selectedAnswers} deleted`)
    this.selectedAnswers = []
    this.currentQuestionIndex.set(event?.pageIndex || 0);
    this.currentQuestionAlv.set(this.questionsData()[this.currentQuestionIndex()]);

    // Update form values based on the new question's saved answer
    let subtype = this.currentQuestionAlv().constructor.name;

    switch (subtype) {
      case 'FillBlankQuestion':
        this.modelQuiz.update(m => ({
          ...m,
          fillBlankCtrl: this.currentQuestionAlv().userAnswer || ''
        }));
        break;
      case 'OneExampleQuestion':
        this.modelQuiz.update(m => ({
          ...m,
          exampleCtrl: this.currentQuestionAlv().userAnswer || ''
        }));
        break;
      case 'MultipleAnswerQuestion':
        this.modelQuiz.update(m => ({
          ...m,
          multipleAnswerCtrl: this.currentQuestionAlv().userAnswer ? this.currentQuestionAlv().userAnswer.split(',') : []
        }));
        break;
      case 'MultipleChoiceQuestion':
        this.modelQuiz.update(m => ({
          ...m,
          multipleChoiceCtrl: this.currentQuestionAlv().userAnswer || ''
        }));
        break;
    }

    console.log(`questions updated: ${JSON.stringify(this.questionsData())}`)
    console.log(`all questions filled: ${JSON.stringify(this.questionsData().every((aQuestion) => aQuestion.userAnswer != ''))}`)
    console.log(`completedQuiz: ${JSON.stringify(this.completedQuiz())}`)
  }

  goToResults() {
    if (this.completedQuiz()) {
      console.log(`questions sent:${JSON.stringify(this.questionSubscription.currentSharedQuestions())}`)
      this.router.navigate(['/result'])
    } else {
      console.log('Quiz not completed')
    }
  }

}
