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
  questionTypeSelection: string = 'FillBlankQuestion';
  questionDifficulties: string[] = ['Easy', 'Normal', 'Hard'];
  optionToBeAdded: string = '';
  multipleAnswerCorrect: boolean = false;
  currentFillBlankQuestion = new FillBlankQuestion("Yes");
  currentMultipleAnswerQuestion = new MultipleAnswerQuestion('Y')
  currentMultipleChoiceQuestion = new MultipleChoiceQuestion('Y')
  currentQuestionAlv: Question = this.currentFillBlankQuestion
  correctChoiceIdx: number = 0;


  constructor() {
  }

  ngOnInit(): void {
  }

  changeType(value: string) {
    this.questionTypeSelection = value;
    console.log('changing question type to:' + value)
    console.log('previous type:' + this.currentQuestionAlv.constructor.name)
    switch (value) {
      case 'FillBlankQuestion':
        this.currentFillBlankQuestion = new FillBlankQuestion("Yes");
        this.currentQuestionAlv = this.currentFillBlankQuestion;
        break;
      case 'MultipleAnswerQuestion':
        this.currentMultipleAnswerQuestion = new MultipleAnswerQuestion('Y')
        this.currentQuestionAlv = this.currentMultipleAnswerQuestion;
        break;
      case 'MultipleChoiceQuestion':
        this.currentMultipleChoiceQuestion = new MultipleChoiceQuestion('Y')
        this.currentQuestionAlv = this.currentMultipleChoiceQuestion;
        break;
    }
    console.log('new type:' + this.currentQuestionAlv.constructor.name)
  }

  changeDifficulty(event: string) {
    console.log('difficulty to change: ' + event)
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

  getMultipleAnswerChoiceOptions() {
    return this.currentQuestionAlv.constructor.name === 'MultipleAnswerQuestion' ? this.currentMultipleAnswerQuestion.choices.map((choice, idx) => {
      return {
        value: idx,
        label: choice
      }
    }) : []
  }

  addAnswerChoice() {
    if (this.currentQuestionAlv.constructor.name === 'MultipleAnswerQuestion') {
      let currentQuestionAlv1 = this.currentMultipleAnswerQuestion
      let answerOptions = currentQuestionAlv1.choices;
      console.log(`answer choices: ${JSON.stringify(currentQuestionAlv1.choices)}`)
      currentQuestionAlv1.setChoice(this.optionToBeAdded, this.multipleAnswerCorrect);
      // answerOptions.push("this.optionToBeAdded");
      // if (this.multipleAnswerCorrect == 'true')
      //   currentQuestionAlv1.correctAnswers.push("this.optionToBeAdded");
    } else {
      if (this.currentQuestionAlv.constructor.name == 'MultipleChoiceQuestion') {
        let currentQuestionAlv2 = this.currentMultipleChoiceQuestion
        console.log(`answer choices: ${JSON.stringify(currentQuestionAlv2.choices)}`)
        currentQuestionAlv2.setChoice(this.optionToBeAdded, currentQuestionAlv2.choices.length + 1 === this.correctChoiceIdx);
      }
    }
  }

  generateEnunciate() {
    switch (this.currentQuestionAlv.constructor.name) {
      case 'FillBlankQuestion':
        return `${this.questionTypeAbreviation(this.currentQuestionAlv.constructor.name)}@@v@@${this.currentQuestionAlv.explanation}@@${this.currentQuestionAlv.category}@@${this.currentQuestionAlv.difficulty.valueOf()}@@${this.currentQuestionAlv.text}@@${this.currentQuestionAlv.answer.split(' ').join('@@')}`.replace(/\n/g,' ')
      case 'MultipleAnswerQuestion':
        return `${this.questionTypeAbreviation(this.currentQuestionAlv.constructor.name)}@@v@@${this.currentQuestionAlv.explanation}@@${this.currentQuestionAlv.category}@@${this.currentQuestionAlv.difficulty.valueOf()}@@${this.currentQuestionAlv.text}@@${this.currentMultipleAnswerQuestion.choices.join('@@')}@@${this.currentMultipleAnswerQuestion.correctAnswers.join('@@')}`.replace(/\n/g,' ')
      case 'MultipleChoiceQuestion':
        return `${this.questionTypeAbreviation(this.currentQuestionAlv.constructor.name)}@@v@@${this.currentQuestionAlv.explanation}@@${this.currentQuestionAlv.category}@@${this.currentQuestionAlv.difficulty.valueOf()}@@${this.currentQuestionAlv.text}@@${this.correctChoiceIdx}@@${this.currentMultipleChoiceQuestion.choices.join('@@')}`.replace(/\n/g,' ')
    }
    return `${this.questionTypeAbreviation(this.currentQuestionAlv.constructor.name)}@@v@@${this.currentQuestionAlv.explanation}@@${this.currentQuestionAlv.category}@@${this.currentQuestionAlv.difficulty.valueOf()}@@${this.currentQuestionAlv.text}@@${this.currentQuestionAlv.answer.split(' ').join('@@')}`.replace(/\n/g,' ');
  }
}
