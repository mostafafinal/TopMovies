import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
// import { FormsModule } from '@angular/forms';
declare const google: any;
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { auto } from '@popperjs/core';

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
  errorMessage: string = '';

  constructor(
    private loginServices: LoginService,
    private toaster: ToastrService,
    private formBuild: FormBuilder,
    private route: Router
  ) {}
  // Verfication
  loginForm!: FormGroup;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.loginUser();
    this.createForm();

    //google authenticaarion
    google.accounts.id.initialize({
      client_id:
        '53585263004-gcanle9q5at36rv6ullfn0nlsl64ehid.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      prompt_parent_id: 'google-button',
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      {
        theme: 'light',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        shape: 'circle',
        width:'100%'
        // prompt: 'select_account'
      } // customization
    );

    // google.accounts.id.prompt();
    google.accounts.id.cancel();
    google.accounts.id.disableAutoSelect();
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
          this.loginServices.setData(true);
          sessionStorage.setItem('loggedIn', 'true');
          // router
          this.route.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.toaster.error(err.error.message, 'Failed');
      },
    });
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    this.loginServices.googleLogin(token).subscribe(
      (data) => {
        const token = data.token;
        if (token) {
          this.loginServices.saveToken(token);
          this.toaster.success(response.message, 'Success');
          this.loginServices.setData(true);
          sessionStorage.setItem('loggedIn', 'true');
          // router
          this.route.navigate(['/home']);
        }
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.toaster.error(err.error.message, 'Failed');
      }
    );
  }
}
