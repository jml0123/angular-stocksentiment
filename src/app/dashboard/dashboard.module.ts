import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DashboardComponent } from './dashboard.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { SelectorComponent } from '../selector/selector.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ChartsModule

  ],
  declarations: [
    DashboardComponent,
    GraphsComponent,
    SelectorComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    SearchComponent,
    GraphsComponent,
    NzFormModule,
    NzButtonModule,
    FormsModule,
    ChartsModule
  ]
})
export class DashboardModule { }
