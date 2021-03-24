import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {selectUserId, selectUserRefreshToken, selectUserToken} from "../../../redux/selectors/user.selectors";
import {BACKEND_URL} from "../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  refreshToken: string;

  userId: string;

  token: string;

  constructor(private http: HttpClient, private store: Store) {
    store.select(selectUserRefreshToken).subscribe(token => {
        this.refreshToken = token;
      });
    store.select(selectUserId).subscribe(id => {
        this.userId = id;
      });
    store.select(selectUserToken).subscribe(token => {
        this.token = token;
      });
  }

  registration(email: string, password: string) {
    return this.http.post(`${BACKEND_URL}/users`, {email, password})
  }

  login(email: string, password: string) {
    return this.http.post(`${BACKEND_URL}/signin`, {email, password})
  }

  getUser(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      })
    }

    return this.http.get(`${BACKEND_URL}/users/${userId}`, httpOptions);
  }

  getNewToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.refreshToken}`,
        Accept: 'application/json',
      })
    }

    return this.http.get(`${BACKEND_URL}/users/${this.userId}/tokens`, httpOptions)
  }

}
