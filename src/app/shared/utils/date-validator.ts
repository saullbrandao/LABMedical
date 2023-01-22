import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidation(param: 'past' | 'future'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const informedDate = new Date(control.value.split('/').reverse().join('/'));

    if (!control.value) return null;

    switch (param) {
      case 'past':
        return informedDate <= currentDate
          ? null
          : { invalidDate: { value: control.value } };
      case 'future':
        return informedDate >= currentDate
          ? null
          : { invalidDate: { value: control.value } };
      default:
        return null;
    }
  };
}
