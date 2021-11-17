import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';

@Component({
    selector: 'signup-details',
    templateUrl: './signup-details.component.html'
})
export class SignupDetailsComponent implements OnInit {
    signupForm: SignupForm;

    constructor() {

    }

    ngOnInit() {

    }
}
