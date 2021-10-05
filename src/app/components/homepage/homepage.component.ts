import {Component, OnInit} from '@angular/core';
import DatasetLoader from "../../model/DatasetLoader";
import Question from "../../model/Question";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  questions: Question[] = new DatasetLoader(this.httpClient).createQuestionsFromFile();
  asssitantStep: number = 1;
  maxQuestions = -1;
  categorySelection: string[] = [];
  difficultySelection: string[] = [];
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];
  errorMessage = ''
  alert: boolean = false

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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

  // computed
  get questionCategories(): string[] {
    const categories = [...new Set(this.questions.map(question => question.category))]
     // console.log(JSON.stringify(categories))
    return categories
  }

}
