import { Routes } from '@angular/router';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BooksComponent } from './book/books/books.component';
import { BookComponent } from './book/book/book.component';


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
    { 
        path: 'books',
        component: BooksComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'book/:id',
        component: BookComponent,
        canActivate: [authGuard],
    },
];
