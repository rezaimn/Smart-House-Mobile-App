import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Camera} from './camera';
import {TwoFactorComponent} from "../../login/two-factor/two-factor.component";
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Camera),
    RouterModule.forChild([
      {
        path: '',
        component: Camera
      }
    ])
  ],
  declarations: [Camera]
})
export class CameraModule {
}
