import {Component, ChangeDetectionStrategy, signal, inject, computed} from '@angular/core';
import Question from "../../model/Question";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {QuestionSubscription} from "../../subscriptions/QuestionSubscription";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {QuestionDatasetEntry} from "../../model/QuestionDatasetEntry";
import Difficulty from "../../model/Difficulty";
import DatasetLoader from "../../business/DatasetLoader";
import {MatCard, MatCardTitle, MatCardContent} from '@angular/material/card';
import {MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {form, required, FieldTree, FormField, FormRoot, validate} from '@angular/forms/signals';

interface HomepageFormModel {
  questionSetSelectionCtrl: string[];
  categorySelectionCtrl: string[];
  difficultySelectionCtrl: string[];
  questionNumberCtrl: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardTitle, MatCardContent, MatStepper, MatStep, MatStepLabel, MatFormField, MatSelect, MatOption, MatButton, MatStepperNext, MatStepperPrevious, MatLabel, MatSlider, MatSliderThumb, FormField, FormRoot]
})
export class HomepageComponent {

  questionSet: QuestionDatasetEntry[] = [ //TODO extract question loading logic to service
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
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];

  categories = signal<string[]>([]);
  questions = signal<Question[]>([]);
  formModel = signal<HomepageFormModel>({
    questionSetSelectionCtrl: [],
    categorySelectionCtrl: [],
    difficultySelectionCtrl: [],
    questionNumberCtrl: -1
  });
  homepageForm: FieldTree<HomepageFormModel> = form(this.formModel, (form) => {
    required(form.questionSetSelectionCtrl);
    required(form.categorySelectionCtrl);
    required(form.difficultySelectionCtrl);
    required(form.questionNumberCtrl);
    validate(form.questionNumberCtrl, ({value}) => value() !== 0 ? {kind: 'select at least one question'} : undefined);
  });
  difficultySelection = computed<Difficulty[]>(() => this.homepageForm.difficultySelectionCtrl().value().map(difficultyStr => {
    switch (difficultyStr) {
      case 'EASY':
        return Difficulty.EASY;
      case 'NORMAL':
        return Difficulty.NORMAL;
      case 'HARD':
        return Difficulty.HARD;
      default:
        return Difficulty.NORMAL;
    }
  }));
  questionSetSelection = computed<QuestionDatasetEntry[]>(() => this.questionSet.filter(questionS => this.formModel().questionSetSelectionCtrl.includes(questionS.filename)))
  private router = inject(Router);
  private questionSubscription = inject(QuestionSubscription);
  private httpClient = inject(HttpClient);

  myDisplayWithFn = (value: number) => {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  goToQuiz() {
    if (this.questions() && this.questions().length > 0) {
      let questionsToBePassed = this.selectQuestionsToBePassed();
      questionsToBePassed = this.shuffleQuestions(questionsToBePassed);
      if (this.homepageForm.questionNumberCtrl().value() !== -1) {
        questionsToBePassed = questionsToBePassed.slice(0, this.homepageForm.questionNumberCtrl().value())
      }
      this.questionSubscription.updateSharedQuestions(questionsToBePassed);
      console.log('questionsToBePassed:', questionsToBePassed)
      this.router.navigate(['/quiz'])
    }
  }

  stepClick(evt: StepperSelectionEvent) {
    let label = evt.selectedStep.label;
    console.log('label:', label)
    switch (label) {
      case 'step2':
        //this.questionDifficulties = [...new Set(this.questions())];
        break;
      case 'step3':
        console.log('category selection: ', JSON.stringify(this.formModel().categorySelectionCtrl))
        break;
      case 'step1':
        this.questions.set([]);
        let promises = []
        for (const aQuestionSetSelection of this.questionSetSelection()) {
          let questionsPromise = new DatasetLoader(this.httpClient).createQuestionsFromFile(aQuestionSetSelection.filename);
          promises.push(questionsPromise);
        }

        Promise.all(promises).then(questionsPromises => {
          questionsPromises.forEach(aQuesTionSet => {
            //console.log('las preguntas', JSON.stringify(aQuesTionSet))
            //console.log('las preguntas', aQuesTionSet)
            this.questions.set([...this.questions(), ...aQuesTionSet]);
          })
          //console.log('this.questions:', JSON.stringify(this.questions));

          this.categories.set([...new Set(this.questions().map(question => question.category))]);
        })
        break;
    }

  }

  changeDifficulty(event: string[]) {
    // console.log(JSON.stringify(event))
    this.homepageForm.difficultySelectionCtrl().value.set(event);

    //  console.log("difficulty sel changed:", this.difficultySelection)
  }

  changeCategory(event: string[]) {
    // console.log(JSON.stringify(event))
    this.homepageForm.categorySelectionCtrl().value.set(event);
  }

  calculateMaxQuestions() {
    return this.selectQuestionsToBePassed().length
  }

  changeDatasets(value: string[]) {
    this.homepageForm.questionSetSelectionCtrl().value.set(value);
  }

  goToEditor() {
    this.router.navigate(['/questiongen'])
  }

  protected clearSelection(homepageForm: string) {
    switch (homepageForm) {
      case 'questionSetSelectionCtrl':
        this.homepageForm.questionSetSelectionCtrl().value.set([]);
        break;
      case 'categorySelectionCtrl':
        this.homepageForm.categorySelectionCtrl().value.set([]);
        break;
      case 'difficultySelectionCtrl':
        this.homepageForm.difficultySelectionCtrl().value.set([]);
        break;
    }
  }

  protected selectAll(homepageForm: string) {
    switch (homepageForm) {
      case 'questionSetSelectionCtrl':
        this.homepageForm.questionSetSelectionCtrl().value.set(this.questionSet.map(q => q.filename));
        break;
      case 'categorySelectionCtrl':
        this.homepageForm.categorySelectionCtrl().value.set(this.categories());
        break;
      case 'difficultySelectionCtrl':
        this.homepageForm.difficultySelectionCtrl().value.set(this.questionDifficulties);
        break;
    }
  }

  private selectQuestionsToBePassed() {
    return this.questions().filter(question => this.formModel().categorySelectionCtrl.includes(question.category))
      .filter(question => this.difficultySelection().includes(question.difficulty));
  }

  private shuffleQuestions(questionsToBePassed: Question[]) {
    return questionsToBePassed.map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
  }
}

