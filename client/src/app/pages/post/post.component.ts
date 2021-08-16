import { environment } from './../../../environments/environment';
import { UserType } from './../../core/constants/UserType';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { User } from './../../core/models/User';
import { CommentService } from './../../core/services/comment.service';
import { Post } from 'src/app/core/models';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Toast, UserService, CommunityService } from 'src/app/core';
import { TagData, TagifySettings } from 'ngx-tagify';
import { KeyValuePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  userType= UserType;
  slug!:string;
  postData!:Post;
  joinSlug:any = null;
  isLoader = false;
  isEdit=false;
  commentt :string=' ';
  whiteList$ = new BehaviorSubject<any[]>([]);
  whiteList = this.whiteList$.asObservable().pipe(distinctUntilChanged());
  mixedSettings :TagifySettings={
    mode: 'mix',
    pattern: /@/,
    tagTextProp: 'text',
    callbacks:{
      input : (e) => {
        if(e.detail.value) {
          this.service.searchByName(e.detail.value).subscribe(
            res=> {
              this.whiteList$.next(res.data.users.map((e: any) => {return {value: e.firstName+' '+e.lastName, user: e} as TagData}))
          }   )
        } },

    },
    dropdown: {
      enabled:1,
      maxItems:10,
      position: 'text',
      mapValueTo: 'text',
      highlightFirst: false,
    }
};

  constructor(private route: ActivatedRoute, private router: Router,private service:PostService,private clipboardService: ClipboardService,private userService: UserService,private communityService:CommunityService,private commentService:CommentService) { }
  get by (){  return this.userService.getCurrentUser()}
  get btnText (){ return this.isEdit ? 'Edit':'Comment'}
  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.slug = params['slug'];
      this.isLoader = true;
      this.service.getSinglePost(this.slug).subscribe( res=>{
          this.isLoader = false;
          this.postData=res.data;
        }
      )
    });
  }
  postComment(slug:string)
  {
    if(this.btnText=='Comment')
    {
      this. commentService.postComment({body:this.commentt,post:slug}).subscribe(  res=>{
          if(res.status === 200 ) {
            this.postData.comments.push({body: this.commentt, by: this.by })
            Toast.fire({icon:'success', title:'Comment Created successfully'});
            this.commentt = ' ';
          }   }   )
    }
    else
    {
      this.commentService.updateComment({body:this.commentt},this.slug).subscribe(  res=>{
        if(res.status === 200 ) {
          Toast.fire({icon:'success', title:'Comment Updated successfully'});
          this.isEdit=false;
          this.commentService.getCommentOfPost(this.postData.slug).subscribe( res=>{
            this.postData.comments=res.data.comments;
            }  )
          this.commentt = '';
        }   }   )
    }
  }
  editComment(slug:any)
  {
    this.isEdit=true;
    return this.commentService.getComment(slug).subscribe( res=>{
      if(res.status==200)
      {
        this.slug=slug;
        Toast.fire({icon:'success', title:'Comment Updated successfully'});
        this.commentt=res.data.body;
      }
    }
  )
  }
  deleteComment(slug:any)
  {
    return this.commentService.deleteComment(slug).subscribe( res=>{
        if(res.status==200)
        {
          this.commentService.getCommentOfPost(this.postData.slug).subscribe( res=>{
            this.postData.comments=res.data.comments;
            }  )
          Toast.fire({icon:'success', title:'Comment Deleted successfully'});
        }
      }
    )
  }
  toggleLike(like:boolean,slug:string)
  {
      this.service.toggleLike(like?0:1,slug).subscribe( res=> {
        this.postData.isLiked = !this.postData.isLiked;
        this.postData.isLiked ? this.postData.likeCount++ : this.postData.likeCount--;
      })

  }
  toggleSave(save:boolean,slug:string)
  {
    this.service.toggleSave(save?0:1,slug).subscribe(res=> {
      if(res.status==200){
      Toast.fire({text:save?'Post Un-Saved':'Post Saved',icon:'success'})
      this.postData.isSaved = !this.postData.isSaved;
    }})
  }
  copyContent(slug:string) {
    this.clipboardService.copyFromContent(environment.api_url+'/post/'+slug)
    Toast.fire({text:'Copied To Clipboard',icon:'success'})
  }
  onJoinClick(slug: string,isJoined:boolean) {
    this.joinSlug = slug;
    this.communityService.join(slug,isJoined).subscribe(res => {
        if( isJoined) {
          Toast.fire({icon:'success', title: 'you un-joined a Community '});
        }else if( !isJoined){
          Toast.fire({icon:'success', title: 'you joined a Community '});
        }
        this.postData.community.isJoined=!isJoined;
        this.joinSlug = null;
     } )
  }

}
