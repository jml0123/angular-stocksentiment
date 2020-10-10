import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlphaVantage } from '../../api/AlphaVantage';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {Stock} from '../model/stock'

@Injectable()
export class StocksService {
  private stockSub = new BehaviorSubject<Stock>(null);
  currentStock = this.stockSub.asObservable();

  private charts = [];

  constructor(private http: HttpClient) {

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
  getQuote(company, time?) : Observable<any> {
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


    /*
    \

      const timeConfig = Object.keys(data)[1]
      const metaData = data['Meta Data']
      const priceData =  data[timeConfig]
      
      const prices = Object.entries(priceData)
          prices.map(p => {
            const floatPrice = parseFloat(p[1]['1. open'])
            const stringDate = p[0]
            // The API Returns values in reverse chronological order
            // Instead of pushing to the end of the array, we will prepend using unshift method
            chartData.unshift(floatPrice)
            // The API Returns values in reverse chronological order
            chartDateLabels.unshift(stringDate)
          })

    */

    const query = `https://www.alphavantage.co/query?function=${timeSeriesConfig}&symbol=${company}&interval=5min&apikey=${AlphaVantage.API_KEY}`
    console.log(query);
    return this.http.get<Response>(query).pipe(
      map(data => 
        this.stockSub.next(data)
      )
    )
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
