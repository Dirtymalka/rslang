import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectUserId,
  selectUserToken,
} from '../../../redux/selectors/user.selectors';
import { ISettings } from '../models/settingsModels';
import { BACKEND_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  token: string;

  userId: string;

  constructor(private http: HttpClient, private store: Store) {
    store.select(selectUserId).subscribe((v) => {
      this.userId = v;
    });
    store.select(selectUserToken).subscribe((v) => {
      this.token = v;
    });
  }

  getSettings(): Observable<ISettings> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.get<ISettings>(
      `${BACKEND_URL}/users/${this.userId}/settings`,
      httpOptions,
    );
  }

  putSettings(settings: ISettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.put<ISettings>(
      `${BACKEND_URL}/users/${this.userId}/settings`,
      settings,
      httpOptions,
    );
  }
}
