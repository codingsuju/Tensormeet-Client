import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../model/profile';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private app:AppService) { }
  getProfile(username:String):Observable<Profile>{
    const headers=this.app.user.getValue().headers;
    return this.http.get<Profile>(environment.API_URL+'/user/'+username+'/profile',{headers:headers});
  }
  saveOrUpdateProfile(profile:Profile){
    const headers=this.app.user.getValue().headers;
    return this.http.put<Profile>(environment.API_URL+'/user/'+this.app.user.getValue().username+'/profile',profile,{headers:headers});
  }
}
