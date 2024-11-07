import { Component } from '@angular/core';
import { InventoryService } from '../../../Services/inventory.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

// Custom validator for positive numbers
export function positiveNumberValidator(): Validators {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css'
})
export class InventoryAddComponent {
  addItems: FormGroup;
  successMessage: string | null = null;

  constructor(private inventoryService: InventoryService, private router: Router) {
    // Initialize the form with form controls and validators
    this.addItems = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl('',[positiveNumberValidator,Validators.required]),
      quantity: new FormControl('',[positiveNumberValidator,Validators.required]),
    });
  }

  // Method to handle form submission
  addItem() {
    if (this.addItems.valid) {
      const { name, description, price, quantity } = this.addItems.value;

      // Add the item using the inventory service
      this.inventoryService.addItem(name, description, price, quantity);
      this.successMessage = 'Item added successfully!';

      // Navigate back to the home page after a short delay
      setTimeout(() => this.router.navigate(['/home']), 300);
    } else {
      this.successMessage = null; // Clear success message if form is invalid
    }
  }
  
  
}
