import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginserService {
  constructor(private http: HttpClient) {}


  public userData = [];

  adminLogin(values): Observable<any> {
    const url = AppSettings.API.AUTH;
    // const body = JSON.stringify(values);
    return this.http.post<any>(url, values).pipe(
      map((user) => {
        // login bem-sucedido se houver um token jwt na resposta
        if (user) {
          this.userData = user.result;
          sessionStorage.setItem('id', user.result.id);
          sessionStorage.setItem('first_name', user.result.first_name);
          sessionStorage.setItem('last_name', user.result.last_name);
          sessionStorage.setItem('email', user.result.email);
        }

        return user;
      })
    );
  }
}
