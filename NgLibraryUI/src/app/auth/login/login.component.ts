import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { ToastType } from '../../models/toast';
import { User } from '../../models/user';
import { UserLoginResponse } from '../../models/user-login-response';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../auth.service';

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

                }),
                switchMap((response: User) => {
                        this.authService.setUser(response);
                        return this.authService.getCurrentUserRoles();

                }),
                take(1)
            ).subscribe({
                next: (response: Array<any>) => {
                    if(response.length < 1) {
                        this.router.navigateByUrl('/add-user-role');
                    } else {
                        this.authService.setUserRole(response[0]);
                        this.router.navigateByUrl('/');    
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.updateToast({
                        body: 'Login failed! Please try again.', 
                        type: ToastType.danger,
                        duration: 8000
                    });
                    console.error('Error in login observable chain',{error});
                }
            });
        } else {
            //Code should not reach here as the submit button should be disabled if the form is invalid
            console.error('loginForm is invalid!');
        }
    }
}
