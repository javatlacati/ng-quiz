import {QuestionParseStrategy} from "./QuestionParseStrategy";
import Question from "../../model/Question";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import DatasetLoader from "../DatasetLoader";

export class FillBlankParseStrategy implements QuestionParseStrategy {
  parse(questarray: string[]) {
    let vettedness: string = "v" === questarray[1] ? Question.VETTED : Question.TRIAL;
    let explanation: string = questarray[2];
    let category: string = questarray[3];
    let difficulty: string = questarray[4];
    let questionText: string = questarray[5];//this.formateaPregunta(questarray[5]);
    // console.log(questarray[5])
    let blanks = questarray.slice(6, questarray.length);
    console.log(`blanks: ${blanks}`);
    return this.addFillBlankQuestion(vettedness, explanation, questionText, category, difficulty, blanks);
  }

  addFillBlankQuestion(vettedness: string, explanation: string, questionText: string, category: string, difficulty: string, blanks: string[]) {
    let fillBlankQuestion = new FillBlankQuestion(vettedness);
    fillBlankQuestion.explanation = explanation;
    fillBlankQuestion.text = questionText;
    fillBlankQuestion.category = category;
    fillBlankQuestion.difficulty = DatasetLoader.str2difficulty(difficulty);
    fillBlankQuestion.answer = blanks.join(' ');
    return fillBlankQuestion;
  }

}
