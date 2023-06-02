import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartTypeService } from 'src/app/services/part-type.service';
import { VehicalService } from 'src/app/services/vehical.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
              public partTypeService: PartTypeService,
              public vehicalService: VehicalService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose(confirm:boolean){
    if(confirm){
      switch(this.data.type){
        case 'partType':
          delete this.data.type;
          this.partTypeService.deletePartTypeMaster(this.data).then(result => result.json()).then(res => this.dialogRef.close(res))
          break;
        case 'vehical':
          delete this.data.type;
          this.vehicalService.deleteVehical(this.data).then(result => result.json()).then(res => this.dialogRef.close(res))
          break;
        default:
          this.vehicalService.deleteVehical(this.data).then(result => result.json()).then(res => this.dialogRef.close(res))
      }
      
    }else{
      this.dialogRef.close(confirm)
    }
  }
}
