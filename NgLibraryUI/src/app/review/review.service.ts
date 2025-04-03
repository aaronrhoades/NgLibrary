import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  public createReview(review: Review) {
    return this.http.post(`${this.apiUrl}/Review`, review)
  }

  public updateReview(review: Review) {
    return this.http.put(`${this.apiUrl}/Review/${review.bookId}/${review.userId}`, review)
  }

  public getReviewsByBookId(bookId: string) : Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Review/${bookId}`)
  }

  public getReviewByIds(bookId: string, userId: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/Review/${bookId}/${userId}`);
  }

}
