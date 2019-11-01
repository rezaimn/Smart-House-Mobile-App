import {Component, OnInit} from '@angular/core';
import {LocalDataService} from "../../../utils/services/local-data.service";
import {IonicPage} from "ionic-angular";
import {IonicNativeHttpService} from "../../../utils/services/ionic-native-http.service";
import {CommonFunctionsService} from "../../../utils/services/commonFunctions.service";
import {Router} from "@angular/router";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home implements OnInit {
    /**
     * @ignore
     */
    mostUsedDeviceList = [];
    /**
     * @ignore
     */
    constructor(
        private ionicHttp: IonicNativeHttpService,
        public localData: LocalDataService,
        private router:Router,
        private commonFunctions: CommonFunctionsService) {
        this.getMostUsedDevices(3);
        this.localData.veraDataChanged.subscribe(
            (res:any)=>{
                console.log(router.url);
                if(router.url.includes('home')){
                    this.getMostUsedDevices(3);
                }
            }
        )
    }
    /**
     * get most used devices to show in home page as favorite devices
     */
    getMostUsedDevices(count): any {
        // if(this.deviceStatusChanged){
            this.mostUsedDeviceList.splice(0,this.mostUsedDeviceList.length);
            this.commonFunctions.getDeviceUsedCountArray().then(
                (devices: any) => {
                    if(devices.length>0){
                        let countTemp = 0;
                        if (count <= devices.length) {
                            countTemp = count;
                        } else {
                            countTemp =devices.length;
                        }
                        for (let i = 0; i < countTemp; i++) {
                            for (let device of this.localData.veraMainData.devices) {
                                if (device.id == devices[i].id) {
                                    this.mostUsedDeviceList.push(device);
                                }
                            }
                        }
                    }

                },
                (error) => {
                }
            )
        // }
    }
    /**
     * @ignore
     */
    ngOnInit() {
        this.getHomeData();
    }
    /**
     * get home data to show
     */
    getHomeData() {
        this.ionicHttp.get('/data_request?id=user_data&ns=1&rand=' + Math.random().toString()).then(
            (res: any) => {
                this.ionicHttp.get('/data_request?id=sdata&DataVersion=' + parseInt(res.DataVersion).toString()).then(
                    (sdata: any) => {
                        let sData = JSON.parse(sdata.data);
                        this.localData.veraMainData = sData;
                    }
                )
            }
        )
    }

}
