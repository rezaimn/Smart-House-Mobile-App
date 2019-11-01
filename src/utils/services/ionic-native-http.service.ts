import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalDataService} from "./local-data.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {AuthorizationService} from "./authorization.service";
import {HTTP} from "@ionic-native/http";

@Injectable()
export class IonicNativeHttpService {
    /**
     * @ignore
     */
  header: any = {'Content-Type': 'application/json,application/xml'};
    /**
     * @ignore
     */
  constructor(private ionicHttp: HTTP, private localData: LocalDataService, private authorizationService: AuthorizationService) {

  }
    /**
     * get full url
     */
  getFullUrl(url: string) {
    return environment.Local_Url+ url;
  }
    /**
     * get API
     */
  get(url: string){
    return this.ionicHttp.get(this.getFullUrl(url), {},{'Accept': 'application/json,text/xml'});
  }
    /**
     * post API
     */
  post(url: string, body: any) {
    return this.ionicHttp.post(this.getFullUrl(url), body, {'Accept': 'application/json,text/xml'});
  }
    /**
     * @ignore
     */
  put(url: string, body: any) {

  }
    /**
     * @ignore
     */
  delete(url: string) {

  }
    /**
     * call if token is expired
     */
  tokenExpired() {
    let body = 'grant_type=refresh_token&refresh_token=' + this.localData.JWTRefreshToken;
    this.authorizationService.refreshToken('/aaa/oauth/token', body).subscribe(
      (res: any) => {
        let loginRes = JSON.parse(res)._body;
        this.localData.JWTToken = loginRes.access_token;
        this.localData.JWTRefreshToken = loginRes.refresh_token;
        this.localData.tokenType = loginRes.token_type;
        return true;
      },
      (error: any) => {
        return false;
      }
    )
  }
    /**
     * @ignore
     */
  private getOptions(): any {
    let accountHeaders ={
      'Accept': 'application/json,text/xml',
    }
    return  {headers: accountHeaders};

  }
}
