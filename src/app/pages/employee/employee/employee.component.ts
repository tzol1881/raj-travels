import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: [] = [];
  displayedColumns: string[] = ['Number', 'Name', 'Address', 'Type', 'Subtype', 'Gender', 'Status', 'State', 'City', 'Country', 'EmailId','Cost', 'Start date', 'Phone no.', 'Alternate no.', 'Remarks', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.employeeService.getEmployeeList()
      .then(res => res.json())
      .then(json => {
        this.employees = json.data;
        this.dataSource.data = [...this.employees]
      })
  }

  viewPartType(employee: any): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '50rem',
      data: { employee: employee },
    });
  }

  editVehical(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { employee: employee },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      panelClass: 'custom-dialog-container',
      width: '50rem',
      data: { employee: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
        this.snackBar.open(result.message,'X')
      }
  });
  }

  deleteVehical(employeeId: number): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '25rem',
      data: { 
        id: employeeId,
        type: 'employee'
       },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
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
