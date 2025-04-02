import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationResponse } from '../models/user-registration-response';
import { UserRegistration, UserRole } from '../models/user-registration';
import { UserLogin } from '../models/user-login';
import { UserLoginResponse } from '../models/user-login-response';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { RentalService } from '../rental/rental.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl: string = environment.apiUrl;
  private userRole = signal<UserRole|null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private rentalService: RentalService,
  ) { }
  
  public register(registration: UserRegistration): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(this.apiUrl + '/register', registration);
  }

  public login(login: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.apiUrl + '/login', login)
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/Identity/get-current-user`);
  }

  public getCurrentUserRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Identity/get-current-user-roles`);
  }

  public addUserToRole(userId: string, role: string) : Observable<{userId:string, roleName: string}> {
    const obj = {userId: userId, roleName: role}
    return this.http.post<{userId: string, roleName: string}>(`${this.apiUrl}/Identity/add-role-to-user`, obj);
  }

  public setUser(user: User) {
    localStorage.setItem('userId', user.id)
  }

  public getUserIdFromLocalStorage() : string | null {
    return localStorage.getItem('userId');
  }

  public setUserRole(role: UserRole) {
    localStorage.setItem('role', role);
    this.userRole.set(role);
  }
  public getUserRoleFromLocalStorage() {
    return localStorage.getItem('role') as UserRole;
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
    localStorage.removeItem('role');
    this.rentalService.clearRentalCart();
    this.userRole.set(null);
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn() : boolean {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== '';
  }

  public getUserRoleSignal() : Signal<UserRole|null> {
    return this.userRole.asReadonly();
  }
}
