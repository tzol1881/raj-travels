import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxTypeService } from '../tax-type.service';

@Component({
  selector: 'app-delete-tax-type',
  templateUrl: './delete-tax-type.component.html',
  styleUrls: ['./delete-tax-type.component.scss']
})
export class DeleteTaxTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaxTypeComponent>,
    public taxTypeService: TaxTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm:boolean){
    if(confirm){
          this.taxTypeService.deleteTaxTypeMaster(this.data).then(result => result.json()).then(res => this.dialogRef.close(res))
    } else {
      this.dialogRef.close(confirm)
    }
  }
}
