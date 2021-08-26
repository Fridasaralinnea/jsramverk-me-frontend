import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Login } from "./login";
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";
import { first } from "rxjs/operators";
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    loading = false;
    isLoggedIn: boolean;
    // form: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: LoginService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Succesfully logged in with email:", this.f.email.value)
                    this.router.navigate(['/'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
                },
                error: error => {
                    alert("Wrong password or email!");
                    this.loading = false;
                }
            });
    }

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }
}
