import {Injectable} from "@angular/core";

@Injectable()
export class DataMappingService {
    /**
     * device icon map
     */
  deviceIconMap=[
    {
      "device":"WLS",
      "icon":"flaticon-009-water-drops",
      "service":""
    },
    {
      "device":"SPD",
      "icon":"flaticon-016-plug-1",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"SRD",
      "icon":"flaticon-016-plug-1",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"SDS",
      "icon":"flaticon-020-smoke-detector-1",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"DWS",
      "icon":"flaticon-035-window",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"SRN",
      "icon":"flaticon-035-window",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"TRM",
      "icon":"flaticon-035-window",
      "service":"urn:upnp-org:serviceId:HVAC_UserOperatingMode1,urn:upnp-org:serviceId:TemperatureSetpoint1"
    },
    {
      "device":"LTN",
      "icon":"flaticon-026-light-bulb",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"PKS",
      "icon":"flaticon-004-cctv",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"CMR",
      "icon":"flaticon-004-cctv",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"ACD",
      "icon":"flaticon-021-key-card",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"DSP",
      "icon":"flaticon-021-key-card",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"KIS",
      "icon":"flaticon-021-key-card",
      "service":"urn:upnp-org:serviceId:SwitchPower1"
    },
    {
      "device":"MDS",
      "icon":"flaticon-042-motion-sensor-1",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    },
    {
      "device":"GBS",
      "icon":"flaticon-042-motion-sensor-1",
      "service":"urn:micasaverde-com:serviceId:SecuritySensor1"
    }
  ];
    /**
     * scenario interval
     */
    durations = [
        {
            name:'تکرار',
            type:1
        },
        {
            name:'روزانه',
            type:2
        },
        {
            name:'هفتگی',
            type:2
        },
        {
            name:'ماهانه',
            type:3
        }
    ];
    /**
     * week days model
     */
    weekDays = [
        {
            name:'َشنبه',
            id:6,
            isActive:false
        },
        {
            name:'یکشنبه',
            id:7,
            isActive:false
        },
        {
            name:'دوشنبه',
            id:1,
            isActive:false
        },
        {
            name:'سه شنبه',
            id:2,
            isActive:false
        },
        {
            name:'چهارشنبه',
            id:3,
            isActive:false
        },
        {
            name:'پنجشنبه',
            id:4,
            isActive:false
        },
        {
            name:'جمعه',
            id:5,
            isActive:false
        }
    ];
    /**
     * interval loop
     */
    intervalLoop = [
        {
            name:'دقیقه',
            code:'m'
        },
        {
            name:'ساعت',
            code:'h'
        },
        {
            name:'روز',
            code:'d'
        }
    ];
    /**
     * month days model
     */
    monthDays = [
        {
            name:'1',
            isActive:false
        },
        {
            name:'2',
            isActive:false
        },
        {
            name:'3',
            isActive:false
        },
        {
            name:'4',
            isActive:false
        },
        {
            name:'5',
            isActive:false
        },
        {
            name:'6',
            isActive:false
        },
        {
            name:'7',
            isActive:false
        },
        {
            name:'8',
            isActive:false
        },
        {
            name:'9',
            isActive:false
        },
        {
            name:'10',
            isActive:false
        },
        {
            name:'11',
            isActive:false
        },
        {
            name:'12',
            isActive:false
        },
        {
            name:'13',
            isActive:false
        },
        {
            name:'14',
            isActive:false
        },
        {
            name:'15',
            isActive:false
        },
        {
            name:'16',
            isActive:false
        },
        {
            name:'17',
            isActive:false
        },
        {
            name:'18',
            isActive:false
        },
        {
            name:'19',
            isActive:false
        },
        {
            name:'20',
            isActive:false
        },
        {
            name:'21',
            isActive:false
        },
        {
            name:'22',
            isActive:false
        },
        {
            name:'23',
            isActive:false
        },
        {
            name:'24',
            isActive:false
        },
        {
            name:'25',
            isActive:false
        },
        {
            name:'26',
            isActive:false
        },
        {
            name:'27',
            isActive:false
        },
        {
            name:'28',
            isActive:false
        },
        {
            name:'29',
            isActive:false
        },
        {
            name:'30',
            isActive:false
        },
        {
            name:'31',
            isActive:false
        }

    ];
}
