import Question from "../model/Question";

export interface QuestionStrategy {
  parse(questarray: string[]): Question
}
