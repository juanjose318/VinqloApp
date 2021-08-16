import { ActivatedRoute, PreloadAllModules } from '@angular/router';
import { ListComponent } from './../../shared/post/list/list.component';
import { ProfileService } from './../../core/services/profile.service';
import { User, UserService } from 'src/app/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;
  isLoader=false;
  postByUser='/posts/get/email/'
  email= null;
  isJoin = false;
  constructor(private userService: UserService, private profileService:ProfileService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.email=params['email']
      this.getUser(params['email'])
    })
  }

  getUser(email:string){
    this.isLoader=true;
    this.profileService.getUserInfo(email).subscribe(res=>{
      this.user = res.data.user;
      this.isLoader=false;
    })
  }




}
