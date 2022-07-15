import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import { AppService } from '../service/app.service';
import { GlobalService} from '../service/global.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  users:User[]=[];
  profiles:Profile[]=[];
  constructor(public global:GlobalService,private router:Router,private profileService:ProfileService,private app:AppService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers():void{
    this.global.getUsers().subscribe((response:any)=>{
      this.users=response;
      for(var user of this.users){
        this.profileService.getProfile(user.username).subscribe((response)=>{
          this.profiles.push(response);
        });
      }
    });
  }
  viewProfile(username:String){
    this.router.navigate([username,'profile']);
  }
  sendMessage(receiver:String){
    this.router.navigate([this.app.user.getValue().username,'message',{receiver:receiver}])
  }
}
