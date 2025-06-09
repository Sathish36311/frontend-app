import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Provide our application routes
    provideHttpClient(withInterceptors([AuthInterceptor])), // Provide HttpClient with our interceptor
    AuthService, // Provide Auth Service (automatically made available as root provided)
    // AuthGuard    // Provide Auth Guard (automatically made available as root provided)
  ]
};
