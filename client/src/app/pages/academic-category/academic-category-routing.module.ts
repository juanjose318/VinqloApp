import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicCategoryComponent } from './academic-category.component';

const routes: Routes = [{ path: '', component: AcademicCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicCategoryRoutingModule { }
