import { Campus } from './../models/campus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { Category } from '../models';

@Injectable()
export class CommonService {
  public campusSubject = new BehaviorSubject<Campus[]>([]);
  public categorySubject = new BehaviorSubject<Category[]>([]);
  constructor (
    private apiService: ApiService,
  ) {}

  campuses(): Campus[] {
    return this.campusSubject.value;
  }
  categories(): Category[] {
    return this.categorySubject.value;
  }

  getCommon():void {
    this.apiService.get('/common').subscribe(
      (res => {
      this.campusSubject.next(res.data.campuses);
      this.categorySubject.next(res.data.categories);
    }));
  }

}
