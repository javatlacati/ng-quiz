import {enableProdMode, importProvidersFrom, inject, provideExperimentalWebMcpTools,} from '@angular/core';


import {environment} from './environments/environment';
import {QuestionSubscription} from './app/subscriptions/QuestionSubscription';
import {provideHttpClient, withXhr, withInterceptorsFromDi} from '@angular/common/http';
import {AppRoutingModule} from './app/app-routing.module';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppComponent} from './app/app.component';
import {QuestionSerializationServiceService} from "./app/services/question-serialization-service.service";
import Question from "./app/model/Question";
import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatSliderModule, MatListModule, MatPaginatorModule, FormsModule, ClipboardModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule),
    QuestionSubscription, provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideExperimentalWebMcpTools([
      {
        name: 'greet',
        description: 'Greets the agent.',
        inputSchema: {
          type: 'object', properties: {
            question: {type: 'object'},
            difficulty: {type: 'number'},
            correctChoiceIdx: {type: 'number'}
          }
        },
        execute: ({question, difficulty, correctChoiceIdx}) => {
          //if difficulty is undefined throw error
          if (difficulty === undefined) {
            throw new Error('Please specify a difficulty level');
          }
          //if correctChoiceIdx is undefined throw error
          if (correctChoiceIdx === undefined) {
            throw new Error('Please specify a correct choice index');
          }
          const questionSerializator = inject(QuestionSerializationServiceService);
          return {
            content: [{
              type: 'text',
              text: questionSerializator.generateEnunciate(question as any as Question, difficulty, correctChoiceIdx)
            }]
          };
        },
      },
    ]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: "/assets/i18n/",
        failOnError: true,
      }),
      fallbackLang: "en"
      // compiler configuration
      // ,compiler: {
      //   provide: TranslateCompiler,
      //   useClass: TranslateMessageFormatCompiler
      // }
    })
  ]
})
  .catch(err => console.error(err));
