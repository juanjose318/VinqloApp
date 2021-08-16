import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
  @Input() imageUrl:any;
  constructor(private modalService: NgbModal) { }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open()
  {
    this.modalService.open(this.content);
  }
  openImage(url:string)
  {
    this.imageUrl=url;
    this.modalService.open(this.content);
  }
  close() {
    this.modalService.dismissAll();
  }
}
