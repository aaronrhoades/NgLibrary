import { Component, input } from '@angular/core';
import { Book } from '../../models/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.css'
})
export class FeaturedBookComponent {
    book = input.required<Book>();
}
