import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {ResultadoComponent} from './components/resultado/resultado.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {QuestionSubscription} from "./subscriptions/QuestionSubscription";
import {MatPaginatorModule} from "@angular/material/paginator";
import { QuestiongenComponent } from './components/questiongen/questiongen.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { QuizQuestionHeaderComponent } from './components/quiz/quiz-question-header/quiz-question-header.component';
import { QuizQuestionFormComponent } from './components/quiz/quiz-question-form/quiz-question-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    QuizComponent,
    ResultadoComponent,
    FeedbackComponent,
    QuestiongenComponent,
    QuizQuestionHeaderComponent,
    QuizQuestionFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule,
    ClipboardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [QuestionSubscription],
  bootstrap: [AppComponent]
})
export class AppModule {
}
