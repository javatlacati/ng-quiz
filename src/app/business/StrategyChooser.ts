import {QuestionStrategy} from "./QuestionStrategy";
import {MultipleChoiceParseStrategy} from "./parsestrategy/MultipleChoiceParseStrategy";
import {FillBlankParseStrategy} from "./parsestrategy/FillBlankParseStrategy";
import {MultipleAnswerParseStrategy} from "./parsestrategy/MultipleAnswerParseStrategy";
import {OneExampleParseStrategy} from "./parsestrategy/OneExampleParseStrategy";

export class StrategyChooser {
  private static strategies: Map<String, QuestionStrategy> =
    new Map<String, QuestionStrategy>([
      ["MC", new MultipleChoiceParseStrategy()],
      ["FB", new FillBlankParseStrategy()],
      ["MA", new MultipleAnswerParseStrategy()],
      ["OE", new OneExampleParseStrategy()]
    ]);
  // put("MP", new MatchingParseStrategy());
  public static getStrategy(questionType: String): QuestionStrategy | undefined {
    return this.strategies.get(questionType);
  }
}
