import { PasswordValidator } from './../Validators/password-validator';
import { UserService } from './../../core/services/user.service';
import { ProfileService } from './../../core/services/profile.service';
import { CommonService } from './../../core/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/core';
import { ConfirmPasswordValidator } from '../Validators/confirm-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  ngOnInit(): void {
  }
  passForm!:FormGroup;
  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private profileService:ProfileService,
    private userService:UserService
    ) {
      this.create();
    }
  @ViewChild('content') content! : TemplateRef<any>;

  open()
  {
    this.modalService.open(this.content);
  }
  get user(){return this.userService.getCurrentUser()}
  create()
  {
    this.passForm = this.fb.group({
      password:['', [Validators.required, PasswordValidator.patternValidator()]],
      confirmPassword:['',Validators.required]}, {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      });
  }
  close() {
    this.modalService.dismissAll();
  }
  onPost()
  {
    if(this.f.password.value===this.f.confirmPassword.value)
    {

      this.profileService.editUser({password: this.f.password.value}).subscribe(res=> {
        if(res.status === 200) {
          Toast.fire({icon:'success', title:'Profile updated successfully'})
          this.userService.populate();
          this.close();
        }
      });
    }
    else
    {
      Toast.fire({icon:'error', title:'Password DidNot Match'})
    }
  }
  get f() {return this.passForm.controls}
}
