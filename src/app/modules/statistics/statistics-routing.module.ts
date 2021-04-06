import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticComponent } from './statistic.component';
import { LongtermStatisticComponent } from './components/longterm-statistic/longterm-statistic.component';
import { ShorttermStatisticComponent } from './components/shortterm-statistic/shortterm-statistic.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticComponent,
    children: [
      {
        path: 'long-term-progress',
        component: LongtermStatisticComponent,
      },
      {
        path: 'short-term-progress',
        component: ShorttermStatisticComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
