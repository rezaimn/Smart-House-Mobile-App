import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Devices} from './devices';
import {TranslateModule} from '@ngx-translate/core';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Devices),
    RouterModule.forChild([
      {
        path: '',
        component: Devices
      }
    ]),
    TranslateModule.forChild()
  ],
  declarations: [Devices]
})
export class DevicesModule {
}
