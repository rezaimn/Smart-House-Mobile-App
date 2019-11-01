import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {IonicPage} from "ionic-angular";
@IonicPage()
/**
 * @ignore
 */
@Component({selector: 'app-reset-password', templateUrl: 'two-factor.component.html'})
export class TwoFactorComponent implements OnInit {

    public OTPData='';
    constructor( private router: Router,
                private activatedRoute: ActivatedRoute,
        ) {

    }
    ngOnInit() {
    }
    submitPassword(OTP) {

    }
}
