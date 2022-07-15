import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { Post } from '../model/post';
import { AppService } from '../service/app.service';
import { NewsfeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  username:any;
  posts:Post[]=[];
  text:String='';
  constructor(private route:ActivatedRoute,private newsFeedService:NewsfeedService,private app:AppService,private router:Router) { 
    this.route.params.subscribe(
      paramsObject => {
          this.username = paramsObject['username'];
    });
  }

  ngOnInit(): void {
    this.getPosts();    
  }
  getPosts(){
    this.newsFeedService.getPosts().subscribe((response)=>{
      this.posts=response;
    });
  }
  createPost(){
    this.newsFeedService.createPost(this.text).subscribe((response:Post)=>{
      this.text='';
      this.ngOnInit();
    });
  }
  viewProfile(username:String){
    this.router.navigate([username,'profile']);
  }

}
