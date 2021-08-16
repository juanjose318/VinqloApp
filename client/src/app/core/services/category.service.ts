import { ActivatedRoute } from '@angular/router';
import { Category } from './../models/category';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  slug!:string;
  constructor(private api:ApiService,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(res=>{
      this.slug=res['slug'];
    })
   }

  getCommunityByCategory()
  {
    const params = new HttpParams()
    .set('slug', this.slug)
    return this.api.get('/communities/get/academics',params)
  }
}
