import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CircularTabs} from './circular-tabs';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicPageModule.forChild(CircularTabs),
        RouterModule.forChild([
            {
                path: '',
                component: CircularTabs
            }
        ])
    ],
    declarations: [CircularTabs]
})
export class CircularTabsModule {}
