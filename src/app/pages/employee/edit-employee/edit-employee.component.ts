import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
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
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: any = null;
  states: [] = [];
  cities: [] = [];
  selectedStatus: any = '';
  selectedType = '';
  selectedSubtype = '';
  selectedGender = '';
  selectedCountry = '';
  selectedState = '';
  selectedCity = '';
  title = 'Add employee';
  editEmployee: FormGroup = new FormGroup({})
  constructor(  private formBuilder: FormBuilder,
                public vehicalService: VehicalService,
                public employeeService: EmployeeService,
                public dialogRef: MatDialogRef<EditEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) public employee: any) { }

  ngOnInit(): void {
    if(this.employee.employee){
      this.employeeDetails = this.employee.employee;
      if(this.employeeDetails.id)
       this.title = 'Edit employee';
       this.employeeDetails.status ? this.selectedStatus = 1 : this.selectedStatus = 0;
    }
    this.editEmployee = this.formBuilder.group({
      id: [this.employeeDetails?.id],
      employee_number: [this.employeeDetails?.employee_number, [Validators.required, ValidateMaxLength(40)]],
      employee_name: [this.employeeDetails?.employee_name, [Validators.required, ValidateMaxLength(150)]],
      employee_address: [this.employeeDetails?.employee_address, [Validators.required, ValidateMaxLength(250)]],
      employee_type: [this.employeeDetails?.employee_type, [Validators.required]],
      employee_sub_type: [this.employeeDetails?.employee_sub_type, [Validators.required]],
      gender: [this.employeeDetails?.gender, [Validators.required]],
      status: [this.employeeDetails?.status, [Validators.required]],
      state_id: [this.employeeDetails?.state, [Validators.required]],
      city_id: [this.employeeDetails?.city, [Validators.required]],
      country_id: [this.employeeDetails?.country, [Validators.required]],
      email_id: [this.employeeDetails?.email_id, [Validators.required, Validators.email ,ValidateMaxLength(150)]],
      monthly_cost: [this.employeeDetails?.monthly_cost, [Validators.required]],
      employee_start_date: [this.employeeDetails?.employee_start_date, [Validators.required]],
      phone_no: [this.employeeDetails?.phone_no, [Validators.required, ValidateMaxLength(50)]],
      alt_phone_no: [this.employeeDetails?.alt_phone_no, [Validators.required, ValidateMaxLength(50)]],
      remarks: [this.employeeDetails?.remarks, [Validators.required]],
    });
    this.vehicalService.getStateList().then(res => res.json())
    .then(json => {
      this.states = json.data;
      this.employee.employee ? this.selectedState = this.states.filter(state => state['state_name'] === this.employeeDetails.state)[0]['id'] : '';
      this.editEmployee.controls['state_id'].setValue(this.selectedState);
    })

    this.vehicalService.getCityList().then(res => res.json())
    .then(json => {
      this.cities = json.data;
      this.employee.employee ? this.selectedCity = this.cities.filter(city => city['name'] === this.employeeDetails.city)[0]['id'] : '';
      this.editEmployee.controls['city_id'].setValue(this.selectedCity);
    })

    this.employee.employee && this.editEmployee.controls['country_id'].setValue('1');
    if(this.employee.employee)
      this.employeeDetails.status ? this.editEmployee.controls['status'].setValue('1') : this.editEmployee.controls['status'].setValue('0');
  }

  onSubmit(){
    if(this.editEmployee && this.editEmployee?.controls['id']?.value){
      let data = {...this.editEmployee.value}
      data.ModifiedBy = 1;
      let dateData = new Date(data.employee_start_date);
      data.employee_start_date = `${dateData.getFullYear()}-${dateData.getMonth()}-${dateData.getDate()}`;
      this.employeeService.editEmployee(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }else{
      let data = {...this.editEmployee.value}
      delete data.id;
      data.ModifiedBy = 1;
      let dateData = new Date(data.employee_start_date);
      data.employee_start_date = `${dateData.getFullYear()}-${dateData.getMonth()}-${dateData.getDate()}`;
      this.employeeService.addEmployee(data).then(result => result.json()).then(res => this.dialogRef.close(res))
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
