import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api:ApiService) { }

  createPost(formData:any): Observable<any>{ return this.api.post('/posts',formData);}
  getSinglePost(slug:string)  { return this.api.get('/posts/'+slug); }
  getAll(path: string,page:number,type:number,query:string,email:string) {return this.api.get(`${path}${email!==''?email:''}?page=${page}&type=${type}${query!==''?'&title='+query:''}`);}
  toggleLike(type:number,slug:string){ return this.api.get(`/posts/like/${type}/${slug}`) }
  toggleSave(type:number,slug:string){ return this.api.get(`/posts/save/${type}/${slug}`) }
  searchByName(word:string){  return this.api.get('/users/search/'+word)}
  getNoComment(page:number){ return this.api.get(`/posts/get/noComment?limit=3&page=${page}`)}
  deletePost(slug:string){ return this.api.delete(`/posts/${slug}`)}
  editPost(slug:string, formData:any): Observable<any>{ return this.api.put('/posts/'+slug,formData);}
}
