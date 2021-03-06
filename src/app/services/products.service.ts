import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {config} from '../config';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api: string;

  constructor(private http: HttpClient) {
    this.api = config.api;
  }

  getData() {
    return this.http.get(this.api + 'products.json');
  }


  getLimitData(startAt: string, limitToFirst: number) {
    return this.http.get(this.api + 'products.json?orderBy="title_list"&startAt="1"&limitToFirst=3&print="pretty"');
  }

  getFilterAndLimitDate(urlCategory: string, limit: number) {
    return this.http.get(this.api + 'products.json?orderBy="category"&equalTo="' + urlCategory + '"&print=pretty&limitToFirst=' + limit);
  }

  getFilterData(orderBy, equalTo) {
    return this.http.get(this.api + 'products.json?orderBy="' + orderBy + '"&equalTo="' + equalTo + '"');
  }

  getSearchData(valueToFind: string, propertie: string) {
    return  this.http.get(this.api + 'products.json?orderBy="' + propertie + '"&startAt="' + valueToFind + '"&endAt="' + valueToFind + '\uf8ff"&print="pretty"');
  }


  patchData(id: string, value: Object) {
    return this.http.patch(this.api + 'products/' + id + '.json', value);
  }
}
