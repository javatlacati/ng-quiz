import Difficulty from "./Difficulty";
import FillBlankQuestion from "./FillBlankQuestion";
import MultipleAnswerQuestion from "./MultipleAnswerQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import Question from "./Question";
import {HttpClient} from "@angular/common/http";

export default class DatasetLoader {
  private httpClient: HttpClient;
  questions: Question[] = []


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  createQuestionsFromFile(fileName: string): Question[] {
    this.httpClient.get('assets/' + fileName, {responseType: 'text'})
      .toPromise().then(quizText => {
      if (quizText) {
        let lines = quizText.split(/\r\n/g);
        // console.log(`loaded lines:` + lines.length)
        lines.forEach(line => this.parseQuestion(line));
      }
    });
    return this.questions;
  }

  parseQuestion(line: string) {
    let questarray: string[] = line.split(/@@/g);
    // console.log(`questarray:` + questarray.length)
    // console.log(JSON.stringify(questarray))
    let tipoPregunta: string = questarray[0];
    let vettedness: string = "v" === questarray[1] ? Question.VETTED : Question.TRIAL;
    let explanation: string = questarray[2];
    let category: string = questarray[3];
    let difficulty: string = questarray[4];
    // console.log(questarray[5])
    let questionText: string = questarray[5];//this.formateaPregunta(questarray[5]);
    // console.log(questionText)
    switch (tipoPregunta) {
      case "MC": {
        //multiple choice
        let correctAnswerIdx = ~~questarray[6];
        let answersTexts = questarray.slice(7, questarray.length);
        this.addMultipleChoiceQuestion(this.questions, vettedness, explanation,
          questionText, correctAnswerIdx, category, difficulty, answersTexts);
        break;
      }
      case "FB": {
        //fill in the blanks
        let blanks = questarray.slice(6, questarray.length);
        console.log(`blanks: ${blanks}`);
        this.addFillBlankQuestion(this.questions, vettedness, explanation, questionText, category, difficulty, blanks);
        break;
      }
      case "MA": {
        let choices: Map<string, boolean> = this.parseChoicesMap(questarray.slice(6, questarray.length));
        this.addMultipleAnswerQuestion(this.questions, vettedness, explanation, questionText,
          category, difficulty, choices);
        break;
      }
      case "":
        break;
      default:
        console.error(`Question type not recognized: ${tipoPregunta}`)
        break;
    }
    // console.log(JSON.stringify(this.questions));
  }

  addMultipleAnswerQuestion(questions: Question[], vettedness: string, explanation: string, questionText: string, category: string, difficulty: string, answerChoicesMap: Map<string, boolean>) {
    let choiceQuestion = new MultipleAnswerQuestion(vettedness);
    choiceQuestion.explanation = explanation;
    choiceQuestion.text = questionText;
    choiceQuestion.category = category;
    choiceQuestion.difficulty = this.str2difficulty(difficulty);
    // answerChoicesMap.forEach((choice, i) => choiceQuestion.setChoice(choice, i));
    choiceQuestion.choices = Array.from(answerChoicesMap.keys());
    choiceQuestion.answer = Array.from(answerChoicesMap.values()).map((value: boolean, idx: number) => {
      if (value) {
        return idx;
      } else {
        return -1;
      }
    }).filter((idxs): boolean => idxs > 0).join(' ');
    choiceQuestion.correctAnswers = Array.from(Array.from(answerChoicesMap.values()).map((value, idx) => {
      if (value) {
        return idx;
      } else {
        return -1;
      }
    }), (theValue) => `${theValue}`).filter((str) => str !== 'undefined');
    questions.push(choiceQuestion);
  }

  str2difficulty(idxStr: string) {
    switch (idxStr) {
      case "2":
        return Difficulty.EASY;
      case "1":
        return Difficulty.HARD;
      case "0":
      default:
        return Difficulty.NORMAL;
    }
  }

  parseChoicesMap(questionMapArr: string[]): Map<string, boolean> {
    let questarray: string[] = questionMapArr.slice(0, questionMapArr.length / 2);
    let strAnswerValidities: string[] = questionMapArr.slice(questionMapArr.length / 2);
    let answerValidities: boolean[] = strAnswerValidities.map(
      (booleanAnswer) => "true".toUpperCase() === booleanAnswer);
    return this.createAnswerChoicesMap(questarray, answerValidities);
  }

  createAnswerChoicesMap(answerTexts: string[], answerValidities: boolean[]): Map<string, boolean> {
    let numsOfAnswers = answerTexts.length;
    if (numsOfAnswers !== answerValidities.length) {
      throw new Error("Answer texts should match answer values one by one");
    }
    let hashMap = new Map<string, boolean>();
    for (let answIdx = 0; answIdx < answerTexts.length; answIdx++) {
      hashMap.set(answerTexts[answIdx], answerValidities[answIdx]);
    }
    return hashMap;
  }

  addFillBlankQuestion(questions: Question[], vettedness: string, explanation: string, questionText: string, category: string, difficulty: string, blanks: string[]) {
    let fillBlankQuestion = new FillBlankQuestion(vettedness);
    fillBlankQuestion.explanation = explanation;
    fillBlankQuestion.text = questionText;
    fillBlankQuestion.category = category;
    fillBlankQuestion.difficulty = this.str2difficulty(difficulty);
    fillBlankQuestion.answer = blanks.join(' ');
    questions.push(fillBlankQuestion);
  }

  addMultipleChoiceQuestion(questions: Question[], vettedness: string, explanation: string, questionText: string, correctAnswerIdx: number, category: string, difficulty: string, answersTexts: string[]) {
    let choiceQuestion = new MultipleChoiceQuestion(vettedness);
    choiceQuestion.explanation = explanation;
    choiceQuestion.text = questionText;
    choiceQuestion.category = category;
    choiceQuestion.difficulty = this.str2difficulty(difficulty);
    for (let i = 0; i < answersTexts.length; i++) {
      let answerText = answersTexts[i];
      choiceQuestion.setChoice(answerText, i == correctAnswerIdx);
    }
    questions.push(choiceQuestion);
  }
}
