import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {


  private api: string;

  constructor(private http: HttpClient) {
    this.api = config.api;
  }

  getFilterData(orderBy, equalTo) {
    return this.http.get(this.api + 'sub-categories.json?orderBy="' + orderBy + '"&equalTo="' + equalTo + '"');
  }
}
