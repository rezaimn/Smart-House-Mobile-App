import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {About} from './about';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicPageModule.forChild(About),
        RouterModule.forChild([
            {
                path: '',
                component: About
            }
        ])
    ],
    declarations: [About]
})
export class AboutModule {}
