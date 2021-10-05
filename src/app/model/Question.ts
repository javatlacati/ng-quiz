import Difficulty from "./Difficulty";

export default abstract class Question {
  get vettedOrTrial(): string {
    return this._vettedOrTrial;
  }
  public static VETTED = "vetted";
  public static TRIAL = "trial";

  protected _text: string = "";
  protected _answer: string = "";
  protected _explanation: string = "";
  private _userAnswer: string = "";
  private _vettedOrTrial: string;
  protected _category: string;
  protected _difficulty: Difficulty;

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

  /**
   * Sets the question text.
   *
   * @param questionText the text of this question
   */
  set text(questionText: string) {
    this._text = questionText;
  }



  get explanation(): string {
    return this._explanation;
  }

  set explanation(explanation: string) {
    this._explanation = explanation;
  }

  /**
   * Show question Text
   *
   * @return question text
   */
  display(): string {
    return this._text;
  }

  gradeQuestion(): boolean {
    return this._vettedOrTrial === Question.VETTED;
  }

  abstract checkQuestionProvidingAnswer(answer: string): number;

  checkQuestion(): number {
    if (this._userAnswer) {
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


  get userAnswer(): string {
    return this._userAnswer;
  }

  set userAnswer(value: string) {
        this._userAnswer = value;
    }

  /**
   * Maximum number of point that can be awarded by this question.
   */
  abstract get maxPoints(): number;

  get category(): string {
    return this._category;
  }

    set category(category: string) {
    this._category = category;
  }

  get difficulty() {
    return this._difficulty;
  }

    set difficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  /**
   * Sets the correct answer(s)
   *
   * @param answer answer text
   */
  abstract set answer(answer: string);

  abstract get answer(): string;
}
