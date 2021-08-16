import { campuses } from './../core/constants/campuses';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campus, CommonService, Errors, UserService, UserType } from '../core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  title: String = '';
  errors: any= null;
  authForm: FormGroup;
  selectedCampus!:any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private commonService:CommonService,
    private ps: NgxPermissionsService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit()
  {
    this.onChangeType();
    this.route.url.subscribe(data => {
      let authType = data[data.length - 1].path;
      this.isLogin = authType === 'login'
      this.onChangeType();
    });

  }
  onChangeType() {
    if (!this.isLogin)
    {
      this.authForm.addControl('firstName', new FormControl('', [Validators.required]));
      this.authForm.addControl('lastName', new FormControl('', [Validators.required]));
      this.authForm.addControl('degree', new FormControl(null, [Validators.required]));
      this.authForm.addControl('campus', new FormControl(null, [Validators.required]));
      this.authForm.addControl('confirmPassword', new FormControl('', [Validators.required]));

      this.f.degree.disable();
    }else {
      this.authForm.removeControl('firstName');
      this.authForm.removeControl('lastName');
      this.authForm.removeControl('degree');
      this.authForm.removeControl('campus');
      this.authForm.removeControl('confirmPassword');
    }
  }
  get campuses()  {return this.commonService.campuses()}
  onCampusChange() {
    this.f.degree.reset();
    this.f.degree.enable();
  }
  get f() {return this.authForm.controls}
  get degrees() {return this.f.campus.value ? this.campuses[this.campuses.findIndex((e: Campus) => e.slug === this.f.campus.value)].degrees : [] }
  submitForm() {
    this.errors = null;

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.isLogin, credentials).subscribe
    (
      (res: any) =>
      {
        let route = '';
        if(res.status === 200) {
          if(res.data.user && !res.data.user.verified ) {
            route = '/auth/otp/'+res.data.user.email+'/1';
          } else if(res.data.user && res.data.user.role === UserType.user){
            route = '/feed';
          } else if(res.data.user && res.data.user.role == UserType.admin || res.data.user.role == UserType.superAdmin  ){
            route = '/users';
          }
        }
        this.ps.loadPermissions([res.data.user.role.toString()]);
        this.router.navigate([route])
      },
      err =>
      {
        window.scroll(0,0);
        if(err && err == 'Unauthorized') {
          this.errors = ['Invalid Email or Password'];
        } else if(err && err.code === 401.1 ) {
          this.router.navigate(['/auth/otp', this.f.email.value, 1])
        } else if(err && err.code === 401.2) {
          this.errors = [err.message];
        }  else if(err && err.code === 400.1) {
          this.errors = ['Email already exist'];
        } else if(err && err.code === 422) {
          this.errors = err.moreInfo.errors.map((e: any) => e.msg);
        }
      }
    );
  }
}
