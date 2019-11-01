import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Notification} from './notification';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Notification),
    RouterModule.forChild([
      {
        path: '',
        component: Notification
      }
    ])
  ],
  declarations: [Notification]
})
export class NotificationModule {
}
