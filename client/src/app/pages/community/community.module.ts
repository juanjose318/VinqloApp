
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({

  declarations: [CommunityComponent],
  imports: [CommonModule, CommunityRoutingModule, SharedModule],

})
export class CommunityModule {}
