import {Component, OnInit} from '@angular/core';
import Question from "../../model/Question";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Difficulty from "../../model/Difficulty";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";
import {GenerationStrategyChooser} from "../../business/GenerationStrategyChooser";
import {Optional} from "typescript-optional";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-questiongen',
  templateUrl: './questiongen.component.html',
  styleUrls: ['./questiongen.component.scss']
})
export class QuestiongenComponent implements OnInit {
  questionTypes = [
    {name: 'Fill In The Blanks', value: 'FillBlankQuestion'}
    , {name: 'Multiple Choice', value: 'MultipleChoiceQuestion'}
    , {name: 'Multiple Answer', value: 'MultipleAnswerQuestion'}
    , {name: 'Give an Example Answer', value: 'OneExampleQuestion'}
  ];
  questionTypeSelection: string = 'FillBlankQuestion';
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];
  optionToBeAdded: string = '';
  multipleAnswerCorrect: boolean = false;
  currentQuestionAlv: Question = new FillBlankQuestion("Yes");
  correctChoiceIdx: number = 0;
  currentDifficulty: string = 'Easy';

  currentGenerationStrategy = GenerationStrategyChooser.getStrategy(this.questionTypeSelection)

  constructor(public _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  changeType(value: string) {
    this.questionTypeSelection = value;
    this.currentGenerationStrategy = GenerationStrategyChooser.getStrategy(this.questionTypeSelection)
    console.log('changing question type to:' + value)
    console.log('previous type:' + this.currentQuestionAlv.constructor.name)
    Optional.ofNullable(this.currentGenerationStrategy).ifPresent(parseStrategy => {
      parseStrategy.resetQuestion()
      this.currentQuestionAlv = parseStrategy.resetQuestion()
    })

    this.optionToBeAdded = ''
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
    if (this.currentQuestionAlv instanceof MultipleAnswerQuestion) {
      console.log(`answer choices: ${JSON.stringify(this.currentQuestionAlv.choices)}`)
      this.currentQuestionAlv.setChoice(this.optionToBeAdded, this.multipleAnswerCorrect);
    } else {
      if (this.currentQuestionAlv instanceof MultipleChoiceQuestion) {
        console.log(`answer choices: ${JSON.stringify(this.currentQuestionAlv.choices)}`)
        this.currentQuestionAlv.setChoice(this.optionToBeAdded, this.currentQuestionAlv.choices.length + 1 === this.correctChoiceIdx);
      }
    }
    this.optionToBeAdded = '';
  }

  generateEnunciate(): string {
    return Optional.ofNullable(this.currentGenerationStrategy)
      .map(generationStrategy => generationStrategy.generateEnunciate(this.currentQuestionAlv, this.mapDifficulty(this.currentDifficulty).valueOf(), this.correctChoiceIdx))
      .orElse("");
  }

  showSnackbar() {
    this._snackBar.open("copied to clipboard", "close", {
      duration: 1000, verticalPosition: "top"
    });
  }
}
