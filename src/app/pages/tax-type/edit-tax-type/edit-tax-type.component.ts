import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxTypeService } from '../tax-type.service';

@Component({
  selector: 'app-edit-tax-type',
  templateUrl: './edit-tax-type.component.html',
  styleUrls: ['./edit-tax-type.component.scss']
})
export class EditTaxTypeComponent implements OnInit {

  taxTypeDetails: any = null;
  taxTypes: [] = [];
  selected = '';
  title = 'Add tax type';
  editTaxType: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public taxTypeService: TaxTypeService,
                public dialogRef: MatDialogRef<EditTaxTypeComponent>,
                @Inject(MAT_DIALOG_DATA) public taxType: any) { }
 
  ngOnInit(): void {
    this.taxTypeService.getTaxTypeCombo().then(res => res.json())
    .then(json => {
      this.taxTypes = json.data;
      this.taxType.taxType ? this.selected = this.taxTypes.filter(type => type['tax_type'] === this.taxTypeDetails.tax_type)[0]['id'] : '';
      this.editTaxType.controls['tax_type_id'].setValue(this.selected);
    })
    if(this.taxType.taxType){
      this.taxTypeDetails = this.taxType.taxType;
      if(this.taxTypeDetails.id)
       this.title = 'Edit tax type';
    }
    this.editTaxType = this.formBuilder.group({
      id: [this.taxTypeDetails?.id],
      tax_type_id: [this.selected, [Validators.required]],
      tax_type_validity: [this.taxTypeDetails?.tax_type_validity, [Validators.required]],
      tax_cost: [this.taxTypeDetails?.tax_cost, [Validators.required]],
      tax_type_status: [this.taxTypeDetails?.tax_type_status, [Validators.required]]
    });
  }

  onSubmit(){
    if(this.editTaxType && this.editTaxType?.controls['id']?.value){
      this.taxTypeService.editTaxType(this.editTaxType.value).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editTaxType.value}
      delete data.id;
      data.createdBy = 1;
      this.taxTypeService.addTaxType(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
