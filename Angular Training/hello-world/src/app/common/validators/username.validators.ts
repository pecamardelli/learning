import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static noSpaces(control: AbstractControl): ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0)
            return { nospaces: true };

        return null;
    }

    static unique(control: AbstractControl): ValidationErrors | null {
        return null;
    }
}