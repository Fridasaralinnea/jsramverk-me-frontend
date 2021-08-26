import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})

export class ReportComponent implements OnInit {

    // router: Router;
    kmom: any;
    isLoggedIn: boolean;
    // validToken: boolean;
    // token: any;
    //
    // token = localStorage.getItem('jwt_token');
    //
    // if (token) {
    //     this.validToken = true;
    // }

    readonly ROOT_URL = "http://localhost:1337/reports/week/";
    // readonly ROOT_URL = this.router.url;
    // this.validToken = JSON.parse(localStorage.getItem('jwt_token'));

    constructor(
        private http: HttpClient,
        private router: Router,
        private accountService: LoginService) {
        this.http.get(this.ROOT_URL + this.router.url.split('/').pop()).toPromise().then(data => {
            console.log(data);
            this.kmom = data;
        });
    }

    ngOnInit(): void {
    }

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }
}
