import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  public getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/Book');
  }

  public getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/Book/${id}`);
  }
}
