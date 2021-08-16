import { FormControl } from "@angular/forms";
export function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'required': true };
}
