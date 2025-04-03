import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [ LoginComponent, RegisterComponent],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent implements OnInit {
  // This component is used to switch between login and register forms
  // It uses a simple boolean to toggle between the two forms
  isLogin: boolean = true; // Default to login form
  showJustRegistered: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/'); // Redirect to the dashboard if already logged in
    }
  }  

  toggleForm() {
    this.isLogin = !this.isLogin; // Toggle the form type
    this.showJustRegistered = false; // Reset the registration success message
  }
  handleClickAndToggle(event: Event) {
    event.preventDefault();
    this.toggleForm();
  }
  handleRegistrationSuccess(success: boolean) {
    if (success) {
      this.isLogin = true; // Switch to login form after successful registration
      this.showJustRegistered = true; // Show a message indicating successful registration
    }
  }
}
