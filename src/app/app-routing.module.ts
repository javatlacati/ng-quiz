import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {QuizComponent} from "./components/quiz/quiz.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {ResultadoComponent} from "./components/resultado/resultado.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'result', component: ResultadoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
