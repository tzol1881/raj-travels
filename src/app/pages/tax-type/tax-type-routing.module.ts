import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxTypeComponent } from './tax-type/tax-type.component';

const routes: Routes = [
  {
    path: '',
    component: TaxTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxTypeRoutingModule { }
