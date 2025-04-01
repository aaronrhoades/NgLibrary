import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserLoginResponse } from '../../models/user-login-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { ToastType } from '../../models/toast';
import { switchMap } from 'rxjs';
import { User } from '../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class LoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastService: ToastService,
    ) { }
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    onSubmit() {
        let login = {
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!
        }
        if (this.loginForm.valid) {
            this.authService.login(login).pipe(
                switchMap((response: UserLoginResponse) => {
                    this.authService.setToken(response);
                    return this.authService.getCurrentUser();
                },)
            ).subscribe({
                next: (response: User) => {
                    this.authService.setUser(response);
                    this.router.navigateByUrl('/');
                },
                error: (error: HttpErrorResponse) => {
                    console.error('Login failed!', error);
                    this.toastService.updateToast({
                        body: 'Login failed! Please try again.', 
                        type: ToastType.danger,
                        duration: 8000
                    })
                }
            });
        } else {
            //Code should not reach here as the submit button should be disabled if the form is invalid
            console.error('loginForm is invalid!');
        }
    }
}
