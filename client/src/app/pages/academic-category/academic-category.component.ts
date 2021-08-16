import { Toast } from './../../core/constants/Toast';
import { Component, OnInit } from '@angular/core';
import { Campus } from 'src/app/core';
import { AcademicCategoryService } from 'src/app/core/services/academic-category.service';
import { ReportService } from './../../core/services/report.service';
@Component({
  selector: 'app-academic-category',
  templateUrl: './academic-category.component.html',
  styleUrls: ['./academic-category.component.css']
})
export class AcademicCategoryComponent implements OnInit {
  reportType = 1;
  campuses!:Campus[];
  isLoader:boolean=true;
  constructor(private reportService: ReportService, private service:AcademicCategoryService,private campusService:AcademicCategoryService) { }
  ngOnInit(): void {
    this.getCampus();
    this.get();
  }

  get() {
    this.isLoader = true;

  }
  getCampus()
  {

    this.campusService.getCampuses().subscribe
    (
      res=>{
      this.campuses=res.data.campuses
      this.isLoader=false;
    }
    )
  }
  createCampus(name:string)
  {
    this.isLoader=true;
    if(name !== '') {
       this.service.create(name).subscribe(res=>{
         if(res.status==200){
          Toast.fire({ text: 'Community Created', icon: 'success' })
        this.isLoader=false}
      }
       )
       this.getCampus();
    }
  }
  countMembers(degrees:any)
  {
    let count=0;
    degrees.forEach((e:any) => {
      count+=e.members.length
    });
    return count
  }
}
