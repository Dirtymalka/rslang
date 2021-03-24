import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
  changeSettings, changeSettingsFailure, changeSettingsSuccess,
  getSettings, getSettingsFailure, getSettingsSuccess,

} from "../actions/settings.actions";
import {SettingsService} from "../../modules/shared/services/settings.service";

@Injectable()
export class SettingsEffect {

  fetchSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSettings),
      switchMap(() => this.settingsService.getSettings()
        .pipe(
          map((settingsState) => getSettingsSuccess({settingsState})),
          catchError((err) => {
            console.log(err)
            return of(getSettingsFailure())
          })
        )
      ),
    ));

  putSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeSettings),
      switchMap(({settingsState}) => this.settingsService.putSettings(settingsState)
        .pipe(
          map((settings) => changeSettingsSuccess({settingsState: settings})),
          catchError((err) => {
            console.log(err)
            return of(changeSettingsFailure())
          })
        )
      ),
    ));


  constructor(private actions$: Actions, private settingsService: SettingsService) {
  }

}
