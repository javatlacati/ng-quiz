import {Service} from '@angular/core';
import Question from "../model/Question";
import {GenerationStrategyChooser} from "../business/GenerationStrategyChooser";
import {Optional} from "typescript-optional";

@Service()
export class QuestionSerializationServiceService {
  generateEnunciate(currentQuestion: Question, difficulty: number, correctChoiceIdx: number): string {
    const generationStrategy = Optional.ofNullable(GenerationStrategyChooser.getStrategy(currentQuestion.constructor.name))
    return generationStrategy.map(strategy => strategy.generateEnunciate(currentQuestion, difficulty, correctChoiceIdx)).orElse("Question type not supported");
  }
}
