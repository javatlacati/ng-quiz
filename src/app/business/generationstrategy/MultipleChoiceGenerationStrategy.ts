import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";

export class MultipleChoiceGenerationStrategy implements QuestionGenerationStrategy{
  questionTypeAbreviation='MC';

  generateEnunciate(currentQuestion:MultipleChoiceQuestion,difficulty: number,correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${correctChoiceIdx}@@${currentQuestion.choices.join('@@')}`.replace(/\n/g,' ')
  }

  resetQuestion(): Question {
    return new MultipleChoiceQuestion('v');
  }

}
