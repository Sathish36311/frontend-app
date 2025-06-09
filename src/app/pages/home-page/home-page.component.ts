import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink for routerLink directive

@Component({
  selector: 'app-home-page',
  standalone: true, // Mark as standalone
  imports: [RouterLink], // Import RouterLink
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent { }