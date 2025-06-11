import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, RouterLink, CommonModule], // Import ReactiveFormsModule, RouterLink, CommonModule
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator // Custom validator for password confirmation
    });
  }

  // Custom validator function to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;
      this.authService.signup({ username, password }).subscribe(
        (success: boolean) => {
          if (success) {
            this.successMessage = 'Registration successful! You can now log in.';
            // Optionally clear the form or navigate
            this.signupForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login']); // Redirect to login after a short delay
            }, 2000);
          } else {
            this.errorMessage = 'Registration failed. Please try a different username.';
          }
        },
        (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      // Mark all fields as touched to display validation errors
      this.signupForm.markAllAsTouched();
    }
  }
}