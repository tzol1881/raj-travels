import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxDataService } from '../tax-data.service';

@Component({
  selector: 'app-delete-tax-data',
  templateUrl: './delete-tax-data.component.html',
  styleUrls: ['./delete-tax-data.component.scss']
})
export class DeleteTaxDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaxDataComponent>,
    public taxDataService: TaxDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm: boolean) {
    if (confirm) {;
      this.taxDataService.deleteTaxData(this.data).then(result => result.json()).then(res => this.dialogRef.close(res));
    } else {
      this.dialogRef.close(confirm)
    }
  }

}
