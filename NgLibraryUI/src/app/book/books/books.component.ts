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
  booksFiltered: Book[] = [];
  searchTerm: string = '';
  sortTerm: string = 'none';
  hideUnavailable: boolean = false;
  resultsTerm: string = '';
  showClearButton: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAllBooks();
  }

  searchBooks() {
    const searchString = this.searchTerm.trim();
    if(searchString === ''){
      this.clearResults();
    } else { 
      this.showClearButton = true;
      this.resultsTerm = searchString;
      this.bookService.searchByTitle(searchString).pipe(take(1)).subscribe(
        books => {
          this.books = books
          this.booksFiltered = books;
          this.sortAndFilterBooks();
        }
      );
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchBooks();
    }
  }

  clearResults(event?: Event) {
    event?.preventDefault();
    this.getAllBooks();
  }

  sortAndFilterBooks(event?: Event) {
    event?.preventDefault();
    const sortBy = this.sortTerm;
    const books = [...this.books];
    if(sortBy === 'title') {
      this.booksFiltered = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if(sortBy === 'author') {
      this.booksFiltered = books.sort((a, b) => a.author.localeCompare(b.author));
    } else if(sortBy === 'available') {
      this.booksFiltered = books.sort((a, b) => b.available - a.available);
    } else if(sortBy === 'none') {
      this.booksFiltered = this.books;
    }
    this.processHideUnavailableBooks();
  }

  processHideUnavailableBooks(event?: Event) {
    event?.preventDefault();
    const isChecked = this.hideUnavailable;
    if(isChecked) {
      this.booksFiltered = this.booksFiltered.filter((book) => {
        return book.available > 0;
      });
    }
  }

  getAllBooks() {
    this.searchTerm = '';
    this.resultsTerm = '';
    
    this.bookService.getAllBooks().pipe(take(1)).subscribe(books => {
      this.showClearButton = false;
      this.books = books;
      this.booksFiltered = books;
      this.sortAndFilterBooks();
    });
  }
}
