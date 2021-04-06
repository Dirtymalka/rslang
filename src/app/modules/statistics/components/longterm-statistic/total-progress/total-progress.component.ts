import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IUserWord } from '../../../../shared/models/word.models';
import {
  toColumnChartConfig,
  toLineChartConfig,
} from '../../../../shared/utils/chart.config';

@Component({
  selector: 'app-total-progress',
  templateUrl: './total-progress.component.html',
  styleUrls: ['./total-progress.component.scss'],
})
export class TotalProgressComponent implements OnInit, OnChanges {
  @Input() userWords: IUserWord[] = [];

  chart;

  columnChart;

  ngOnChanges(object: SimpleChanges): void {
    if (
      object.userWords.currentValue.length !==
      object.userWords.previousValue?.length
    ) {
      const filteredWords =
        this.userWords?.length &&
        this.userWords.filter((word) => word.optional.studiedDate);
      this.chart = filteredWords && new Chart(toLineChartConfig(filteredWords));
      this.columnChart =
        filteredWords && new Chart(toColumnChartConfig(filteredWords));
    }
  }

  ngOnInit(): void {
    const filteredWords =
      this.userWords?.length &&
      this.userWords.filter((word) => word.optional.studiedDate);
    this.chart = new Chart(toLineChartConfig(filteredWords));
    this.columnChart = new Chart(toColumnChartConfig(filteredWords));
  }
}
