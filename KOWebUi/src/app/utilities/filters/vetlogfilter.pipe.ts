import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVet'
})
export class vetlogfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.MedType.toLowerCase().includes(searchText) 
      || it.LogDate.toLowerCase().includes(searchText) 
      || it.Administered.toLowerCase().includes(searchText)
      || it.IllnessArea.toLowerCase().includes(searchText)
      || it.Outcome.toLowerCase().includes(searchText);
    });
  }

}