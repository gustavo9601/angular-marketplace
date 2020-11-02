import {Injectable} from '@angular/core';

import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _path: string;
  private _pathRegisterFirebase: string;
  private _apiKeyFirebase: string;
  private _api: string;
  private _pathLoginFirbease: string;
  private _pathSendEmailVerification: string;
  private _pathConfirmEmailVerification: string;
  private _endPointGetUserDataAuth: string;
  private _endPointRestPasswordUser: string;

  constructor() {
    this._path = config.url;
    this._pathRegisterFirebase = config.endPointCreateAccount;
    this._apiKeyFirebase = config.apiKeyFirebase;
    this._api = config.api;
    this._pathLoginFirbease = config.endPointLogin;
    this._pathSendEmailVerification = config.endPointSendVerifcationEmail;
    this._pathConfirmEmailVerification = config.endPointConfirmVerifcationEmail;
    this._endPointGetUserDataAuth = config.endPointGetUserDataAuth;
    this._endPointRestPasswordUser = config.endPointRestPasswordUser;
  }

  get path() {
    return this._path;
  }

  get pathRegisterFirebase() {
    return this._pathRegisterFirebase;
  }

  get pathLoginFirebase() {
    return this._pathLoginFirbease;
  }

  get apiKeyFirebase() {
    return this._apiKeyFirebase;
  }

  get api() {
    return this._api;
  }

  get pathSendEmailVerification() {
    return this._pathSendEmailVerification;
  }

  get pathConfirmEmailVerification() {
    return this._pathConfirmEmailVerification;
  }


  get endPointGetUserDataAuth() {
    return this._endPointGetUserDataAuth;
  }

  get endPointRestPasswordUser() {
    return this._endPointRestPasswordUser;
  }

}
