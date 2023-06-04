import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxDataService {

  constructor() { }
  port = 'https://www.icoy.co.in/transport/api'
  getTaxData(){
    return  fetch(`${this.port}/getTaxDateList`,{
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
    return  fetch(`${this.port}/getVehicleReg`,{
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
    return  fetch(`${this.port}/addTaxDate`,{
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
    return  fetch(`${this.port}/editTaxDate`,{
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
    return  fetch(`${this.port}/deleteTaxDate`,{
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
    return  fetch(`${this.port}/getuniqueTaxtype`,{
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
    return  fetch(`${this.port}/getTaxTypeCombo`,{
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
