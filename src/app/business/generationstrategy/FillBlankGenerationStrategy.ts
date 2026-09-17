import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import FillBlankQuestion from "../../model/FillBlankQuestion";
import Question from "../../model/Question";
import {QuestionFormModel} from "../../components/questiongen/questiongen.component";

export class FillBlankGenerationStrategy implements QuestionGenerationStrategy {
  questionTypeAbreviation = 'FB';

  resetModel(): QuestionFormModel {
    return {
      questionType: 'FillBlankQuestion',
      questionText: '',
      answer: '',
      explanation: '',
      correctChoiceIdx: 0,
      multipleAnswerCorrect: false,
      difficulty: 'Easy',
      category: 'default',
      optionToBeAdded: '',
      choices: [],
      correctAnswers: []
    }
  }

  generateQuestion(questionGenerationModel: QuestionFormModel): Question {
    let question = new FillBlankQuestion('Y')
    question.text = questionGenerationModel.questionText;
    question.answer = questionGenerationModel.answer;
    question.category = questionGenerationModel.category;
    question.explanation = questionGenerationModel.explanation;
    return question;
  }

  generateEnunciate(currentQuestion: FillBlankQuestion, difficulty: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.answer.split(' ').join('@@')}`.replace(/\n/g, ' ')
  }

}
