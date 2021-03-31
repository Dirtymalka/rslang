import { Component } from '@angular/core';
import team from '../shared/constants/team';

@Component({
  selector: 'app-ourteam',
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.scss'],
})
export class OurteamComponent {
  myteam = team;
}
