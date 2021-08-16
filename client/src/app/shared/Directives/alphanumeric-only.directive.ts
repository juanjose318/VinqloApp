import { Directive, HostListener } from '@angular/core'

@Directive({
    selector: "[appAlphaNumericOnly]"
})

export class AlphaNumericOnlyDirective{
    key: any;

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent){
        this.key = event.keyCode;
        if ((this.key >= 15 && this.key <= 36) || (this.key >= 41 && this.key <= 47) || (this.key >= 58 && this.key <= 64) || (this.key >= 91 && this.key <= 95) || (this.key >= 106)) {
          event.preventDefault();  //method cancels the event
        }
    }
}
