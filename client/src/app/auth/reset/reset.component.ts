import { ProfileService } from './../../core/services/profile.service';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../core/services/api.service';
import { UserService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserType } from '../../core/constants/UserType';
import {Toast} from '../../core/constants/Toast'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  isLogin: boolean = true;
  errors: any= null;
  email!:string;
  otp!:number;
  authForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private profileService:ProfileService) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      password:[''],
      confirmPassword:[''],
    })
    this.route.queryParams.subscribe(res=>
      {
        this.email=res['email']
        this.otp=res['otp']
      })
  }

  get f() {return this.authForm.controls}

  onPost()
  {
    if(this.f.password.value===this.f.confirmPassword.value)
    {
      this.profileService.resetPassword(this.email,this.otp,{password: this.f.password.value}).subscribe(res=> {
        if(res.status === 200) {
          this.router.navigate(['auth/login'])
        }
      });
    }
    else{
      Toast.fire({icon:'error', title: 'Password Do not match'});
    }
  }
}
