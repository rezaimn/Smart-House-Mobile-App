import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController} from "ionic-angular";
import {CloudHttpService} from "../../../../utils/services/cloud-http.service";
import {Scenario, ScenarioGroupAction, ScenarioTimer} from "../scenario-model";
import {LocalDataService} from "../../../../utils/services/local-data.service";
import {InputDeviceModal} from "./input-device-modal/input-device-modal";
import {TranslateService} from "@ngx-translate/core";
import {DataMappingService} from "../../../../utils/services/data-mapping.service";
import {IonicNativeHttpService} from "../../../../utils/services/ionic-native-http.service";
import {Router} from "@angular/router";

@IonicPage()
@Component({
    selector: 'page-add-scenario',
    templateUrl: 'add-scenario.html',
})
export class AddScenario implements OnInit {
    /**
     * @ignore
     */
    executeMode = 'auto';
    /**
     * @ignore
     */
    scenarioOptions: any;
    /**
     * @ignore
     */
    scenario: Scenario;
    /**
     * @ignore
     */
    modes = [false, false, false, false, true];
    /**
     * @ignore
     */
    outputDevicesTemp = [];
    /**
     * @ignore
     */
    selectedDuration = 'تکرار';
    /**
     * @ignore
     */
    selectedIntervalLoop = 's';
    /**
     * @ignore
     */
    scenarioTimerT = new ScenarioTimer({});
    weekDays = [...this.dataMapService.weekDays];
    monthDays = [...this.dataMapService.monthDays];

    /**
     * @ignore
     */
    constructor(private cloudHttpService: CloudHttpService,
                public localData: LocalDataService,
                private modalCtrl: ModalController,
                public translateService: TranslateService,
                public dataMapService: DataMappingService,
                private ionicHttp: IonicNativeHttpService,
                private router:Router
    ) {
        if (this.localData.selectedScenario == null) {
            this.scenario = new Scenario({});
        } else {

            this.scenario = this.localData.selectedScenario;
            this.prepareToEdit();
        }

    }

    /**
     * month Days Select
     */
    monthDaysSelect(index) {
        this.monthDays[index].isActive = !this.monthDays[index].isActive;
    }

    /**
     * week Days Select
     */
    weekDaysSelect(index) {
        this.weekDays[index].isActive = !this.weekDays[index].isActive;
    }

    /**
     * @ignore
     */
    ngOnInit() {
        this.getLocalScenarioOptions();
    }

    prepareToEdit() {
        if (this.scenario.modeStatus == "0") {

            for (let i = 0; i < this.modes.length; i++) {
                this.modes[i] = true;
            }

        } else {
            let modeArray = this.scenario.modeStatus.split(',');
            for (let i = 0; i < this.modes.length; i++) {
                this.modes[i] = false;
            }
            for (let modeTemp of modeArray) {
                this.modes[modeTemp] = true;
            }
        }
        if (this.scenario.timers.length > 0) {
            this.executeMode = 'scheduled';
        }
        if (this.scenario.triggers.length > 0) {
            this.executeMode = 'auto';
        }
        if (this.scenario.timers.length == 0 && this.scenario.triggers.length == 0) {
            this.executeMode = 'manual';
        }
        if (this.scenario.timers[0]) {
            if (this.scenario.timers[0].interval) {
                this.selectedDuration = 'تکرار'
                this.selectedIntervalLoop = this.scenario.timers[0].interval.substr(this.scenario.timers[0].interval.length - 1, 1);
                this.scenarioTimerT.interval = this.scenario.timers[0].interval.substr(0, this.scenario.timers[0].interval.length - 1);
            }
            if (this.scenario.timers[0].time) {
                this.scenarioTimerT.time = this.scenario.timers[0].time;
                if (this.scenario.timers[0].type == 2) {
                    if (this.scenario.timers[0].days_of_week == '1,2,3,4,5,6,7') {
                        this.selectedDuration = "روزانه";
                    } else {
                        this.selectedDuration = "هفتگی";
                        let weekDays = this.scenario.timers[0].days_of_week.split(',');
                        for (let day of weekDays) {
                            this.weekDays[parseInt(day) - 1].isActive = true;
                        }
                    }
                }
                if (this.scenario.timers[0].type == 3) {
                    this.selectedDuration = "ماهانه";
                    let monthDays = this.scenario.timers[0].days_of_month.split(',');
                    for (let day of monthDays) {
                        this.monthDays[parseInt(day) - 1].isActive = true;
                    }
                }
            }
        }

    }

