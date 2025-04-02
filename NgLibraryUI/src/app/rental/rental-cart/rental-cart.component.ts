import { Component, inject, Signal } from '@angular/core';
import { RentalService } from '../rental.service';
import { Book } from '../../models/book';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-rental-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rental-cart.component.html',
  styleUrl: './rental-cart.component.css'
})
export class RentalCartComponent {
  rentalService = inject(RentalService);
  rentals: Signal<Book[]> = this.rentalService.getRentalCart();

  constructor(private router: Router) {}

  checkout() {
    this.rentalService.checkout().subscribe({
      next: (response) => {
        this.rentalService.clearRentalCart();
        this.router.navigateByUrl('/');
        console.log(response);
      }
    });
  }

  remove(event: Event, book: Book) {
    event.preventDefault();
    this.rentalService.removeFromRentalCart(book);
  }
}
