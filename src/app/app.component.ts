import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'ng-quiz';
  public translateService = inject(TranslateService);

  ngOnInit(): void {
    console.log('detected:' + navigator.language)
    this.translateService.setFallbackLang(this.translateService.getBrowserLang() || 'en');
  }
}
