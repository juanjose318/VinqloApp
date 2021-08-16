import { UserService } from './../../core/services/user.service';
import { User, SocialLinks } from './../../core/models/User';
import { ProfileService } from './../../core/services/profile.service';
import { Campus } from './../../core/models/campus';
import { CommonService } from './../../core/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm!:FormGroup;
  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private commonService:CommonService,
    private profileService:ProfileService,
    private userService:UserService
    ) {
      this.create();
    }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open()
  {
    this.modalService.open(this.content);

  }
  get user(){return this.userService.getCurrentUser()}
  create()
  {
    this.editForm = this.fb.group({
      firstName:[this.user.firstName,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      bio: [this.user.bio, Validators.required],
      degree: [this.user.degree.slug? this.user.degree.slug: null, Validators.required],
      campus:[this.user.campus.slug?this.user.campus.slug: null,Validators.required],
      
      socialLinks: this.fb.group({
        instagram: [this.user.socialLinks.instagram, Validators.required],
        facebook: [this.user.socialLinks.facebook, Validators.required],
        twitter: [this.user.socialLinks.twitter, Validators.required],
        tiktok: [this.user.socialLinks.tiktok, Validators.required],
        phone: [this.user.socialLinks.tiktok],
      }),
      image: [this.user.image]
    });

  }
  nullDegree()
  {
    this.f.degree.reset();
  }
  close() {
    this.modalService.dismissAll();
  }
  onPost()
  {
    this.profileService.editUser(this.editForm.value).subscribe(res=> {
      if(res.status === 200) {
        Toast.fire({icon:'success', title:'Profile updated successfully'})
        this.userService.updateUserContext();
        this.close();
      }
    });
  }
  get socialLinks (){return (this.editForm.controls.socialLinks as FormGroup)}
  get fu() {return (this.editForm.controls.socialLinks as FormGroup).controls}
  get f() {return this.editForm.controls}
  get campuses()  {return this.commonService.campuses()}
  get degrees() {return this.f.campus.value ? this.campuses[this.campuses.findIndex((e: Campus) => e.slug === this.f.campus.value)].degrees : [] }
}
