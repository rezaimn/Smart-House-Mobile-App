import {Injectable} from "@angular/core";
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()
export class CommonFunctionsService {
    /**
     * @ignore
     */
    constructor(private nativeStorage: NativeStorage) {

    }
    /**
     * is Security Device
     */
    isSecurityDevice(deviceName: string) {
        let name = deviceName.substr(0, 3);
        switch (name) {
            case 'WLS': {
                return true;
            }
            case 'SDS': {
                return true;
            }
            case 'DWS': {
                return true;
            }
            case 'SRN': {
                return true;
            }
            case 'CMR': {
                return true;
            }
            case 'ACD': {
                return true;
            }
            case 'MDS': {
                return true;
            }
            case 'GBS': {
                return true;
            }
            default: {
                return false;
            }
        }
    }
    /**
     * set Devices Used Count Array
     */
    setDevicesUsedCountArray(deviceId) {
        let deviceUsedCountArray = [];

        this.getDeviceUsedCountArray().then(
            (res: any) => {
                if (res.length > 0) {
                    deviceUsedCountArray = res;
                }
                this.calculateDeviceCount(deviceUsedCountArray, deviceId);
            },
            (error: any) => {
                this.calculateDeviceCount(deviceUsedCountArray, deviceId);
            }
        )

    }
    /**
     * calculate Device Count
     */
    calculateDeviceCount(deviceUsedCountArray, deviceId) {
        let deviceFound = false;
        for (let device of deviceUsedCountArray) {
            if (device.id == deviceId) {
                device.usedCount++;
                deviceFound = true;
            }
        }
        if (!deviceFound) {
            let device = {
                id: deviceId,
                usedCount: 1
            }
            deviceUsedCountArray.push(device);
        }
        deviceUsedCountArray = deviceUsedCountArray.sort((a, b) => {
            return (a.usedCount < b.usedCount) ? 1 : ((b.usedCount < a.usedCount) ? -1 : 0)
        })
        this.nativeStorage.setItem("devicesUsageCountMap", deviceUsedCountArray);
        console.log(deviceUsedCountArray, "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    }
    /**
     * get Device Used Count Array
     */
    getDeviceUsedCountArray() {
        return this.nativeStorage.getItem("devicesUsageCountMap");
    }
    /**
     * toggle Card Body
     */
    toggleCardBody(closed){

        if(!closed){
            return {
                'height':'100%'
            };
        }else{
            return {
                'height':'0px'
            };
        }


    }
}
