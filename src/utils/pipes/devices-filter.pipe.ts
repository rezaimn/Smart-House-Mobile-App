import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceFilter',
  pure: false
})
export class DevicesFilterPipe implements PipeTransform {
    /**
     * filter un used devices
     */
  transform(items: any[]): any {
    if(typeof items !== "undefined") {
      return items.filter(item => !item.name.startsWith('N_'));
    }
  }
}
