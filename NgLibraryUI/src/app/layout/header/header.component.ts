import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserRole } from '../../models/user-registration';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  userRole: Signal<UserRole|null> = this.authService.getUserRoleSignal();
  

  ngOnInit(): void {

    const currentUserRole = this.authService.getUserRoleFromLocalStorage();
    this.authService.setUserRole(currentUserRole);

  }

  public logOut() {
    this.authService.logOut();
  }
}
