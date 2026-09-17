import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import {OneExampleQuestion} from "../../model/OneExampleQuestion";
import Question from "../../model/Question";
import {QuestionFormModel} from "../../components/questiongen/questiongen.component";

export class OneExampleGenerationStrategy implements QuestionGenerationStrategy {
  questionTypeAbreviation = 'OE';

  resetModel(): QuestionFormModel {
    return {
      questionType: 'OneExampleQuestion',
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
    const question = new OneExampleQuestion('v')
    question.text = questionGenerationModel.questionText;
    question.answer = questionGenerationModel.answer;
    question.category = questionGenerationModel.category;
    question.explanation = questionGenerationModel.explanation;
    question.choices = questionGenerationModel.choices;
    return question;
  }

  generateEnunciate(currentQuestion: OneExampleQuestion, difficulty: number, correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@v@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${currentQuestion.choices.join('@@')}`.replace(/\\n/g, ' ')
  }

}
