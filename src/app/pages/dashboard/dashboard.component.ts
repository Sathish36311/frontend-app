import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // For *ngIf
import { AuthService } from '../../core/services/auth.service';
// You might have a data service here to fetch dashboard data
// import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule for directives like *ngIf
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Example data for the dashboard
  dashboardData = {
    totalUsers: 1250,
    activeSessions: 345,
    revenueToday: '€ 1,234.56',
    pendingTasks: 12
  };

  constructor(
    private authService: AuthService,
    private router: Router
    // private dataService: DataService // Inject your data service here
  ) { }

  ngOnInit(): void {
    // In a real application, you would fetch data from a backend here
    // this.dataService.getDashboardSummary().subscribe(data => {
    //   this.dashboardData = data;
    // });
  }

  onLogout(): void {
    this.authService.logout();
    // AuthService.logout() already handles navigation to /login
  }
}
