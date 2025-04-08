import { Component, inject } from '@angular/core';
import { RentalBook } from '../../models/rental-book';
import { RentalService } from '../rental.service';
import { BookService } from '../../book/book.service';
import { AuthService } from '../../auth/auth.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../shared/services/toast.service';
import { ToastType } from '../../models/toast';

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
  toastService = inject(ToastService);
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

  returnBook(userId: string, bookId: string, event:Event) {
    const returnButton = event.target as HTMLButtonElement;
    returnButton.disabled = true;

    this.rentalService.returnBook(userId, bookId).subscribe({
      next: success => {
        this.rentalBooks = this.rentalBooks.filter(
          rental => !(rental.bookId === success.bookId && rental.userId === success.userId)
        );
        this.toastService.updateToast({
          type: ToastType.success, 
          body: 'Book returned successfully!',
          duration: 8000
      });
    },
      error: err => {
        this.toastService.updateToast({
          type: ToastType.danger, 
          body: 'Error returning book!',
          duration: 8000
        });
        console.error(err);
        returnButton.disabled = false;
      },
      complete: () => {
        returnButton.disabled = false;
      }

    });
  }
}
