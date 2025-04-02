import { Component, inject, OnInit } from '@angular/core';
import { BooksComponent } from '../book/books/books.component';
import { BookService } from '../book/book.service';
import { Book } from '../models/book';
import { FeaturedBookComponent } from '../book/featured-book/featured-book.component';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';

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
    this.bookService.getFeaturedBooks().subscribe(
      {
        next: books => {
          this.featuredBooks = books;
        }
      }
    );
  }

}
