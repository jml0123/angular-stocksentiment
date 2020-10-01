import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinnHub } from '../api/FinnHub';
import { map } from 'rxjs/operators';

@Injectable()
export class StocksService {
  private stock = {}

  public http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getCandleData(company) {
    console.log("Fetching " + company)
    const d = new Date();
    const lastYr = new Date(d.getFullYear() - 1);
    const finnHubQuery = `https://finnhub.io/api/v1/stock/candle?symbol=${company}&resolution=1&from=${Math.round(lastYr.getTime()/1000)}&to=${Math.round(d.getTime()/1000)}&token=${FinnHub.API_KEY}`
    console.log(finnHubQuery);
    this.http.get<Response>(finnHubQuery)
    .pipe(map((res: any) => {
        console.log(res);
        //return res;
      }))
  }
  getQuote(company) {
    const finnHubQuery = `https://finnhub.io/api/v1/quote?symbol=${company}&token=${FinnHub.API_KEY}`
    console.log(finnHubQuery);
    this.http.get<Response>(finnHubQuery)
      .subscribe(data => console.log(data))
        //return res;
  }
}
