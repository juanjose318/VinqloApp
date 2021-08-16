import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.userService.authenticated) {
      this.router.navigate(['/auth']);
      return false;
    }
    else if(!this.userService.getCurrentUser().verified) {
      this.router.navigate([`/auth/otp/${this.userService.getCurrentUser().email}/1`]);
      return false;
    } else {
      return true;
    }
  }
}
