import { Component } from '@angular/core';
import { ITeam, TEAM } from '../../../shared/models/team.models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  team: ITeam[] = TEAM;
}
