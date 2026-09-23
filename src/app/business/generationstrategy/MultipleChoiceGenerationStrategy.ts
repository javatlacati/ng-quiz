import {QuestionGenerationStrategy} from "./QuestionGenerationStrategy";
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {QuestionFormModel} from "../../components/questiongen/questiongen.component";

export class MultipleChoiceGenerationStrategy implements QuestionGenerationStrategy {
  questionTypeAbreviation = 'MC';

  resetModel(): QuestionFormModel {
    return {
      questionType: 'MultipleChoiceQuestion',
      questionText: '',
      answer: '',
      explanation: '',
      vetted: true,
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
    const question = new MultipleChoiceQuestion('v')
    question.text = questionGenerationModel.questionText;
    question.answer = questionGenerationModel.answer;
    question.vettedOrTrial = questionGenerationModel.vetted
    question.category = questionGenerationModel.category;
    question.explanation = questionGenerationModel.explanation;
    question.choices = questionGenerationModel.choices;
    return question;
  }

  generateEnunciate(currentQuestion: MultipleChoiceQuestion, difficulty: number, correctChoiceIdx: number): string {
    return `${this.questionTypeAbreviation}@@${currentQuestion.vettedOrTrial}@@${currentQuestion.explanation}@@${currentQuestion.category}@@${difficulty}@@${currentQuestion.text}@@${correctChoiceIdx}@@${currentQuestion.choices.join('@@')}`.replace(/\n/g, ' ')
  }

}
