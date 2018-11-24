import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterKeeper'
})
export class KeeperlogfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.Username.toLowerCase().includes(searchText) 
      || it.LogDate.toLowerCase().includes(searchText) 
      || it.EnclosureName.toLowerCase().includes(searchText);
    });
  }

}