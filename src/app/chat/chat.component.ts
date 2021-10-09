import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private ws: ChatService, private router: Router) { }

  userStatus: BehaviorSubject<string> = this.ws.userRequest;
  online: Subject<[]> = this.ws.online;
  messages: Subject<{}> = this.ws.messages;
  message = '';

  selectedUser: string = '';

  currentUser = this.ws.userRequest

  ngOnInit(): void {

    console.log("this.userStatus.value: " + this.userStatus.value)

    if(this.userStatus.value == ''){
      console.log("If is true.")
      this.router.navigate(['/start'])
    }

    if(this.selectedUser == null){
      console.log(" Condition true;");
      console.log(this.selectedUser);
    }
  }

  chatWith(select: string){
    this.selectedUser = select;
    console.log("The selectedUser is: " + this.selectedUser)
  }

  sendMessage(){
    this.ws.sendMessage(this.message, this.selectedUser);
    this.message = '';
  }

  hasUnread(user){
    console.log("isDefinedYet triggered")
    if(this.messages.hasOwnProperty(user)){
      
      if(this.messages[user].newMsg !== false){
        return true;
      }else{
        return false
      }
    }else{
      console.log("isDefinedYet return false: ")
      return false
    }
  }

}
