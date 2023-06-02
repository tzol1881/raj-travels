import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartTypeService } from 'src/app/services/part-type.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PartTypeMaintanceService } from 'src/app/services/part-type-maintance.service';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = new Date(control.get('part_type_fixing_date')?.value);
  const end = new Date(control.get('part_type_expiry_date')?.value);
  return start !== null && end !== null && start < end
  ? null :{ dateValid:true };
}
  
@Component({
  selector: 'app-edit-part-type-maintance',
  templateUrl: './edit-part-type-maintance.component.html',
  styleUrls: ['./edit-part-type-maintance.component.scss']
})
export class EditPartTypeMaintanceComponent implements OnInit {
  partTypeDetails: any = null;
  partTypes: [] = [];
  registrationNumbers: [] = [];
  selectedRegNo = '';
  selectedPartType = '';
  title = 'Add part data';
  editPartTypeData: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public partTypeMaintanceService: PartTypeMaintanceService,
                public dialogRef: MatDialogRef<EditPartTypeMaintanceComponent>,
                @Inject(MAT_DIALOG_DATA) public partTypeData: any) { }

  
  ngOnInit(): void {
    this.partTypeMaintanceService.getVehicleReg().then(res => res.json())
    .then(json => {
      this.registrationNumbers = json.data;
      this.partTypeData.partTypeData ? this.selectedRegNo = this.registrationNumbers.filter(bus_reg_no => bus_reg_no['Reg_no'] === this.partTypeDetails.reg_no)[0]['Reg_no'] :  this.selectedRegNo = '';
      this.editPartTypeData.controls['reg_no'].setValue(this.selectedRegNo);
    })

    this.partTypeMaintanceService.getPartTypeCombo().then(res => res.json())
    .then(json => {
      this.partTypes = json.data;
      this.partTypeData.partTypeData ? this.selectedPartType = this.partTypes.filter(partType => partType['id'] === this.partTypeDetails.part_type_id)[0]['id'] : this.selectedPartType = '';
      this.editPartTypeData.controls['part_type_master_id'].setValue(this.selectedPartType);
    })

    if(this.partTypeData.partTypeData){
      this.partTypeDetails = this.partTypeData.partTypeData;
      if(this.partTypeData.id)
       this.title = 'Edit part data';
    }
    this.editPartTypeData = this.formBuilder.group({
      id: [this.partTypeDetails?.id],
      reg_no: [this.selectedRegNo, [Validators.required]],
      part_type_master_id: [this.partTypeDetails?.part_type_master_id, [Validators.required]],
      part_type_amount: [this.partTypeDetails?.part_type_amount, [Validators.required]],
      part_type_fixing_date: [this.partTypeDetails?.part_type_fixing_date, [Validators.required]],
      part_type_expiry_date: [this.partTypeDetails?.part_type_expiry_date, [Validators.required]],
      vehicle_meter_reading: [this.partTypeDetails?.vehicle_meter_reading, [Validators.required]]
    },{validators:dateValidator});
  }

  onSubmit(){
    if(this.editPartTypeData && this.editPartTypeData?.controls['id']?.value){
      let data = this.getFormmattedData();
      this.partTypeMaintanceService.editPartTypeMaintance(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = this.getFormmattedData();
      delete data.id;
      data.createdBy = 1;
      this.partTypeMaintanceService.addPartTypeMaintance(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  getFormmattedData(){
    let data = {...this.editPartTypeData.value}
    data.part_type_fixing_date = this.getFormmattedDate(data.part_type_fixing_date);
    data.part_type_expiry_date = this.getFormmattedDate(data.part_type_expiry_date);
    return data
  }

  getFormmattedDate(date: any){
    let startDateData = new Date(date);
    return `${startDateData.getFullYear()}-${startDateData.getMonth() + 1}-${startDateData.getDate()}`;
  }

  onCancel(){
    this.dialogRef.close();
  }
}
