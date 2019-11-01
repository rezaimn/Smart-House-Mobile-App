import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalDataService} from "./local-data.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthorizationService {

    /**
     * @ignore
     */
    constructor(private httpClient: HttpClient, private localData: LocalDataService) {
    }
    /**
     * add base url to received url
     */
    getFullUrl(url: string) {
        return environment.Cloud_Url + url;
    }
    /**
     * post APIs call
     */
    post(url: string, body: any): Observable<any> {
        return this.httpClient.post(this.getFullUrl(url), body, this.getOptions('post')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * login API call
     */
    login(url: string, body: any): Observable<any> {
        return this.httpClient.post(this.getFullUrl(url), body, this.getOptions('login')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * get account API call
     */
    getAccount(url: string): Observable<any> {
        return this.httpClient.get(this.getFullUrl(url), this.getOptions('account')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * refresh token API call
     */
    refreshToken(url: string, body: any): Observable<any> {
        return this.httpClient.post(this.getFullUrl(url), body, this.getOptions('login')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * call forget pass API
     */
    forgetPassword(url: string, body: any) {
        return this.httpClient.post(this.getFullUrl(url), body, this.getOptions('forgetPass')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * change pass API call
     */
    changePassword(url: string, body: any) {
        return this.httpClient.post(this.getFullUrl(url), body, this.getOptions('forgetPass')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {

                }
            )
        );
    }
    /**
     * logout API call
     */
    logout(url: string) {
        return this.httpClient.delete(this.getFullUrl(url), this.getOptions('logout')).pipe(
            tap( // Log the result or error
                data => {
                },
                error => {
                }
            )
        );
    }
    /**
     * get request headers by method type
     */
    getOptions(API) {
        let headers;
        switch (API) {
            case 'login': {
                headers = new HttpHeaders({
                        'Access-Control-Request-Headers': 'authorization',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic YnJvd3Nlcjo=',
                        'Accept': 'application/json',
                        'Host': environment.Cloud_Url
                    }
                );
                return {headers: headers};
            }
            case 'account': {
                headers = new HttpHeaders({
                    'Access-Control-Request-Headers': 'authorization',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.localData.JWTToken,
                    'Host': environment.Cloud_Url
                });
                return {headers: headers};
            }
            case 'logout': {
                headers = new HttpHeaders({
                    'Access-Control-Request-Headers': 'authorization',
                    'Authorization': 'Bearer ' + this.localData.JWTToken,
                    'Host': environment.Cloud_Url
                });
                return {headers: headers};
            }
            case 'forgetPass': {
                headers = new HttpHeaders({
                    'Access-Control-Request-Headers': 'authorization',
                    'Content-Type': 'text/plain',
                    'Authorization': 'Bearer ' + this.localData.JWTToken,
                    'Host': environment.Cloud_Url
                })
                return {headers: headers}
            }
            case 'post': {
                headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.localData.JWTToken,
                })
                return {headers: headers}
            }
            default: {
                return {headers: new HttpHeaders({})}
            }

        }
    }
}


