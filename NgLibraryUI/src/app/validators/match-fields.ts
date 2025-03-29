import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function matchFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const control = controls.get(controlName);
    const matchingControl = controls.get(matchingControlName);

    if (!control || !matchingControl) {
      return null; // Return null if either control is not found
    }

    if (control.value === matchingControl.value) {
      return null; // Return null if the values match
    } else {
      return { confirmPasswordMismatch: true }; // Return an error object if they don't match
    }
  };
}