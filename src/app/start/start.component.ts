import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private ws: ChatService) { }

  form: FormGroup;
  userStatus: BehaviorSubject<string> = this.ws.userRequest;

  ngOnInit(): void {

    // this.userStatus.subscribe()

    this.form = this.fb.group({
  
      alias: ['', [
        Validators.required,
        Validators.minLength(1),
        this.noWhitespace
      ]]
    });
    
    this.navToChat();
    
  }


  // TODO: Access chat service and state of isUser;
  
  get alias() {
    return this.form.get('alias');
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  } 
    
    
  onSubmit(){
    this.ws.userRequest.next(this.form.controls['alias'].value.toString());
    this.ws.setupSocketConnection();
    this.navToChat()
  }

  navToChat(){
    if(this.userStatus.value !== "" ){
      console.log(this.userStatus)
      // returns '[object object]'
      console.log("user status changed.")
      console.log("this.userStatus.toString() : " + this.userStatus)
      this.router.navigate(['/chat'])
    }else{
      console.log("No User.")
    }
  }
}
