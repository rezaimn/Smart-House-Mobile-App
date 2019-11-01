import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Devices} from '../pages/circular-menu-items/devices/devices';
import {Exit} from "../pages/circular-menu-items/exit/exit";
import {Notification} from "../pages/circular-menu-items/notification/notification";
import {Settings} from "../pages/circular-menu-items/settings/settings";
import {Camera} from "../pages/circular-menu-items/camera/camera";
import {Modes} from "../pages/circular-menu-items/modes/modes";
import {About} from "../pages/circular-menu-items/about/about";
import {Scenario} from "../pages/circular-menu-items/scenario/scenario";
import {EventsHandlerService} from "../utils/services/events-handler.service";
import {LocalDataService} from "../utils/services/local-data.service";
import {animate, query, style, transition, trigger} from "@angular/animations";
import {TranslateService} from '@ngx-translate/core';
import {DataMappingService} from "../utils/services/data-mapping.service";
import {ConversionService} from "../utils/services/conversion.service";
import {CommonFunctionsService} from "../utils/services/commonFunctions.service";
import {IonicNativeHttpService} from "../utils/services/ionic-native-http.service";
import {NativeStorage} from "@ionic-native/native-storage";
import {BackgroundMode} from "@ionic-native/background-mode/ngx";
import {CloudHttpService} from "../utils/services/cloud-http.service";
import {Router} from "@angular/router";
import {LocalNotifications} from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  templateUrl: 'app.html',
  selector: 'app',
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width: '100%',
            transform: 'translateX(-100%)'
          }),
          {optional: true}),

        // move page off screen right on leave
        query(':leave',
          animate('5000ms ease',
            style({
              position: 'fixed',
              width: '100%',
              transform: 'translateX(100%)'
            })
          ),
          {optional: true}),

        // move page in screen from left to right
        query(':enter',
          animate('5000ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            })
          ),
          {optional: true}),
      ])
    ])
  ]
})
export class MyApp implements OnInit {
  /**
   * @ignore
   */
  devicesUsageCountMap = new Map();
  /**
   * @ignore
   */
  hideCircularTabs = true;
  /**
   * @ignore
   */
  notificationCtrl: any;
  /**
   * @ignore
   */
  aboutCtrl: any;
  /**
   * @ignore
   */
  cameraCtrl: any;
  /**
   * @ignore
   */
  modesCtrl: any;
  /**
   * @ignore
   */
  devicesCtrl: any;
  /**
   * @ignore
   */
  exitCtrl: any;
  /**
   * @ignore
   */
  scenarioCtrl: any;
  /**
   * @ignore
   */
  settingsCtrl: any;
  /**
   * @ignore
   */
  counter = 0;

