import Question from "../../model/Question";

export interface QuestionGenerationStrategy {
  questionTypeAbreviation: string

  generateEnunciate(currentQuestion: Question, difficulty: number,correctChoiceIdx: number): string;

  resetQuestion(): Question
}
