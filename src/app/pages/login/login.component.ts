import {Component, OnInit} from '@angular/core';
import {positionTopPage, sweetAlert} from '../../utilities';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loading:boolean;
  constructor(private _userService: UsersService) {
    this.user = new User();
    this.loading = false;
  }

  ngOnInit(): void {
    positionTopPage();
  }


  loginSend(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    this.loading = true;
    this.user.returnSecureToken = true;
    this._userService.loginUserFirebase(this.user).subscribe(
      (responseLogin) => {
        console.log('responseLogin', responseLogin);
        this.loading = false;
      },(error) => {
        console.log("error login", error);
        this.loading = false;
        sweetAlert('error', 'Email or password invalid', 'Error Auth');
      }
    );
    console.log('this.user', this.user);
  }
}
