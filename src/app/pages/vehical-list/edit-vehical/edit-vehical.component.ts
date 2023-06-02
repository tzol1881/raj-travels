import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicalService } from 'src/app/services/vehical.service';

export function ValidateMaxLength(max:number): ValidatorFn {
  return (control: AbstractControl) => {
    if(String(control.value)?.length > max){
      return {
         inValidLength: true
      };
    }
    return null;
  };
};

@Component({
  selector: 'app-edit-vehical',
  templateUrl: './edit-vehical.component.html',
  styleUrls: ['./edit-vehical.component.scss']
})
export class EditVehicalComponent implements OnInit {
  vehicalDetails: any = null;
  states: [] = [];
  cities: [] = [];
  selectedState = '';
  selectedCity = '';
  selectedFuel = '';
  title = 'Add vehical';
  editVehical: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public vehicalService: VehicalService,
                public dialogRef: MatDialogRef<EditVehicalComponent>,
                @Inject(MAT_DIALOG_DATA) public vehical: any) { }

  ngOnInit(): void {
    if(this.vehical.vehical){
      this.vehicalDetails = this.vehical.vehical;
      if(this.vehicalDetails.id)
       this.title = 'Edit vehical';
    }
    this.editVehical = this.formBuilder.group({
      id: [this.vehicalDetails?.id],
      Reg_no: [this.vehicalDetails?.Reg_no, [Validators.required, ValidateMaxLength(10)]],
      Reg_date: [this.vehicalDetails?.Reg_date, [Validators.required]],
      Veh_Owner_Name: [this.vehicalDetails?.Veh_Owner_Name, [Validators.required, ValidateMaxLength(100)]],
      Veh_Owner_Address: [this.vehicalDetails?.Veh_Owner_Address, [Validators.required, ValidateMaxLength(100)]],
      Veh_Chassis_No: [this.vehicalDetails?.Veh_Chassis_No, [Validators.required, ValidateMaxLength(18)]],
      Veh_Engine_No: [this.vehicalDetails?.Veh_Engine_No, [Validators.required, ValidateMaxLength(12)]],
      Veh_Class: [this.vehicalDetails?.Veh_Class, [Validators.required, ValidateMaxLength(18)]],
      Veh_Maker_Name: [this.vehicalDetails?.Veh_Maker_Name, [Validators.required, ValidateMaxLength(25)]],
      Veh_Seating_Cap: [this.vehicalDetails?.Veh_Seating_Cap, [Validators.required, ValidateMaxLength(11)]],
      Veh_Color: [this.vehicalDetails?.Veh_Color, [Validators.required, ValidateMaxLength(25)]],
      Veh_horse_Power: [this.vehicalDetails?.Veh_horse_Power, [Validators.required, ValidateMaxLength(25)]],
      Veh_Fuel_Type: [this.vehicalDetails?.Veh_Fuel_Type, [Validators.required, ValidateMaxLength(25)]],
      Veh_Reg_City_ID: [this.vehicalDetails?.Veh_Reg_City_ID, [Validators.required, ValidateMaxLength(11)]],
      Veh_Reg_State_ID: [this.vehicalDetails?.Veh_Reg_State_ID, [Validators.required, ValidateMaxLength(11)]],
    });
    this.vehicalService.getStateList().then(res => res.json())
    .then(json => {
      this.states = json.data;
      this.vehical.vehical ? this.selectedState = this.states.filter(state => state['state_name'] === this.vehicalDetails.Veh_Reg_State_ID)[0]['id'] : '';
      this.editVehical.controls['Veh_Reg_State_ID'].setValue(this.selectedState);
    })

    this.vehicalService.getCityList().then(res => res.json())
    .then(json => {
      this.cities = json.data;
      this.vehical.vehical ? this.selectedCity = this.cities.filter(city => city['name'] === this.vehicalDetails.Veh_Reg_City_ID)[0]['id'] : '';
      console.log(this.selectedCity)
      this.editVehical.controls['Veh_Reg_City_ID'].setValue(this.selectedCity);
    })
  }

  onSubmit(){
    if(this.editVehical && this.editVehical?.controls['id']?.value){
      let data = {...this.editVehical.value}
      data.ModifiedBy = 1;
      let dateData = new Date(data.Reg_date);
      data.Reg_date = `${dateData.getFullYear()}-${dateData.getMonth()}-${dateData.getDate()}`;
      this.vehicalService.editVehical(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editVehical.value}
      delete data.id;
      data.ModifiedBy = 1;
      let dateData = new Date(data.Reg_date);
      data.Reg_date = `${dateData.getFullYear()}-${dateData.getMonth()}-${dateData.getDate()}`;
      this.vehicalService.addVehical(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
