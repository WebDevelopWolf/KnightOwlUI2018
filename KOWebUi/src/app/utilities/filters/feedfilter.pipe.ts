import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFeed'
})
export class FeedfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.FeedDay.toLowerCase().includes(searchText) 
      || it.FeedPeriod.toLowerCase().includes(searchText) 
      || it.Food.toLowerCase().includes(searchText)
      || it.FeedDelivery.toLowerCase().includes(searchText)
      || it.FeedSupplier.toLowerCase().includes(searchText);
    });
  }

}