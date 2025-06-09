import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken();

  let clonedReq = req;
  // Add authorization header if token exists
  if (authToken) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  // Handle the response
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If it's an authentication error (401 Unauthorized)
      if (error.status === 401) {
        console.warn('401 Unauthorized response. Logging out...');
        authService.logout(); // Clear token and redirect to login
        // No need to navigate here as logout() already handles it
      }
      return throwError(() => error); // Re-throw the error for other handlers
    })
  );
};
