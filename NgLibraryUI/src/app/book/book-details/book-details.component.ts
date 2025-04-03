import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Book } from '../../models/book';
import { Review } from '../../models/review';
import { RentalService } from '../../rental/rental.service';
import { ReviewService } from '../../review/review.service';
import { StarsPipe } from '../../review/stars.pipe';
import { BookService } from '../book.service';
import { ReviewComponent } from '../../review/review/review.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DatePipe, ReviewComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book>;
  authService = inject(AuthService);
  userRole = this.authService.getUserRoleSignal();
  userId: string | null = null;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private rentalService: RentalService,
  ){ }

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = String(params.get('id'));
        return combineLatest([this.bookService.getBookById(id), this.reviewService.getReviewsByBookId(id)]);
      }),
      switchMap(
        (booksAndReviews) => {
          this.reviews = booksAndReviews[1];

          return of(booksAndReviews[0]);
        }
      )
    )

    this.userId = this.authService.getUserIdFromLocalStorage();
  }

  addToCart(book: Book) {
    this.rentalService.addToRentalCart(book);
  }
}
