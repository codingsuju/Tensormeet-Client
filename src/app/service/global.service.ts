import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
const endpoint='http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<any>{
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa('codingsuju' + ':' + 'iscode')
    });
    return this.http.get<User>(environment.API_URL + '/users',{headers:headers});
  }
}
