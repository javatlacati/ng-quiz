import Question from "../../model/Question";

export interface QuestionGenerationStrategy {

  currentQuestion: Question
  questionTypeAbreviation: string
  generateEnunciate(): string;
}
