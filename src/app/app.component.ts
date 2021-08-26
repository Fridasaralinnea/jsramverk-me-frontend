import { Component } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { LoginService } from './login/login.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'me-frontend-angular';

    isLoggedIn: boolean;

    constructor(
        private accountService: LoginService) {}

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }
}
