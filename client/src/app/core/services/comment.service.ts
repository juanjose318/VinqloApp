import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private api:ApiService) { }
  postComment(body:any)
  {
    return this.api.post('/comments',body)
  }
  getComment(data:any)
  {
    return this.api.get('/comments/'+data)
  }
  getCommentOfPost(data:any)
  {
    return this.api.get('/comments/post/'+data)
  }
  updateComment(body:any,data:any)
  {
    return this.api.put('/comments/'+data,body)
  }
  deleteComment(data:string)
  {
    return this.api.delete('/comments/'+data)
  }
}
