import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
declare const google: any;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  login: Login = {} as Login;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginServices: LoginService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.loginUser();

    //google authenticaarion
    google.accounts.id.initialize({
      client_id: '53585263004-gcanle9q5at36rv6ullfn0nlsl64ehid.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      prompt_parent_id: 'google-button'
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      {

        theme: 'outline',
        size: 'large',
         type: 'standard',
         text: 'continue_with',
         shape: 'circle',   
          // prompt: 'select_account'

      } // customization
    );

    // google.accounts.id.prompt();
    google.accounts.id.cancel();
    google.accounts.id.disableAutoSelect();

  }

  loginUser() {
    if (this.username && this.password) {
      this.loginServices.login(this.username, this.password).subscribe(
        (data: Login) => {
          if (data) {
            console.log('Login Successful');
            console.log(data);
            localStorage.setItem('token', data.token);
          } else {
            this.errorMessage = 'Login Failed';
          }
        },
      );
    } else {
      this.errorMessage = 'Username and password are required';
    }
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    this.loginServices.googleLogin(token).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        // Further handling, e.g., redirecting the user
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
