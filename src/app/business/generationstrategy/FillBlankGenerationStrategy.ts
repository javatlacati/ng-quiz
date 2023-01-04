import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import Question from "../../model/Question";

export class FillBlankGenerationStrategy implements QuestionGenerationStrategy {

  questionTypeAbreviation = 'FB';

  generateEnunciate(currentQuestion: FillBlankQuestion, difficulty: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.answer.split(' ').join('@@')}`.replace(/\n/g, ' ')
  }

  resetQuestion(): Question {
    return new FillBlankQuestion('Y');
  }

}
