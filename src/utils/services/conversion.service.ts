import { Injectable} from "@angular/core";

@Injectable()
export class ConversionService {
    /**
     * @ignore
     */
    stringToIntConventor(input:string){
      return parseInt(input);
    }
    /**
     * @ignore
     */
    swapOneAndZero(input:number){
      return input==1?0:1;
    }
    /**
     * @ignore
     */
    timeStampToDateConventor(timeStamp){
      let theDate = new Date(timeStamp * 1000);
      console.log(theDate.toISOString());
      return theDate.toISOString().substr(0,10)+'T'+theDate.getHours()+':'+theDate.getMinutes()+':'+theDate.getSeconds();
    }

}
