import { Component } from '@angular/core';
import {LocalDataService} from "../../../utils/services/local-data.service";
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {
    /**
     * @ignore
     */
  selectedNotifId = -1;
    /**
     * @ignore
     */
  constructor(
    public localData:LocalDataService
  ) {
  }
    /**
     * set notification card height
     */
  setHeight(index) {

    if(index==this.selectedNotifId){

      let styles = {
        'height':7+ ((this.localData.notificationsStack[index].events.length + 1) * 3) + 'vh'
      };
      console.log(styles);
      return styles;
    }else{
      let styles = {
        'height': 10+ 'vh'
      };
      return styles;
    }

  }
    /**
     * set a notification card as read
     */
  selectedNotif(index) {
    this.localData.notificationsStack[index].hasNotSeen=false;
    for(let event of this.localData.notificationsStack[index].events){
      if(event.isSeen==false){
        event.isSeen=true;
        this.localData.notificationsCount=this.localData.notificationsCount-1;
      }

    }
    if(this.selectedNotifId == index){
      this.selectedNotifId = -1;
    }else{
      this.selectedNotifId = index;
    }

  }
    /**
     * toggle a notification card
     */
  openCloseCard(index){

    if(index==this.selectedNotifId){
      let styles = {
        'height':'auto'
      };
      return styles;
    }else{
      let styles = {
        'height':'0px'
      };
      return styles;
    }
  }

}
