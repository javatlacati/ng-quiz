import Question from "../../model/Question";

export interface QuestionParseStrategy {
  parse(questarray: string[]): Question
}
