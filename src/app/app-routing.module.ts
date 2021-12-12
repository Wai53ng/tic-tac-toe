import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicTacToeComponent} from "./modules/game/tic-tac-toe/tic-tac-toe.component";
import {MenuScreenComponent} from "./modules/menu/menu-screen/menu-screen.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
    {
        path: 'menu', component: MenuScreenComponent
    },
    {
        path: 'game', component: TicTacToeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
