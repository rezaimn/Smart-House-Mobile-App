import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";
import {IonicNativeHttpService} from "../../../utils/services/ionic-native-http.service";
import {Router} from "@angular/router";
import {LocalDataService} from "../../../utils/services/local-data.service";

/**
 * @ignore
 */
@IonicPage()
@Component({
    selector: 'page-scenario',
    templateUrl: 'scenario.html',
})
export class Scenario implements OnInit {
    scenarios = [];

    constructor(private ionicHttp: IonicNativeHttpService,
                private router: Router,
                public localData: LocalDataService) {
    }

    ngOnInit() {
        this.getHomeData();
    }

    getHomeData() {
        this.ionicHttp.get('/data_request?id=user_data&ns=1&rand=' + Math.random().toString()).then(
            (res: any) => {
                this.scenarios = JSON.parse(res.data).scenes;
                console.log(res, "kkkkkkkkkkkkkkkkkkkkkkk", this.scenarios);
            }
        )
    }

    addEditScenario(scenario) {
        this.localData.selectedScenario = scenario;
        this.router.navigateByUrl('scenario/add-scenario');
    }

    playScenario(scen) {
        this.ionicHttp.get('/data_request?id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=' + scen.id + '&rand=' + Math.random().toString()).then(
            (res: any) => {
            }
        )

    }

    deleteScenario(scen) {
        let body = {
            id: 'lu_action',
            serviceId: 'urn:micasaverde-com:serviceId:HomeAutomationGateway1',
            action: 'ModifyUserData',
            DataFormat: 'json',
            inUserData: {}
        }
        let userData = {
            scenes: {},
            devices: {},
            sections: {},
            InstalledPlugins2: {
                InstalledPlugins2_6196: {
                    Files: [{
                        SourceName: "sercomm_configuration_mios.lua",
                        SourcePath: null,
                        DestName: "sercomm_configuration_mios.lua",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "M"
                    }, {
                        SourceName: "I_SercommIPCamera.xml",
                        SourcePath: null,
                        DestName: "I_SercommIPCamera.xml",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "I"
                    }, {
                        SourceName: "L_SercommIPCamera.lua",
                        SourcePath: null,
                        DestName: "L_SercommIPCamera.lua",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "M"
                    }, {
                        SourceName: "D_SercommIPCamera.xml",
                        SourcePath: null,
                        DestName: "D_SercommIPCamera.xml",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "D"
                    }, {
                        SourceName: "S_SercommIPCamera.xml",
                        SourcePath: null,
                        DestName: "S_SercommIPCamera.xml",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "S"
                    }, {
                        SourceName: "L_SercommIPCameraManager.lua",
                        SourcePath: null,
                        DestName: "L_SercommIPCameraManager.lua",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "L"
                    }], Lua: [{FileName: "L_SercommIPCameraManager.lua"}]
                },
                InstalledPlugins2_8840: {
                    Files: [{
                        SourceName: "L_AmazonAlexaHelper.lua",
                        SourcePath: null,
                        DestName: "L_AmazonAlexaHelper.lua",
                        DestPath: "",
                        Compress: "1",
                        Encrypt: "0",
                        Role: "L"
                    }], Lua: [{FileName: "L_AmazonAlexaHelper.lua"}]
                }
            },
            rooms: [],
            InstalledPlugins: [],
            users: [],
            zwave_backup: {nif: {}}
        }
        userData.scenes['scenes_'+scen.id]={id: scen.id, json_action: "del"};
        body.inUserData=JSON.stringify(userData);
        this.ionicHttp.post('/data_request',body).then(
            (res: any) => {
                this.getHomeData();
            }
        )
    }
}
