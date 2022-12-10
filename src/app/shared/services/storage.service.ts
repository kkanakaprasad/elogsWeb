import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setDataToLocalStorage(name: string, value: any) {
    if (value) {
        if (typeof (value) === 'string') {
            localStorage.setItem(name, value);
        }
        else {
            try {
                localStorage.setItem(name, JSON.stringify(value));
            }
            catch {
                console.log("can't stringfy this value.....")
            }
        }
    }
}

getDataFromLocalStorage(item: any): any {

    if (item) {
        const localData = localStorage.getItem(item);
        if (localData) {
            return localData
        }

    }
}

removeDataFromLocalStorage(item: any) {
    localStorage.removeItem(item);
}

clearLocalStorage() {
    localStorage.clear();
}
}
