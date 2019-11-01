import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BatteryStatus} from './battery-status';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicPageModule.forChild(BatteryStatus),
        RouterModule.forChild([
            {
                path: '',
                component: BatteryStatus
            }
        ])
    ],
    declarations: [BatteryStatus]
})
export class BatteryStatusModule {}
