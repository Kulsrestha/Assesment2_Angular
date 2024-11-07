import { Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./Components/Inventory/inventory-list/inventory-list.component').then(m => m.InventoryListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory/add',
    loadComponent: () => import('./Components/Inventory/inventory-add/inventory-add.component').then(m => m.InventoryAddComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory/edit/:id',
    loadComponent: () => import('./Components/Inventory/inventory-edit/inventory-edit.component').then(m => m.InventoryEditComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory/list',
    loadComponent: () => import('./Components/Inventory/inventory-list/inventory-list.component').then(m => m.InventoryListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-alert',
    loadComponent: () => import('./Components/delete-alert/delete-alert.component').then(m => m.DeleteAlertComponent),
    canActivate: [AuthGuard]
  }
];

