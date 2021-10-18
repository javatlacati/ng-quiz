/**
 * A question with multiple choices.
 */
import Question from "./Question";

export default class MultipleChoiceQuestion extends Question {

  private BLANKS: RegExp = /\s+/g
  private _choices: string[];

  /**
   * Constructs a multiple choice question with no choices.
   */
  constructor(vettedness: string) {
    super(vettedness);
    this._choices = [];
  }

  /**
   * Adds an answer choice to this question.
   *
   * @param choice  the choice to add
   * @param correct true if this is the correct choice, false otherwise
   */
  setChoice(choice: string, correct: boolean) {
    if (correct) {
      // Convert choices.size() to string
      this.answer = `${this._choices.length}`;
    }
    this._choices.push(choice);
  }

  /**
   * Sets the correct answer. A number in a string.
   *
   * @param answer a number in a string that corresponds to the answers place
   *               in the choices arrayList
   */
  set answer(answer: string) {
    this._answer = answer;
//        int correctAnswer = choices.indexOf(answer);
  }

  get answer(): string {
    return this._answer;
  }


  get choices(): string[] {
    return this._choices;
  }

  set choices(value: string[]) {
    this._choices = value;
  }

  checkQuestionProvidingAnswer(daAnswer: string) {
    this.userAnswer = daAnswer.replace(this.BLANKS, "");
    return this.checkQuestion();
  }

  /**
   * Returns a string with the question text and choices
   *
   * @return string with question text and choice
   */
  display(): string {

    let display = this._text;
    display += "<br><br>";

    // for (let i = 0; i < this._choices.length; i++) {
    //   let choiceNumber = i + 1;
    //   display += `${choiceNumber}: ${this._choices[i]}<br>`;
    // }

    return display;
  }

  /**
   * {@inheritDoc }
   */
  get maxPoints() {
    return 1.0;
  }

}
