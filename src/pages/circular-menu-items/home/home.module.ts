import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Home} from './home';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(Home),
    RouterModule.forChild([
      {
        path: '',
        component: Home
      }
    ])
  ],
  declarations: [Home]
})
export class HomeModule {
}
