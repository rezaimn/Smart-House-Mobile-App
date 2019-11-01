import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DeviceList} from './device-list';
import {TranslateModule} from '@ngx-translate/core';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(DeviceList),
    RouterModule.forChild([
      {
        path: '',
        component: DeviceList
      }
    ]),
    TranslateModule.forChild()
  ],
  declarations: [DeviceList]
})
export class DeviceListModule {
}
