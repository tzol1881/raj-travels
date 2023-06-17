import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPartTypeMaintanceComponent } from '../edit-part-type-maintance/edit-part-type-maintance.component';
import { ConfirmDeletePartTypeMaintanceComponent } from '../confirm-delete-part-type-maintance/confirm-delete-part-type-maintance.component';
import { PartTypeMaintanceService } from 'src/app/services/part-type-maintance.service';

@Component({
  selector: 'app-part-type-maintance',
  templateUrl: './part-type-maintance.component.html',
  styleUrls: ['./part-type-maintance.component.scss']
})
export class PartTypeMaintanceComponent implements OnInit {

  partTypeMaintances: [] = [];
  displayedColumns: string[] = ['Type', 'Bus number', 'From date', 'to date', 'Cost', 'Reading', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private partTypeMaintanceService: PartTypeMaintanceService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPartTypeMaintance();
    this.partTypeMaintanceService.getPartTypeCombo().then(res => res.json())
    .then(json => {
    })
  }

  getPartTypeMaintance() {
    this.partTypeMaintanceService.getPartTypes()
      .then(res => res.json())
      .then(json => {
        this.partTypeMaintances = json.data;
        this.dataSource.data = [...this.partTypeMaintances]
      })
  }

  editPartTypeMaintance(partTypeData: any): void {
    const dialogRef = this.dialog.open(EditPartTypeMaintanceComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { partTypeData: partTypeData },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartTypeMaintance();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addPartTypeMaintance(): void {
    const dialogRef = this.dialog.open(EditPartTypeMaintanceComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { taxType: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartTypeMaintance();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deletePartTypeMaintance(taxTypeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletePartTypeMaintanceComponent, {
      width: '25rem',
      data: { 
        id: taxTypeId
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartTypeMaintance();
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
