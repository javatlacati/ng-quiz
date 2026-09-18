import {Component, ChangeDetectionStrategy, input} from '@angular/core';
import Question from "../../../model/Question";
import FillBlankQuestion from "../../../model/FillBlankQuestion";
import { MatList } from '@angular/material/list';

@Component({
    selector: 'app-quiz-question-header',
    templateUrl: './quiz-question-header.component.html',
    styleUrls: ['./quiz-question-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatList]
})
export class QuizQuestionHeaderComponent {

  currentQuestionAlv = input<Question>(new FillBlankQuestion("Yes"));

}
