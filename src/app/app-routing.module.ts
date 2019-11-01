import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Home} from '../pages/circular-menu-items/home/home';
import {Scenario} from '../pages/circular-menu-items/scenario/scenario';
import {Camera} from '../pages/circular-menu-items/camera/camera';
import {Modes} from '../pages/circular-menu-items/modes/modes';
import {Exit} from '../pages/circular-menu-items/exit/exit';
import {Notification} from '../pages/circular-menu-items/notification/notification';
import {About} from '../pages/circular-menu-items/about/about';
import {Devices} from '../pages/circular-menu-items/devices/devices';
import {Settings} from '../pages/circular-menu-items/settings/settings';
import {LoginComponent} from "../pages/login/login.component";
import {TwoFactorComponent} from "../pages/login/two-factor/two-factor.component";
import {ResetPasswordComponent} from "../pages/login/reset-password/reset-password.component";
import {ForgetPasswordComponent} from "../pages/login/forget-password/forget-password.component";
import {AddScenario} from "../pages/circular-menu-items/scenario/add-senario/add-scenario";
import {SetPlugAppliance} from "../components/device-list/set-plug-appliance/set-plug-appliance";
/**
 * @ignore
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home,
        data: {animation: 'home'}
    },
    {
        path: 'scenario',
        component: Scenario,
    },
    {
        path: 'scenario/add-scenario',
        component: AddScenario
    },
    {
        path: 'camera',
        component: Camera
    },
    {
        path: 'modes',
        component: Modes
    },
    {
        path: 'devices',
        component: Devices
    },
    {
        path: 'set-plug-appliance',
        component: SetPlugAppliance
    },
    {
        path: 'notification',
        component: Notification
    },
    {
        path: 'exit',
        component: Exit
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'settings',
        component: Settings
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {animation: 'login'}
    },
    {
        path: 'two-factor',
        component: TwoFactorComponent,
        data: {animation: 'two-factor'}
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {animation: 'reset-password'}
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        data: {animation: 'forget-password'}
    },

];
/**
 * @ignore
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
/**
 * @ignore
 */
export class AppRoutingModule {
}
