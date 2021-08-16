import { CommonService } from 'src/app/core';
import { Router } from '@angular/router';
import { Component, Input } from "@angular/core";
import { UserService } from "../core";

@Component(
    {
        selector: 'app-header',
        templateUrl: 'header.component.html'
    }
)
export class HeaderComponent {
    @Input() isAdmin = false;
    public isCollapsed = true;
    get categories()  {return this.commonService.categories(); }
    constructor(private userService: UserService,private commonService:CommonService,private router: Router){

    }
    get user() {return this.userService.getCurrentUser()}
    onLogoutClick() {
        this.userService.purgeAuth();
        this.router.navigate(['/']);
    }
}
