import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedBook } from '../../models/featured-book';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-featured-book',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.css'
})
export class FeaturedBookComponent {
    book = input.required<FeaturedBook>();
}
