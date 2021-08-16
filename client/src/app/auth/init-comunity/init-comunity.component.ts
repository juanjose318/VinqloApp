import { Toast } from './../../core/constants/Toast';
import { CommonService } from './../../core/services/common.service';
import { Community, CommunityService } from 'src/app/core';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-init-comunity',
  templateUrl: './init-comunity.component.html',
  styleUrls: ['./init-comunity.component.css']
})
export class InitComunityComponent implements OnInit {
  active = 'top';
  step=1;
  slug:string='';
  joinSlug='';
  communities:Community[]=[];
  get categories()  {return this.commonService.categories(); }
  isLoader = false;
  constructor(private router:Router,private communityService: CommunityService,private commonService:CommonService) { }
  
  ngOnInit(): void {
    this.slug=this.categories[0].slug;
    this.active = this.slug;
    this.getComunities(this.slug)
  }
  getComunities(catSlug:string)
  {
    this.isLoader = true;
    this.slug=catSlug;
    this.communityService.getCommunitiesByCategory('/communities/get/academics',catSlug).subscribe(res=>
      {
        if(res.status==200){
          this.communities=res.data.docs;
        }
        this.isLoader = false;

      }, err => {this.isLoader= false; this.communities = [];} )
  }
  checkClick(){
    this.router.navigate(['/feed'])
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
      if(res.status === 200 && !isJoined) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined=!this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined;
        this.joinSlug = '';
      }
      else if(res.status === 200 && isJoined){
        Toast.fire({icon:'success', title: 'you un-joined a Community '});
        this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined=!this.communities[this.communities.findIndex(c => c.slug == slug)].isJoined;
        this.joinSlug = '';
      }
   } )
  }
}
