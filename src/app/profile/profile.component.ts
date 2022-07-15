import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from '../model/connection';
import { Profile } from '../model/profile';
import { Username } from '../model/username';
import { AppService } from '../service/app.service';
import { FriendService } from '../service/friend.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username:String="user";
  isUser=true;
  isFriend=false;
  friends:Username[]=[];
  pendingRequests:Connection[]=[];
  realUsername:String="user";
  viewType=0;
  profile:Profile;
  constructor(private route:ActivatedRoute,
    private app:AppService,
    private friendService:FriendService,
    private profileService:ProfileService,
    private router:Router) {
    this.profile=new Profile();
  }

  ngOnInit(): void {
    this.getFriends();
    this.realUsername=this.app.user.getValue().username;
    this.route.params.subscribe(paramsObject=>{
      this.username=paramsObject['username'];
    });
    this.getProfile(this.username);
    if(this.username===this.realUsername){
      console.log("Yes");
      this.isUser=true;
    }
    else{
      this.isUser=false;
    }
    this.setView();
  }
  getProfile(username:String){
    this.profileService.getProfile(username).subscribe((response)=>{
      this.profile=response;
    });
  }
  setView():void{
    if(this.isUser){
      this.viewType=1;
    }
    else{
      this.viewType=5;
      this.isUserFriend(this.username);
      this.isUserPendingRequest(this.username);
      this.alreadySent(this.username);
    }
  }
  isUserFriend(username:String){
    this.friendService.getFriends(this.app.user.getValue().username).subscribe((response)=>{
      this.friends=response;
      console.log("Hello");
      console.log(this.friends.length);
      for(let i=0;i<this.friends.length;i++){
        if(this.friends[i].username===username){
          this.viewType=2;
          this.isFriend=true;
        }
      }
    });
  }
  isUserPendingRequest(username:String){
    this.friendService.getPendingRequests().subscribe((response)=>{
      this.pendingRequests=response;
      for(let i=0;i<this.pendingRequests.length;i++){
        if(this.pendingRequests[i].username1===username){
          this.viewType=3;
        }
      }
    });
  }
  alreadySent(username:String){
    this.friendService.getSentRequests().subscribe((response)=>{
      this.pendingRequests=response;
      for(let i=0;i<this.pendingRequests.length;i++){
        if(this.pendingRequests[i].username2===username){
          this.viewType=4;
        }
      }
    });
  }
  getFriends(){
    this.friendService.getFriends(this.app.user.getValue().username).subscribe((response)=>{
      this.friends=response;
    });
  }
  editProfile(){
    this.router.navigate([this.realUsername,'profile','edit'])
  }
  removeFriend(){
    this.friendService.removeFriend(this.username).subscribe((response)=>{
      this.ngOnInit();
    });
  }
  acceptFriend(){
    this.friendService.acceptFriend(this.username).subscribe((response)=>{
      this.ngOnInit();
    });
  }
  unsendFriendRequests(){
    this.friendService.unsendFriend(this.username).subscribe((response)=>{
      this.ngOnInit();
    });
  }
  addFriend(){
    this.friendService.addFriend(this.username).subscribe((response)=>{
      this.ngOnInit();
    });
  }
  sendMessage(receiver:String){
    this.router.navigate([this.app.user.getValue().username,'message',{receiver:receiver}])
  }
}
