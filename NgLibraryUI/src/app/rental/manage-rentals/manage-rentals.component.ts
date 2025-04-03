import { Component, inject } from '@angular/core';
import { RentalBook } from '../../models/rental-book';
import { RentalService } from '../rental.service';
import { BookService } from '../../book/book.service';
import { AuthService } from '../../auth/auth.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-rentals',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './manage-rentals.component.html',
  styleUrl: './manage-rentals.component.css'
})
export class ManageRentalsComponent {
  rentalService = inject(RentalService);
  bookService = inject(BookService);
  authService = inject(AuthService);
  rentalBooks: RentalBook[] = [];

  ngOnInit() : void {
    const userId = this.authService.getUserIdFromLocalStorage();
    if(userId) {
      this.rentalService.getAllRentals().pipe(
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

  return(userId: string, bookId: string, event:Event) {
    const returnButton = event.target as HTMLButtonElement;
    returnButton.disabled = true;

    this.rentalService.returnBook(userId, bookId).subscribe({
      next: success => {
        this.rentalBooks = this.rentalBooks.filter(
          rental => !(rental.bookId === success.bookId && rental.userId === success.userId)
        );
      }
    });
  }
}
