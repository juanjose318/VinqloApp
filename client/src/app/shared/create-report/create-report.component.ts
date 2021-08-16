import { report } from './../../core/constants/report';
import { ReportService } from './../../core/services/report.service';
import { Report } from './../../core/models/report';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Toast } from 'src/app/core';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  body:string='';
  type!:number;
  key!:string;
  reportType = '';
  constructor(private modalService:NgbModal,private reportService:ReportService) { }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open(type:number, key:string)
  {
    this.reportType=report[type];
    this.modalService.open(this.content);
    this.type=type;
    this.key=key;
  }
  close()
  {
    this.modalService.dismissAll();
  }
  onPost()
  {
    this.reportService.postReport({type:this.type,key:this.key,body:this.body}).subscribe
    ( res=>{ if(res.status === 200) {
      Toast.fire({icon:'success', title:this.reportType+' reported successfully'})
      this.close();
    }})

  }
}
