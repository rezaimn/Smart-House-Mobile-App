import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";
import {AuthorizationService} from "../../../utils/services/authorization.service";
import {Router} from "@angular/router";
import {LocalDataService} from "../../../utils/services/local-data.service";

@IonicPage()
@Component({
  selector: 'page-exit',
  templateUrl: 'exit.html',
})
export class Exit implements OnInit{
    /**
     * logout
     */
  constructor(private authService:AuthorizationService,private router:Router,public localData:LocalDataService) {



  }
  ngOnInit(){
      this.authService.logout('/aaa/oauth-extends/token').subscribe(
          (res)=>{

          },
          (error)=>{
              if(error.status==200){
                  this.router.navigateByUrl('login');
                  this.localData.userIsLoggedIn=false;
              }

          }

      );
  }
}
