import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../book.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RentalService } from '../../rental/rental.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book>;
  authService = inject(AuthService);
  userRole = this.authService.getUserRoleSignal();
  userId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private rentalService: RentalService,
  ){ }

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = String(params.get('id'));
        return this.bookService.getBookById(id);
      })
    )
    this.userId = this.authService.getUserIdFromLocalStorage();
  }

  addToCart(book: Book) {
    this.rentalService.addToRentalCart(book);
  }
}
