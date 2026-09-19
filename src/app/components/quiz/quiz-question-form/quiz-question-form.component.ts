import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import Question from "../../../model/Question";
import {MatSelect, MatOption} from "@angular/material/select";
import FillBlankQuestion from "../../../model/FillBlankQuestion";
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {FieldTree, FormField, FormRoot} from "@angular/forms/signals";

@Component({
  selector: 'app-quiz-question-form',
  templateUrl: './quiz-question-form.component.html',
  styleUrls: ['./quiz-question-form.component.scss'],
  imports: [ReactiveFormsModule, MatSelect, MatOption, MatInput, MatFormField, FormRoot, FormField]
})
export class QuizQuestionFormComponent implements OnInit {

  @Input()
  formRoot!: FieldTree<{
    multipleChoiceCtrl: string;
    multipleAnswerCtrl: string[];
    exampleCtrl: string;
    fillBlankCtrl: string;
  }, string | number, "writable">;

  currentQuestionAlv = input<Question>(new FillBlankQuestion("Yes"));

  @Input()
  mulAnswerSelectionChanged!: (event: any) => void;

  currentQuestionOptions = input<{ label: string; value: number }[]>([]);

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
