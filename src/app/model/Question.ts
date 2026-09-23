import Difficulty from "./Difficulty";

export default abstract class Question {
  public static VETTED = "vetted";
  public static TRIAL = "trial";

  /**
   * Constructs a question with empty question and answer
   *
   * @param vettedness
   */
  constructor(vettedness: string) {
    this._vettedOrTrial = vettedness;
    this._category = "default";
    this._difficulty = Difficulty.NORMAL;
  }

  protected _text: string = "";

  get text(): string {
    return this._text;
  }

  /**
   * Sets the question text.
   *
   * @param questionText the text of this question
   */
  set text(questionText: string) {
    this._text = questionText;
  }

  protected _answer: string = "";

  abstract get answer(): string;

  /**
   * Sets the correct answer(s)
   *
   * @param answer answer text
   */
  abstract set answer(answer: string);

  protected _explanation: string = "";

  get explanation(): string {
    return this._explanation;
  }

  set explanation(explanation: string) {
    this._explanation = explanation;
  }

  private _userAnswer: string = "";

  get userAnswer(): string {
    return this._userAnswer;
  }

  set userAnswer(value: string) {
    this._userAnswer = value;
  }

  private _vettedOrTrial: string;

  get vettedOrTrial(): string {
    return this._vettedOrTrial;
  }

  set vettedOrTrial(vetted: boolean) {
    this._vettedOrTrial = vetted + '';
  }

  protected _category: string;

  get category(): string {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
  }

  protected _difficulty: Difficulty;

  get difficulty() {
    return this._difficulty;
  }

  set difficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  /**
   * Maximum number of point that can be awarded by this question.
   */
  abstract get maxPoints(): number;

  /**
   * Show question Text
   *
   * @return question text
   */
  display(): string {
    return `${this._text}<br>`;
  }

  gradeQuestion(): boolean {
    return this._vettedOrTrial === Question.VETTED;
  }

  abstract checkQuestionProvidingAnswer(answer: string): number;

  checkQuestion(): number {
    if (this._userAnswer != '') {
      // if (this instanceof FillBlankQuestion) {
      //     if (this._userAnswer.toUpperCase() === this._answer) {
      //         return 1.0;
      //     }
      // } else {
      if (this._userAnswer === this._answer) {
        return 1.0;
      }
      // }
    }
    return 0.0;
  }
}
