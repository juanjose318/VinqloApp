import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicCategoryService {

  constructor(private api:ApiService) { }
  create(name:string)
  {
    return this.api.post('/campuses',{name:name})
  }
  getCampuses()
  {
    return this.api.get('/campuses/get/all');
  }
}
