import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Constant} from "../../../config/constant";
import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {
    player1 = '';
    player2 = '';
    playerColor: string = '';
    subscriptions: Subscription[] = [];
    row1: any;
    row2: any;
    row3: any;
    hasWinner: boolean = false;
    draw: boolean = false;
    player1Turn = Constant.GAME.TURN.PLAYER_ONE;
    player2Turn = Constant.GAME.TURN.PLAYER_TWO;
    circle: string = this.translate.instant('SYMBOL.O');
    cross: string = this.translate.instant('SYMBOL.X');
    symbol: string = this.circle; // player 1 using symbol 'O'
    turn: number = this.player1Turn; // player 1 have the first turn by default
    turnCount: number = 0;

    constructor(private route: ActivatedRoute, private translate: TranslateService) {}

    ngOnInit(): void {
        this.getQueryParams();
        this.turn = this.player1Turn;
        this.hasWinner = false;
        this.row1 = ['', '', ''];
        this.row2 = ['', '', ''];
        this.row3 = ['', '', ''];

        this.turnCount = 1;
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sb) => sb.unsubscribe());
    }

    getQueryParams(): void {
          const sb = this.route.queryParams.subscribe((params) => {
              if (Object.keys(params).length) {
                  this.player1 = params.player1;
                  this.player2 = params.player2;
              } else { // in case user navigate through change the url
                  this.player1 = 'Player1';
                  this.player2 = 'Player2';
              }
          });
          this.subscriptions.push(sb);

    }

    checkStatus(rowNum: number, colNum: number): void { // insert symbol and check the status of the match
        let row: any;
        const currentSymbol = this.symbol;

        switch (rowNum) { // verify row
            case 1:
                row = this.row1;
                break;
            case 2:
                row = this.row2;
                break;
            case 3:
                row = this.row3;
                break;
        }

        if (row[colNum] === '' && !this.hasWinner) { // prevent symbol getting overwrite
            row[colNum] = currentSymbol;

            this.checkRow(row);
            this.checkCol(colNum);
            this.checkSlide();

            if (this.hasWinner) { // there is a winner
                this.matchAlert();
            } else if (this.turnCount === Constant.GAME.TURN.COUNT) { // ended in draw
                this.draw = true;
                this.matchAlert(false);
            } else { // change to next player turn as match still ongoing
                this.changeTurnAndSymbol(this.turn);
                this.turnCount += 1;
            }
        }
    }

    checkRow(row: any): void {
        const hasSameValue = row.every((col: string) => col === row[0]);

        if (hasSameValue) {
            this.hasWinner = true;
        }
    }

    checkCol(col: number): void {
        if ((this.row1[col] === this.row2[col]) && (this.row1[col] === this.row3[col])) {
            this.hasWinner = true;
        }
    }

    checkSlide(): void {
        const topLeft = this.row1[0];
        const topRight = this.row1[2];
        const center = this.row2[1];
        const bottomLeft = this.row3[0];
        const bottomRight = this.row3[2];

        if (topLeft !== '' && center !== '' && bottomRight !== '') {
            if (topLeft === center && center === bottomRight) {
                this.hasWinner = true;
            }
        } else if (bottomLeft !== '' && center !== '' && topRight !== '') {
            if (bottomLeft === center && center === topRight) {
                this.hasWinner = true;
            }
        }
    }

    matchAlert(hasWinner: boolean = true): void {
        const title = this.translate.instant('MESSAGE.MATCH_HAS_ENDED');

        if (hasWinner) {
            let player = '';

            if (this.turn === this.player1Turn) {
                player = this.player1;
            } else {
                player = this.player2;
            }
            const text = this.translate.instant('MESSAGE.PLAYER_HAS_WIN', {player});

            Swal.fire({
                icon: 'success',
                title,
                text
            });
        } else {
            const text = this.translate.instant('MESSAGE.DRAW');

            Swal.fire({
                icon: 'warning',
                title,
                text
            });
        }
    }

    changeTurnAndSymbol(turn: number): void {
        this.turn = (turn === this.player1Turn) ? this.player2Turn : this.player1Turn;
        this.symbol = (this.symbol === this.circle) ? this.cross : this.circle;
    }

    retry(): void {
        this.ngOnInit(); // reset the board
    }

}
