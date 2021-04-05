import { Injectable } from '@angular/core';
import { VOICE_SPEED } from '../../../constants/global.constants';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  speechSynthesis;

  voices;

  selectedVoice;

  isActivate = false;

  synthesizeSpeechFromText(text: string): void {
    if (!this.isActivate) {
      this.isActivate = true;
      this.speechSynthesis = window.speechSynthesis;

      this.speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = window.speechSynthesis.getVoices();
        /* eslint-disable */
        this.selectedVoice = this.voices[5];

        this.speak(text);
      });
    } else {
      this.stop();
      this.speak(text);
    }
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.selectedVoice;
    utterance.rate = VOICE_SPEED;
    this.speechSynthesis.speak(utterance);
  }

  stop(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
  }
}
