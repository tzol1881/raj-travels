import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from './endPoint';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  port = apiEndPoint
  getDashboard(){
    return  fetch(`${this.port}/getDashboared`,{
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
