import { Injectable } from '@angular/core';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private items: InventoryItem[] = [];
  private itemsKey = 'inventoryItems';

  // Load items from localStorage 
  constructor() {
    this.loadItems();
  }

  //Load items if exists
  private loadItems() {
    const storedItems = localStorage.getItem(this.itemsKey);
    this.items = storedItems ? JSON.parse(storedItems) : [];
  }

  //Adding a new item to the Inventory
  addItem(name: string, description: string, price: number, quantity: number) {
    let newId = 0;
    //finding the next id if it already exists
    while (this.items.some(item => item.id === newId)) {
      newId++;
    }

    const newItem: InventoryItem = {
      id: newId,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };

    this.items.push(newItem);
    this.saveItems();
  }



  //Update  existing items and saving them 
  updateItem(updatedItem: InventoryItem) {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = { ...updatedItem };
      this.saveItems();
    }
  }

  //Deleting an existing item
  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItems();
  }


  getItem(id: number): InventoryItem | undefined {
    return this.items.find(item => item.id === id);
  }

  getItems(): InventoryItem[] {
    return [...this.items]; // Return a copy to prevent direct modification
  }

  //Saving edited or delted items to the local storage
  private saveItems() {
    localStorage.setItem(this.itemsKey, JSON.stringify(this.items));
  }
}
