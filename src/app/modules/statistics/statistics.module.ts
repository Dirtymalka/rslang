import { NgModule } from '@angular/core';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticComponent } from './statistic.component';
import { SharedModule } from '../shared/shared.module';
import { TotalProgressComponent } from './components/longterm-statistic/total-progress/total-progress.component';
import { LongtermStatisticComponent } from './components/longterm-statistic/longterm-statistic.component';
import { ShorttermStatisticComponent } from './components/shortterm-statistic/shortterm-statistic.component';
import { StatDetailsComponent } from './components/shortterm-statistic/stat-details/stat-details.component';

@NgModule({
  declarations: [
    StatisticComponent,
    TotalProgressComponent,
    LongtermStatisticComponent,
    ShorttermStatisticComponent,
    StatDetailsComponent,
  ],
  imports: [SharedModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
