import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
// import { EditService } from './edit.service';
// import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
// import * as io from 'socket.io-client';

@Component({
    selector: 'app-edit',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [
        ChatService
        // EditService,
        // LoginService
    ]
})

export class ChatComponent implements OnInit, OnDestroy {
    @Input()
    nick: string;
    message: string;

    messagesArray: string[] = [];
    userNick: string;

    // private editSubscription: Subscription;

    ROOT_URL = "https://socket-server.fridasaralinnea.me/";
    // ROOT_URL = "http://localhost:8300/";

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private chatService: ChatService) {
            this.http.get(this.ROOT_URL).toPromise().then(data => {
                console.log("------------------");
                console.log(data);
                console.log(Object.keys(data).length);
                for (let i = 0; i < Object.keys(data).length; i++) {
                    this.messagesArray.push(data[i]);
                }
            });
        }

    ngOnInit() {
        // this.chatService.oldMessages().subscribe(
        //     msg => {
        //         console.log("------------------");
        //         console.log(msg);
        //         for (let i = 0; i < msg.length; i++) {
        //             this.messagesArray.push(msg[i]);
        //         }
        //     }
        // )
        this.chatService.messages().subscribe(
            msg => {
                console.log(msg);
                this.messagesArray.push(msg);
                console.log(this.messagesArray);
            }
        )
    }

    setUserNick() {
        console.log(this.nick);
        this.userNick = this.nick;
        this.message = this.nick + " just logged in.";
        this.sendMessage();
    }

    unsetUserNick() {
        this.userNick = "";
    }

    sendMessage() {
        var today = new Date();
        var msg = {
            "message": this.message,
            "user": this.userNick,
            "time": today.getHours() + ":" + today.getMinutes()
        }
        console.log(msg);
        this.chatService.sendMessage(msg);
        this.message = "";
    }

    ngOnDestroy() {
    }
}
