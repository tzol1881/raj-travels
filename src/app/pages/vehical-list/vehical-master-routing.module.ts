import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicalListComponent } from './vehical-list/vehical-list.component'; 

const routes: Routes = [
  {
    path: '',
    component: VehicalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicalMasterRoutingModule { }
