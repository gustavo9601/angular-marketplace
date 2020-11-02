import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from '../services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UsersService,
              private router: Router) {
  }

  canActivate(): Promise<boolean> {

    const token = this._userService.getLocalStorageIdToken();
    if (!token) {
      return new Promise<boolean>(resolve => {
        this.router.navigate(['/login']);
        resolve(false);
      });
    }

    return new Promise<boolean>(resolve => {
      return this._userService.validateIdTokenAuth(token).then((respuesta) => {
        if (!respuesta){
          this.router.navigate(['/login']);
        }
        resolve(respuesta);
      });
    });
  }

}
