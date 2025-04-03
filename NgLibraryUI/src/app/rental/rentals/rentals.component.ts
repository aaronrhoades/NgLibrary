import { Component, inject, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { AuthService } from '../../auth/auth.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { BookService } from '../../book/book.service';
import { RentalBook } from '../../models/rental-book';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent implements OnInit{
  rentalService = inject(RentalService);
  bookService = inject(BookService);
  authService = inject(AuthService);
  rentalBooks: RentalBook[] = [];

  ngOnInit() : void {
    const userId = this.authService.getUserIdFromLocalStorage();
    if(userId) {
      this.rentalService.getRentalsByUserId(userId).pipe(
        switchMap(rentals => {
          let ids: string[] = rentals.map(r => r.bookId);
          return forkJoin([of(rentals),this.bookService.getBooksByIds(ids)]);
        })
      )
      .subscribe({
        next: ([rentals, books]) => {
          this.rentalBooks = rentals.map(rental => {
              const book = books.find(b => b.id === rental.bookId);

              const rentalBook:RentalBook = {
                ...rental,
                ...book
              } as RentalBook;

              return rentalBook;

          });
        }
      })
    }
  }
}
