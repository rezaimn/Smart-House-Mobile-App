import { Component } from '@angular/core';

import {LocalDataService} from "../../../utils/services/local-data.service";
import {IonicPage} from "ionic-angular";
import {IonicNativeHttpService} from "../../../utils/services/ionic-native-http.service";

@IonicPage()
@Component({
  selector: 'page-modes',
  templateUrl: 'modes.html',
})
export class Modes {
  //////mode=1 => home
  //////mode=2 => away
  //////mode=3 => night
  //////mode=4 => flight
    /**
     * @ignore
     */
  mode=0;
    /**
     * @ignore
     */
  constructor(private ionicHttp:IonicNativeHttpService,private localData:LocalDataService) {
    this.mode=this.localData.veraMainData.mode;
  }
    /**
     * change vera mode
     */
  changeMode(mode) {
    this.ionicHttp.get('/data_request?id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=SetHouseMode&Mode=' + mode+'&rand='+Math.random().toString()).then(
      (res: any) => {
        this.mode=mode;
      }
    )
  }
}
