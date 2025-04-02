import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Book } from '../../models/book';
import { ToastType } from '../../models/toast';
import { ToastService } from '../../shared/services/toast.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  book: Book = new Book();
  bookForm = new FormGroup({
        id: new FormControl({ value: '', disabled: true }),
        description: new FormControl(''),
        coverImg: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        author: new FormControl('', [Validators.required]),
        publisher: new FormControl('', [Validators.required]),
        publishedDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]), // YYYY-MM-DD format
        category: new FormControl('', [Validators.required]),
        isbn: new FormControl('', [Validators.required]),
        pageCount: new FormControl(0, [Validators.required]),
        available: new FormControl(0, [Validators.required]),
        totalCount: new FormControl(0, [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private toastService: ToastService,
  ){ }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = String(params.get('id'));
        return this.bookService.getBookById(bookId);
      })
    ).subscribe(book => {
      this.book = book;
      const publishedDate = new Date(book.publishedDate);
      //since toISOString adjusts timezone, prevent off by 1 day due to conversion of time zone
      const offset = publishedDate.getTimezoneOffset(); 
      let formattedPublishedDate = new Date(publishedDate.getTime() - (offset*60*1000)).toISOString().split('T')[0];

      this.bookForm.patchValue({
        id: book.id,
        title: book.title,        
        description: book.description,
        coverImg: book.coverImg,
        author: book.author,
        publisher: book.publisher,
        publishedDate: formattedPublishedDate, // Convert to YYYY-MM-DD format;
        category: book.category,
        isbn: book.isbn,
        pageCount: book.pageCount,
        available: book.available,
        totalCount: book.totalCount
      })
    });
  }

  onSubmit() {
    
    if (this.bookForm.valid) {
      const updatedBook: Book = {
        id: this.book.id,
        ...this.bookForm.value
        , publishedDate: new Date(this.bookForm.value.publishedDate!),

      } as Book; // Cast the form value to Book type
      this.bookService.updateBook(updatedBook).subscribe({
        next: () => {
          this.toastService.updateToast({body: "Book updated successfully.", type: ToastType.success, duration: 8000});
          this.router.navigateByUrl(`/book/${this.book.id}`);
        },
        error: (error) => {
          // TODO: Handle update error here, such as displaying an error message to the user
          console.error('Update failed!', error);
        }
      });
    } else {
      console.error('bookForm is invalid!', this.bookForm.errors);
    }
  }

  cancelBookEdit() {
    //TODO: "Are you sure?" (if ngdirty)
    this.router.navigateByUrl(`/book/${this.book.id}`);
  }

  deleteBook() {
    this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        this.toastService.updateToast({body: 'Book has been deleted successfully.', type: ToastType.success, duration: 8000});
        this.router.navigateByUrl('/books');
      }
    });
  }
}
