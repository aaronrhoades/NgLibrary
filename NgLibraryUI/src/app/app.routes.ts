import { Routes } from '@angular/router';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';


export const routes: Routes = [
    { 
        path: '',
        component: LoginOrRegisterComponent,
    },
];
