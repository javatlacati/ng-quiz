import {QuestionParseStrategy} from "./parsestrategy/QuestionParseStrategy";
import {MultipleChoiceParseStrategy} from "./parsestrategy/MultipleChoiceParseStrategy";
import {FillBlankParseStrategy} from "./parsestrategy/FillBlankParseStrategy";
import {MultipleAnswerParseStrategy} from "./parsestrategy/MultipleAnswerParseStrategy";
import {OneExampleParseStrategy} from "./parsestrategy/OneExampleParseStrategy";

export class ParseStrategyChooser {
  private static strategies: Map<String, QuestionParseStrategy> =
    new Map<String, QuestionParseStrategy>([
      ["MC", new MultipleChoiceParseStrategy()],
      ["FB", new FillBlankParseStrategy()],
      ["MA", new MultipleAnswerParseStrategy()],
      ["OE", new OneExampleParseStrategy()]
    ]);
  // put("MP", new MatchingParseStrategy());
  public static getStrategy(questionType: String): QuestionParseStrategy | undefined {
    return this.strategies.get(questionType);
  }
}
