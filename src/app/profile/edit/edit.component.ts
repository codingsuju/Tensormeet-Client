import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { AppService } from 'src/app/service/app.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  profile:Profile;
  constructor(private app:AppService,private profileService:ProfileService,private router:Router) {
     this.profile=new Profile();
   }

  ngOnInit(): void {
    this.profileService.getProfile(this.app.user.getValue().username).subscribe((response)=>{
      this.profile=response;
    });
  }
  save(){
    this.profileService.saveOrUpdateProfile(this.profile).subscribe((response)=>{
      this.profile=response;
      this.router.navigate([this.app.user.getValue().username,'profile']);
    });
  }
}
