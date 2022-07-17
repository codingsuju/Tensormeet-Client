import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from '../model/connection';
import { Profile } from '../model/profile';
import { Username } from '../model/username';
import { AppService } from '../service/app.service';
import { FriendService } from '../service/friend.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends:Username[]=[];
  profiles:Profile[]=[];
  requests:Connection[]=[];
  constructor(private app:AppService,private router:Router,private friendService:FriendService,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.getFriends();
    this.getRequests();
  }
  getFriends(){
    this.friendService.getFriends(this.app.user.getValue().username).subscribe((response)=>{
      this.friends=response;
      for(var friend of this.friends){
        this.profileService.getProfile(friend.username).subscribe((response)=>{
          this.profiles.push(response);
        });
      }
    });
  }
  viewProfile(username:String){
    this.router.navigate([username,'profile']);
  }
  removeFriend(username:String){
    this.friendService.removeFriend(username).subscribe((response)=>{
      this.router.navigateByUrl('/refresh',{skipLocationChange:true}).then(()=>{
        this.router.navigate([this.app.user.getValue().username,'friends']);
      });
    });
  }
  sendMessage(receiver:String){
    this.router.navigate([this.app.user.getValue().username,'message',{receiver:receiver}])
  }
  getRequests(){
    this.friendService.getPendingRequests().subscribe((response)=>{
      this.requests=response;
    });
  }
}
