import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvHelperService {

  constructor() { }

  downloadFile(data: any, filename = 'data', headerList : {propertyName : string, displayName : string}[]) {
    let csvData = this.ConvertToCSV(data, headerList);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList:  {propertyName : string, displayName : string}[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str : string = '';
    let row : string= 'S.No,';

    for (let index in headerList) {
      row += headerList[index].displayName + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head : string = headerList[index].propertyName;
        line += ',' + array[i][head].replace(/,|\n/g, '');
      }
      str += line + '\r\n';
    }
    return str;
  }
}
