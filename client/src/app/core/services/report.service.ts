import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private api:ApiService) { }
  getAllReports(type:number,searchQuery:String,status:number)
  {
    return this.api.get(`/reports/get/all?type=${type}${status !== -1 ? '&status='+status: ''}${searchQuery !== '' ? '&query='+searchQuery: ''}`)
  }
  postReport(data:any):Observable<any>
  {

    return this.api.post('/reports',data)
  }
  deleteReport(data:string)
  {
    return this.api.delete('/reports/'+data)
  }
  updateReport(slug:string , type:number){ return this.api.post(`/reports/status/${type}/${slug}`)}
}
