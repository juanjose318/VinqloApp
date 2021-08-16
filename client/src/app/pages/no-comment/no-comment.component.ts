import { PostService } from './../../core/services/post.service';
import { Post } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-comment',
  templateUrl: './no-comment.component.html',
  styleUrls: ['./no-comment.component.css']
})
export class NoCommentComponent implements OnInit {
  isLoader:boolean=false;
  posts:Post[]=[];
  page=1;
  hasNextPage = true;
  constructor(private postService:PostService) {
    this.get();
  }

  ngOnInit(): void {}
  get()
  {
    this.isLoader=true;
    this.postService.getNoComment(this.page).subscribe(res=>
      {
      if(res.status==200)
      {
        this.isLoader=false;
        if(res.data.docs)
        {
          this.posts.push(...res.data.docs as Post[]);
          this.hasNextPage = res.data.hasNextPage;
        }
        else{
          this.posts=[]
        }
      }
      else{

        this.posts=[];
        this.isLoader=false;
      }
    })
  }
  onLoadMoreClick() {
    this.page++;
    this.get();
  }
}
