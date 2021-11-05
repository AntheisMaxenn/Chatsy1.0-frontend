import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  userRequest: BehaviorSubject<string> = new BehaviorSubject<string>("");
  online: Subject<[]> = new Subject<[]>();
  messages: Subject<{}> = new Subject<{}>();
  socket;
  
  constructor() { }
  
  setupSocketConnection() {
    console.log("setupSocketConnection value: ")
    this.userRequest.subscribe(console.log);
    this.socket = io("https://chatsy-backend-gfhrd33ruq-uc.a.run.app/", {
      extraHeaders: {
        userRequest: this.userRequest.value
      }
    });
    this.messages['me'] = {convo: [{"to": "init", "msg": 'init'}], newMsg: false};
    this.socket.emit('my message', 'Hello there from Angular.');
    
    this.socket.on('connect', () => {
      console.log("Connection sucessful.");
    });
    
    this.socket.on('online', (data) => {
      this.online.next(data)
      console.log(data)
      console.log("Online Event.");
    });
    
    this.socket.on('message', (data) => {

      if(this.messages[data.with] == null){
        console.log("The true statement")

        this.messages[data.with] = {convo: [{"to": data.to, "msg": data.msg}], newMsg: true}; 

        console.log("From true if: " + this.messages);

        this.messages.next(this.messages)
      }else{
        console.log("The else statement")
        this.messages[data.with].convo.push({"to": data.to, "msg": data.msg})
        this.messages[data.with].newMsg = true;
        this.messages.next(this.messages)
        console.log(this.messages[data.with]['convo'].slice(-1))

      }
    });

    
    this.socket.on('connect_error', (reason) => {
      console.log("there was a connection error: " + reason);
      this.socket.disconnect()
    });

    this.socket.on('disconnect', () => {
      console.log("You have been disconnectd. ");
      this.socket.disconnect()
    });

  }

  sendMessage(msg: string, to: string){
    this.socket.emit("message", {msg: msg, to: to})
  }



  
}
