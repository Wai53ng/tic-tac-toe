import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-screen',
    templateUrl: './menu-screen.component.html',
    styleUrls: ['./menu-screen.component.scss']
})
export class MenuScreenComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit(): void {
    }

    start(event: any): void {
        const player1 = event.player1.name;
        const player2 = event.player2.name;
        this.router.navigate(['/game'], {queryParams: { player1, player2}});
    }

}
