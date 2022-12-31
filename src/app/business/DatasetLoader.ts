import {HttpClient} from "@angular/common/http";
import {StrategyChooser} from "./StrategyChooser";
import {Optional} from "typescript-optional";
import Question from "../model/Question";
import Difficulty from "../model/Difficulty";

export default class DatasetLoader {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  createQuestionsFromFile(fileName: string): Promise<Question[]> {
    return this.httpClient.get('assets/' + fileName, {responseType: 'text'})
      .toPromise().then(quizText => {
        if (quizText) {
          return quizText.split(/\r\n/g)
            .filter(line=>line.trim().length>0)
            .map(line => this.parseQuestion(line));
        } else {
          return [];
        }
      });
  }

  parseQuestion(line: string): Question {
    let questarray: string[] = line.split(/@@/g);
    // console.log(`questarray:` + questarray.length)
    // console.log(JSON.stringify(questarray))
    let tipoPregunta: string = questarray[0];
    let questionStrategy =
      Optional.ofNullable(StrategyChooser.getStrategy(tipoPregunta)).orElseThrow(() => {
        console.error(`Question type not recognized: ${tipoPregunta}`);
        console.log('the line for it was:"', line, '"')
        // console.log(JSON.stringify(this.questions));
        return new Error("Question type not recognized");
      });
    return questionStrategy.parse(questarray);
  }

  public static str2difficulty(idxStr: string) {
    switch (idxStr) {
      case "2":
        return Difficulty.EASY;
      case "1":
        return Difficulty.HARD;
      case "0":
      default:
        return Difficulty.NORMAL;
    }
  }
}
