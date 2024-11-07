import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../Services/inventory.service';
import { AuthService } from '../../../Services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { DeleteAlertComponent } from "../../delete-alert/delete-alert.component";

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CurrencyPipe, DeleteAlertComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  items: any[] = [];
  currentUser: any;
  deleteConfirmation: boolean = false;  
  deleteId?: number;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.inventoryService.getItems();
  }

  deleteItem(id: number) {
    this.deleteConfirmation = true; 
    this.deleteId = id;
  }

  delete() {
    if (this.deleteId !== undefined) {
      this.inventoryService.deleteItem(this.deleteId);
      this.loadItems();
      this.deleteConfirmation = false; 
    }
  }

  cancel() {
    this.deleteConfirmation = false;  
  }

  editItem(id: number) {
    this.router.navigate(['/inventory/edit', id]);
  }
}


  // if (this.currentUser.role === 'admin') {  // Only admins can delete
  //   if (confirm('Are you sure you want to delete this item?')) {
  //     this.inventoryService.deleteItem(id);
  //     alert('Item deleted successfully!');
  //     this.loadItems();
  //   }
  // } else {
  //   alert('Only admins can delete items.');
  // }