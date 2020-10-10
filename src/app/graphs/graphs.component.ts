import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Style, BaseChartDirective, Label } from 'ng2-charts';
import { StocksService } from '../services/stocks.service'
import LineOnHover from './customPlugins/lineOnHover';
import * as ChartSelect from 'chartjs-plugin-select';
import * as ChartDraggable from 'chartjs-plugin-draggable';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  public chartTitle: string;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    showLines: true,
    responsive: true,
    select: {
      events: ['mousedown', 'mouseup'], // this is important!
      selectCallback: (startPoint, endPoint) => {
        console.log("Test")
      }
    },
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [
        {
          offset: true,
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: '#e6e6e6',
            tickMarkLength: 0
          },
          ticks: {
            fontColor: 'grey',
            display: false,
            mirror: true,
            callback: function (value, index, values) {
               return '$' + value;
            }
          },
        },
      ]
    },
    elements: {
      point: {
         radius: 0
      },
      line: {
         tension: 0, // 0 disables bezier curves
      }
   },
   hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 0
   },
   tooltips: {
      mode: 'nearest',
      intersect: true,
      backgroundColor: 'grey',
      callbacks: {
         title: function (tooltipItems, data) {
            return (tooltipItems[0] || {})['xLabel'];
         },
         label: function (tooltipItem, data) {
            return '$ ' + tooltipItem.yLabel.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
         },
         labelColor: function (tooltipItem, chart) {
            let dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
            return {
               backgroundColor: dataset.backgroundColor
            }
         }
      }
   },
    annotation: {
    },
  };
  public lineChartColors: Style[] = [
    { // grey
      borderColor: 'rgba(36,124,80,0.92)',
      pointBackgroundColor: 'rgba(218,208,163,0.9)',
      pointHoverBackgroundColor: 'rgba(218,208,163,0.9)',
      pointHoverBorderColor: 'rgb(218,208,163)',
      lineTension: 0,
      fill: true,
      borderWidth: 1.7,
      backgroundColor: "rgba(146,226,167,0.13)"
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  sService: StocksService

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(sService: StocksService) {
    this.sService = sService;
   }

  ngOnInit() {
    Chart.pluginService.register(ChartDraggable);
    Chart.pluginService.register(ChartSelect);
    Chart.pluginService.register(LineOnHover);
    this.sService.getCurrentStock().subscribe(data =>{
      const timeConfig = Object.keys(data)[1]
      const metaData = data['Meta Data']
      const priceData =  data[timeConfig]
      console.log(data)
      if(!priceData) {
        return
      }
        else {
          let chartData = [];
          let chartDateLabels =[]
          let companySymbol = ''
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
          this.lineChartData = [{
            data: chartData,
            label: metaData['2. Symbol'],
            pointHoverRadius: 5,
            pointHitRadius: 1000,
            steppedLine: false,
          }]
          this.lineChartLabels = chartDateLabels
          this.chartTitle = (metaData['2. Symbol'])
        }
      }
    )
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

}
