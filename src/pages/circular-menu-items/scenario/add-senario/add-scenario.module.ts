import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AddScenario} from './add-scenario';
import {InputDeviceModal} from "./input-device-modal/input-device-modal";
/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicPageModule.forChild(AddScenario),
        RouterModule.forChild([
            {
                path: '',
                component: AddScenario
            }
        ])
    ],
    declarations: [AddScenario]
})
export class AddScenarioModule {
}
