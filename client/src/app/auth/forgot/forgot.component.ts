import { UserService } from './../../core/services/user.service';
import { ApiService } from './../../core/services/api.service';
import { UserType } from './../../core/constants/UserType';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  errors: any = null;
  authForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    })
  }
  get f() { return this.authForm.controls }

  submitForm() {
    this.errors = null;
    if (this.authForm.invalid) { return; }

    this.userService.resendOtp(this.f.email.value).subscribe
      (
        (res: any) => {
          let route = '';
          if (res.status === 200) {
            route = '/auth/otp/' + this.f.email.value + '/2';
            this.router.navigate([route])
          } else {
            this.errors = ['Invalid Email'];
          }
        },
        err => {
          this.errors = ['Invalid Email'];

        }
      );
  }


}
