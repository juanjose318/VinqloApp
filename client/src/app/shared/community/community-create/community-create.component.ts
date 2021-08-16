import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService, Community, CommunityService, Toast } from 'src/app/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-community-create',
  templateUrl: './community-create.component.html',
  styleUrls: ['./community-create.component.css']
})
export class CommunityCreateComponent implements OnInit {

  addCommunityForm!:FormGroup;
  tag = '';
  commuities!: Community[];
  isLoader = false;
  @ViewChild('content') content! : TemplateRef<any>;

  @Output() update = new EventEmitter();
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private communityService: CommunityService,
    private modalService: NgbModal) {
    this.create();
    
   }

  ngOnInit(): void {
  }
  get categories () {return this.commonService.categories()}
  onPost()
  {
   this.isLoader = true;
   const com = this.addCommunityForm.value;
    this.communityService.createCommunity(com)
    .subscribe(res=> {
      if(res.status === 200) {
        Toast.fire({icon:'success', title:'Community Created'})
        let a = res.data;
        a.category = com.category;
        this.commonService.getCommon();
        this.update.emit(a);
        this.close();

      }
     this.isLoader = false;

   
  }, err => this.isLoader = false);
  }
  open() {
    this.modalService.open(this.content)
  }
  close() {
    this.addCommunityForm.reset();
    this.isLoader = false;
    this.modalService.dismissAll();
  }
  create() {
    this.addCommunityForm = this.fb.group({
      category: [null, Validators.required],
      name: ['', Validators.required],
    });

  }
  get f() {return this.addCommunityForm.controls;}

}
