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


  sendEmailVerificationFB(body: any) {
    const url = this._configService.pathSendEmailVerification + this._configService.apiKeyFirebase;
    return this.httpClient.post(url, body);
  }

  confirmEmailVerificationDB(body: any) {
    const url = this._configService.pathConfirmEmailVerification + this._configService.apiKeyFirebase;
    return this.httpClient.post(url, body);
  }

  patchData(id: string, value: Object) {
    return this.httpClient.patch(this._configService.api + 'users/' + id + '.json', value);
  }

  saveLocaStorageAuth(idToken: string, email: string, expiresIn: string) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('email', email);
    localStorage.setItem('expiresIn', expiresIn);
  }

  validateIdTokenAuth(idToken: string): Promise<boolean> {
    return new Promise((resolve) => {
      const url = this._configService.endPointGetUserDataAuth + this._configService.apiKeyFirebase;
      const body = {
        idToken: idToken
      };
      this.httpClient.post(url, body).subscribe(
        (resp) => {
          return resolve(true);
        }, (error) => {
          return resolve(false);
        }
      );
    });
  }

  getLocalStorageIdToken() {
    return (localStorage.getItem('idToken') ? localStorage.getItem('idToken') : null);
  }

  resetPassword(body: any) {
    const url = this._configService.endPointRestPasswordUser + this._configService.apiKeyFirebase;
    return this.httpClient.post(url, body);
  }

}
