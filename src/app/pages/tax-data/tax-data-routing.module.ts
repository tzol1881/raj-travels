import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxDataComponent } from './tax-data/tax-data.component';

const routes: Routes = [
  {
    path: '',
    component: TaxDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxDataRoutingModule { }