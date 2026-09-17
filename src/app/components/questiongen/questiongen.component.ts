import {Component, OnInit, ChangeDetectionStrategy, signal, computed} from '@angular/core';
import Question from "../../model/Question";
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
import {form, FormField, FormRoot} from "@angular/forms/signals";

export interface QuestionFormModel {
  questionType: string;
  questionText: string;
  answer: string;
  explanation: string;
  correctChoiceIdx: number;
  multipleAnswerCorrect: boolean;
  difficulty: string;
  category: string;
  optionToBeAdded: string;
  choices: string[];
  correctAnswers: string[];
}

@Component({
  selector: 'app-questiongen',
  templateUrl: './questiongen.component.html',
  styleUrls: ['./questiongen.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardContent, MatSelect, MatOption, MatFormField, MatInput, ReactiveFormsModule, FormsModule, MatIconButton, MatTooltip, CdkCopyToClipboard, MatIcon, MatButton, MatCheckbox, FormField, FormRoot]
})
export class QuestiongenComponent implements OnInit {
  questionTypes = [
    {name: 'Fill In The Blanks', value: 'FillBlankQuestion'}
    , {name: 'Multiple Choice', value: 'MultipleChoiceQuestion'}
    , {name: 'Multiple Answer', value: 'MultipleAnswerQuestion'}
    , {name: 'Give an Example Answer', value: 'OneExampleQuestion'}
  ];
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];

  questionGenerationModel = signal<QuestionFormModel>({
    questionType: 'FillBlankQuestion',
    questionText: '',
    answer: '',
    explanation: '',
    correctChoiceIdx: 0,
    multipleAnswerCorrect: false,
    difficulty: 'Easy',
    category: 'default',
    optionToBeAdded: '',
    choices: [],
    correctAnswers: []
  })

  formQuestionGeneration = form(this.questionGenerationModel, (form) => {
  })

  currentGenerationStrategy = computed(() => GenerationStrategyChooser.getStrategy(this.questionGenerationModel().questionType))
  generatedCurrentQuestion = computed(() => {
    return Optional.ofNullable(this.currentGenerationStrategy())
      .map(generationStrategy => generationStrategy.generateQuestion(this.questionGenerationModel()))
      .orElseThrow(() => new Error('No generation strategy found'))
  })
  generateEnunciate = computed(() =>
    Optional.ofNullable(this.currentGenerationStrategy())
      .map(generationStrategy => generationStrategy.generateEnunciate(this.generatedCurrentQuestion(), this.mapDifficulty(this.questionGenerationModel().difficulty).valueOf(), this.questionGenerationModel().correctChoiceIdx))
      .orElse("")
  )


  constructor(public _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
    switch (this.questionGenerationModel().questionType) {
      case 'MultipleChoiceQuestion':
      case 'OneExampleQuestion':
        this.questionGenerationModel.update(model => ({
          ...model,
          choices: [...model.choices, model.optionToBeAdded]
        }))
        this.questionGenerationModel.set({...this.questionGenerationModel(), optionToBeAdded: ''})
        break;
      case 'MultipleAnswerQuestion':
        this.questionGenerationModel.update(model => ({
          ...model,
          choices: [...model.choices, model.optionToBeAdded],
          correctAnswers: [...model.correctAnswers, model.multipleAnswerCorrect + '']
        }))
        this.questionGenerationModel.set({...this.questionGenerationModel(), optionToBeAdded: ''})
        break;
      default:
        break;
    }
  }

  showSnackbar() {
    this._snackBar.open("copied to clipboard", "close", {
      duration: 1000, verticalPosition: "top"
    });
  }

  protected resetFields() {
    console.log('Resetting fields');
    Optional.ofNullable(this.currentGenerationStrategy()).ifPresent(strategy => this.questionGenerationModel.set(strategy.resetModel()))
  }
}
