import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    readonly ROOT_URL = "https://me-api.fridasaralinnea.me/";

    homeData: any;

    constructor(private http: HttpClient) {
        this.http.get(this.ROOT_URL).toPromise().then(data => {
            this.homeData = data;
        });
    }

    ngOnInit(): void {
    }
}
