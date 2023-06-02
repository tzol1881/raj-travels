import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartTypeComponent } from './part-type/part-type.component';

const routes: Routes = [
  {
    path: '',
    component: PartTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartTypeMasterRoutingModule { }
