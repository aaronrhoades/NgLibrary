import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RentalService } from '../rental.service';
import { Book } from '../../models/book';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-rental-toolbar',
  standalone: true,
  imports: [RouterLink, I18nPluralPipe],
  templateUrl: './rental-toolbar.component.html',
  styleUrl: './rental-toolbar.component.css'
})
export class RentalToolbarComponent implements OnInit {
  rentalService = inject(RentalService);
  rentals: Signal<Book[]> = this.rentalService.getRentalCart();

  messageMapping: {[k: string]: string} = {
    '=0': 'items',
    '=1': 'item',
    'other': 'items',
  };

  ngOnInit() {
    this.rentalService.getRentalCartFromLocalStorage();
  }
}
