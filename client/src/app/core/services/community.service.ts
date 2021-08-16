import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  constructor(private api:ApiService) { }
  createCommunity(formData: any): Observable<any>{ return this.api.post('/communities',formData);}

  getAll(url: string,page:number,slug:string,type:number,query:string) {  return this.api.get(`${url}?page=${page}&type=${type}${slug!=''?'&category='+slug:''}${query!=''?'&name='+query:''}`); }
  getCommunitiesByCategory(path:string,slug:string) {  return this.api.get(`${path}?category=${slug}`)}
  getSingleCommunity(slug:string) { return this.api.get('/communities/'+slug)}
  getFollowed() {return this.api.get('/communities/get/followed')}
  getFollowedCreated() {return this.api.get('/communities/get/followed-created')}
  join(slug: string,type:boolean)  {return this.api.post(`/communities/${type?'leave/':''}${slug}`, {})}
}
