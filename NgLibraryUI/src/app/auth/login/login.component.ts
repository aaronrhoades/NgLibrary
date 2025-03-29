import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserLoginResponse } from '../../models/user-login-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class LoginComponent {

    constructor(private authService: AuthService) { }
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    onSubmit() {
        let login = {
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!
        }
        if (this.loginForm.valid) {
            console.log(login); // Replace with actual login logic, such as sending data to a server
            this.authService.login(login).subscribe({
                next: (response: UserLoginResponse) => {
                    
                    console.log('Login successful!', response);
                    // Handle successful login here, such as redirecting to a dashboard or storing the token
                },
                error: (error: HttpErrorResponse) => {
                    console.error('Login failed!', error);
                    // Handle login error here, such as displaying an error message to the user
                }
            });
        } else {
            //Code should not reach here as the submit button should be disabled if the form is invalid
            console.error('loginForm is invalid!');
        }
    }
}
