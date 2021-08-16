import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Community, CommunityService, Toast, UserService } from 'src/app/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit,OnChanges {
  @Input() url  = '';

  @Input() slug ='';
  @Input() type=0;
  @Input() isJoin = true;
  @Input() searchQuery:string='';
  communities!: Community[];
  hasNextPage = true;
  page = 1;
  isLoader = false;
  params:any;
  joinSlug:any = null;

  constructor(private communityService: CommunityService, private userService:UserService) { }
  get currentUser() {return this.userService.getCurrentUser()}
  ngOnChanges()
  {
    this.get();
  }
  ngOnInit()
  {
    this.get();
  }
  get() {
    this.isLoader = true;
    this.communityService.getAll(this.url,this.page,this.slug,this.type,this.searchQuery).subscribe(res => {
      if(res.status === 200) {
        this.isLoader = false;
        this.communities=res.data.docs;
        this.hasNextPage = res.data.hasNextPage;
      }
    })
  }
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
      if(res.status === 200 && !isJoined) {
        Toast.fire({icon:'success', title: 'you joined a Community '});
        let index=this.communities.findIndex(e=>e.slug==slug)
        this.communityService.getAll(this.url,this.page,this.slug,this.type,this.searchQuery).subscribe(res => {
        this.communities[index]=res.data.docs[index];
        })
        this.joinSlug = null;
      }
      else if(res.status === 200 && isJoined){
        Toast.fire({icon:'success', title: 'you un-joined a Community '});
        let index=this.communities.findIndex(e=>e.slug==slug)
        this.communityService.getAll(this.url,this.page,this.slug,this.type,this.searchQuery).subscribe(res => {
        this.communities[index]=res.data.docs[index];
        this.joinSlug = null;})
      }
    })
  }
}
