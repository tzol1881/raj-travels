import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'partTypes',
    loadChildren: () => import('./pages/part-type/part-type-master.module').then(m => m.PartTypeMasterModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'vehicals',
    loadChildren: () => import('./pages/vehical-list/vehical-master.module').then(m => m.VehicalMasterModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'taxTypes',
    loadChildren: () => import('./pages/tax-type/tax-type-master.module').then(m => m.TaxTypeMasterModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'taxData',
    loadChildren: () => import('./pages/tax-data/tax-data.module').then(m => m.TaxDataModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'partTypeMaintanance',
    loadChildren: () => import('./pages/part-type-maintance/part-type-maintance.module').then(m => m.PartTypeMaintanceModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'partInventory',
    loadChildren: () => import('./pages/part-inventory/part-inventory.module').then(m => m.PartInventoryModule),
    canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
