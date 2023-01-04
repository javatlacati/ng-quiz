import {QuestionGenerationStrategy} from "./generationstrategy/QuestionGenerationStrategy";
import {FillBlankGenerationStrategy} from "./generationstrategy/FillBlankGenerationStrategy";
import {MultipleChoiceGenerationStrategy} from "./generationstrategy/MultipleChoiceGenerationStrategy";
import {OneExampleGenerationStrategy} from "./generationstrategy/OneExampleGenerationStrategy";
import {MultipleAnswerGenerationStrategy} from "./generationstrategy/MultipleAnswerGenerationStrategy";

export class GenerationStrategyChooser {
  private static strategies: Map<String, QuestionGenerationStrategy> =
    new Map<String, QuestionGenerationStrategy>([
      ["MultipleChoiceQuestion", new MultipleChoiceGenerationStrategy()],
      ["FillBlankQuestion", new FillBlankGenerationStrategy()],
      ["MultipleAnswerQuestion", new MultipleAnswerGenerationStrategy()],
      ["OneExampleQuestion", new OneExampleGenerationStrategy()]
    ]);

// put("MP", new MatchingParseStrategy());
  public static getStrategy(questionType: String): QuestionGenerationStrategy | undefined {
    return this.strategies.get(questionType);
  }
}
