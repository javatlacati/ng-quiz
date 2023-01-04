import {MultipleChoiceParseStrategy} from "./MultipleChoiceParseStrategy";
import Question from "../../model/Question";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";
import DatasetLoader from "../DatasetLoader";

export class OneExampleParseStrategy extends MultipleChoiceParseStrategy {

  parse(questarray: string[]): Question {
    let vettedness = "v" === questarray[1] ? Question.VETTED : Question.TRIAL;
    let explanation = questarray[2];
    let category = questarray[3];
    let difficulty = questarray[4];
    let questionText = questarray[5]//QuestionParseStrategy.formateaPregunta(questarray[5]);
    let answersTexts = questarray.slice(6, questarray.length);
    return this.addOneExampleQuestion(vettedness, explanation, questionText, category, difficulty, answersTexts);
  }

  addOneExampleQuestion(
    vettedness: string,
    explanation: string,
    questionText: string,
    category: string,
    difficulty: string,
    answersTexts: string[]
  ): OneExampleQuestion {
    let oneExampleQuestion = new OneExampleQuestion(vettedness);
    oneExampleQuestion.explanation = explanation;
    oneExampleQuestion.text = questionText;
    oneExampleQuestion.category = category;
    oneExampleQuestion.difficulty = DatasetLoader.str2difficulty(difficulty);
    answersTexts.forEach(answerText => {
      oneExampleQuestion.setChoice(answerText, true);
    });

    return oneExampleQuestion;
  }
}
