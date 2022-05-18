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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    QuizComponent,
    ResultadoComponent,
    FeedbackComponent,
    QuestiongenComponent
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
    ClipboardModule
  ],
  providers: [QuestionSubscription],
  bootstrap: [AppComponent]
})
export class AppModule {
}
