import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [ LoginComponent, RegisterComponent],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent {
  // This component is used to switch between login and register forms
  // It uses a simple boolean to toggle between the two forms
  isLogin: boolean = true; // Default to login form

  toggleForm() {
    this.isLogin = !this.isLogin; // Toggle the form type
  }
  handleClickAndToggle(event: Event) {
    event.preventDefault();
    this.toggleForm();
  }
}
