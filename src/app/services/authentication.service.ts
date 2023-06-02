import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isValid = new BehaviorSubject(sessionStorage.getItem('userId') ? true : false);
  constructor() { }

  authenticate() {
    this.isValid.next(true);
  }
}
