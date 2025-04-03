import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../../models/book';
import { BookPreviewComponent } from '../book-preview/book-preview.component';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookPreviewComponent, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[] = [];
  searchTerm: string = '';
  resultsTerm: string = '';
  showClearButton: boolean = false;

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

  searchBooks() {
    const searchString = this.searchTerm.trim();
    if(searchString === ''){
      this.bookService.getAllBooks().pipe(take(1)).subscribe(
        books => this.books = books
      );
    } else { 
      this.showClearButton = true;
      this.resultsTerm = searchString;
      this.bookService.searchByTitle(searchString).pipe(take(1)).subscribe(
        books => this.books = books
      );
    }
  }
  
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchBooks();
    }
  }

  clearResults(event: Event) {
    event.preventDefault();
    this.showClearButton = false;
    this.searchTerm = '';
    this.resultsTerm = '';
    this.bookService.getAllBooks().pipe(take(1)).subscribe(
      books => this.books = books
    );
    
  }
}
