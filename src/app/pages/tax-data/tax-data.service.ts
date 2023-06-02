import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxDataService {

  constructor() { }

  getTaxData(){
    return  fetch('http://127.0.0.1:8000/api/getTaxDateList',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    })
  }

  getVehicleReg(){
    return  fetch('http://127.0.0.1:8000/api/getVehicleReg ',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    })
  }

  addTaxData(data: any){
    return  fetch('http://127.0.0.1:8000/api/addTaxDate',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
  }

  editTaxData(data: any){
    return  fetch('http://127.0.0.1:8000/api/editTaxDate',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
  }

  deleteTaxData(data: any){
    return  fetch('http://127.0.0.1:8000/api/deleteTaxDate',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
  }

  getuniqueTaxtype(){
    return  fetch('http://127.0.0.1:8000/api/getuniqueTaxtype',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    })
  }

  getTaxTypeCombo(){
    return  fetch('http://127.0.0.1:8000/api/getTaxTypeCombo',{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    })
  }
}
