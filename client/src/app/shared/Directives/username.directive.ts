import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appUsername]'
})

export class UsernameDirective {
  key: any;

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    if ((this.key >= 17 && this.key <= 36) || (this.key >=41 && this.key <= 64) || (this.key >= 96 && this.key <= 105) || (this.key >= 123 && this.key <= 188) || (this.key >= 190))  {
      event.preventDefault(); //method cancels the event
    }
  }
}
