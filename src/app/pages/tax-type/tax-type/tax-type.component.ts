import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteTaxTypeComponent } from '../delete-tax-type/delete-tax-type.component';
import { EditTaxTypeComponent } from '../edit-tax-type/edit-tax-type.component';
import { TaxTypeService } from '../tax-type.service';


@Component({
  selector: 'app-tax-type',
  templateUrl: './tax-type.component.html',
  styleUrls: ['./tax-type.component.scss']
})
export class TaxTypeComponent implements OnInit {

  taxTypes: [] = [];
  displayedColumns: string[] = ['Type', 'Validity', 'Cost', 'Status', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private taxTypeService: TaxTypeService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTaxType()
  }

  getTaxType() {
    this.taxTypeService.getTaxTypes()
      .then(res => res.json())
      .then(json => {
        this.taxTypes = json.data;
        this.dataSource.data = [...this.taxTypes]
      })
  }

  editTaxType(taxType: any): void {
    const dialogRef = this.dialog.open(EditTaxTypeComponent, {
      width: '50rem',
      data: { taxType: taxType },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxType();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addTaxType(): void {
    const dialogRef = this.dialog.open(EditTaxTypeComponent, {
      width: '50rem',
      data: { taxType: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxType();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deleteTaxType(taxTypeId: number): void {
    const dialogRef = this.dialog.open(DeleteTaxTypeComponent, {
      width: '25rem',
      data: { 
        id: taxTypeId
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaxType();
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
