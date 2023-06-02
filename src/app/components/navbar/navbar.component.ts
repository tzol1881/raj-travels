import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, public router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('userRole', '');
    this.authenticationService.isValid.next(false)
    this.router.navigate(['']);
  }
}
