import {EventEmitter, Injectable} from "@angular/core";
import {MainDataModel} from "../data-models/main-data-model";
import {UserProfile} from "../../pages/circular-menu-items/settings/settings.model";

/**
 * @ignore
 */
@Injectable()
export class LocalDataService {
  public veraDataChanged=new EventEmitter();
  public currentLang='fa';
  public userIsLoggedIn=false;
  public JWTToken:string='';
  public JWTRefreshToken:string='';
  public tokenType:string='';
  public accountData:UserProfile=new UserProfile({});
  public selectedEdge:any;
  public veraMainData:MainDataModel=new MainDataModel({});
  public veraOldData:MainDataModel=new MainDataModel({});
  public veraNewMap=new Map();
  public veraOldMap=new Map();
  public notificationsStack = [];
  public notificationsCount = 0;
  public batteryLowDevicesCount=0;
  public outOfServiceDevicesCount=0;
  public selectedDeviceToAddAppliance;
  public selectedScenario;
}
