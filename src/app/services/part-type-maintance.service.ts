import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartTypeMaintanceService {
  port = 'https://www.icoy.co.in/transport/api'
  getPartTypes(){
    return  fetch(`${this.port}/getPartDateList`,{
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

  getPartTypeCombo(){
    return  fetch(`${this.port}/getPartTypeCombo`,{
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

  addPartTypeMaintance(data: any){
    return  fetch(`${this.port}/addPartDate`,{
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

  editPartTypeMaintance(data: any){
    return  fetch(`${this.port}/editPartDate`,{
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

  deletePartTypeMaintance(data: any){
    return  fetch(`${this.port}/deletePartDate`,{
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
}
