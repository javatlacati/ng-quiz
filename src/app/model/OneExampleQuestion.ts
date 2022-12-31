import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

export class OneExampleQuestion extends MultipleChoiceQuestion {

  checkQuestion(): number {
    return this.choices.some((correctChoice) => correctChoice === this.userAnswer) ? 1.0 : 0.0;
  }
}
