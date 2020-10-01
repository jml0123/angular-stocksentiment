import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DashboardComponent } from './dashboard.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { SelectorComponent } from '../selector/selector.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzFormModule,
    FormsModule
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
    NzFormModule,
    NzButtonModule,
    FormsModule
  ]
})
export class DashboardModule { }
