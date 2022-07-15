import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { FriendsComponent } from './friends/friends.component';
import { GlobalComponent } from './global/global.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RefreshComponent } from './refresh/refresh.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:":username/home",component:NewsfeedComponent},
  {path:":username/friends",component:FriendsComponent},
  {path:":username/chats",component:ChatsComponent},
  {path:":username/profile",component:ProfileComponent},
  {path:":username/message",component:MessageComponent},
  {path:":username/search",component:GlobalComponent},
  {path:"refresh",component:RefreshComponent},
  {path:":username/profile/edit",component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
