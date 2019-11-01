import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {ForgetPasswordComponent} from "./forget-password.component";
/**
 * @ignore
 */
@NgModule({
  declarations: [
    ForgetPasswordComponent,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordComponent),
  ],
  exports: [
    ForgetPasswordComponent
  ]
})
export class ForgetPasswordComponentModule { }
