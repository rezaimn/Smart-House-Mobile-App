import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Settings} from '../pages/circular-menu-items/settings/settings';
import {Devices} from '../pages/circular-menu-items/devices/devices';
import {Notification} from '../pages/circular-menu-items/notification/notification';
import {Exit} from '../pages/circular-menu-items/exit/exit';
import {Modes} from '../pages/circular-menu-items/modes/modes';
import {Camera} from '../pages/circular-menu-items/camera/camera';
import {Scenario} from '../pages/circular-menu-items/scenario/scenario';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {CircularTabs} from '../components/circular-tabs/circular-tabs';

import {Home} from '../pages/circular-menu-items/home/home';
import {About} from '../pages/circular-menu-items/about/about';
import {AppRoutingModule} from "./app-routing.module";
import {EventsHandlerService} from "../utils/services/events-handler.service";
import {LoginComponent} from "../pages/login/login.component";
import {TwoFactorComponent} from "../pages/login/two-factor/two-factor.component";
import {ResetPasswordComponent} from "../pages/login/reset-password/reset-password.component";
import {LocalDataService} from "../utils/services/local-data.service";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {BatteryStatus} from "../components/battery-status/battery-status";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CloudHttpService} from "../utils/services/cloud-http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {DevicesFilterPipe} from "../utils/pipes/devices-filter.pipe";
import {GetRoomByIdPipe} from "../utils/pipes/get-room-by-id.pipe";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {DataMappingService} from "../utils/services/data-mapping.service";
import {ConversionService} from "../utils/services/conversion.service";
import {CommonFunctionsService} from "../utils/services/commonFunctions.service";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {NativeStorage} from "@ionic-native/native-storage";
import {AuthorizationService} from "../utils/services/authorization.service";
import {ForgetPasswordComponent} from "../pages/login/forget-password/forget-password.component";
import {MyApp} from "./app";
import IonicStepperModule from "ionic-stepper";
import {AddScenario} from "../pages/circular-menu-items/scenario/add-senario/add-scenario";
import {HTTP} from "@ionic-native/http";
import {IonicNativeHttpService} from "../utils/services/ionic-native-http.service";
import {DeviceList} from "../components/device-list/device-list";
import {SetPlugAppliance} from "../components/device-list/set-plug-appliance/set-plug-appliance";
import {BackgroundMode} from "@ionic-native/background-mode/ngx";
import {InputDeviceModal} from "../pages/circular-menu-items/scenario/add-senario/input-device-modal/input-device-modal";
import {LoginService} from "../utils/services/login.service";

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
/**
 * @ignore
 */
@NgModule({
    declarations: [
        MyApp,
        About,
        Home,
        Scenario,
        AddScenario,
        Camera,
        Exit,
        Notification,
        Devices,
        Settings,
        Modes,
        CircularTabs,
        LoginComponent,
        TwoFactorComponent,
        ResetPasswordComponent,
        ForgetPasswordComponent,
        BatteryStatus,
        DeviceList,
        DevicesFilterPipe,
        GetRoomByIdPipe,
        SetPlugAppliance,
        InputDeviceModal
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        ReactiveFormsModule,
        IonicStepperModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        About,
        Home,
        Scenario,
        AddScenario,
        Camera,
        Exit,
        Notification,
        Devices,
        Settings,
        Modes,
        BatteryStatus,
        DeviceList,
        InputDeviceModal
    ],
    providers: [
        BackgroundMode,
        NativePageTransitions,
        EventsHandlerService,
        LocalDataService,
        DataMappingService,
        ConversionService,
        CommonFunctionsService,
        AuthorizationService,
        CloudHttpService,
        HTTP,
        IonicNativeHttpService,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        LocalNotifications,
        NativeStorage,
        LoginService

    ],
    exports: [
        TranslateModule
    ]
})
/**
 * @ignore
 */
export class AppModule {
}
