import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../Services/inventory.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent {

  updateForm: FormGroup;
  itemId: number;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {
    //Form for updation of items
    this.updateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl('', [positiveNumberValidator()]),
      quantity: new FormControl('', [positiveNumberValidator()]),
    });
    
    this.itemId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    const item = this.inventoryService.getItem(this.itemId);
    if (item) {
      // Patch the form with existing item values
      this.updateForm.patchValue({
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      });
    }
    // console.log(this.updateForm);
  }

  //Updating the item with the form values
  updateItem() {
    if (this.updateForm.valid) {
      this.inventoryService.updateItem({
        id: this.itemId,
        ...this.updateForm.value,
      });
      this.successMessage="Item updated Successfully";
      setTimeout(() => this.router.navigate(['/home']), 300);
      
    } else {
      this.successMessage=null;
    }
  }
}
