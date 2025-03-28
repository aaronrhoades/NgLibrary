import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationResponse } from '../models/user-registration-response';
import { UserRegistration } from '../models/user-registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  public register(registration: UserRegistration): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(this.apiUrl + 'register', registration);
  }
}
