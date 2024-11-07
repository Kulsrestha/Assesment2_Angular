import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Setting hardcoded values for admin credentials
  private adminCredentials = { email: 'kj@admin.com', password: 'angular', role: 'admin' };

  //Checking for a valid Admin and user to login
  login(email: string, password: string, role: string): boolean {
    if (email === this.adminCredentials.email && password === this.adminCredentials.password && role === this.adminCredentials.role) {
      localStorage.setItem('currentUser', JSON.stringify(this.adminCredentials));
      return true;
    } else if (role === 'clerk') {
      const clerkData = { email, password, role: 'clerk' };
      localStorage.setItem('currentUser', JSON.stringify(clerkData));
      return true;
    }
    return false;
  }

  //Getting the current suer from the local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  //Clears user seesion form the localstorage
  logout() {
    localStorage.removeItem('currentUser');
  }

}











// isAdmin() {
//   const user = this.getCurrentUser();
//   return user.role === 'admin';
// }