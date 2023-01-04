import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";
import Question from "../../model/Question";

export class OneExampleGenerationStrategy  implements QuestionGenerationStrategy {
  questionTypeAbreviation='OE';

  generateEnunciate(currentQuestion:OneExampleQuestion,difficulty: number, correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.choices.join('@@')}`.replace(/\\n/g,' ')
  }

  resetQuestion(): Question {
    return new OneExampleQuestion('Y');
  }

}
