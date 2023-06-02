import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxDataService } from '../tax-data.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = new Date(control.get('tax_type_submission_start_date')?.value);
  const end = new Date(control.get('tax_type_submission_end_date')?.value);
  return start !== null && end !== null && start < end
  ? null :{ dateValid:true };
}
@Component({
  selector: 'app-edit-tax-data',
  templateUrl: './edit-tax-data.component.html',
  styleUrls: ['./edit-tax-data.component.scss']
})
export class EditTaxDataComponent implements OnInit {
  taxDataDetails: any = null;
  taxTypes: [] = [];
  registrationNumbers: [] = [];
  selectedRegNo = '';
  selectedType = '';
  title = 'Add tax data';
  editTaxData: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public taxDataService: TaxDataService,
                public dialogRef: MatDialogRef<EditTaxDataComponent>,
                @Inject(MAT_DIALOG_DATA) public taxData: any) { }

  
  ngOnInit(): void {
    this.taxDataService.getVehicleReg().then(res => res.json())
    .then(json => {
      this.registrationNumbers = json.data;
      this.taxData.taxData ? this.selectedRegNo = this.registrationNumbers.filter(bus_reg_no => bus_reg_no['Reg_no'] === this.taxDataDetails.reg_no)[0]['Reg_no'] : '';
      this.editTaxData.controls['reg_no'].setValue(this.selectedRegNo);
    })

    this.taxDataService.getTaxTypeCombo().then(res => res.json())
    .then(json => {
      this.taxTypes = json.data;
      this.taxData.taxData ? this.selectedType = this.taxTypes.filter(taxType => taxType['id'] === this.taxDataDetails.tax_type_id)[0]['id'] : '';
      this.editTaxData.controls['tax_type_master_id'].setValue(this.selectedType);
    })

    if(this.taxData.taxData){
      this.taxDataDetails = this.taxData.taxData;
      if(this.taxData.id)
       this.title = 'Edit tax data';
    }
    this.editTaxData = this.formBuilder.group({
      id: [this.taxDataDetails?.id],
      reg_no: [this.selectedRegNo, [Validators.required]],
      tax_type_master_id: [this.taxDataDetails?.tax_type_master_id, [Validators.required]],
      tax_type_amount: [this.taxDataDetails?.tax_type_amount, [Validators.required]],
      tax_type_submission_end_date: [this.taxDataDetails?.tax_type_submission_end_date, [Validators.required]],
      tax_type_submission_start_date: [this.taxDataDetails?.tax_type_submission_start_date, [Validators.required]],
      tax_type_validity: [this.taxDataDetails?.tax_type_validity, [Validators.required]],
      vehicle_meter_reading: [this.taxDataDetails?.vehicle_meter_reading, [Validators.required]]
    },{validators:dateValidator});
  }

  onSubmit(){
    if(this.editTaxData && this.editTaxData?.controls['id']?.value){
      let data = {...this.editTaxData.value}
      let startDateData = new Date(data.tax_type_submission_start_date);debugger
      data.tax_type_submission_start_date = `${startDateData.getFullYear()}-${startDateData.getMonth() + 1}-${startDateData.getDate()}`;
      let endDateData = new Date(data.tax_type_submission_end_date);
      data.tax_type_submission_end_date = `${endDateData.getFullYear()}-${endDateData.getMonth() + 1}-${endDateData.getDate()}`;
      this.taxDataService.editTaxData(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editTaxData.value}
      delete data.id;
      data.createdBy = 1;
      let startDateData = new Date(data.tax_type_submission_start_date);
      data.tax_type_submission_start_date = `${startDateData.getFullYear()}-${startDateData.getMonth()}-${startDateData.getDate()}`;
      let endDateData = new Date(data.tax_type_submission_end_date);
      data.tax_type_submission_end_date = `${endDateData.getFullYear()}-${endDateData.getMonth()}-${endDateData.getDate()}`;
      this.taxDataService.addTaxData(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
