import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ViewProfileComponent, EditProfileComponent, ProfileComponent],
  imports: [SharedModule, ProfileRoutingModule, ReactiveFormsModule],
})
export class ProfileModule {}
