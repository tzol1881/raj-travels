import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartTypeService } from 'src/app/services/part-type.service';

@Component({
  selector: 'app-edit-part-type',
  templateUrl: './edit-part-type.component.html',
  styleUrls: ['./edit-part-type.component.scss']
})
export class EditPartTypeComponent implements OnInit {
  partTypeDetails: any = null;
  partTypes: [] = [];
  selected = '';
  title = 'Add part type';
  quantityTypes = ['Pcs', 'Litre', 'Kg'];
  editPartType: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public partTypeService: PartTypeService,
                public dialogRef: MatDialogRef<EditPartTypeComponent>,
                @Inject(MAT_DIALOG_DATA) public partType: any) { }

  ngOnInit(): void {
    this.partTypeService.getPartTypeCombo().then(res => res.json())
    .then(json => {
      this.partTypes = json.data;
      this.partType.partType ? this.selected = this.partTypes.filter(type => type['part_type'] === this.partTypeDetails.part_type)[0]['id'] : '';
      this.editPartType.controls['part_type_id'].setValue(this.selected);
    })
    if(this.partType.partType){
      this.partTypeDetails = this.partType.partType;
      if(this.partTypeDetails.id)
       this.title = 'Edit part type';
    }
    this.editPartType = this.formBuilder.group({
      id: [this.partTypeDetails?.id],
      part_type_id: [this.selected, [Validators.required]],
      part_Cost: [this.partTypeDetails?.part_Cost, [Validators.required]],
      part_type_qty: [this.partTypeDetails?.part_type_qty, [Validators.required]],
      part_type_unit: [this.partTypeDetails?.part_type_unit, [Validators.required]]
    });
  }

  onSubmit(){
    if(this.editPartType && this.editPartType?.controls['id']?.value){
      this.partTypeService.editPartType(this.editPartType.value).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editPartType.value}
      delete data.id;
      data.createdBy = 1;
      this.partTypeService.addPartType(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
