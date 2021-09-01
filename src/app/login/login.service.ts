import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import moment from 'moment';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    ROOT_URL = "https://me-api.fridasaralinnea.me/login";

    login(email: string, password: string) {
        console.log("login with email: ", email, " and password: ", password);
        return this.http.post(this.ROOT_URL, {email: email, password: password})
            .pipe(map(res => this.setSession(res)),
            shareReplay());
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        console.log("Succesfully logged out");
        this.router.navigate(['/login']);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
