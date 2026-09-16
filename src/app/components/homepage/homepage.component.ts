import {Component, OnInit, ChangeDetectionStrategy, signal, inject, Injector} from '@angular/core';
import Question from "../../model/Question";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {QuestionDatasetEntry} from "../../model/QuestionDatasetEntry";
import Difficulty from "../../model/Difficulty";
import DatasetLoader from "../../business/DatasetLoader";
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import {form, required, FieldTree, FormField} from '@angular/forms/signals';

interface HomepageFormModel {
  zerothCtrl: string[];
  firstCtrl: string[];
  secondCtrl: string[];
  thirdCtrl: number;
}

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardTitle, MatCardContent, MatStepper, MatStep, MatStepLabel, MatFormField, MatSelect, MatOption, MatButton, MatStepperNext, MatStepperPrevious, MatLabel, MatSlider, MatSliderThumb, FormField]
})
export class HomepageComponent implements OnInit {

  questions: Question[] = [];
  maxQuestions = -1;
  questionSet: QuestionDatasetEntry[] = [
    {displayValue: 'Sample questions', filename: 'SampleQuiz.txt'},
    // {displayValue: 'vue', filename: 'vue.txt'},
    // {
    //   displayValue: 'Appian',
    //   filename: 'appian.txt'
    // },
    // {
    //   displayValue: 'Java Webservices',
    //   filename: 'java webservice.txt'
    // },
    // {
    //   displayValue: 'Hybrid cloud',
    //   filename: 'Hybrid cloud SRE Assessment.txt'
    // },
    // {
    //   displayValue: 'Design Patterns',
    //   filename: 'design patterns.txt'
    // },
    // {
    //   displayValue: 'Selenium with Java',
    //   filename: 'selenium java.txt'
    // },
    // {
    //   displayValue: 'Hybrid cloud pre assesment',
    //   filename: 'hybrid cloud preassesment.txt'
    // },
    // {
    //   displayValue: 'Docker',
    //   filename: 'docker.txt'
    // },
    // {
    //   displayValue: 'Search Engine Optimization',
    //   filename: 'seo.txt'
    // },
    {
      displayValue: 'Finanzas y Trading',
      filename: 'finanzas y trading.txt'
    }
  ];
  questionSetSelection: QuestionDatasetEntry[] = [];
  categorySelection: string[] = [];
  categories: string[] = [];
  difficultySelection: Difficulty[] = [];
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];
  errorMessage = ''

  homepageForm!: FieldTree<HomepageFormModel>;
  myDisplayWithFn = (value: number) => {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  private injector = inject(Injector);

  formModel = signal<HomepageFormModel>({
    zerothCtrl: [],
    firstCtrl: [],
    secondCtrl: [],
    thirdCtrl: this.maxQuestions
  });

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private questionSuubscription: QuestionSubscription
  ) {
    this.homepageForm = form(this.formModel, (form) => {
      required(form.zerothCtrl);
      required(form.firstCtrl);
      required(form.secondCtrl);
      required(form.thirdCtrl);
    }, { injector: this.injector });
  }

  ngOnInit(): void {
    // leer de assets nombres de archivos
  }

  goToQuiz() {
    if (this.questions && this.questions.length > 0) {
      this.maxQuestions = this.homepageForm.thirdCtrl().value();
      let questionsToBePassed = this.selectQuestionsToBePassed();
      questionsToBePassed = this.shuffleQuestions(questionsToBePassed);
      if (this.maxQuestions !== -1) {
        questionsToBePassed = questionsToBePassed.slice(0, this.maxQuestions)
      }
      this.questionSuubscription.updateSharedQuestions(questionsToBePassed);
      console.log('questionsToBePassed:', questionsToBePassed)
      this.router.navigate(['/quiz'])
    }
  }

  private selectQuestionsToBePassed() {
    return this.questions.filter(question => this.categorySelection.includes(question.category))
      .filter(question => this.difficultySelection.includes(question.difficulty));
  }

  private shuffleQuestions(questionsToBePassed: Question[]) {
    return questionsToBePassed.map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
  }

  stepClick(evt: StepperSelectionEvent) {
    let label = evt.selectedStep.label;
    console.log('label:', label)
    switch (label) {
      case 'step2':
        this.questionDifficulties = [...new Set(this.questions.map(question => {
          switch (question.difficulty) {
            case Difficulty.EASY:
              return 'EASY';
            case Difficulty.NORMAL:
              return 'NORMAL';
            case Difficulty.HARD:
              return 'HARD';
            default:
              return 'NORMAL';
          }
        }))];
        break;
      case 'step3':
        console.log('category selection: ', JSON.stringify(this.categorySelection))
        break;
      case 'step1':
        this.questions = [];
        let promises = []
        for (const aQuestionSetSelection of this.questionSetSelection) {
          let questionsPromise = new DatasetLoader(this.httpClient).createQuestionsFromFile(aQuestionSetSelection.filename);
          promises.push(questionsPromise);
        }

        Promise.all(promises).then(questionsPromises => {
          questionsPromises.forEach(aQuesTionSet => {
            //console.log('las preguntas', JSON.stringify(aQuesTionSet))
            //console.log('las preguntas', aQuesTionSet)
            this.questions.push(...aQuesTionSet);
          })
          //console.log('this.questions:', JSON.stringify(this.questions));

          this.categories = [...new Set(this.questions.map(question => question.category))]
          //console.log('this.categories:', this.categories);
        })
        break;
    }

  }

  changeDifficulty(event: string[]) {
    // console.log(JSON.stringify(event))
    this.homepageForm.secondCtrl().value.set(event);

    this.difficultySelection = event.map(aDifficulty => {
      switch (aDifficulty) {
        case 'EASY':
          return Difficulty.EASY;
        case 'NORMAL':
          return Difficulty.NORMAL;
        case 'HARD':
          return Difficulty.HARD;
        default:
          return Difficulty.NORMAL;
      }
    });
    //  console.log("difficulty sel changed:", this.difficultySelection)
  }

  changeCategory(event: string[]) {
    // console.log(JSON.stringify(event))
    this.categorySelection = event;
    this.homepageForm.firstCtrl().value.set(event);
  }

  calculateMaxQuestions() {
    return this.selectQuestionsToBePassed().length
  }

  changeDatasets(value: string[]) {
    this.questionSetSelection = this.questionSet.filter(questionS => value.includes(questionS.filename));
    this.homepageForm.zerothCtrl().value.set(value);
  }

  goToEditor() {
    this.router.navigate(['/questiongen'])
  }
}

