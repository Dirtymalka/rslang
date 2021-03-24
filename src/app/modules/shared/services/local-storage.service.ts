import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItemToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItemFromLocalStorage(key): any {
    return JSON.parse(localStorage.getItem(key));
  }

  deleteItemFromLocalStorageByKey(key): any {
    localStorage.removeItem(key);
  }
}
