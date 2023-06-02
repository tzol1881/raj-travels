import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartInventoryService } from 'src/app/services/part-inventory.service';

@Component({
  selector: 'app-delete-part-inventory',
  templateUrl: './delete-part-inventory.component.html',
  styleUrls: ['./delete-part-inventory.component.scss']
})
export class DeletePartInventoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePartInventoryComponent>,
    public partInventoryService: PartInventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm: boolean) {
    if (confirm) {;
      this.partInventoryService.deletePartInventory(this.data).then(result => result.json()).then(res => this.dialogRef.close(res));
    } else {
      this.dialogRef.close(confirm)
    }
  }
}
