import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/app-user';
import { ResponseMessage } from '../model/response-message';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient,private app:AppService) { }
  registerUser(username:String,password:String):Observable<AppUser>{
    const appuser=new AppUser();
    appuser.username=username;
    appuser.password=password;
    return this.http.post<AppUser>(environment.API_URL+'/api/register',appuser);
  }
}
