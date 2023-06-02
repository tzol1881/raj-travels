import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  showNavbar: boolean = false;
  constructor(private authenticationService: AuthenticationService){
  }

  ngOnInit(){
    this.authenticationService.isValid.subscribe(value => this.showNavbar = value)
  }

  menuClick() {
    this.drawer?.toggle();
    this.showNavbar = !this.showNavbar;
  }

  contentBodyClick(){
    if(this.showNavbar){
      this.drawer?.toggle();
      this.showNavbar = !this.showNavbar;
    }
  }
}
