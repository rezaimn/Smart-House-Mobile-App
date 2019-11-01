import {Component, Input, OnInit} from '@angular/core';

import {LocalDataService} from "../../../utils/services/local-data.service";
import {DataMappingService} from "../../../utils/services/data-mapping.service";
import {ConversionService} from "../../../utils/services/conversion.service";
import {IonicPage} from "ionic-angular";

import {CommonFunctionsService} from "../../../utils/services/commonFunctions.service";
/**
 * @ignore
 */
@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class Devices implements OnInit {
    deviceList=[];
  constructor(
              public localData: LocalDataService,
              private dataMap: DataMappingService,
              public conventorService: ConversionService,
              private commonFunctions:CommonFunctionsService
  ) {

  }

  ngOnInit() {

  }

}
