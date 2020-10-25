import {Injectable} from '@angular/core';

import {config} from '../config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api: string;

  constructor(private http: HttpClient) {
    this.api = config.api;
  }

  getData() {
    return this.http.get(this.api + 'categories.json');
  }


  getFilterData(orderBy, equalTo) {
    return this.http.get(this.api + 'categories.json?orderBy="' + orderBy + '"&equalTo="' + equalTo + '"');
  }

  patchData(id: string, value: Object) {
    return this.http.patch(this.api + 'categories/' + id + '.json', value);
  }
}
