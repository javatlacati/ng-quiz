import {Component, OnInit, ChangeDetectionStrategy, signal, computed} from '@angular/core';
import Question from "../../model/Question";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Difficulty from "../../model/Difficulty";
import {GenerationStrategyChooser} from "../../business/GenerationStrategyChooser";
import {Optional} from "typescript-optional";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatIconButton, MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {CdkCopyToClipboard} from '@angular/cdk/clipboard';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {form, FormField} from "@angular/forms/signals";

@Component({
  selector: 'app-questiongen',
  templateUrl: './questiongen.component.html',
  styleUrls: ['./questiongen.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardContent, MatSelect, MatOption, MatFormField, MatInput, ReactiveFormsModule, FormsModule, MatIconButton, MatTooltip, CdkCopyToClipboard, MatIcon, MatButton, MatCheckbox, FormField]
})
export class QuestiongenComponent implements OnInit {
  questionTypes = [
    {name: 'Fill In The Blanks', value: 'FillBlankQuestion'}
    , {name: 'Multiple Choice', value: 'MultipleChoiceQuestion'}
    , {name: 'Multiple Answer', value: 'MultipleAnswerQuestion'}
    , {name: 'Give an Example Answer', value: 'OneExampleQuestion'}
  ];
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];

  currentQuestionAlv = signal<Question>(new FillBlankQuestion("Yes"));

  questionGenerationModel=signal({
    questionType: 'FillBlankQuestion',
    questionText: '',
    answer: '',
    explanation: '',
    correctAnswer: '',
    wrongAnswers: [],
    correctChoiceIdx: 0,
    difficulty: 'Easy',
    category: '',
    optionToBeAdded: ''
  })

  formQuestionGeneration = form(this.questionGenerationModel,(form) => {})

  multipleAnswerCorrect: boolean = false;
  currentGenerationStrategy = computed(() => GenerationStrategyChooser.getStrategy(this.questionGenerationModel().questionType))

  constructor(public _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  changeType(value: string) {
    console.log('changing question type to:' + value)
    console.log('current question type:' + this.questionGenerationModel().questionType)
    console.log('previous type:' + this.currentQuestionAlv.constructor.name)
    Optional.ofNullable(this.currentGenerationStrategy()).ifPresent(parseStrategy => {
      this.currentQuestionAlv.set(parseStrategy.resetQuestion())
    })

    this.questionGenerationModel.set({...this.questionGenerationModel(), optionToBeAdded: ''})
    console.log('new type:' + this.currentQuestionAlv.constructor.name)
  }

  mapDifficulty(aDifficulty: string): Difficulty {
    // console.log(`mapping difficulty:${aDifficulty} of type ${aDifficulty.constructor.name}`)
    switch (aDifficulty.toUpperCase()) {
      case 'EASY':
        return Difficulty.EASY;
      case 'NORMAL':
        return Difficulty.NORMAL;
      case 'HARD':
        return Difficulty.HARD;
      default:
        return Difficulty.NORMAL;
    }
  }

  addAnswerChoice() {
    if (this.currentQuestionAlv() instanceof MultipleAnswerQuestion) {
      let questionToAddChoice = this.currentQuestionAlv() as MultipleAnswerQuestion;
      console.log(`answer choices: ${JSON.stringify(questionToAddChoice.choices)}`)
      questionToAddChoice.setChoice(this.questionGenerationModel().optionToBeAdded, this.multipleAnswerCorrect);
      this.currentQuestionAlv.set(questionToAddChoice)
    } else {
      if (this.currentQuestionAlv() instanceof MultipleChoiceQuestion) {
        let questionToAddChoice = this.currentQuestionAlv() as MultipleChoiceQuestion;
        console.log(`answer choices: ${JSON.stringify(questionToAddChoice.choices)}`)
        questionToAddChoice.setChoice(this.questionGenerationModel().optionToBeAdded, questionToAddChoice.choices.length + 1 === this.questionGenerationModel().correctChoiceIdx);
        this.currentQuestionAlv.set(questionToAddChoice)
      }
    }
    this.questionGenerationModel.set({...this.questionGenerationModel(), optionToBeAdded: ''})
  }

  generateEnunciate(): string {
    return Optional.ofNullable(this.currentGenerationStrategy())
      .map(generationStrategy => generationStrategy.generateEnunciate(this.currentQuestionAlv(), this.mapDifficulty(this.questionGenerationModel().difficulty).valueOf(), this.questionGenerationModel().correctChoiceIdx))
      .orElse("");
  }

  showSnackbar() {
    this._snackBar.open("copied to clipboard", "close", {
      duration: 1000, verticalPosition: "top"
    });
  }
}
