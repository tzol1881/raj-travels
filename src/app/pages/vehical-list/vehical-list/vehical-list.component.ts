import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicalService } from 'src/app/services/vehical.service';
import { EditVehicalComponent } from '../edit-vehical/edit-vehical.component';
import { VehicalDetailsComponent } from '../vehical-details/vehical-details.component';

@Component({
  selector: 'app-vehical-list',
  templateUrl: './vehical-list.component.html',
  styleUrls: ['./vehical-list.component.scss']
})
export class VehicalListComponent implements OnInit {

  vehicals: [] = [];
  displayedColumns: string[] = ['Reg no.', 'Reg date', 'Owner', 'Owner address', 'Chassis no.', 'Engine no.', 'Class', 'Maker', 'Seatting cap', 'Color', 'Horse power','Fuel type', 'City', 'State', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private vehicalService: VehicalService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getVehicals()
  }

  getVehicals() {
    this.vehicalService.getVehicleList()
      .then(res => res.json())
      .then(json => {
        this.vehicals = json.data;
        this.dataSource.data = [...this.vehicals]
      })
  }

  viewPartType(vehical: any): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '50rem',
      data: { vehical: vehical },
    });
  }

  editVehical(vehical: any): void {
    const dialogRef = this.dialog.open(EditVehicalComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { vehical: vehical },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVehicals();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  reRegisterVehical(vehical: any): void {
    const dialogRef = this.dialog.open(EditVehicalComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { vehical: vehical, reRegister: true},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVehicals();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  viewVehical(vehical: any): void {
    const dialogRef = this.dialog.open(VehicalDetailsComponent, {
      panelClass: 'custom-dialog-container',
      width: '30rem',
      data: { vehical: vehical},
    })
  }

  addVehical(): void {
    const dialogRef = this.dialog.open(EditVehicalComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { vehical: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVehicals();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deleteVehical(vehicalId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '25rem',
      data: { 
        id: vehicalId,
        type: 'vehical'
       },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVehicals();
        this.snackBar.open(result.message,'X')
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }
}

