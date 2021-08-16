import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @ViewChild('elementRef',  {static: false}) elementRef!: ElementRef;
  anchors: any[] = [];
  @Input() body = '';


  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  public ngAfterViewInit() {


      // Solution for catching click events on anchors using querySelectorAll:
      this.anchors = this.elementRef.nativeElement.getElementsByClassName('badge');

      for (let anchor of this.anchors) {
        anchor.addEventListener('click', this.handleAnchorClick)
      }

  }
  public handleAnchorClick = (event: Event) => {
    // Prevent opening anchors the default way
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    this.router.navigate([anchor.dataset.link]);
  }
}
