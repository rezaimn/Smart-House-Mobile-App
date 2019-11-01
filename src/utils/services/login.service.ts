import {Injectable} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {NativeStorage} from "@ionic-native/native-storage";
import {LocalDataService} from "./local-data.service";
import {AuthorizationService} from "./authorization.service";


@Injectable()
export class LoginService {
    /**
     * @ignore
     */
    public rememberMe = false;
    /**
     * @ignore
     */
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private localData: LocalDataService,
                private authorizationService: AuthorizationService,
                private nativeStorage: NativeStorage) {


    }
    /**
     * Sign in API
     */
    signIn(loginObj) {
        this.nativeStorage.getItem("rememberMe").then(
            (data: any) => {
                this.rememberMe = data;
            }
        )
        let body = 'grant_type=password&username=' + loginObj.username + '&password=' + loginObj.password + '&scope=ui';
        this.authorizationService.login("/aaa/oauth/token", body).subscribe(
            (res: any) => {
                let loginRes = res;
                this.localData.JWTToken = loginRes.access_token;
                this.localData.JWTRefreshToken = loginRes.refresh_token;
                this.localData.tokenType = loginRes.token_type;
                this.authorizationService.getAccount("/aaa/account/").subscribe(
                    (res: any) => {
                        this.localData.accountData = res;
                        if (this.rememberMe) {
                            this.nativeStorage.setItem("accountData", res);
                            this.nativeStorage.setItem("rememberMe", this.rememberMe);
                        }

                        this.localData.userIsLoggedIn = true;
                        if (this.localData.accountData.edges.length > 0) {
                            this.localData.selectedEdge = this.localData.accountData.edges[0];
                            if (this.rememberMe) {
                                this.nativeStorage.setItem("selectedEdge", this.localData.accountData.edges[0]);
                            }
                        }
                        this.router.navigateByUrl('home');
                    }
                )
            }
        )
        // this.localData.userIsLoggedIn=true;
        // this.router.navigateByUrl('home');
    }
}
