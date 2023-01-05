import {Component, Input} from '@angular/core';
import Question from "../../../model/Question";
import FillBlankQuestion from "../../../model/FillBlankQuestion";

@Component({
  selector: 'app-quiz-question-header',
  templateUrl: './quiz-question-header.component.html',
  styleUrls: ['./quiz-question-header.component.scss']
})
export class QuizQuestionHeaderComponent {

  @Input()
  currentQuestionAlv: Question = new FillBlankQuestion("Yes")

}
