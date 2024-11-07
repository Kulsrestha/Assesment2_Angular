import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { InventoryListComponent } from '../Inventory/inventory-list/inventory-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,InventoryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: any;


  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser(); //Getting the curent user role for the display message
  }

  //Go to Add Item component
  navigateToAdd() {
    this.router.navigate(['/inventory/add']);
  }

  //Clear user and redirects to the login page
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

}
