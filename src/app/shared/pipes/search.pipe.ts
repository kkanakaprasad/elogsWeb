import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  /**
   * this is search pipe
   * @param searchData the data to be searched
   * @param searchvalue value to be searched taken from html input 
   * @param searchkey is a key in data array to be searched and compared with search value
   * @returns returns the sorted data of array according to the searched value
   */
  transform(searchData:any,searchvalue:string, searchkey:string): any[] {
    const resultArray=[];
    if(searchvalue){
      for(let i=0;i<searchData.length;i++){
        let value=searchvalue
        if(searchvalue.search("[\\[\\]?*+|{}\\\\()@.\n\r]")!= -1 ){
          value= searchvalue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        const index=searchData[i][searchkey].toLowerCase().search(value.toLowerCase());
        if(index !== -1){
          const obj={
            ...searchData[i],
            index:index
          }
          resultArray.push(obj);
        } 
      }
      resultArray.sort((a,b)=>a.index-b.index);
      return resultArray
    }
    else{
      return searchData;
    }
  }
}
