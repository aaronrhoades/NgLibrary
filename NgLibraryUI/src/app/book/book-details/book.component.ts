import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../book.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book>;

  constructor(private route: ActivatedRoute, private bookService: BookService){ }

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = String(params.get('id'));
        return this.bookService.getBookById(id);
      })
    )
  }
}
