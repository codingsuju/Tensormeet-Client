import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials={username:'',password:''};
  constructor(private registerService:RegisterService,private profileService:ProfileService,private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    console.log(this.credentials.username);
    console.log("Hello");
    this.registerService.registerUser(this.credentials.username,this.credentials.password).subscribe((response)=>{
      console.log(response.username);
      console.log(this.credentials.username);
      this.credentials.username='';
      this.credentials.password='';
      this.router.navigate(['login']);
    });
  }

}
