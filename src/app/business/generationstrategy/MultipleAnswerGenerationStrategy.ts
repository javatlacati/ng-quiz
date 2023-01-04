import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import Question from "../../model/Question";

export class MultipleAnswerGenerationStrategy implements QuestionGenerationStrategy {
  questionTypeAbreviation = 'MA';

  generateEnunciate(currentQuestion: MultipleAnswerQuestion, difficulty: number, correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.choices.join('@@')}@@${currentQuestion.correctAnswers.join('@@')}`.replace(/\n/g, ' ')
  }

  resetQuestion(): Question {
    return new MultipleAnswerQuestion('Y');
  }

}
