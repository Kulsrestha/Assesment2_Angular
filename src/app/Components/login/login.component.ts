import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  get invalidEmail() {
    return this.loginForm.controls['email'].touched && this.loginForm.controls['email'].invalid;
  }

  get invalidPassword() {
    return this.loginForm.controls['password'].touched && this.loginForm.controls['password'].invalid;
  }

  get roleRequired() {
    return this.loginForm.controls['role'].touched && this.loginForm.controls['role'].hasError('required');
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;
      const isAuthenticated = this.authService.login(email!, password!, role!);
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid Credentials or role');
      }
    }
  }
}
