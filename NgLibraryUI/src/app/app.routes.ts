import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';


export const routes: Routes = [
    { 
        path: '',
        component: LoginOrRegisterComponent,
    },
];
