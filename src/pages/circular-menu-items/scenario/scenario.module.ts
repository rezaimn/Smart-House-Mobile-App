import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Scenario} from './scenario';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Scenario),
    RouterModule.forChild([
      {
        path: '',
        component: Scenario
      }
    ])
  ],
  declarations: [Scenario],

})
export class ScenarioModule {
}
