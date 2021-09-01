import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EditService } from './edit.service';
import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [
        EditService,
        LoginService
    ]
})

export class EditComponent implements OnInit, OnDestroy {
    @Input()
    infotext: any;

    private editSubscription: Subscription;

    submitted = false;
    kmom: any;
    isLoggedIn: boolean;

    readonly ROOT_URL = "https://me-api.fridasaralinnea.me/reports/edit/";

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private editService: EditService,
        private accountService: LoginService) {
            this.http.get(this.ROOT_URL + this.router.url.split('/').pop()).toPromise().then(data => {
                console.log(data);
                this.kmom = data;
                console.log(this.kmom);
                this.infotext = this.kmom.data.info;
                console.log("infotext: ", this.infotext);
            });
        }

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }

    ngOnInit(): void {
        this.infotext = this.kmom.info;
        console.log(this.infotext);
        this.editSubscription = this.editService.onReportUpdateEvent.subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['reports', 'week', response]);
            }
        );
    }

    saveReport() {
        this.submitted = true;
        console.log("new info: ", this.infotext);

        if (!this.isLoggedIn) {
            return alert("Error, valid user needed to edit.");
        }

        this.editService.edit(this.kmom.data.kmom, this.infotext)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Edit succesfull");
                    this.router.navigate(['/reports/week/1'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                },
                error: error => {
                    alert("Edit not succesfull.");
                }
            });
    }

    ngOnDestroy() {
        // this.editSubscription.unsubscribe();
    }
}
