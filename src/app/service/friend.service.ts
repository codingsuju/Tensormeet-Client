import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connection } from '../model/connection';
import { Username } from '../model/username';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http:HttpClient,private app:AppService) { }
  getFriends(username:String):Observable<Username[]>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Username[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/friends',{headers:headers});
  }
  getSentRequests():Observable<Connection[]>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Connection[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/sent_requests',{headers:headers});
  }
  getPendingRequests():Observable<Connection[]>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Connection[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/requests',{headers:headers});
  }
  addFriend(username:String):Observable<Connection>{
    const headers=this.app.user.getValue().headers;
    const body=new Connection();
    body.username2=username;
    return this.http.post<Connection>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/add',body,{headers:headers});
  } 
  acceptFriend(username:String):Observable<Connection>{
    const headers=this.app.user.getValue().headers;
    const body=new Connection();
    body.username1=username;
    return this.http.post<Connection>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/accept',body,{headers:headers});
  } 
  cancelFriend(username:String):Observable<Connection>{
    const headers=this.app.user.getValue().headers;
    const body=new Connection();
    body.username1=username;
    return this.http.post<Connection>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/cancel',body,{headers:headers});
  }
  removeFriend(username:String):Observable<Connection>{
    const headers=this.app.user.getValue().headers;
    const body=new Connection();
    body.username2=username;
    return this.http.post<Connection>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/remove',body,{headers:headers});
  }
  unsendFriend(username:String):Observable<Connection>{
    const headers=this.app.user.getValue().headers;
    const body=new Connection();
    body.username2=username;
    return this.http.post<Connection>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/unsend',body,{headers:headers});
  }
}
