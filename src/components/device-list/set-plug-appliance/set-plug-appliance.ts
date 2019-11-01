import {Component, OnInit} from '@angular/core';

import {IonicPage} from "ionic-angular";
import {LocalDataService} from "../../../utils/services/local-data.service";
import {CloudHttpService} from "../../../utils/services/cloud-http.service";
import {Router} from "@angular/router";


@IonicPage()
@Component({
    selector: 'set-plug-appliance',
    templateUrl: 'set-plug-appliance.html',
})
export class SetPlugAppliance implements OnInit {
    /**
     * @ignore
     */
    selectedApplianceType = 0;
    /**
     * @ignore
     */
    applianceTypes = [];
    /**
     * @ignore
     */
    searchInput = '';
    /**
     * @ignore
     */
    selectedAppliances = [];
    /**
     * @ignore
     */
    applianceList = [];
    /**
     * @ignore
     */
    selectedAppliancesObj=[];
    /**
     * @ignore
     */
    constructor(
        private cloudHttpService: CloudHttpService,
        public localData: LocalDataService,
        private router: Router
    ) {

    }
    /**
     * @ignore
     */
    ngOnInit() {
        this.getAllApplianceTypes();
        this.getAllApplianceBySearch(null);
        this.getDeviceAppliances();
    }
    /**
     * get All Appliance Types
     */
    getAllApplianceTypes() {
        this.cloudHttpService.get('/aaa/config/applianceType/all').subscribe(
            (res: any) => {
                this.applianceTypes = res;
            }
        )
    }
    /**
     * add Remove Appliance To Selected Appliances
     */
    addRemoveApplianceToSelectedAppliances(appliance) {
        if (this.selectedAppliances.indexOf(appliance.id) === -1) {
            this.selectedAppliances.push(appliance.id);
            this.selectedAppliancesObj.push(appliance);
        } else {
            this.selectedAppliances.splice(this.selectedAppliances.indexOf(appliance.id), 1);
            this.selectedAppliancesObj.splice(this.selectedAppliancesObj.indexOf(appliance), 1);
        }

    }
    /**
     * is Appliance Attached To Plug check
     */
    isApplianceAttachedToPlug(appliance) {
        let applianceIsAttached = this.selectedAppliances.indexOf(appliance.id);
        if (applianceIsAttached != -1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * get All Appliance By Search
     */
    getAllApplianceBySearch(event) {
        if (event) {
            this.searchInput = event._value;
        }
        let url = '';
        if (this.selectedApplianceType != 0) {
            url = '/iothub/appliance/search?typeId=' + this.selectedApplianceType + '&brandModel=' + this.searchInput;
        } else {
            url = '/iothub/appliance/search?typeId=&brandModel=' + this.searchInput;
        }
        this.cloudHttpService.get(url).subscribe(
            (res: any) => {
                this.applianceList = res;
            }
        )
    }
    /**
     * cancel Set Appliance
     */
    cancelSetAppliance() {
        this.router.navigateByUrl('devices');
    }
    /**
     * set Appliance for a device
     */
    setAppliance() {
        this.cloudHttpService.post('/iothub/edge/' + this.localData.selectedEdge.id + '/device/' + this.localData.selectedDeviceToAddAppliance.id + '/appliances', this.selectedAppliances).subscribe(
            (res: any) => {

            }
        )
    }
    /**
     * get Device Appliances
     */
    getDeviceAppliances(){
        this.cloudHttpService.get('/iothub/edge/' + this.localData.selectedEdge.id + '/device/' + this.localData.selectedDeviceToAddAppliance.id).subscribe(
            (res: any) => {
                for(let appliance of res.appliances){
                    this.selectedAppliances.push(appliance.id);
                    this.selectedAppliancesObj.push(appliance);
                }
            }
        )
    }
}
