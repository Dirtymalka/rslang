import { NgModule } from '@angular/core';
import { HangmanComponent } from './hangman.component';
import { SharedModule } from '../../shared/shared.module';
import { HangmanRoutingModule } from './hangman-routing.module';
import { KeypadComponent } from './components/keypad/keypad.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [
    HangmanComponent,
    KeypadComponent,
    GameResultComponent,
    StartPageComponent,
  ],
  imports: [SharedModule, HangmanRoutingModule],
})
export class HangmanModule {}
