import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import Question from "../model/Question";

@Injectable()
export class QuestionSubscription {
  private sharedQuesitons: BehaviorSubject<Question[]> = new BehaviorSubject([] as Question[]);
  currentSharedQuestions = this.sharedQuesitons.asObservable();

  constructor() {
  }

  updateSharedQuestions(questions: Question[]): void {
    this.sharedQuesitons.next(questions);
  }
}
