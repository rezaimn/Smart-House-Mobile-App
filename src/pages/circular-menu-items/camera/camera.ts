import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";
import {LocalDataService} from "../../../utils/services/local-data.service";
import {interval} from 'rxjs/observable/interval';
import {environment} from "../../../environments/environment";

@IonicPage()
@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
})
export class Camera implements OnInit {
    /**
     * @ignore
     */
    cameraAPIInterval;
    /**
     * @ignore
     */
    cameraList = [];

    constructor(private localData: LocalDataService) {
    }
    /**
     * get All Cameras Feed
     */
    ngOnInit() {
        this.getAllCamerasFeed();
    }
    /**
     * get All Cameras Feed
     */
    getAllCamerasFeed() {
        this.cameraList.splice(0, this.cameraList.length);
        for (let device of this.localData.veraMainData.devices) {
            if (device.name.startsWith('CMR')) {
                let cameraObj = {
                    camera: device,
                    feed: './assets/imgs/circular-tabs/camera-dark-selected'
                }
                this.cameraList.push(cameraObj);
            }
        }
        this.cameraAPIInterval = interval(500).subscribe(
            res => {
                for (let camera of this.cameraList) {
                    camera.feed = environment.Local_Url + '/data_request?id=request_image&cam=' + camera.camera.id + '&rand=' + Math.random().toString();
                }
            }
        )
    }
}
