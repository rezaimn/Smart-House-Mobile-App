import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {ResetPasswordComponent} from "./reset-password.component";
/**
 * @ignore
 */
@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordComponent),
  ],
  exports: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordComponentModule { }
