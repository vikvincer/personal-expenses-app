import { Component, OnInit } from '@angular/core';
import { ExpensesModel } from 'src/app/models/expenses.model';
import { LocalService } from 'src/app/services/local.service';
import { DateTime } from 'luxon';
import * as _ from 'lodash';
// const { DateTime } = require("luxon");




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartData: number[] = [];

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.localService.getExpenses('user').subscribe(result => {
      this.assignWeekData(result);
    })
  }

  assignWeekData(data: ExpensesModel[]) {
    const currentDate = DateTime.fromJSDate(new Date());
    const weekStart = currentDate.startOf('week');
    const filterData = data?.filter((item: any) =>  DateTime.fromJSDate(new Date(item.date)).toLocal().weekNumber === currentDate.toLocal().weekNumber)
    for(let i = 0; i <= 6; i++) {
      const day = weekStart.plus({day: i});
      const byDayFilter = filterData.filter((it: any) =>  DateTime.fromJSDate(new Date(it.date)).day === day.day);
      const value =byDayFilter.reduce((total, item: any) => total + item.price , 0)
      this.chartData.push(value);
    }
  }
}
