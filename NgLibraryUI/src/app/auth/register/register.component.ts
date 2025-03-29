import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, output } from '@angular/core';
import { matchFieldsValidator } from '../../validators/match-fields';
import { AuthService } from '../auth.service';
import { UserRegistration } from '../../models/user-registration';
import { UserRegistrationResponse } from '../../models/user-registration-response';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class RegisterComponent {
    justRegistered = output<boolean>();

    constructor(private authService: AuthService) { }
    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('',Validators.required),
    },
    {
        validators: matchFieldsValidator('password', 'confirmPassword'),
    });

    onSubmit() {
        //TODO: Implement the registration logic here, such as sending data to a server
        // For now, we'll just log the form values to the console if the form is valid
        if (this.registerForm.valid) {

            let registration: UserRegistration = {
                email: this.registerForm.value.email!,
                password: this.registerForm.value.password!
            };

            this.authService.register(registration).subscribe({
                next: (response: UserRegistrationResponse) => {
                    this.justRegistered.emit(true); // Emit event to indicate successful registration
                    this.registerForm.reset(); // Reset the form after successful registration
                    console.log('Registration successful!', response);
                    // Handle successful registration here, such as redirecting to a login page or dashboard
                }
                , error: (error) => {
                    console.error('Registration failed!', error);
                    // Handle registration error here, such as displaying an error message to the user
                }
            });
        } else {
            //Code should not reach here as the submit button should be disabled if the form is invalid
            console.error('registerForm is invalid!');
        }
    }
}