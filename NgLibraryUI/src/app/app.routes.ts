import { Routes } from '@angular/router';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BooksComponent } from './book/books/books.component';
import { BookDetailsComponent } from './book/book-details/book.component';


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
        component: BookDetailsComponent,
        canActivate: [authGuard],
    },
];
