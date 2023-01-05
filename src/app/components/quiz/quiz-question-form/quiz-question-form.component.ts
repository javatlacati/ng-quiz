import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Question from "../../../model/Question";
import {MatSelectChange} from "@angular/material/select";
import FillBlankQuestion from "../../../model/FillBlankQuestion";

@Component({
  selector: 'app-quiz-question-form',
  templateUrl: './quiz-question-form.component.html',
  styleUrls: ['./quiz-question-form.component.scss']
})
export class QuizQuestionFormComponent implements OnInit {

  @Input()
  firstFormGroup!: FormGroup;

  @Input()
  currentQuestionAlv: Question = new FillBlankQuestion("Yes");

  @Input()
  mulAnswerSelectionChanged!: (event: MatSelectChange) => void;

  @Input()
  currentQuestionOptions: { label: string; value: number }[] = [];

  @Input()
  value: string[] = [];

  @Output()
  valueChange = new EventEmitter<string[]>();

  @Input()
  completedQuiz: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  unescape(label: string): string {
    return new DOMParser().parseFromString(label, 'text/html').documentElement.textContent || '';
  }


}
