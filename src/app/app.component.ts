import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username:any=null;
  isAuthenticated=false;
  headers:any=null;
  loginView=true;
  title = 'client';
  constructor(private router:Router,private appService:AppService){
  }
  login(){
    this.router.navigate(['login']);
  }
  register(){
    this.router.navigate(['register']);
  }
  home(){
     this.router.navigate([this.username,'home']);
  }
  friends(){
    this.router.navigate([this.username,'friends']);
  }
  chats(){
    this.router.navigate([this.username,'chats']);
  }
  profile(){
    this.router.navigateByUrl('/refresh',{skipLocationChange:true}).then(()=>{
      this.router.navigate([this.username,'profile']);
    });
  }
  global(){
    this.router.navigate([this.username,'search']);
  }
  logout(){
    this.appService.logout();
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
      this.appService.getUser().subscribe((user)=>{
        this.username=user.username;
        this.isAuthenticated=user.isAuthenticated;
        this.headers=user.headers;
        if(this.isAuthenticated===true){
          this.router.navigate([this.username,'home']);
        }
        else {
          this.router.navigate(['login']);
        }
      });
  }
}
