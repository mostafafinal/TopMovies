import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  loggedIn: boolean = false;
  errorMessage: string = '';

  constructor(
    private loginServices: LoginService,
    private toaster: ToastrService,
    private formBuild: FormBuilder
  ) {}

  // Verfication
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  userLogin() {
    this.loginServices.login(this.email, this.password).subscribe({
      next: (response: Login) => {
        const token = response.token;
        if (token) {
          this.loginServices.saveToken(token);
          this.toaster.success(response.message, 'Success');
          // router
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.toaster.error(err.error.message, 'Failed');
      },
    });
  }
}
