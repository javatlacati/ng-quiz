import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

export default class MultipleAnswerQuestion extends MultipleChoiceQuestion {

    private _correctAnswers: String[];

    /**
     * Constructs a choice question with no choices.
     */
    constructor(vettedness: string) {
        super(vettedness);
        this.choices = [];
        this._correctAnswers = [];
    }

    /**
     * Adds an answer choice to this question.
     *
     * @param choice the choice to add
     * @param correct true if this is the correct choice, false otherwise
     */
    setChoice(choice: string, correct: boolean) {
        this.choices.push(choice);
        this.correctAnswers.push(`${correct}`);
        if (correct) {
            this.userAnswer = JSON.stringify(this.correctAnswers);//`${this.choices.length}`
        }
    }

    set answer(answer: string) {
        this._answer = answer;
//        int correctAnswer = choices.indexOf(answer);
    }

    get answer(): string {
        return this._answer; //JSON.stringify(this.correctAnswers)
    }

    // set answer(answer: string) {
    //     this._correctAnswers.push(answer);
    // }
    //
    // get answer() {
    //     return JSON.stringify(this._correctAnswers);
    // }

    get correctAnswers() {
        return this._correctAnswers;
    }

    set correctAnswers(value: String[]) {
        this._correctAnswers = value;
    }

    checkQuestionProvidingAnswer(answer: string) {
        this.userAnswer = answer;
        return this.checkQuestion();
    }

    /**
     *
     * @return
     */
    checkQuestion() {

        let delims = /[ ]+/g;
        let tokens = super.userAnswer.split(delims);

        let answers = [];
        answers.push(...tokens);

        let totRightAnswers = this._correctAnswers.length;
        //let totAnswers = tokens.length;
        let wrongAnswers = tokens.length;
        let grade = 0.0;

        for (let answer in answers) {
            for (let correctAnswer in this._correctAnswers) {
                if (answer === correctAnswer) {
                    grade += 1.0 / totRightAnswers;
                    wrongAnswers -= 1.0;
                }
            }
        }

        //Deducts points for answers given that were not correct or in excess.
        grade -= wrongAnswers * (1.0 / totRightAnswers);

        /*
         * If more answers were wrong/in excess than were right, causing a
         * negative grade, it is brought back up to 0.
         */
        if (grade < 0.0) {
            grade = 0.0;
        }

        return grade;
    }

    /**
     * @return
     */
    display() {

        let display = `${this._text}\n`;

        for (let i = 0; i < this.choices.length; i++) {
            let choiceNumber = i + 1;
            display += `${choiceNumber}: ${this.choices[i]}\n`;
        }

        return display;

    }

}