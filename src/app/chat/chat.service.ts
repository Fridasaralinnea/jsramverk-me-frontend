import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket;
    // ROOT_URL = "https://socket-server.fridasaralinnea.me/";
    ROOT_URL = "http://localhost:8300/";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.socket = io(this.ROOT_URL);
    }

    public sendMessage(message) {
        this.socket.emit('chatMessage', message);
    }

    public messages = () => {
        return Observable.create((observer) => {
            this.socket.on('chatMessage', (message) => {
                observer.next(message);
            });
        });
    }

    // public oldMessages = () => {
    //     return Observable.create((observer) => {
    //         this.socket.on('oldMessages', (message) => {
    //             observer.next(message);
    //         });
    //     });
    // }

    // onReportUpdateEvent = new EventEmitter();


    // edit(kmom: string, info: string) {
    //     console.log("edit kmom: ", kmom, " report: ", info);
    //     return this.http.post(this.ROOT_URL, {kmom: kmom, info: info});
    // }
}
