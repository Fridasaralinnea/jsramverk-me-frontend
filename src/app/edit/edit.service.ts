import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    onReportUpdateEvent = new EventEmitter();

    ROOT_URL = "https://me-api.fridasaralinnea.me/reports/edit";

    edit(kmom: string, info: string) {
        console.log("edit kmom: ", kmom, " report: ", info);
        return this.http.post(this.ROOT_URL, {kmom: kmom, info: info});
    }
}
