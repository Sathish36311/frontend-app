import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink for routerLink directive
import { CommonModule } from '@angular/common'; // For *ngIf, async pipe
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true, // Mark as standalone
  imports: [RouterLink, CommonModule], // Import RouterLink and CommonModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>; // Observe authentication status

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }
}