import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  signUpform!: FormGroup;
  constructor(
    private registersService: RegisterService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.signUpform = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: RegisterService.passwordMatchValidator() }
    );
  }

  registerUser(): void {
    this.registersService
      .register(this.firstName, this.lastName, this.email, this.password)
      .subscribe(
        {
          next: (response) => {
            this.toaster.success(response.message, 'Success');
            this.router.navigate(['/login']);

          },
          error: (error) => {
            this.toaster.error(error.error.message, 'Failed');
            this.router.navigate(['/login']);
          }
        }
      );
  }
}
