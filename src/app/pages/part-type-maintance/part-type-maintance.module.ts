import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartTypeMaintanceComponent } from '../part-type-maintance/part-type-maintance/part-type-maintance.component';
import { EditPartTypeMaintanceComponent } from '../part-type-maintance/edit-part-type-maintance/edit-part-type-maintance.component';
import { ConfirmDeletePartTypeMaintanceComponent } from '../part-type-maintance/confirm-delete-part-type-maintance/confirm-delete-part-type-maintance.component';
import { PartTypeMaintanceRoutingModule } from './part-type-maintance-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PartTypeMaintanceComponent,
    EditPartTypeMaintanceComponent,
    ConfirmDeletePartTypeMaintanceComponent
  ],
  imports: [
    CommonModule,
    PartTypeMaintanceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatNativeDateModule,
  ]
})
export class PartTypeMaintanceModule { }
