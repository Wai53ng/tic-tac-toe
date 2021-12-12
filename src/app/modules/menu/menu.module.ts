import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuScreenComponent } from './menu-screen/menu-screen.component';
import {TranslateModule} from "@ngx-translate/core";
import { MenuFormComponent } from './menu-form/menu-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        MenuScreenComponent,
        MenuFormComponent
    ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    }),
    ReactiveFormsModule
  ],
    exports: [
        MenuScreenComponent
    ]
})
export class MenuModule {}
