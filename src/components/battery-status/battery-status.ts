import {
  Component,
  ElementRef,
  Renderer,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {EventsHandlerService} from "../../utils/services/events-handler.service";
import {Router} from "@angular/router";
@IonicPage()
@Component({
  selector: 'battery-status',
  templateUrl: 'battery-status.html'
})

export class BatteryStatus implements OnChanges, AfterViewInit,OnInit {
    /**
     * @ignore
     */
  @Input() icon_height: number = 20;
    /**
     * @ignore
     */
  @Input() battery_level: number = 100;

  constructor(
    public renderer: Renderer,
    ) {

  }
  ngOnInit(){


  }
  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {

  }


}
