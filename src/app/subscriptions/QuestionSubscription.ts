import {Injectable, signal} from "@angular/core";
import Question from "../model/Question";

@Injectable({
  providedIn: 'root'
})
export class QuestionSubscription {
  private _sharedQuesitons = signal<Question[]>([] as Question[]);
  currentSharedQuestions = this._sharedQuesitons.asReadonly();

  constructor() {
  }

  updateSharedQuestions(questions: Question[]): void {
    this._sharedQuesitons.set(questions);
  }
}
