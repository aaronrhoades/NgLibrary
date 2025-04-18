import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Book } from '../../models/book';
import { ToastType } from '../../models/toast';
import { ToastService } from '../../shared/services/toast.service';
import { BookService } from '../book.service';
import { Modal } from '../../models/modal';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  book: Book = new Book();
  modalSubmitAction: () => void | null = this.cancelBookEdit;
  modal: Modal = new Modal();
  showModal: boolean = false;
  isNew: boolean = false;
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
        if(params.has('id')){  
          const bookId = String(params.get('id'));
          return this.bookService.getBookById(bookId);
        } else {
          this.isNew = true;
          let book = new Book();
          book.totalCount = 1;
          book.available = 1;
          return of(null)
        }
      })
    ).subscribe(book => {
      if(book != null){
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
      } else {
        this.bookForm.patchValue({
          available: 1,
          totalCount: 1
        });
      }
    });
  }

  onSubmit() {
    
    if (this.bookForm.valid && !this.isNew) {
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
    } else if (this.bookForm.valid && this.isNew) {
      const newBook: Book = {
        ...this.bookForm.value
        , publishedDate: new Date(this.bookForm.value.publishedDate!),
      } as Book;

      this.bookService.createBook(newBook).subscribe({
        next:(response) => {
          this.toastService.updateToast({body: "Book created successfully.", type: ToastType.success, duration: 8000});
          this.router.navigateByUrl(`/book/${response.id}`);
        },
      });
    } else {
      console.error('bookForm is invalid!', this.bookForm.errors);
    }
  }
  modalSubmit(userChoice: boolean){
    if(userChoice){
      this.modalSubmitAction();
    } else {
      this.showModal = false;
    }
  }

  cancelBookEdit() {
    if(this.isNew) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl(`/book/${this.book.id}`);
    }
  }

  cancelBookEditMessage() {
    if(this.bookForm.dirty) {
      this.modal.title = "Cancel Editing";
      this.modal.body = "You have unsaved changes. Are you sure you want to cancel?";
      this.modalSubmitAction = this.cancelBookEdit;
      this.showModal = true;
    } else {
      this.cancelBookEdit();
    }
  }

  deleteBookMessage() {
    this.modal.title = "Delete Book";
    this.modal.body = `Are you sure you want to delete book ${this.book.title}?`;
    this.modalSubmitAction = this.deleteBook;
    this.showModal = true;
  }

  deleteBook() : void {   
    this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        this.toastService.updateToast({body: 'Book has been deleted successfully.', type: ToastType.success, duration: 8000});
        this.router.navigateByUrl('/books');
      }
    });
  }
}
