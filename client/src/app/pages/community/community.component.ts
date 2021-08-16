import { CommonService, Community, Post, Toast } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommunityService } from 'src/app/core/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {

  slug!: string;
  community!: Community;
  searchQuery:string='';
  joinSlug:any=null;
  isLoader: boolean = false;
  postByCommunity = '/posts/get/by/';
  constructor(private route: ActivatedRoute,
    private communityService: CommunityService,private commonService:CommonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => this.slug = res['slug'])
    this.getCurrentCommunity();
  }
  get categories()  {return this.commonService.categories()}

  getCurrentCommunity() {
    this.communityService.getSingleCommunity(this.slug).subscribe(res => this.community = res.data)
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
        if(res.status === 200 && isJoined) {
          Toast.fire({icon:'success', title: 'you un-joined a Community '});
          this.getCurrentCommunity();
        }else if(res.status === 200 && !isJoined){
          Toast.fire({icon:'success', title: 'you joined a Community '});
          this.getCurrentCommunity();
        }
        this.community.isJoined=!isJoined;
        this.joinSlug = null;
     } )

  }
}
