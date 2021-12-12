import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        TicTacToeComponent
    ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    }),
    RouterModule
  ],
    exports: [
        TicTacToeComponent
    ]
})
export class GameModule {}
