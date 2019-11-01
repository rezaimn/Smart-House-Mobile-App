import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Modes} from './modes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Modes),
    RouterModule.forChild([
      {
        path: '',
        component: Modes
      }
    ])
  ],
  declarations: [Modes]
})
export class ModesModule {
}
