import {Component, OnInit} from '@angular/core';
import DatasetLoader from "../../model/DatasetLoader";
import Question from "../../model/Question";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {QuestionDatasetEntry} from "../../model/QuestionDatasetEntry";
import FillBlankQuestion from "../../model/FillBlankQuestion";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  questions: Question[] = [];//new DatasetLoader(this.httpClient).createQuestionsFromFile();
  asssitantStep: number = 1;
  maxQuestions = -1;
  questionSet: QuestionDatasetEntry[] = [{displayValue: 'vue', filename: 'vue.txt'}];
  categorySelection: string[] = [];
  categories: string[] = [];
  difficultySelection: string[] = [];
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];
  errorMessage = ''
  alert: boolean = false

  zerothFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private router: Router,
    private questionSuubscription: QuestionSubscription
  ) {
  }

  ngOnInit(): void {
    // leer de assets nombres de archivos


    this.zerothFormGroup = this._formBuilder.group({
      zerothCtrl: ['', Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  goToQuiz() {
    if (this.questions && this.questions.length > 0) {
      let questionsToBePassed = this.questions
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
      if (this.maxQuestions !== -1) {
        questionsToBePassed = questionsToBePassed.slice(0, this.maxQuestions)
      }
      this.questionSuubscription.updateSharedQuestions(questionsToBePassed);
      console.log('questionsToBePassed:', questionsToBePassed)
      this.router.navigate(['/quiz'])
    }
  }

  stepClick(evt: StepperSelectionEvent) {
    let label = evt.selectedStep.label;
    console.log(label)
    if (label === 'step3') {
      console.log('category selection: ', this.categorySelection)
      this.questions = this.questions.filter(question => this.categorySelection.includes(question.category))
    } else if (label === 'step1') {

      for (const questionSetSelection of this.questionSet) {
        let questions = new DatasetLoader(this.httpClient).createQuestionsFromFile(questionSetSelection.filename);
        let questionsb = questions;
        console.log('las preguntas', JSON.stringify(questions))
        console.log('las preguntas', questions)
        questionsb.push(...this.questions);
        this.questions = questionsb;

      }
      console.log('this.questions:', JSON.stringify(this.questions));
      this.categories = [...new Set(this.questions.map(question => question.category))]
      console.log('this.categories:', this.categories);
    }
  }
}
