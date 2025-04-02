import { Component, effect, input } from '@angular/core';
import { Book } from '../../models/book';
import { RouterLink } from '@angular/router';
import { RentalService } from '../../rental/rental.service';

@Component({
  selector: 'app-book-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css'
})
export class BookPreviewComponent {
  book = input.required<Book>();
  constructor(
    private rentalService: RentalService,
  ){}
  addToRentalCart(book: Book) {
    this.rentalService.addToRentalCart(book);
  }
}
