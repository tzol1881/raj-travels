import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTaxDataComponent } from '../edit-tax-data/edit-tax-data.component';
import { DeleteTaxDataComponent } from '../delete-tax-data/delete-tax-data.component';
import { TaxDataService } from '../tax-data.service';

@Component({
  selector: 'app-tax-data',
  templateUrl: './tax-data.component.html',
  styleUrls: ['./tax-data.component.scss']
})
export class TaxDataComponent implements OnInit {

  taxTypes: [] = [];
  displayedColumns: string[] = ['Type', 'Validity', 'Bus number', 'From date', 'to date', 'Reading', 'Cost', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private taxDataService: TaxDataService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTaxData();
    this.taxDataService.getuniqueTaxtype().then(res => res.json())
    .then(json => {
      console.log(json)
    })
  }

  getTaxData() {
    this.taxDataService.getTaxData()
      .then(res => res.json())
      .then(json => {
        this.taxTypes = json.data;
        this.dataSource.data = [...this.taxTypes]
      })
  }

  editTaxData(taxData: any): void {
    const dialogRef = this.dialog.open(EditTaxDataComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { taxData: taxData },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxData();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addTaxData(): void {
    const dialogRef = this.dialog.open(EditTaxDataComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { taxType: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxData();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deleteTaxData(taxTypeId: number): void {
    const dialogRef = this.dialog.open(DeleteTaxDataComponent, {
      width: '25rem',
      data: { 
        id: taxTypeId
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxData();
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
