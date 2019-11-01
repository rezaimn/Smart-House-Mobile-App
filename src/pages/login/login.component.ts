import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Login} from './login';
import {LocalDataService} from "../../utils/services/local-data.service";
import {AuthorizationService} from "../../utils/services/authorization.service";
import {IonicPage} from "ionic-angular";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginService} from "../../utils/services/login.service";

@IonicPage()
@Component(
    {
        selector: 'app-login',
        templateUrl: 'login.component.html',

    }
)
export class LoginComponent implements OnInit {


    /**
     * @ignore
     */
    public loginData: Login = new Login({}); // Creating an instance of Login Model to store the value
    /**
     * @ignore
     */
    public loader: boolean; // variable to check the current status of the background image loader animation
    /**
     * @ignore
     */

    public msg: string;
    /**
     * @ignore
     */
    public loginClicked: boolean = false;
    /**
     * @ignore
     */
    public rememberMe=false;
    /**
     * @ignore
     */
    public progressBar: any;
    /**
     * @ignore
     */
    public elem: any;
    /**
     * @ignore
     */
    public width: any;
    /**
     * @ignore
     */
    public id: any;
    /**
     * @ignore
     */
    public loginForm:FormGroup;
    /**
     * @ignore
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private localData: LocalDataService,
        private authorizationService: AuthorizationService,
        private nativeStorage: NativeStorage,
        private loginService:LoginService
    ) {
        this.nativeStorage.getItem("rememberMe").then(
            (data:any )=> {
                this.rememberMe = data;
                if(data){

                }
            }
        )
        this.createFormControls();
        this.loginForm = new FormGroup({
            userName: this.loginData.username,
            password: this.loginData.password,
            rememberMe: this.loginData.rememberMe,
        });
    }
    /**
     * remember Me Change
     */
    rememberMeChange() {
        this.nativeStorage.setItem("rememberMe",this.loginData.rememberMe.value);
    }
    // forgetPassword() {
    //     this.router.navigateByUrl('forget-password');
    // }
    /**
     * @ignore
     */
    ngOnInit() {

    }
    /**
     * @ignore
     */
    createFormControls() {
        this.loginData.username = new FormControl('', Validators.required);
        this.loginData.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
        this.loginData.rememberMe = new FormControl();
    }
    /**
     * sign in method call from login service
     */
    signIn(){
        let body={
            username:this.loginData.username.value,
            password:this.loginData.password.value
        }
        this.loginService.signIn(body);
    }
}
