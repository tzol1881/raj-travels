import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartTypeMaintanceService } from 'src/app/services/part-type-maintance.service';

@Component({
  selector: 'app-confirm-delete-part-type-maintance',
  templateUrl: './confirm-delete-part-type-maintance.component.html',
  styleUrls: ['./confirm-delete-part-type-maintance.component.scss']
})
export class ConfirmDeletePartTypeMaintanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeletePartTypeMaintanceComponent>,
    public partTypeMaintanceService: PartTypeMaintanceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm: boolean) {
    if (confirm) {;
      this.partTypeMaintanceService.deletePartTypeMaintance(this.data).then(result => result.json()).then(res => this.dialogRef.close(res));
    } else {
      this.dialogRef.close(confirm)
    }
  }

}
