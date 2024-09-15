import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private loginServices: LoginService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginUser();
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
}
