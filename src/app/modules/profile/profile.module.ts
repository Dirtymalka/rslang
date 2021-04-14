import { NgModule } from '@angular/core';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {SharedModule} from "../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [ViewProfileComponent, EditProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
