import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private api:ApiService) { }
  getUser(path:string)
  {
    return this.api.get(path);
  }
  editUser(data:any)
  {
    return this.api.put('/users',data)
  }
  resetPassword(email:string,otp:number,data:any)
  {
    return this.api.put(`/users/forgotPassword/${otp}/${email}`,data)
  }
  getUserInfo(email:string)
  {
    return this.api.get('/users/'+email)
  }
}
