import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app.settings';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(public http: HttpClient) {}


  add_book(id) {
    const url = AppSettings.API.add_book;
    return this.http.post(url, id);
  }
  get_book() {
    const url = AppSettings.API.book;
    return this.http.get(url);
  }
  delete_book(id){
    const url = AppSettings.API.delete_book;
    return this.http.post(url, id);
  }

 
}
