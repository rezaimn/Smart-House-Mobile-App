import {EventEmitter, Injectable} from "@angular/core";
/**
 * @ignore
 */
@Injectable()
export class EventsHandlerService {
  public circularTabsHide=new EventEmitter<boolean>();
}
