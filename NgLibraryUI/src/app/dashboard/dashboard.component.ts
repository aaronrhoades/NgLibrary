import { Component, inject, OnInit } from '@angular/core';
import { BooksComponent } from '../book/books/books.component';
import { BookService } from '../book/book.service';
import { Book } from '../models/book';
import { FeaturedBookComponent } from '../book/featured-book/featured-book.component';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BooksComponent, FeaturedBookComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  bookService = inject(BookService);
  authService = inject(AuthService);
  userRole = this.authService.getUserRoleSignal();
  featuredBooks: Book[] = [];

  ngOnInit(): void {
    this.bookService.getFeaturedBooks().pipe(
      switchMap(result => {
        if(result.length === 0) {
          //seed DB if no books are present
          return this.bookService.populateBooks().pipe(
            switchMap(() => this.bookService.getFeaturedBooks())
          );
        }
        else{
          return of(result);
        }
      })
    ).subscribe(
      {
        next: books => {
          this.featuredBooks = books;
        }
      }
    );
  }

}
