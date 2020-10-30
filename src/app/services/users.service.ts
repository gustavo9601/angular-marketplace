import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
              private _configService: ConfigService) {
  }


  registerAuth(user: User) {
    const url = this._configService.pathRegisterFirebase + this._configService.apiKeyFirebase;
    return this.httpClient.post(url, user);
  }

  registerUserDatabase(user: User) {
    return this.httpClient.post(this._configService.api + 'users.json', user);
  }

  loginUserFirebase(user: User) {
    return this.httpClient.post(this._configService.pathLoginFirebase + this._configService.apiKeyFirebase, user);
  }

  getFilterData(orderBy: string, equalTo: string) {
    return this.httpClient.get(this._configService.api + 'users.json?orderBy="' + orderBy + '"&equalTo="' + equalTo + '"');
  }


}
