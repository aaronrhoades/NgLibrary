import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { catchError, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast.service';
import { ToastType } from '../../models/toast';
import { Modal } from '../../models/modal';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-review-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './review-edit.component.html',
  styleUrl: './review-edit.component.css'
})
export class ReviewEditComponent implements OnInit {
  review: Review = new Review();
  userId: string | null = null;
  bookId: string | null = null;
  isNew: boolean = false;
  modalSubmitAction: () => void | null = this.cancelReview;
  modal: Modal = new Modal();
  showModal: boolean = false;

  reviewForm = new FormGroup({
    reviewText: new FormControl('',Validators.required),
    rating: new FormControl(5, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private toastService: ToastService,
  ){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(
        params => {
          if(params.has('bookId'))
            this.bookId = params.get('bookId')
          if(params.has('userId'))
            this.userId = params.get('userId')
          if(this.bookId && this.userId) {
            return this.reviewService.getReviewByIds(this.bookId, this.userId)
          }
          else {
            return of(null)
      }}),
      catchError((err: HttpErrorResponse) => {
        if(err.status === 404){
          this.isNew = true;
        }
        return of(null);
      })
    ).subscribe({
      next: review => {
        if(review) {
          this.review = review;
          this.reviewForm.patchValue({
            rating: review.rating,
            reviewText: review.reviewText,
          });
        } 
      },
      error: err => console.error(err)
    });
  }

  onSubmit() {
    if(!this.reviewForm.invalid) {
      if(this.isNew) {
        let review = this.reviewForm.value as Review;

        review.bookId = this.bookId!;
        review.userId = this.userId!;

        this.reviewService.createReview(review).subscribe(
            this.toastService.updateToast({body: 'Your review has been added', type: ToastType.success, duration: 8000});
            this.router.navigateByUrl(`/book/${this.bookId}`);
          }
        );
      } 
      else {
        let review = this.reviewForm.value as Review;

        review.bookId = this.bookId!;
        review.userId = this.userId!;
        review.datePosted = this.review.datePosted;
        review.lastUpdated = this.review.lastUpdated;
        
        this.reviewService.updateReview(review).subscribe(
          result => {
            this.toastService.updateToast({ body: 'Your review has been updated', type: ToastType.success, duration: 8000 });
          }
        );
      }
    } else {
      console.error('Form invalid');
    }
  }

  public cancelReviewEditMessage() {
    if(this.reviewForm.dirty) {
      this.modal.title = "Cancel Editing";
      this.modal.body = "You have unsaved changes. Are you sure you want to cancel?";
      this.modalSubmitAction = this.cancelReview;
      this.showModal = true;
    } else {
      this.cancelReview();
    }
  }

  public cancelReview() {
      this.router.navigateByUrl(`/book/${this.bookId}`);
  }

  modalSubmit(userChoice: boolean){
    if(userChoice){
      this.modalSubmitAction();
    } else {
      this.showModal = false;
    }
  }
}
