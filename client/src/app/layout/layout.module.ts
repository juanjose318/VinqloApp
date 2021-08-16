import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
