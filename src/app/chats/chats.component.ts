import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Username } from '../model/username';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  username:String="user";
  receivers:Username[]=[];
  constructor(private route:ActivatedRoute,private router:Router,private messageService:MessageService) { 
  }
  viewMessage(receiver:String){
     this.router.navigate([this.username,'message',{receiver:receiver}])
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      paramsObject => {
          this.username = paramsObject['username'];
    });
    this.getChats();
  }
  getChats():void{
    this.messageService.getChats(this.username).subscribe((response)=>{
      this.receivers=response;
    });
  }
  viewProfile(username:String){
    this.router.navigate([username,'profile']);
  }

}
