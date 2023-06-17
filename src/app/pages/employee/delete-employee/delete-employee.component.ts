import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    public employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm:boolean){
    if(confirm){
          this.employeeService.deleteEmployee(this.data).then(result => result.json()).then(res => this.dialogRef.close(res))
    } else {
      this.dialogRef.close(confirm)
    }
  }
}
