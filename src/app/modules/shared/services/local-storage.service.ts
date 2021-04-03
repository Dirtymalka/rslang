import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  static setItemToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getItemFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  static deleteItemFromLocalStorageByKey(key: string): any {
    localStorage.removeItem(key);
  }
}
