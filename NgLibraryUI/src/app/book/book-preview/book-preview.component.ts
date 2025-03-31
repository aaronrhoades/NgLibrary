import { Component, effect, input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-preview',
  standalone: true,
  imports: [],
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css'
})
export class BookPreviewComponent {
  book = input.required<Book>();
}
