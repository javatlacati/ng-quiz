import {Component, ChangeDetectionStrategy, input, inject} from '@angular/core';
import Question from "../../../model/Question";
import FillBlankQuestion from "../../../model/FillBlankQuestion";
import { MatList } from '@angular/material/list';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-quiz-question-header',
    templateUrl: './quiz-question-header.component.html',
    styleUrls: ['./quiz-question-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatList, TranslatePipe]
})
export class QuizQuestionHeaderComponent {

  currentQuestionAlv = input<Question>(new FillBlankQuestion("Yes"));
  public translateService = inject(TranslateService);

}
