import { Routes } from '@angular/router';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    { 
        path: 'login',
        component: LoginOrRegisterComponent,
    },
    { 
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
];
