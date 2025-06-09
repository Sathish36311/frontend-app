import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Use definite assignment assertion or initialize in constructor
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login({ username, password }).subscribe(
        (success: boolean) => {
          if (success) {
            this.router.navigate(['/dashboard']); // Navigate to dashboard on success
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
}
