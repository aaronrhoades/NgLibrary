import { Injectable, Signal, signal } from '@angular/core';
import { Book } from '../models/book';
import { Rental } from '../models/rental';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
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
      this.toastService.updateToast({body: 'Already added to cart', type: ToastType.danger, duration: 8000});
    } else {
      this.rentalCart.update(books => {
        books.push(book);
        this.toastService.updateToast({body: `${book.title} has been added to your cart`, type: ToastType.success, duration: 8000});

        return books;
      });
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
  }

  public checkout(): Observable<HttpResponse<Rental[]>> {
    const userId = localStorage.getItem('userId');
    const rentals: Rental[] = this.rentalCart().map(book => {
      let rental = new Rental();
      rental.userId = userId!;
      rental.bookId = book.id;

      return rental;
    });
    return this.http.post<HttpResponse<Rental[]>>(this.apiUrl+'/Rental',rentals);
  }
}
