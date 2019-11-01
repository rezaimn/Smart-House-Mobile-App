import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SetPlugAppliance} from './set-plug-appliance';
import {TranslateModule} from '@ngx-translate/core';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(SetPlugAppliance),
    RouterModule.forChild([
      {
        path: '',
        component: SetPlugAppliance
      }
    ]),
    TranslateModule.forChild()
  ],
  declarations: [SetPlugAppliance]
})
export class SetPlugApplianceModule {
}
