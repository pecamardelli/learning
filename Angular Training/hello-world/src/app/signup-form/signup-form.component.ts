import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsernameValidators } from './../common/validators/username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.noSpaces
    ], UsernameValidators.notUnique),
    password: new FormControl('', Validators.required)
  })

  login() {
    // Uncomment this when the authService is available.
    // const isValid = authService.login(this.form.value);
    //if (!isValid) {
      this.form.setErrors({
        invalidLogin: true
      });
    //}
  }

  get username() {
    return this.form.get('username');
  }
}
