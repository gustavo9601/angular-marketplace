import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private api: string;

  constructor(private http: HttpClient) {
    this.api = config.api;
  }

  getData() {
    return this.http.get(this.api + 'stores.json');
  }

  getFilterData(orderBy, equalTo) {
    return this.http.get(this.api + 'stores.json?orderBy="' + orderBy + '"&equalTo="' + equalTo + '"');
  }
}
