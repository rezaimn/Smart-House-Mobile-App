import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Settings} from './settings';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Settings),
    RouterModule.forChild([
      {
        path: '',
        component: Settings
      }
    ])
  ],
  declarations: [Settings]
})
export class SettingsModule {
}
