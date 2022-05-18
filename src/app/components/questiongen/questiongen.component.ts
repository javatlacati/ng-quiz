import {Component, OnInit} from '@angular/core';
import Question from "../../model/Question";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Difficulty from "../../model/Difficulty";

@Component({
  selector: 'app-questiongen',
  templateUrl: './questiongen.component.html',
  styleUrls: ['./questiongen.component.sass']
})
export class QuestiongenComponent implements OnInit {
  questionTypes = [
    {name: 'Fill In The Blanks', value: 'FillBlankQuestion'}
    , {name: 'Multiple Choice', value: 'MultipleChoiceQuestion'}
    , {name: 'Multiple Answer', value: 'MultipleAnswerQuestion'}
  ];
  currentQuestionAlv: Question = new FillBlankQuestion("Yes");
  questionTypeSelection: string = 'FillBlankQuestion';
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];


  constructor() {
  }

  ngOnInit(): void {
  }

  changeType(value: string) {
    this.questionTypeSelection = value;
    switch (value) {
      case 'FillBlankQuestion':
        this.currentQuestionAlv = new FillBlankQuestion('Y')
        break;
      case 'MultipleAnswerQuestion':
        this.currentQuestionAlv = new MultipleAnswerQuestion('Y')
        break;
      case 'MultipleChoiceQuestion':
        this.currentQuestionAlv = new MultipleChoiceQuestion('Y')
        break;
    }
  }

  changeDifficulty(event: string) {
    console.log('difficulty to change: '+event)
    this.currentQuestionAlv.difficulty = this.mapDifficulty(event)
      console.log("difficulty sel changed:", this.currentQuestionAlv.difficulty.valueOf())
  }

  mapDifficulty(aDifficulty: string): Difficulty {
    // console.log(`mapping difficulty:${aDifficulty} of type ${aDifficulty.constructor.name}`)
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
  }

  questionTypeAbreviation(value: string): string {
    switch (value) {
      case 'FillBlankQuestion':
        return 'FB'
      case 'MultipleAnswerQuestion':
        return 'MA'
      case 'MultipleChoiceQuestion':
        return 'MC'
    }
    return '';
  }
}
