import {createFeatureSelector} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {IStatistic} from "../../modules/shared/models/statistics.models";

export const selectStatistic = createFeatureSelector<IAppState, IStatistic>('statistics')
