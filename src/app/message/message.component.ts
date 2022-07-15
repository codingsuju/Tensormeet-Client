import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { Message } from '../model/message';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  username:String="user";
  receiver:String="user";
  messages:Message[]=[];
  text:String="";
  constructor(private route:ActivatedRoute,private messageService:MessageService,private router:Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(paramsObject=>{
      this.username=paramsObject['username'];
      this.receiver=paramsObject['receiver'];
    });
    this.getMessages();
  }
  getMessages():void{
    this.messageService.getMessages(this.username,this.receiver).subscribe((response)=>{
      this.messages=response;
    });
  }
  sendMessage(){
    this.messageService.sendMessage(this.text,this.receiver).subscribe((response)=>{
      this.text='';
      this.ngOnInit();
    });
  }
  viewProfile(username:String){
    this.router.navigate([username,'profile']);
  }
}
