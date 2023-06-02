import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PartTypeService } from 'src/app/services/part-type.service'


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({})
    submitted = false;
    isValidUser: boolean = true;
    showPassword: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private partTypeService: PartTypeService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    get loginFormValue() {
        return this.loginForm.value;
    }

    onSubmit() {
        if('admin' === this.loginFormValue.username && '123' === this.loginFormValue.password){
            sessionStorage.setItem('userId', 'admin');
            this.authenticationService.isValid.next(true);
            this.router.navigate(['/dashboard']);
        }else {
            this.isValidUser = false;
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword
    }
}
