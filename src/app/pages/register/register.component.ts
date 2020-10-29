import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {NgForm} from '@angular/forms';
import {sweetAlert} from '../../utilities';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: User;

  constructor(private _usersService: UsersService,
              private router:Router) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  registerUser(formRegister: NgForm) {

    if (formRegister.invalid) {
      return false;
    }

    this.user.returnSecureToken = true;
    console.log('this.user', this.user);

    this._usersService.registerAuth(this.user).subscribe(
      (responseAuth) => {
        console.log('responseAuth', responseAuth);

        if (responseAuth['email'] == this.user.email) {

          this.user.displayName = this.user.first_name + ' ' + this.user.last_name;
          this.user.method = 'direct';
          this.user.idToken = responseAuth['idToken'];
          this.user.needConfirm = false;

          // Alamacena en la BD el usuario
          this._usersService.registerUserDatabase(this.user).subscribe(
            (responseDB) => {
              console.log('responseDB', responseDB);
              formRegister.reset();
              sweetAlert('success', 'User was created correctly, please check your email and cofirm asp', 'Success');
              this.router.navigate(['/login']);
            }
          );
        }
      }, (error) => {
        console.log('error create', error);
      }
    );

  }


  validateEmailUserName(value, type: string) {
    this._usersService.getFilterData(type, value).subscribe(
      (responseFilterData) => {
        const result = Object.values(responseFilterData);
        if (result.length > 0) {
          this.user[type] = '';
          sweetAlert('error', type + ' already existis, please use another one', 'Error');
        }
        console.log('responseFilterData', responseFilterData);
      }
    );
  }

}
