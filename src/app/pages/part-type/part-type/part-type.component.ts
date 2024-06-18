import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartTypeService } from 'src/app/services/part-type.service';
import { EditPartTypeComponent } from './../edit-part-type/edit-part-type.component';

@Component({
  selector: 'app-part-type',
  templateUrl: './part-type.component.html',
  styleUrls: ['./part-type.component.scss']
})
export class PartTypeComponent implements OnInit {
  partTypes: [] = [];
  displayedColumns: string[] = ['Type', 'Cost', 'Quantity', 'Quantity type', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private partTypeService: PartTypeService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPartType()
  }

  getPartType() {
    this.partTypeService.getPartType()
      .then(res => res.json())
      .then(json => {
        this.partTypes = json.data;
        this.dataSource.data = [...this.partTypes]
      })
  }

  editPartType(partType: any): void {
    const dialogRef = this.dialog.open(EditPartTypeComponent, {
      width: '50rem',
      data: { partType: partType },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartType();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addPartType(): void {
    const dialogRef = this.dialog.open(EditPartTypeComponent, {
      width: '50rem',
      data: { partType: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartType();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deletePartType(partTypeId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '25rem',
      data: { 
        id: partTypeId,
        type: 'partType'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartType();
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
