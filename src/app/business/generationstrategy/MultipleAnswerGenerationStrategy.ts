import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import MultipleAnswerQuestion from "../../model/MultipleAnswerQuestion";
import Question from "../../model/Question";
import {QuestionFormModel} from "../../components/questiongen/questiongen.component";

export class MultipleAnswerGenerationStrategy implements QuestionGenerationStrategy {
  questionTypeAbreviation = 'MA';

  resetModel(): QuestionFormModel {
    return {
      questionType: 'MultipleAnswerQuestion',
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
    const question = new MultipleAnswerQuestion('v')
    question.text = questionGenerationModel.questionText;
    question.answer = questionGenerationModel.answer;
    question.category = questionGenerationModel.category;
    question.explanation = questionGenerationModel.explanation;
    question.choices = questionGenerationModel.choices;
    question.correctAnswers = questionGenerationModel.correctAnswers;
    return question;
  }

  generateEnunciate(currentQuestion: MultipleAnswerQuestion, difficulty: number, correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.choices.join('@@')}@@${currentQuestion.correctAnswers.join('@@')}`.replace(/\n/g, ' ')
  }

}
