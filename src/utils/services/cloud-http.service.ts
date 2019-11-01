import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalDataService} from "./local-data.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {AuthorizationService} from "./authorization.service";

@Injectable()
export class CloudHttpService {
    /**
     * @ignore
     */
  header: any = {'Content-Type': 'application/json,application/xml'};
    /**
     * @ignore
     */
  constructor(private httpClient: HttpClient, private localData: LocalDataService, private authorizationService: AuthorizationService) {

  }
    /**
     * get local json data
     */
  getLocal(url: string): Observable<any> {
    return this.httpClient.get(url, this.header);
  }
    /**
     * add base url to the API
     */
  getFullUrl(url: string) {
    return environment.Cloud_Url+ url;
  }
    /**
     * get API call
     */
  get(url: string): Observable<any> {
    return this.httpClient.get(this.getFullUrl(url),this.getOptions()).pipe(
      tap( // Log the result or error
        data => {
        },
        error => {
          if (error.status == '401') {
              if(this.tokenExpired()){
                this.get(url);
              }
          }
        }
      )
    );
  }
    /**
     * post API call
     */
  post(url: string, body: any) {
    return this.httpClient.post(this.getFullUrl(url), body, this.getOptions()).pipe(
      tap( // Log the result or error
        data => {
        },
        error => {

        }
      )
    );
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
     * called if token expired
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
     * get http request headers
     */
  private getOptions(): any {
      const loginHeader=new HttpHeaders({
          'Authorization': 'Bearer ' + this.localData.JWTToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      });
      return {headers: loginHeader};
  }
}
