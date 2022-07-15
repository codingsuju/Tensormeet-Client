import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AppService {
  user=new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient,private router:Router) {
  }

  authenticate(username: String, password: String){
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(username + ':' + password),
      'Access-Control-Allow-Origin':'*'
  });
  this.http.get(environment.API_URL+'/user', {headers: headers}).subscribe((response:any)=>{
     if(response['name']===username){
       this.user.getValue().username=username;
       this.user.getValue().password=password;
       this.user.getValue().headers=headers;
       this.user.getValue().isAuthenticated=true;
       console.log(this.user.getValue().isAuthenticated);
       this.user.next(this.user.getValue());
       console.log(this.user.getValue().isAuthenticated);
     }
  });
 }
 logout(){
  this.user.getValue().username=null;
  this.user.getValue().password=null;
  this.user.getValue().headers=null;
  this.user.getValue().isAuthenticated=null;
  this.user.next(this.user.getValue());
 }
 getUser():Observable<User>{
   return this.user.asObservable();
 }
}
