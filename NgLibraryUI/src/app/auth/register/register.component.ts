import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Component, output } from '@angular/core';
import { matchFieldsValidator } from '../../validators/match-fields';
import { AuthService } from '../auth.service';
import { UserRegistration } from '../../models/user-registration';

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

            console.log('Form Submitted!', registration);
            this.registerForm.reset(); // Reset the form after successful registration
            this.justRegistered.emit(true); // Emit event to indicate successful registration
        } else {
            console.log('Form is invalid!');
        }
    }
}