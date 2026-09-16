import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'quiz', loadComponent: () => import('./components/quiz/quiz.component').then(m => m.QuizComponent)},
  {path: 'feedback', loadComponent: () => import('./components/feedback/feedback.component').then(m => m.FeedbackComponent)},
  {path: 'result', loadComponent: () => import('./components/resultado/resultado.component').then(m => m.ResultadoComponent)},
  {path: 'questiongen', loadComponent: () => import('./components/questiongen/questiongen.component').then(m => m.QuestiongenComponent)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
