import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartTypeMaintanceComponent } from './part-type-maintance/part-type-maintance.component';

const routes: Routes = [
  {
    path: '',
    component: PartTypeMaintanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartTypeMaintanceRoutingModule { }