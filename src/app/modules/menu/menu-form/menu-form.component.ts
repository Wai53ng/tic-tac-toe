import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-menu-form',
    templateUrl: './menu-form.component.html',
    styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

    playerForm!: FormGroup;
    @Output() startEvent = new EventEmitter<string>();
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.playerForm = this.fb.group({
            player1: this.fb.group({
                name: [null, [Validators.required, Validators.minLength(3)]]
            }),
            player2: this.fb.group({
                name: [null, [Validators.required, Validators.minLength(3)]]
            })
        });
    }

    start(): void {
        if (this.playerForm.valid) {
            this.startEvent.emit(this.playerForm.value);
        }
    }

}
