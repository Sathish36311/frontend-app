import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs'; // For Observables and state management
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // For navigation

@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the app
})
export class AuthService {
  
  private readonly LOGIN_API_URL = 'http://localhost:3000/api/login';
  private readonly TOKEN_KEY = 'authToken';

  // BehaviorSubject to notify about authentication status changes
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable(); // Public observable

  constructor(private http: HttpClient, private router: Router) { }

  // Check if a token exists in local storage
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Method to attempt login
  login(credentials: { username: string; password: string }): Observable<boolean> {
    // Simulate API call for login
    // In a real app, this would be an actual HTTP POST request to your backend
    // and the backend would return a JWT or similar token.
    if (credentials.username === 'user' && credentials.password === 'password') {
      const simulatedToken = 'fake-jwt-token-12345'; // Replace with real token from backend
      localStorage.setItem(this.TOKEN_KEY, simulatedToken);
      this._isAuthenticated.next(true); // Update authentication status
      return of(true); // Return true to indicate success
    } else {
      return of(false); // Return false for failed login
    }

    /*
    // Example of a real HTTP call (uncomment and adjust for your backend)
    return this.http.post<{ token: string }>(this.LOGIN_API_URL, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this._isAuthenticated.next(true);
      }),
      catchError(error => {
        console.error('Login failed', error);
        this._isAuthenticated.next(false);
        return of(false); // Return observable of false on error
      })
    );
    */
  }

  signup(credentials: { username: string; password: string }): Observable<boolean> {
    // Simulate API call for signup
    // In a real app, this would be an actual HTTP POST request to your backend
    // to create a new user. The backend might return a success message or a token.
    console.log('Attempting to sign up with:', credentials.username);
    // For demonstration, always succeed. In real app, handle actual registration.
    if (credentials.username && credentials.password) {
        // You might auto-login the user after signup, or redirect to login page
        // For now, just simulate success.
        return of(true);
    } else {
        return of(false);
    }

    /*
    // Example of a real HTTP call for signup (uncomment and adjust for your backend)
    return this.http.post<{ success: boolean }>(this.SIGNUP_API_URL, credentials).pipe(
      tap(response => {
        if (response.success) {
          // Optionally auto-login here or redirect to login.
          // For example, if backend sends token on signup:
          // localStorage.setItem(this.TOKEN_KEY, response.token);
          // this._isAuthenticated.next(true);
        }
      }),
      map(response => response.success), // Map to boolean success
      catchError(error => {
        console.error('Signup failed', error);
        return of(false); // Return observable of false on error
      })
    );
    */
  }

  // Method to get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Method to check if user is authenticated (convenience method)
  isUserAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  // Method to logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._isAuthenticated.next(false); // Update authentication status
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
