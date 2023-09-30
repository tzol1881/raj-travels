import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehical-details',
  templateUrl: './vehical-details.component.html',
  styleUrls: ['./vehical-details.component.scss']
})
export class VehicalDetailsComponent implements OnInit {
  vehicalDetails: any = null;
  title = 'Vehical details';
  constructor(public dialogRef: MatDialogRef<VehicalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public vehical: any) { }

  ngOnInit(): void {
    if(this.vehical.vehical){
      this.vehicalDetails = this.vehical.vehical;
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
