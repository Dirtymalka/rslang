import { FormControl } from '@angular/forms';

export class RegistrationValidators {
  static validEmail(control: FormControl): { [key: string]: boolean } {
    // eslint-disable-next-line no-useless-escape
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(control.value)) {
      return { validEmail: true };
    }
    return null;
  }

  static validPassword(control: FormControl): { [key: string]: boolean } {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!passwordRegExp.test(control.value)) {
      return { validPassword: true };
    }
    return null;
  }
}
