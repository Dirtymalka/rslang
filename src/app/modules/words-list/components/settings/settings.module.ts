import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsComponent } from './components/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, ReactiveFormsModule],
  exports: [SettingsComponent],
})
export class SettingsModule {}
