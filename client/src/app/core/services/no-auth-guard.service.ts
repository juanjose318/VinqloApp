import { UserService } from 'src/app/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { UserType } from '../constants';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if(this.jwtService.getToken()) {
      let route = '/feed';
      if(this.userService.getCurrentUser().role === +UserType.admin || this.userService.getCurrentUser().role === +UserType.superAdmin) {
        route = '/users'
      }
      this.router.navigate([route]);
      return false;
    }
    return true;
  }
}
