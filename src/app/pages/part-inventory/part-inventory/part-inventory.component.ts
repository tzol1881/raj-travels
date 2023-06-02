import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartTypeMaintanceService } from 'src/app/services/part-type-maintance.service';
import { EditPartInventoryComponent } from '../edit-part-inventory/edit-part-inventory.component';
import { DeletePartInventoryComponent } from '../delete-part-inventory/delete-part-inventory.component';
import { PartInventoryService } from 'src/app/services/part-inventory.service';

@Component({
  selector: 'app-part-inventory',
  templateUrl: './part-inventory.component.html',
  styleUrls: ['./part-inventory.component.scss']
})
export class PartInventoryComponent implements OnInit {

  partTypeMaintances: [] = [];
  displayedColumns: string[] = ['Part type', 'Quantity', 'Cost', 'Expiry date', 'Issued date', 'Purchase date', 'Invoice no', 'Manufacturer', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private partInventoryService: PartInventoryService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPartInventories();
    this.partInventoryService.getPartTypeCombo().then(res => res.json())
    .then(json => {
      console.log(json)
    })
  }

  getPartInventories() {
    this.partInventoryService.getPartInventories()
      .then(res => res.json())
      .then(json => {
        this.partTypeMaintances = json.data;
        this.dataSource.data = [...this.partTypeMaintances]
      })
  }

  editPartInventory(partInventoryData: any): void {
    const dialogRef = this.dialog.open(EditPartInventoryComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { partInventoryData: partInventoryData },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartInventories();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addPartInventory(): void {
    const dialogRef = this.dialog.open(EditPartInventoryComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { taxType: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartInventories();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deletePartInventory(taxTypeId: number): void {
    const dialogRef = this.dialog.open(DeletePartInventoryComponent, {
      width: '25rem',
      data: { 
        id: taxTypeId
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartInventories();
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
