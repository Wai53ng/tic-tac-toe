import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {locale as en} from './i18n/en';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tic-tac-toe';

    constructor(public translateService: TranslateService) {
        translateService.setDefaultLang('en');
        translateService.setTranslation(en.lang, en.data, true);
    }
}
