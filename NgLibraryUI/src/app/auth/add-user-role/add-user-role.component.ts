import { Component } from '@angular/core';
import { UserRole } from '../../models/user-registration';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-user-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user-role.component.html',
  styleUrl: './add-user-role.component.css'
})
export class AddUserRoleComponent {
    roleOptions = [
        { value: UserRole.Customer, label: UserRole.Customer },
        { value: UserRole.Librarian, label: UserRole.Librarian },
    ]
    roleControl = new FormControl(UserRole.Customer);

    constructor(
      private authService: AuthService,
      private router: Router,
    ) {

    }
    addRole() {
      const userId = this.authService.getUserIdFromLocalStorage();
      this.authService.addUserToRole(userId!, this.roleControl.value!).pipe(
        switchMap(() => this.authService.getCurrentUserRoles())
      ).subscribe({
        next: (response) => {
          this.authService.setUserRole(response[0]);
          this.router.navigateByUrl('/');
        }
    })
    }
}
