import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRoomById',
  pure: false
})
export class GetRoomByIdPipe implements PipeTransform {
    /**
     * get Room By Id filter
     */
  transform(items: any[],id:number): any {
    return items.filter(item => item.id==id)
  }
}
