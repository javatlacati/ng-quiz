import Question from "../../model/Question";
import {QuestionFormModel} from "../../components/questiongen/questiongen.component";

export interface QuestionGenerationStrategy {
  questionTypeAbreviation: string

  generateEnunciate(currentQuestion: Question, difficulty: number, correctChoiceIdx: number): string;

  resetModel(): QuestionFormModel

  generateQuestion(questionGenerationModel: QuestionFormModel): Question
}
