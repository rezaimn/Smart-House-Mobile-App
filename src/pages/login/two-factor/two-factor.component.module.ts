import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import {TwoFactorComponent} from "./two-factor.component";
/**
 * @ignore
 */
@NgModule({
  declarations: [
    TwoFactorComponent,
  ],
  imports: [
    IonicPageModule.forChild(TwoFactorComponent),

  ],
  exports: [
    TwoFactorComponent
  ]
})
export class TwoFactorComponentModule { }
