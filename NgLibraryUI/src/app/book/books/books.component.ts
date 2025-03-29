import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        console.log('Books retrieved successfully!', books);
        // Handle the retrieved books here, such as storing them in a component property
      },
      error: (error) => {
        console.error('Failed to retrieve books!', error);
        // Handle the error here, such as displaying an error message to the user
      }
    });
  }
}
