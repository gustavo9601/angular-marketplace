import {Injectable} from '@angular/core';

import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _path: string;
  private _pathRegisterFirebase:string;
  private _apiKeyFirebase:string;
  private _api:string;

  constructor() {
    this._path = config.url;
    this._pathRegisterFirebase = config.endPointCreateAccount;
    this._apiKeyFirebase = config.apiKeyFirebase;
    this._api = config.api;
  }

  get path() {
    return this._path;
  }

  get pathRegisterFirebase() {
    return this._pathRegisterFirebase;
  }

  get apiKeyFirebase(){
    return this._apiKeyFirebase;
  }

  get api(){
    return this._api;
  }

}
