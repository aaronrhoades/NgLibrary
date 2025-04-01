import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationResponse } from '../models/user-registration-response';
import { UserRegistration } from '../models/user-registration';
import { UserLogin } from '../models/user-login';
import { UserLoginResponse } from '../models/user-login-response';
import { User } from '../models/user';

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
    return this.http.post<UserLoginResponse>(this.apiUrl + '/login', login)
  }

  public getCurrentUser(): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/Identity/get-current-user`);
  }

  public setUser(user: User) {
    localStorage.setItem('userId', user.id)
  }

  public setToken(userLogin: UserLoginResponse) {
    localStorage.setItem('accessToken', userLogin.accessToken);
    localStorage.setItem('refreshToken', userLogin.refreshToken);
  }

  public deleteToken(): void {
    localStorage.removeItem('accessToken');
  }

  public logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  public isLoggedIn() : boolean {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== '';
  }

}
