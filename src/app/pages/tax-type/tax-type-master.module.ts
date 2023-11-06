import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxTypeComponent } from './tax-type/tax-type.component';
import { TaxTypeRoutingModule } from './tax-type-routing.module';
import { EditTaxTypeComponent } from './edit-tax-type/edit-tax-type.component';
import { DeleteTaxTypeComponent } from './delete-tax-type/delete-tax-type.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Angular material modules imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    TaxTypeComponent,
    EditTaxTypeComponent,
    DeleteTaxTypeComponent
  ],
  imports: [
    CommonModule,
    TaxTypeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule
  ]
})
export class TaxTypeMasterModule { }