    /**
     * open Modal
     */
    openModal(device) {

        let modal = this.modalCtrl.create(InputDeviceModal, {
            'selectedDevice': device,
            'scenarioOptions': this.scenarioOptions,
            'inputTriggers': this.scenario.triggers,
            onFeedBack: (data) => {

                // if(this.scenario.groups.indexOf(data)==-1){
                //     this.scenario.groups.push(data);
                // }else{
                //     this.scenario.groups[this.scenario.groups.indexOf(data)]={...data};
                // }
            }
        });
        modal.onDidDismiss(inputTriggers => {
            if (inputTriggers != null) {
                for (let inputTrigger of inputTriggers) {
                    let isExist = false;
                    for (let scenarioTrigger of this.scenario.triggers) {
                        if (inputTrigger.device == scenarioTrigger.device &&
                            inputTrigger.template == scenarioTrigger.template &&
                            inputTrigger.arguments[0].value == scenarioTrigger.arguments[0].value) {
                            scenarioTrigger = {...inputTrigger};
                            isExist = true;
                        }
                    }
                    if (!isExist) {
                        this.scenario.triggers.push(inputTrigger);
                    }
                }
            }
            console.log(this.scenario, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        });

        modal.present().then(result => {
            modal.overlay['subscribe']((z) => {
                // alert(JSON.stringify(z));
            })
            const testComp = modal.overlay['instance'] as InputDeviceModal;
            testComp.feedbackSubmit.subscribe(() => {
                //alert(1);
            })
        });
    }

    isInputDeviceSelected(deviceId) {
        for (let input of this.scenario.triggers) {
            if (input.device == deviceId) {
                return true;
            }
        }
        return false;
    }

    /**
     * get Local Scenario Options
     */
    getLocalScenarioOptions() {
        this.cloudHttpService.getLocal('./assets/jsons/scenario-options.json').subscribe(
            (res: any) => {
                this.scenarioOptions = res;
                for (let option of this.scenarioOptions) {
                    for (let device of this.localData.veraMainData.devices) {
                        if (device.name.startsWith(option.device_type) && option.output_services.length > 0) {
                            this.outputDevicesTemp.push(option.output_services[0]);
                            this.translateService.get('devices.' + device.name.substr(0, 3), 'fa').subscribe(
                                (deviceName: any) => {
                                    this.outputDevicesTemp[this.outputDevicesTemp.length - 1].name = deviceName + device.name.substr(device.name.indexOf('_'), device.name.length);
                                    this.outputDevicesTemp[this.outputDevicesTemp.length - 1].deviceId = device.id;
                                }
                            )
                        }
                    }
                }
                for (let group of this.scenario.groups[0].actions) {
                    for (let outputOption of this.outputDevicesTemp) {
                        if (group.device == outputOption.deviceId) {
                            if (group.arguments[0].value == 1) {
                                outputOption.is_active = true;
                            } else {
                                outputOption.is_active = false;
                            }
                            outputOption.is_used = true;
                        }
                    }
                }
            }
        )
    }

    /**
     * @ignore
     */
    selectChange(e) {

    }

    /**
     * change vera Mode
     */
    changeMode(mode) {
        this.modes[mode] = !this.modes[mode];
        if (mode == 0) {
            if (this.modes[0]) {
                for (let i = 0; i < 5; i++) {
                    this.modes[i] = true;
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    this.modes[i] = false;
                }
            }
        } else {
            if (!this.modes[mode]) {
                this.modes[0] = false;
            }
            if (this.modes[1] && this.modes[2] && this.modes[3] && this.modes[4]) {
                this.modes[0] = true;
            }
            if (!this.modes[1] && !this.modes[2] && !this.modes[3] && !this.modes[4]) {
                this.modes[0] = false;
            }
        }

    }
    isActionActive(){
        for(let action of this.outputDevicesTemp){
            if(action.is_used){
                return true;
            }
        }
        return false;
    }
    /**
     * change Execute Mode
     */
    changeExecuteMode(executeMode) {
        this.executeMode = executeMode;
    }

    /**
     * add Update Scenario
     */
    addUpdateScenario() {
        if (this.modes[0]) {
            this.scenario.modeStatus = "0";
        }
        else {
            for (let i = 1; i < 5; i++) {
                if (this.modes[i]) {
                    this.scenario.modeStatus = this.scenario.modeStatus + i + ',';
                }
            }
            if (this.scenario.modeStatus.endsWith(',')) {
                this.scenario.modeStatus = this.scenario.modeStatus.substr(0, this.scenario.modeStatus.length - 1);
            }
        }

        this.scenario.groups[0].actions.splice(0, this.scenario.groups[0].actions.length);
        for (let outputOption of this.outputDevicesTemp) {
            if (outputOption.is_used) {
                let action = new ScenarioGroupAction({});
                action.device = outputOption.deviceId;
                action.service = outputOption.service;
                action.action = outputOption.action;
                if (outputOption.is_active) {
                    outputOption.arguments[0].value = 1;
                } else {
                    outputOption.arguments[0].value = 0;
                }
                action.arguments = [...outputOption.arguments];

                this.scenario.groups[0].actions.push(action);
            }
        }
        if (this.executeMode == 'scheduled') {
            if (this.selectedDuration == 'تکرار') {
                this.scenarioTimerT.type = 1;
                if (this.scenarioTimerT.interval <= 0) {
                    this.scenarioTimerT.interval = 1;
                }
                this.scenarioTimerT.interval = this.scenarioTimerT.interval + this.selectedIntervalLoop;
                delete this.scenarioTimerT.days_of_week;
                delete this.scenarioTimerT.time;
                delete this.scenarioTimerT.days_of_month;
            }
            if (this.selectedDuration == 'روزانه') {
                this.scenarioTimerT.type = 2;
                this.scenarioTimerT.days_of_week = '1,2,3,4,5,6,7';
                delete this.scenarioTimerT.interval;
                delete this.scenarioTimerT.days_of_month;
            }
            if (this.selectedDuration == 'هفتگی') {
                this.scenarioTimerT.days_of_week = '';
                for (let day of this.weekDays) {
                    if (day.isActive) {
                        this.scenarioTimerT.days_of_week = this.scenarioTimerT.days_of_week + day.id + ','
                    }
                }
                if (this.scenarioTimerT.days_of_week.endsWith(',')) {
                    this.scenarioTimerT.days_of_week = this.scenarioTimerT.days_of_week.substr(0, this.scenarioTimerT.days_of_week.length - 1);
                }
                this.scenarioTimerT.type = 2;
                delete this.scenarioTimerT.interval;
                delete this.scenarioTimerT.days_of_month;
            }
            if (this.selectedDuration == 'ماهانه') {
                this.scenarioTimerT.days_of_month = '';
                for (let day of this.monthDays) {
                    if (day.isActive) {
                        this.scenarioTimerT.days_of_month = this.scenarioTimerT.days_of_month + day.name + ','
                    }
                }
                if (this.scenarioTimerT.days_of_month.endsWith(',')) {
                    this.scenarioTimerT.days_of_month = this.scenarioTimerT.days_of_month.substr(0, this.scenarioTimerT.days_of_month.length - 1);
                }
                this.scenarioTimerT.type = 3;
                delete this.scenarioTimerT.interval;
                delete this.scenarioTimerT.days_of_week;
            }
            this.scenario.timers[0] = {...this.scenarioTimerT};
            this.scenario.triggers = [];
        }
        if (this.executeMode == 'auto') {
            this.scenario.timers = [];
        }
        if (this.executeMode == 'manual') {
            this.scenario.timers = [];
            this.scenario.triggers = [];
        }
        let scen = {
            scenes: {}
        }
        scen.scenes['scene_' + this.scenario.id] = {
            name: this.scenario.name,
            room: 0,
            triggers_operator: "OR",
            groups: this.scenario.groups,
            triggers: this.scenario.triggers,
            timers: this.scenario.timers,
            users: '',
            modeStatus: this.scenario.modeStatus,
            lua: '',
            encoded_lua: 0,
            active_on_any: '0',
            id: this.scenario.id,
        }
        let body = {
            id: 'lu_action',
            serviceId: 'urn:micasaverde-com:serviceId:HomeAutomationGateway1',
            action: 'ModifyUserData',
            DataFormat: 'json',
            inUserData: JSON.stringify(scen)
        }
        console.log(body, "-----------------------------------", scen);
        this.ionicHttp.post('/data_request', body).then(
            (res: any) => {
               this.router.navigateByUrl('scenario');
            }
        )
    }
}
