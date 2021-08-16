import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class PasswordValidator {
    static patternValidator(): ValidatorFn {
        return (control: AbstractControl): any => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
          // test the value of the control against the regexp supplied
          if (!new RegExp(/\d/).test(control.value)) {
            return { hasNumber: true };
          } else if (!new RegExp(/[A-Z]/).test(control.value)) {
            return { hasCapitalCase: true };
          } else if (!new RegExp(/[a-z]/).test(control.value)) {
            return { hasSmallCase: true };
          } else if (!new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$').test(control.value)) {
            return { invalidPassword: true };
          }
         
        };
      }
}
