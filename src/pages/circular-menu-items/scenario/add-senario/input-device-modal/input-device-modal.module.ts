import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {InputDeviceModal} from './input-device-modal';
/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicPageModule.forChild(InputDeviceModal),
        RouterModule.forChild([
            {
                path: '',
                component: InputDeviceModal
            }
        ])
    ],
    declarations: [InputDeviceModal],
})
export class InputDeviceModalModule {
}
