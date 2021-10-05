import {Component, Input, OnInit} from '@angular/core';
import MultipleChoiceQuestion from "../../model/MultipleChoiceQuestion";
import Question from "../../model/Question";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {

  questionsData: Question[] = []
  preguntaActual = 1
  selectedAnswer: { value: number, label: string } | null = null
  completedQuiz = false

  constructor(private router: Router, private activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.questionsData = history.state as Question[];
  }

  createItems(choices: string[]): { label: string; value: number }[] {
    return choices.map((choice, idx) => {
      return {
        value: idx,
        label: choice
      }
    })
  }

  verifyCompletion(questions: Question[]): void {
    console.log(JSON.stringify(questions))
    console.log(questions[0].constructor.name)
    console.log(`completedness:${JSON.stringify(questions.map(q => q.userAnswer))}`)
    this.completedQuiz = questions.every((aQuestion) => aQuestion.userAnswer.length > 0);
    console.log(`completed:${this.completedQuiz}`)
  }

  questionChanged() {
    let daQuestion = this.questionsData[this.preguntaActual - 1] as unknown as Question;
    let savedAnswer: string = daQuestion['_userAnswer'];
    console.log(`saved user answer: ${savedAnswer}`)
    if (savedAnswer === '') {
      this.selectedAnswer = null
    } else {
      let className = daQuestion.constructor.name;
      console.log(`className:${className}`)
      switch (className) {
        case 'MultipleChoiceQuestion':
          // @ts-ignore
          let daQuestionElementElement = (daQuestion as MultipleChoiceQuestion)['_choices'][savedAnswer];
          console.log(`saved answer value:${daQuestionElementElement}`)
          this.selectedAnswer = {value: ~~savedAnswer, label: daQuestionElementElement}
          break;
      }
    }
  }

  navigateToPreviousQuestion() {
    this.preguntaActual = Math.max((this.preguntaActual | 0) - 1, 1)
    this.questionChanged()
  }

  navigateToNextQuestion() {
    this.preguntaActual = Math.min(this.preguntaActual + 1, this.questionsData.length)
    this.questionChanged()
  }

  goToResults(questions: Question[]) {
    console.log(`questions sent:${JSON.stringify(questions)}`)
    //this.$router.push({name: 'Resultado', params: {questions} as any})
  }

}
