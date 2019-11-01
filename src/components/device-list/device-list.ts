import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalDataService} from "../../utils/services/local-data.service";
import {DataMappingService} from "../../utils/services/data-mapping.service";
import {ConversionService} from "../../utils/services/conversion.service";
import {IonicPage} from "ionic-angular";
import {CommonFunctionsService} from "../../utils/services/commonFunctions.service";
import {IonicNativeHttpService} from "../../utils/services/ionic-native-http.service";
import {Router} from "@angular/router";

@IonicPage()
@Component({
    selector: 'device-list',
    templateUrl: 'device-list.html',
})
export class DeviceList implements OnInit {
    /**
     * get device list as an input data
     */
    @Input() deviceList;
    /**
     * send device status as an event for the parent
     */
    @Output() deviceStatusChanged = new EventEmitter();

    constructor(
        private ionicHttp: IonicNativeHttpService,
                public localData: LocalDataService,
                private dataMap: DataMappingService,
                public converterService: ConversionService,
                private commonFunctions: CommonFunctionsService,
                private router: Router
    ) {

    }
    /**
     * @ignore
     */
    ngOnInit() {
    }
    /**
     * armed and disarmed a device
     */
    armAndDisarmDevices(device) {
        this.ionicHttp.get('/data_request?id=lu_action&output_format=json&DeviceNum=' + device.id + '&serviceId=urn:micasaverde-com:serviceId:SecuritySensor1&action=SetArmed&newArmedValue=' + this.converterService.swapOneAndZero(device.armed) + '&rand=' + Math.random()).then(
            (res: any) => {
                this.commonFunctions.setDevicesUsedCountArray(device.id);

            }
        )
    }
    /**
     * on and off a device
     */
    switchOnAndSwitchOffDevices(device) {
        this.ionicHttp.get('/data_request?id=lu_action&output_format=json&DeviceNum=' + device.id + '&serviceId=urn:upnp-org:serviceId:SwitchPower1&action=SetTarget&newTargetValue=' + this.converterService.swapOneAndZero(device.status) + '&rand=' + Math.random()).then(
            (res: any) => {
                this.commonFunctions.setDevicesUsedCountArray(device.id);

            }
        )
    }
    /**
     * set mode for a HVAC
     */
    setMode(device, mode) {

        this.ionicHttp.get('/data_request?id=lu_action&output_format=json&DeviceNum=' + device.id + '&serviceId=urn:upnp-org:serviceId:HVAC_UserOperatingMode1&action=SetModeTarget&NewModeTarget=' + mode + '&rand=' + Math.random()).then(
            (res: any) => {
                this.commonFunctions.setDevicesUsedCountArray(device.id);

            }
        )
    }
    /**
     * set temperature set point for a HVAC
     */
    SetThemprature(device) {
        this.ionicHttp.get('/data_request?id=lu_action&output_format=json&DeviceNum=' + device.id + '&serviceId=urn:upnp-org:serviceId:TemperatureSetpoint1&action=SetCurrentSetpoint&NewCurrentSetpoint=' + device.setpoint + '&rand=' + Math.random()).then(
            (res: any) => {
                this.commonFunctions.setDevicesUsedCountArray(device.id);

            }
        )
    }
    /**
     * attach appliance to a plug
     */
    addApplianceToPlug(device) {
        this.localData.selectedDeviceToAddAppliance = device;
        this.router.navigateByUrl('set-plug-appliance');
    }
}
