import  Swal  from 'sweetalert2';
import { UserService, Toast } from 'src/app/core';
import { Report } from './../../core/models/report';
import { ReportService } from './../../core/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  public isCollapsed = true;
  isLoader = false;
  searchQuery='';
  status = -1;
  strikeCount:number=0;
  reportTypes=[{ name: 'Post', id: 0 },{ name: 'User', id: 1 },{ name: 'Community', id: 2 }];
  statuses = [{ name: 'All', id: -1 },{ name: 'Active', id: 1 },{ name: 'In-Active', id: 0 }];
  reports!: Report[];
  reportType = 1;
  constructor(private reportService: ReportService,private userService:UserService) {}

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.isLoader = true;
    this.reportService.getAllReports(this.reportType,this.searchQuery,this.status).subscribe((res) => {
        this.isLoader = false;
        this.reports = res.data.reports.docs;
      });
  }
  onChange(type: number) {
    this.reportType = this.reportTypes[type].id;
    this.get();
  }
  deleteReport(slug:string)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wanna delete this report.',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, cancel please!',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.reportService.deleteReport(slug).subscribe(res=>
          {
            if(res.status==200){
              Toast.fire({ text: 'Deleted report Successfully', icon: 'success' })
              this.reports=this.reports.filter(e=>e.slug!=slug)
              }

          })
      } else {
        Swal.fire('Cancelled', 'Your report is safe :)', 'error');
      }
    });

  }
  deactivateReport(slug:string,status:number)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wanna de-activate this user.',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, De-activate it!',
      cancelButtonText: 'No, cancel please!',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.reportService.updateReport(slug,status==1?0:1).subscribe(res=>
          {
            if(res.status==200){
              Toast.fire({ text: 'Deactivated User Successfully', icon: 'success' })
              this.reports=this.reports.filter(e=>e.slug!=slug)
              }

          })
      } else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });

  }
  addStrike(strike:number,slug:string,email:string)
  {
    let index=this.reports.findIndex(e=>e.slug==slug)
    if(strike<3){
      Swal.fire({ title: 'Are you sure?',text: 'you wanna add a strike to this user.',showCancelButton: true,confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Post Strike !', cancelButtonText: 'No, cancel please!',})
    .then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.userService.addStrike(slug,email).subscribe((res) => {
          if (res.status == 200) {
            if(this.reportType==0){ this.reports[index].post.by.strikes+=1; }
            else if(this.reportType==1){  this.reports[index].user.strikes+=1;  }
            else if(this.reportType==2) { this.reports[index].community.by.strikes+=1;  }
            Toast.fire({ text: 'Strike Posted Successfully', icon: 'success' })
          }})}
         else {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });
    }
    else if(strike==3){
      Toast.fire({ text: 'Strikes limit full , User blocked', icon: 'success' })
    }
    else{
      Toast.fire({ text: 'Strikes limit full , User already blocked', icon: 'error' })
    }
  }
}
