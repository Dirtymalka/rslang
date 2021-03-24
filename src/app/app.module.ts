import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesModule } from './modules/games';
import { TextbookModule } from './modules/textbook/textbook.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GamesModule,
    AppRoutingModule,
    TextbookModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
