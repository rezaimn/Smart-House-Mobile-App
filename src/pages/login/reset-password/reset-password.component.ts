import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {ResetPassword} from '../login';
import {IonicPage} from "ionic-angular";
@IonicPage()
/**
 * @ignore
 */
@Component({selector: 'app-reset-password', templateUrl: 'reset-password.component.html'})
export class ResetPasswordComponent implements OnInit {

    public loadURL: string; // Loading the source file path for the background image
    public resetPassData: ResetPassword = new ResetPassword({}); // Creating an instance of Login Model to store the value
    public loader: boolean; // variable to check the current status of the background image loader animation
    public msg: string;

    public loginClicked: boolean = false;
    passwordsMatched=false;
    public progressBar: any;
    public elem: any;
    public width: any;
    public id: any;

    public stompClient: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
               ) {

    }
    ngOnInit() {

    }

    cancel() {
        this.resetPassData=new ResetPassword({});
        this.router.navigateByUrl('login');
    }
    checkPassword(){
        if(this.resetPassData.newPassword==this.resetPassData.confirmPassword&&this.resetPassData.newPassword.value.length>=4){
            this.passwordsMatched=true;
        }else{
            this.passwordsMatched=false;
        }
    }
    submitPassword() {
    }
}
