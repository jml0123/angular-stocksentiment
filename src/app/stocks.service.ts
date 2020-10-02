import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlphaVantage } from '../api/AlphaVantage';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StocksService {
  stock: object = {};
  private stockSub = new BehaviorSubject<object>(this.stock);
  currentStock = this.stockSub.asObservable();

  private charts = [];

  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getCandleData(company) {
    console.log("Fetching " + company)
    const d = new Date();
    const lastYr = new Date(d.getFullYear() - 1);
    const query = ``
    console.log(query);
    this.http.get<Response>(query)
    .pipe(map((res: any) => {
        console.log(res);
        //return res;
      }))
  }
  getQuote(company, time?) {
    let timeSeriesConfig;
    if (time === "intraday") {
      timeSeriesConfig = "TIME_SERIES_INTRADAY"
    }
    else if (time === "daily") {
      timeSeriesConfig = "TIME_SERIES_DAILY"
    }
    else if (time === "weekly") {
      timeSeriesConfig = "TIME_SERIES_WEEKLY"
    }
    else if (time === "monthly") {
      timeSeriesConfig = "TIME_SERIES_MONTHLY"
    }

    const query = `https://www.alphavantage.co/query?function=${timeSeriesConfig}&symbol=${company}&interval=5min&apikey=${AlphaVantage.API_KEY}`
    console.log(query);
    this.http.get<Response>(query).subscribe(data => {
      this.stockSub.next(data)
    })
  }

  getCurrentStock() {
    return this.currentStock;
  }
/*
  setStockData(data) {
    this.stock = data;
  }

  getData() {
    console.log(this.stock)
    return this.stock;
  }
  */
}
