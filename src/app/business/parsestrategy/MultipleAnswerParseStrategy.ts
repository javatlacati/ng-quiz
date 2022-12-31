import {QuestionStrategy} from "../QuestionStrategy";
import Question from "../../model/Question";
import DatasetLoader from "../DatasetLoader";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";

export class MultipleAnswerParseStrategy implements QuestionStrategy{
  parse(questarray: string[]) {
    let vettedness: string = "v" === questarray[1] ? Question.VETTED : Question.TRIAL;
    let explanation: string = questarray[2];
    let category: string = questarray[3];
    let difficulty: string = questarray[4];
    let questionText: string = questarray[5];//this.formateaPregunta(questarray[5]);
    let choices: Map<string, boolean> = this.parseChoicesMap(questarray.slice(6, questarray.length));
    return this.addMultipleAnswerQuestion( vettedness, explanation, questionText,
      category, difficulty, choices);
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

  addMultipleAnswerQuestion( vettedness: string, explanation: string, questionText: string, category: string, difficulty: string, answerChoicesMap: Map<string, boolean>) {
    let choiceQuestion = new MultipleAnswerQuestion(vettedness);
    choiceQuestion.explanation = explanation;
    choiceQuestion.text = questionText;
    choiceQuestion.category = category;
    choiceQuestion.difficulty = DatasetLoader.str2difficulty(difficulty);
    // answerChoicesMap.forEach((choice, i) => choiceQuestion.setChoice(choice, i));
    //TODO shuffle choices map
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
    return choiceQuestion;
  }

}
