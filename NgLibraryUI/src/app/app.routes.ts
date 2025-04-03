import { Routes } from '@angular/router';
import { LoginOrRegisterComponent } from './auth/login-or-register/login-or-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BooksComponent } from './book/books/books.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { RentalsComponent } from './rental/rentals/rentals.component';
import { RentalCartComponent } from './rental/rental-cart/rental-cart.component';
import { AddUserRoleComponent } from './auth/add-user-role/add-user-role.component';
import { ManageRentalsComponent } from './rental/manage-rentals/manage-rentals.component';


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
        path: 'book/new',
        component: BookEditComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'book/:id',
        component: BookDetailsComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'book/edit/:id',
        component: BookEditComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'rentals',
        component: RentalsComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'rentals/cart',
        component: RentalCartComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'rentals/manage',
        component: ManageRentalsComponent,
        canActivate: [authGuard],
    },
    { 
        path: 'add-user-role',
        component: AddUserRoleComponent,
        canActivate: [authGuard],
    },
    
    
];
