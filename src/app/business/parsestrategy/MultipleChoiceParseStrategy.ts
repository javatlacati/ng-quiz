import DatasetLoader from "../DatasetLoader";
import {QuestionParseStrategy} from "./QuestionParseStrategy";
import Question from "../../model/Question";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";

export class MultipleChoiceParseStrategy implements QuestionParseStrategy {
  parse(questarray: string[]): Question {
    let vettedness = "v" === questarray[1] ? Question.VETTED : Question.TRIAL;
    let explanation = questarray[2];
    let category = questarray[3];
    let difficulty = questarray[4];
    let questionText = questarray[5]//QuestionParseStrategy.formateaPregunta(questarray[5]);
    let correctAnswerIdx = ~~questarray[6];
    let answersTexts = questarray.slice(7, questarray.length);
    return this.addMultipleChoiceQuestion(vettedness, explanation,
      questionText, correctAnswerIdx, category, difficulty, answersTexts);
  }

  addMultipleChoiceQuestion(
    vettedness: string,
    explanation: string,
    questionText: string,
    correctAnswerIdx: number,
    category: string,
    difficulty: string,
    answersTexts: string[]
  ): MultipleChoiceQuestion {
    let choiceQuestion = new MultipleChoiceQuestion(vettedness);
    choiceQuestion.explanation = explanation;
    choiceQuestion.text = questionText;
    choiceQuestion.category = category;
    choiceQuestion.difficulty = DatasetLoader.str2difficulty(difficulty);
    for (let i = 0; i < answersTexts.length; i++) {
      let answerText = answersTexts[i];
      choiceQuestion.setChoice(answerText, i == correctAnswerIdx);
    }
    // randomize order of choices to make it harder
    choiceQuestion.shuffleChoices()
    return choiceQuestion
  }

}
