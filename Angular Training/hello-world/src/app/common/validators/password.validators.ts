import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    static checkPassword(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value !== "1234")
                    resolve({ wrongPassword: true });
                else
                    resolve(null);
            }, 2000);
        });
    }

    static matchPasswords(control: AbstractControl) {
        const newPassword = control.get('newPassword');
        const confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value)
            return { passwordMismatch: true };

        else return null;
      }
}