import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesModule } from './modules/games';
import { HeaderModule } from './modules/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GamesModule, AppRoutingModule, StoreModule.forRoot({}, {}), HeaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
