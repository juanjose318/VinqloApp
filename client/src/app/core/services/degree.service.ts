import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  constructor(private api:ApiService) { }
  createDegree(name:string,slug:string)
  {
    return this.api.post('/degrees',{"name":name,"campus":slug})
  }
}
