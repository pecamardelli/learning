import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static noSpaces(control: AbstractControl): ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0)
            return { nospaces: true };

        return null;
    }

    static notUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === "pablin")
                    resolve({ notunique: true });
                else
                    resolve(null);
            }, 2000);
        });
    }
}