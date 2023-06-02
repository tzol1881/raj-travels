import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartInventoryComponent } from './part-inventory/part-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: PartInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartInventoryRoutingModule { }