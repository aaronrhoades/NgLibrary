import { Component } from '@angular/core';
import { BooksComponent } from '../book/books/books.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BooksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
