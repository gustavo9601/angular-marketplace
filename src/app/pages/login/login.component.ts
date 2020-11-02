import {Component, OnInit} from '@angular/core';
import {positionTopPage, sweetAlert} from '../../utilities';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loading: boolean;
  emailReset: string;

  constructor(private _userService: UsersService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    this.user = new User();

    this.user.rememberMe = (this.getRememberMe()) ? true : false;
    this.user.email = (this.getRememberMe()) ? this.getRememberMe() : '';

    this.loading = false;

    this.emailReset = '';
  }

  ngOnInit(): void {
    positionTopPage();

    this.activateRoute.queryParams.subscribe(
      (queryParams) => {
        console.log('queryParams', queryParams);
        // mode=verifyEmail
        if (queryParams.oobCode && queryParams.mode === 'verifyEmail') {
          const body = {
            oobCode: queryParams.oobCode
          };

          // Confirmando en la cuenta el correo electronico
          this._userService.confirmEmailVerificationDB(body).subscribe(
            (userConfirmEmail: any) => {
              console.log('userConfirmEmail', userConfirmEmail);
              sweetAlert('success', 'Account has been confirm success full', 'Enhorabuena!!!');

              // Si se confirmo la cuenta, ahora se debe actualizar el usuario por BD
              if (userConfirmEmail.email) {

                //Obteniendo el id de usuario por el correo obtenido
                this._userService.getFilterData('email', userConfirmEmail.email).subscribe(
                  (userFilterByEmail) => {

                    const userKey = Object.keys(userFilterByEmail)[0];
                    const body = {
                      needConfirm: true
                    };

                    //Actualizando el estado de confirmacion en la BD
                    this._userService.patchData(userKey, body).subscribe();


                  }
                );


              }

            }, (error) => {
              sweetAlert('error', 'Not allowed to confirm the account', 'Error Confirm Account');
              return;
            }
          );
        }
      }
    );

  }


  loginSend(form: NgForm) {


    if (form.invalid) {
      return false;
    }
    this.loading = true;


    // Verificando si el usuario ya confirmo el email
    this._userService.getFilterData('email', this.user.email).subscribe(
      (responseUser) => {


        const user: any = Object.values(responseUser)[0];
        const idUser = Object.keys(responseUser)[0];

        if (!user) {
          sweetAlert('error', 'Email or password invalid', 'Error Auth');
          this.loading = false;
          return;
        }

        if (user.needConfirm) {
          // Authentication
          this.user.returnSecureToken = true;
          this._userService.loginUserFirebase(this.user).subscribe(
            (responseLogin: any) => {


              // Guardando en localstorage la sesion
              const expiresIn = new Date();
              expiresIn.setSeconds(responseLogin.expiresIn);
              this._userService.saveLocaStorageAuth(responseLogin.idToken, responseLogin.email, expiresIn.getTime().toString());

              // Actualizando el token en la bd
              this.setIdTokenInBD(responseLogin.idToken, idUser);

              // Almacena o olvida recordar email del localstorage
              this.rememberUser();

              // Redirigiendo al account
              this.router.navigate(['/account']);

              this.loading = false;
            }, (error) => {
              console.log('error login', error);
              sweetAlert('error', 'Email or password invalid', 'Error Auth');
              this.loading = false;
            }
          );
        } else {
          // No ha confirmado su email
          sweetAlert('error', 'Need confirm your email', 'Error Auth');
          this.loading = false;
          return false;
        }

      }
    );


  }

  setIdTokenInBD(idToken: string, idUser: string) {
    const body = {
      idToken: idToken
    };
    this._userService.patchData(idUser, body).subscribe();
  }

  rememberUser() {
    if (this.user.rememberMe) {
      localStorage.setItem('rememberMe', this.user.email);
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

  getRememberMe() {
    return (localStorage.getItem('rememberMe')) ? localStorage.getItem('rememberMe') : null;
  }


  resetPassword(formRestPassword: NgForm) {
    this.loading = true;
    if (formRestPassword.valid) {

      const body = {
        requestType: 'PASSWORD_RESET',
        email: this.emailReset
      };

      this._userService.resetPassword(body).subscribe(
        (responseReset) => {
          console.log('responseReset', responseReset);
        }
      );

      this.loading = false;
    }
  }

}
