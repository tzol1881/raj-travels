import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PartInventoryService } from 'src/app/services/part-inventory.service';

@Component({
  selector: 'app-edit-part-inventory',
  templateUrl: './edit-part-inventory.component.html',
  styleUrls: ['./edit-part-inventory.component.scss']
})
export class EditPartInventoryComponent implements OnInit {
  partInventoryDetails: any = null;
  partTypes: [] = [];
  registrationNumbers: [] = [];
  selectedRegNo = '';
  selectedPartType = '';
  title = 'Add inventory data';
  editPartInventoryData: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public partInventoryService: PartInventoryService,
                public dialogRef: MatDialogRef<EditPartInventoryComponent>,
                @Inject(MAT_DIALOG_DATA) public partInventoryData: any) { }

  
  ngOnInit(): void {
    this.partInventoryService.getPartTypeCombo().then(res => res.json())
    .then(json => {
      this.partTypes = json.data;
      this.partInventoryData.partInventoryData ? this.selectedPartType = this.partTypes.filter(partType => partType['id'] === this.partInventoryDetails.part_type_id)[0]['id'] : this.selectedPartType = '';
      this.editPartInventoryData.controls['part_type_id'].setValue(this.selectedPartType);
    })

    if(this.partInventoryData.partInventoryData){
      this.partInventoryDetails = this.partInventoryData.partInventoryData;
      if(this.partInventoryData.id)
       this.title = 'Edit inventory data';
    }
    this.editPartInventoryData = this.formBuilder.group({
      id: [this.partInventoryDetails?.id],
      part_type_id: [this.partInventoryDetails?.part_type_id, [Validators.required]],
      part_type_qty: [this.partInventoryDetails?.part_type_qty, [Validators.required]],
      part_cost: [this.partInventoryDetails?.part_cost, [Validators.required]],
      part_type_purchase_dt: [this.partInventoryDetails?.part_type_purchase_dt, [Validators.required]],
      part_expiry_dt: [this.partInventoryDetails?.part_expiry_dt, [Validators.required]],
      part_issued_on: [this.partInventoryDetails?.part_expiry_dt, [Validators.required]],
      part_type_invoice_nbr: [this.partInventoryDetails?.part_type_invoice_nbr, [Validators.required]],
      part_type_manufaturer	: [this.partInventoryDetails?.	part_type_manufaturer	, [Validators.required]],
    });
  }

  onSubmit(){
    if(this.editPartInventoryData && this.editPartInventoryData?.controls['id']?.value){
      let data = {...this.editPartInventoryData.value}
      let startDateData = new Date(data.part_type_purchase_dt);
      data.part_type_purchase_dt = `${startDateData.getFullYear()}-${startDateData.getMonth() + 1}-${startDateData.getDate()}`;
      let endDateData = new Date(data.part_expiry_dt);
      data.part_expiry_dt = `${endDateData.getFullYear()}-${endDateData.getMonth() + 1}-${endDateData.getDate()}`;
      let issueDateData = new Date(data.part_issued_on);
      data.part_issued_on = `${issueDateData.getFullYear()}-${issueDateData.getMonth() + 1}-${issueDateData.getDate()}`;
      this.partInventoryService.editPartInventory(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editPartInventoryData.value}
      delete data.id;
      data.createdBy = 1;
      let startDateData = new Date(data.part_type_purchase_dt);
      data.part_type_purchase_dt = `${startDateData.getFullYear()}-${startDateData.getMonth() + 1}-${startDateData.getDate()}`;
      let endDateData = new Date(data.part_expiry_dt);
      data.part_expiry_dt = `${endDateData.getFullYear()}-${endDateData.getMonth() + 1}-${endDateData.getDate()}`;
      let issueDateData = new Date(data.part_issued_on);
      data.part_issued_on = `${issueDateData.getFullYear()}-${issueDateData.getMonth() + 1}-${issueDateData.getDate()}`;
      this.partInventoryService.addPartInventory(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
