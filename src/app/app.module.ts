import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TextbookModule } from './modules/textbook/textbook.module';
import { HeaderModule } from './modules/header/header.module';
import mainReducer from './redux/reducers/index';
import rootEffects from './redux/effects';
import { TokenInterceptor } from './modules/shared/interceptors/token.interceptor';
import { GamesModule } from './modules/games';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    TextbookModule,
    StoreModule.forRoot({}, {}),
    HeaderModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(mainReducer, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(rootEffects),
    GamesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
