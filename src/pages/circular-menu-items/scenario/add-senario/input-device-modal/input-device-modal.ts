import {IonicPage, NavParams, ViewController} from "ionic-angular";
import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ScenarioTrigger} from "../../scenario-model";

@IonicPage()
@Component({
    selector: 'page-input-device-modal',
    templateUrl: 'input-device-modal.html',
})
export class InputDeviceModal implements OnInit {
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
    selectedDevice: any;
    /**
     * @ignore
     */
    selectedInputOptions = [];
    /**
     * @ignore
     */
    @Output() feedbackSubmit = new EventEmitter();
    /**
     * @ignore
     */
    scenarioTriggers = [];
    /**
     * @ignore
     */
    onFeedBack: Function;
    /**
     * @ignore
     */
    inputTriggers: ScenarioTrigger[] = [];
    /**
     * @ignore
     */
    constructor(
        public viewCtrl: ViewController,
        params: NavParams) {
        this.selectedDevice = params.get('selectedDevice');
        this.scenarioOptions = params.get('scenarioOptions');
        this.scenarioTriggers = params.get('inputTriggers');

    }
    /**
     * @ignore
     */
    ngOnInit() {
        this.selectDeviceOptions();
    }
    /**
     * select device options
     */
    selectDeviceOptions() {
        for (let option of this.scenarioOptions) {
            if (this.selectedDevice.name.startsWith(option.device_type)) {
                this.selectedInputOptions = option.input_services;
                for (let scenarioTrigger of this.scenarioTriggers) {
                    if(scenarioTrigger.device==this.selectedDevice.id){
                        for (let inputOptions of this.selectedInputOptions) {
                            if(scenarioTrigger.template==inputOptions.template){
                                if(scenarioTrigger.arguments.length>0){
                                    if(this.selectedDevice.name.substr(0,3)=='SPD' && scenarioTrigger.template==1){

                                        if(scenarioTrigger.arguments[0].value==inputOptions.arguments[0].value){
                                            inputOptions.is_active=true;
                                        }
                                    }else{
                                        inputOptions.is_active=true;
                                        inputOptions.arguments[0].value==scenarioTrigger.arguments[0].value;
                                    }
                                }else{
                                    inputOptions.is_active=true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // sentThroughInputCallback() {
    //     this.onFeedBack({ s: '2' });
    // }
    /**
     * send feedback to the parent
     */
    sendFeedBack() {
        console.log(this.selectedInputOptions,"kkkkkkkkkkkkkkkkkkkkk");
        for (let option of this.selectedInputOptions) {
            if (option.is_active) {
                let inputTrigger = new ScenarioTrigger({});
                inputTrigger.device = this.selectedDevice.id;
                inputTrigger.enabled = 1;
                inputTrigger.template = option.template;
                inputTrigger.arguments = {...option.arguments};
                this.inputTriggers.push(inputTrigger);
            }
        }
        console.log(this.inputTriggers, "lllllllllllllllllllllll");
        this.dismiss(this.inputTriggers);
    }
    /**
     * dismissed the input selection
     */
    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }
}
