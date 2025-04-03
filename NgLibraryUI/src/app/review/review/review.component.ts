import { Component, input } from '@angular/core';
import { Review } from '../../models/review';
import { StarsPipe } from '../stars.pipe';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [StarsPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  review = input.required<Review>()
}
