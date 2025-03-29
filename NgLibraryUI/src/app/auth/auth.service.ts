import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationResponse } from '../models/user-registration-response';
import { UserRegistration } from '../models/user-registration';
import { UserLogin } from '../models/user-login';
import { UserLoginResponse } from '../models/user-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  public register(registration: UserRegistration): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(this.apiUrl + '/register', registration);
  }

  public login(login: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.apiUrl + '/login', login);
  }
}
