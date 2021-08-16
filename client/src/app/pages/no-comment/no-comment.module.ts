import { NoCommentComponent } from './no-comment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoCommentRoutingModule } from './no-comment-routing.module';


@NgModule({
  declarations: [NoCommentComponent],
  imports: [CommonModule, NoCommentRoutingModule, SharedModule],
})
export class NoCommentModule {}
