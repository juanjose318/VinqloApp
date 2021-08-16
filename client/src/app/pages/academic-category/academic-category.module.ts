import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicCategoryRoutingModule } from './academic-category-routing.module';
import { AcademicCategoryComponent } from './academic-category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AcademicCategoryComponent
  ],
  imports: [
    CommonModule,
    AcademicCategoryRoutingModule,
    SharedModule
  ]
})
export class AcademicCategoryModule { }
