import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core';

@Component({
  selector: 'app-layout',
  template: `
    <app-header [isAdmin]="isAdmin"></app-header>
    <div class="conatiner">
      <div class="row">
        <div *ngIf="isAdmin" class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div [ngClass]="isAdmin? 'col-md-9': 'col-md-12'">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
})
export class LayoutComponent {

  constructor(private router: Router, private userService: UserService) {

  }
 get isAdmin() {return +this.userService.getCurrentUser().role !== 3}

}
