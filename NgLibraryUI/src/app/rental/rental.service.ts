import { Injectable, Signal, signal } from '@angular/core';
import { Book } from '../models/book';
import { Rental } from '../models/rental';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../shared/services/toast.service';
import { ToastType } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  readonly apiUrl: string = environment.apiUrl;
  private rentalCart = signal<Book[]>([])
  
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
  ) { }

  public addToRentalCart(book: Book) {
    if(this.rentalCart().findIndex(b => b.id === book.id) > -1) {
      this.toastService.updateToast({body: 'Already in cart', type: ToastType.danger, duration: 8000});
    } else {
      this.rentalCart.update(books => {
        books.push(book);
        this.toastService.updateToast({body: `${book.title} has been added to your cart`, type: ToastType.success, duration: 8000});
        localStorage.setItem('rentalCart', JSON.stringify(books));

        return books;
      });
    }
  }

  public getRentalCartFromLocalStorage() {
    const rentalCart = localStorage.getItem('rentalCart');
    if(rentalCart) {
      this.rentalCart.set(JSON.parse(rentalCart) as Book[]);
    }
  }

  public removeFromRentalCart(book: Book) {
    this.rentalCart.update(books => books.filter(b => b.id !== book.id));
  }

  public getRentalCart(): Signal<Book[]> {
    return this.rentalCart.asReadonly();
  }

  public clearRentalCart() {
    this.rentalCart.set([]);
    localStorage.removeItem('rentalCart');
  }

  public checkout(): Observable<HttpResponse<Rental[]>> {
    const userId = localStorage.getItem('userId');
    const rentals: Rental[] = this.rentalCart().map(book => {
      let rental = new Rental();
      rental.userId = userId!;
      rental.bookId = book.id;

      return rental;
    });
    return this.http.post<HttpResponse<Rental[]>>(this.apiUrl+'/Rental',rentals)
    .pipe(tap(() => {
      this.clearRentalCart();
      this.toastService.updateToast({body: 'Your books have been checked out', type: ToastType.success, duration: 8000});
    }));
  }

  public getRentalsByUserId(userId: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.apiUrl+'/Rental/' + userId);
  }

  public getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.apiUrl+'/Rental');
  }

  public returnBook(userId: string, bookId: string): Observable<Rental> {
    return this.http.delete<Rental>(`${this.apiUrl}/Rental/${userId}/${bookId}`)
  }
}