  /**
   * Getting local storage data for start the project
   */
  constructor(
    translate: TranslateService,
    private loadingCtrl: LoadingController,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public localData: LocalDataService,
    private eventHandlerService: EventsHandlerService,
    private dataMap: DataMappingService,
    private conversionService: ConversionService,
    private commonFunctions: CommonFunctionsService,
    private translateService: TranslateService,
    private ionicHttp: IonicNativeHttpService,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private backgroundRunning: BackgroundMode,
    private cloudHttpService: CloudHttpService,
    private router: Router,
    private localNotifications: LocalNotifications
  ) {
    // this.devicesUsageCountMap=this.commonFunctions.getDeviceUsedCountMap();
    translate.setDefaultLang('fa');
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.backgroundRunning.enable();
    });
    this.notificationCtrl = Notification;
    this.aboutCtrl = About;
    this.cameraCtrl = Camera;
    this.modesCtrl = Modes;
    this.devicesCtrl = Devices;
    this.exitCtrl = Exit;
    this.scenarioCtrl = Scenario;
    this.settingsCtrl = Settings;
    this.eventHandlerService.circularTabsHide.subscribe(
      (res: any) => {
        this.hideCircularTabs = res;
      }
    )
    this.platform.ready().then((readySource) => {
      this.nativeStorage.getItem("accountData").then(
        (data) => {
          this.localData.accountData = data;
        },
        (error) => {
          this.nativeStorage.setItem("accountData", null);
        }
      )
      this.nativeStorage.getItem("selectedEdge").then(
        (data) => {
          this.localData.selectedEdge = data;
        },
        (error) => {
          this.nativeStorage.setItem("selectedEdge", null);
        }
      )
      this.nativeStorage.getItem("rememberMe").then(
        (data) => {
          if (data) {
            this.localData.userIsLoggedIn = true;
            this.localData.JWTToken = data.access_token;
            this.localData.JWTRefreshToken = data.refresh_token;
            this.localData.tokenType = data.token_type;
            this.getDataVersion();
            this.router.navigateByUrl('home');
          } else {
            this.router.navigateByUrl('login');
          }

        },
        (error) => {
          this.nativeStorage.setItem("rememberMe", false);
        }
      )
      this.nativeStorage.getItem("sendEmail").then(
        (data) => {

        },
        (error) => {
          this.nativeStorage.setItem("sendEmail", false);
        }
      )
      this.nativeStorage.getItem("sendSMS").then(
        (data) => {

        },
        (error) => {
          this.nativeStorage.setItem("sendSMS", false);
        }
      )
    });
  }

  /**
   * getting data version for starting connection with vera
   */
  ngOnInit() {
    this.getDataVersion();
  }

  /**
   * getting data version for starting connection with vera
   */
  getDataVersion() {
    console.log("rrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    this.ionicHttp.get('/data_request?id=lu_status&rand=' + Math.random().toString())
      .then(
        (res: any) => {
          this.ionicHttp.get('/data_request?id=sdata&DataVersion=' + parseInt(res.DataVersion).toString()).then(
            (sdata: any) => {
              let sData = JSON.parse(sdata.data);
              this.localData.veraMainData = sData;
            },
            (error: any) => {
            }
          )
          this.getAllMainData(parseInt(res.DataVersion).toString(), res.LoadTime);
        },
        (error: any) => {
          //let timer = setTimeout(this.getDataVersion(), 10000);
          // setTimeout(this.getDataVersion(), 10000);
        }
      )
  }

  /**
   * getting all devices data to use as a map
   */
  getAllMainData(dataVersion, loadTime) {
    this.ionicHttp.get('/data_request?id=lu_status&DataVersion=' + dataVersion + '&MinimumDelay=1000&Timeout=60&LoadTime=' + loadTime + '&rand=' + Math.random().toString()).then(
      (lu_status: any) => {
        let luStatus;
        try {
          luStatus = JSON.parse(lu_status.data);
          this.getAllMainData(parseInt(luStatus.DataVersion), luStatus.LoadTime);
          this.ionicHttp.get('/data_request?id=sdata&DataVersion=' + luStatus.DataVersion.toString()).then(
            (sdata: any) => {
              let sData = JSON.parse(sdata.data);
              this.localData.veraOldData = {...this.localData.veraMainData};
              this.localData.veraMainData = sData;
              this.localData.veraDataChanged.emit();
              this.mapDevicesToFindChanges();
              if (luStatus.devices) {
                this.createLocalNotification(luStatus.devices, luStatus.TimeStamp);
              }
              for (let device of this.localData.veraMainData.devices) {
                if (!device.name.startsWith('N_')) {
                  device.icon = this.dataMap.deviceIconMap.filter(item => item.device == device.name.substr(0, 3))[0].icon;
                }
              }
            }
          )
        } catch (e) {
          this.getAllMainData(parseInt(dataVersion), loadTime);
        }


      },
      (error: any) => {
        this.getAllMainData(parseInt(dataVersion), loadTime);
      }
    )
  }

  /**
   * change device map data
   */
  mapDevicesToFindChanges() {
    this.localData.veraNewMap.clear();
    this.localData.veraOldMap.clear();
    for (let device of this.localData.veraMainData.devices) {
      this.localData.veraNewMap.set(device.id, device);
    }
    for (let device of this.localData.veraOldData.devices) {
      this.localData.veraOldMap.set(device.id, device);
    }

  }

  /**
   * compare devices old map with new map and find the changes and create a notification
   */
  createLocalNotification(triggeredDevices, timeStamp) {
    if (this.localData.veraNewMap.size > 0 && this.localData.veraOldMap.size > 0) {
      let dateTime = this.conversionService.timeStampToDateConventor(timeStamp);
      for (let device of triggeredDevices) {

        let notiMessage = {
          "title": "فعال شدن سنسور امنیتی",
          "text": ''
        };
        let newDeviceStats = this.localData.veraNewMap.get(device.id);
        let oldDeviceStats = this.localData.veraOldMap.get(device.id);
        if (newDeviceStats) {
          if (newDeviceStats.tripped && this.commonFunctions.isSecurityDevice(newDeviceStats.name)) {
            let deviceName = '';
            if (newDeviceStats.tripped != oldDeviceStats.tripped && newDeviceStats.tripped == '1') {
              this.translateService.get('devices.' + newDeviceStats.name.substr(0, 3), this.localData.currentLang).subscribe(
                (res: any) => {
                  deviceName = res;
                  notiMessage.text = " سنسور " + deviceName + " فعال شد."
                }
              )
              this.nativeStorage.getItem("sendEmail").then(
                (data) => {
                  if (data) {
                    this.sendEmail(notiMessage.title, notiMessage.text);
                  }
                },
              )
              this.nativeStorage.getItem("sendSMS").then(
                (data) => {
                  if (data) {
                    this.sendSMS(notiMessage.title, notiMessage.text);
                  }
                },
              )
              this.localData.notificationsCount = this.localData.notificationsCount + 1;
              let isInNotifArray = false;
              let event = {
                message: notiMessage,
                time: dateTime.substr(11, 8),
                isSeen: false
              };
              let notifObj = {
                date: '',
                hasNotSeen: true,
                deviceId: 0,
                device: deviceName,
                events: []
              };
              this.localNotifications.schedule({
                id: this.localData.notificationsCount,
                title: notiMessage.title,
                text: notiMessage.text,
                icon: 'file://assets/imgs/mobile-logo.png',
                led: {color: '#ff0c4b', on: 2500, off: 1500},
                lockscreen: true,
                vibrate: true,
                foreground: true,
              });
              this.localNotifications.on('click').subscribe(
                (data) => {
                  this.router.navigateByUrl('notification');
                  this.localNotifications.clearAll();
                }
              )


              for (let notif of this.localData.notificationsStack) {
                if (notif.deviceId == device.id && notif.date == dateTime.substr(0, 10)) {

                  let audio = new Audio();
                  audio.src = "./assets/sounds/sos-alarm.mp3";
                  audio.load();
                  audio.play();

                  notif.events.unshift(event);
                  notif.hasNotSeen = true;
                  isInNotifArray = true;
                  break;
                }
              }
              if (!isInNotifArray) {
                let audio = new Audio();
                audio.src = "./assets/sounds/sos-alarm.mp3";
                audio.load();
                audio.play();
                notifObj.date = dateTime.substr(0, 10);
                notifObj.deviceId = device.id;
                notifObj.events.push(event);
                this.localData.notificationsStack.unshift(notifObj);
              }

            }
          }
        }

      }
    }
  }

  /**
   * sending changes as email
   */
  sendEmail(title, text) {
    let body = {
      from: this.localData.accountData.email,
      subject: title,
      content: text,
      receivers: [
        this.localData.accountData.email
      ]
    }
    this.cloudHttpService.post('/notification/email/send', body).subscribe(
      (res: any) => {

      }
    )
  }

  /**
   * sending devices changes as SMS
   */
  sendSMS(title, text) {
    let body = {
      content: text,
      receivers: [
        this.localData.accountData.mobileNumber
      ],
      sendStructure: "SMS_PANEL"
    }
    this.cloudHttpService.post('/notification/sms/send', body).subscribe(
      (res: any) => {

      }
    )
  }

  /**
   * open and close circular menu
   */
  circularTabsToggle() {
    this.hideCircularTabs = !this.hideCircularTabs;
  }

  /**
   * @ignore
   */
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
}

