import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Exit} from './exit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Exit),
    RouterModule.forChild([
      {
        path: '',
        component: Exit
      }
    ])
  ],
  declarations: [Exit]
})
export class ExitModule {
}
