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
    ROOT_URL = "https://socket-server.fridasaralinnea.me/";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.socket = io(this.ROOT_URL);
    }

    public sendMessage(message) {
        this.socket.emit('chat message', message);
    }

    public messages = () => {
        return Observable.create((observer) => {
            this.socket.on('chat message', (message) => {
                observer.next(message);
            });
        });
    }

    // onReportUpdateEvent = new EventEmitter();


    // edit(kmom: string, info: string) {
    //     console.log("edit kmom: ", kmom, " report: ", info);
    //     return this.http.post(this.ROOT_URL, {kmom: kmom, info: info});
    // }
}
