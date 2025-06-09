import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Required for <router-outlet>
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [RouterOutlet, HeaderComponent], // Import other standalone components/modules it uses
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'] // Link to global styles if needed
})
export class AppComponent {
  title = 'frontend-app';
}