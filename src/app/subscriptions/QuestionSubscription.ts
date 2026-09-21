import {Injectable, signal} from "@angular/core";
import Question from "../model/Question";

@Injectable({
  providedIn: 'root'
})
export class QuestionSubscription {
  private _sharedQuestions = signal<Question[]>([] as Question[]);
  currentSharedQuestions = this._sharedQuestions.asReadonly();

  constructor() {
  }

  updateSharedQuestions(questions: Question[]): void {
    this._sharedQuestions.set(questions);
  }
}
