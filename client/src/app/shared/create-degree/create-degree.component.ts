import { DegreeService } from './../../core/services/degree.service';
import { Campus, Toast } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'app-create-degree',
  templateUrl: './create-degree.component.html',
  styleUrls: ['./create-degree.component.css']
})
export class CreateDegreeComponent implements OnInit {
  @Input() campus!:Campus;
  name!:string;
  isLoader:boolean=false;
  constructor(private modalService: NgbModal,private degreeService:DegreeService) { }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open(campus:Campus)
  {
    this.campus=campus;
    this.modalService.open(this.content);
  }
  close() {
    this.modalService.dismissAll();
  }
  createDegree(slug:string)
  {
    this.isLoader=true;
    this.degreeService.createDegree(this.name,slug).subscribe(res=>{
      if(res.status==200){
        Toast.fire({ text: 'Degree Created Successfully', icon: 'success' })
        this.name='';
        this.campus.degrees.push(res.data);
        this.isLoader=false;
      }
    })
  }
}
