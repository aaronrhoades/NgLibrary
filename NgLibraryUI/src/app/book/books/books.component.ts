import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../../models/book';
import { BookPreviewComponent } from '../book-preview/book-preview.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookPreviewComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books
      },
      error: (error) => {
        console.error('Failed to retrieve books!', error);
        // Handle the error here, such as displaying an error message to the user
      }
    });
  }
}
