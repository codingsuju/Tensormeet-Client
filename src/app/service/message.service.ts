import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../model/message';
import { Username } from '../model/username';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient,private app:AppService) { }
  getChats(username:any):Observable<Username[]>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Username[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/chats',{headers:headers});
  }
  getMessages(sender:String,receiver:String):Observable<Message[]>{
    const headers=this.app.user.getValue().headers;
    var message=new Message();
    message.receiver=receiver;
    return this.http.post<Message[]>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/messages',message,{headers:headers});
  }
  sendMessage(text:String,receiver:String){
    const headers=this.app.user.getValue().headers;
    const message=new Message();
    message.receiver=receiver;
    message.text=text;
    return this.http.post<Message>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/message',message,{headers:headers});
  }
}
