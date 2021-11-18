import Question from "./Question";

export default class FillBlankQuestion extends Question {

    _correctAnswers: Array<string>;

    constructor(vettedness: string) {
        super(vettedness);
        this._correctAnswers = [];
    }

    set answer(answer: string) {
        super._answer = answer;//this._correctAnswers.push(answer);
    }

    get answer(): string {
        return this._answer;//return this._correctAnswers.join(" ")//JSON.stringify(this._correctAnswers);
    }

    checkQuestionProvidingAnswer(daAnswer: string): number {
        super.userAnswer = daAnswer;
        return this.checkQuestion();
    }

    display(): string {
      let separatedByBlanks = this.text.split("_+");
      console.log(JSON.stringify("separatedByBlanks: "+separatedByBlanks))
      //TODO use reactive forms to insert text areas replacing the ____
      return super.display();
    }

  delims = "[ ]+";

    checkQuestion(): number {
        let tokens = super.userAnswer.split(this.delims);

        let answers = [];
        answers.push(...tokens);

        let totRightAnswers = this._correctAnswers.length;
        //final double totAnswers = tokens.length;
        let grade = 0.0;

        for (let i = 0; i < answers.length; i++) {
            if (i < this._correctAnswers.length && answers[i] === this._correctAnswers[i]) {
                grade += 1.0 / totRightAnswers;
            }
        }

        return grade;
    }

    /**
     * {@inheritDoc }
     */
    get maxPoints(): number {
        return 1.0;
    }
}
