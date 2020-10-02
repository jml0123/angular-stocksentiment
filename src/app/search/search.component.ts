import { Component, OnInit } from '@angular/core';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ticker: string;
  sService: StocksService;
  constructor(sService: StocksService) {
    this.sService = sService
   }

  ngOnInit(): void {
  }

  onSubmit(form) {
    if (form.status === "INVALID") {
      return;
    }
    console.log(form.value.ticker);
    this.sService.getQuote(form.value.ticker, 'intraday');
  }
}
