import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  firstName: string='';
  lastName: string='';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  constructor(
    private registersService: RegisterService,
    private formBuilder: FormBuilder
  ) {

    this.signUpform = this.formBuilder.group({
      firstName: ['', Validators.required],  
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required] // Add the confirmPassword field
    },  { validators: RegisterService.passwordMatchValidator() }); // Apply the custom validator);
  }

  signUpform!: FormGroup;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.registerUser();
  }
  onSubmit(): void {
    if (this.signUpform.valid ) {
      this.signUpform.value;
      // console.log('Form Submitted', this.signUpform.value);
      // Here you can handle the sign-up logic (e.g., send data to the backend)
    } else {
      console.log('Form is invalid');
    }
  }


  registerUser(): void {
    this.registersService.register(this.firstName,this.lastName, this.email, this.password).subscribe(
      (response) => {
        console.log('User registered successfully', response);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
