import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  constructor(private http:HttpClient,private app:AppService) { }
  getPosts():Observable<Post[]>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Post[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/newsfeed',{headers:headers});
  }
  createPost(text:String):Observable<Post>{
    const headers=this.app.user.getValue().headers;
    const p=new Post();
    p.status=text;
    console.log(p.status);
    return this.http.post<Post>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/post',p,{headers:headers});
  }
}
