import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module.ts';
import { DataChartComponent } from 'src/app/components/data-chart/data-chart.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DataChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [DashboardComponent, DataChartComponent]
})
export class DashboardModule { }
