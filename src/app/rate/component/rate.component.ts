import { Component, OnInit } from '@angular/core';
import { RateService } from '../service/rate.service'
import { CurrencyService } from '../../currency/service/currency.service'
import { Currency } from '../../currency'
import { Rate } from '../../rate'
import { MdDialog, MdDialogRef } from '@angular/material'
import { SharedService } from '../../shared.service'
import { ChartModule } from 'angular2-highcharts'


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {

  currencies: any;
  baseCurrency: Currency;
  currentRates: Rate[];
  dialogRef: MdDialogRef<SelectBaseCurrencyDialog>;
  historicalDialogRef: MdDialogRef<HistoricalRateDialog>;

  constructor(private rateService: RateService,
    private currencyService: CurrencyService,
    private dialog: MdDialog,
    private sharedService: SharedService) {
    this.currencies = [];
  }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(
      body => {
        if (body.code == '200') {
          this.sharedService.currencies = body.data as Currency[];
          for (let currency of body.data as Currency[]) {
            currency.icon = 'assets/flags/' + currency.icon;
            this.currencies[currency.cid] = currency;
            if (currency.code == 'USD') {
              this.baseCurrency = currency;
              this.sharedService.baseCurrency = currency;
            }
          }
          this.rateService.getCurrentRate(this.baseCurrency.cid).subscribe(
            body => {
              if (body.code == '200') {
                this.currentRates = body.data;
              }
            },
            errorMessage => console.log(errorMessage)
          )
        }
      },
      errorMessage => console.log(errorMessage)
    )
  }

  selectBaseCurrency() {
    this.dialogRef = this.dialog.open(SelectBaseCurrencyDialog, {
      disableClose: false,
      width: '800px',
      height: '800px'
    });

    this.dialogRef.afterClosed().subscribe(cid => {
      this.baseCurrency = this.currencies[cid];
      this.sharedService.baseCurrency = this.currencies[cid];
      this.rateService.getCurrentRate(cid).subscribe(
        body => {
          if (body.code == '200') {
            this.currentRates = body.data;
          }
        },
        errorMessage => console.log(errorMessage)
      )
    })
  }

  displayHistoricalRate(selectedCid: string) {
    this.sharedService.selectedCurrency = selectedCid;
    this.historicalDialogRef = this.dialog.open(HistoricalRateDialog, {
      disableClose: false,
      width: '800px',
      height: '800px'
    })
  }

  updateFilter(event){
    let val = event.target.value;

    let temp = this.currentRates.filter(function(d)){
      return curren
    }
  }
}

@Component({
  selector: 'historical-rate',
  templateUrl: './historicalRateDialog.component.html',
  styleUrls: ['./historicalRateDialog.component.css'],
})

export class HistoricalRateDialog implements OnInit {

  baseCurrency: Currency;
  selectedCurrency: string;
  options: Object;
  constructor(private rateService: RateService, public dialogRef: MdDialogRef<HistoricalRateDialog>,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.baseCurrency = this.sharedService.baseCurrency;
    this.selectedCurrency = this.sharedService.selectedCurrency;
    this.rateService.getHistoricalRate(this.baseCurrency.cid, this.selectedCurrency, 1483401600000, 1485129600000)
      .subscribe(
      body => {
        let data = body.data;
        this.options = {
          title: data.title,
          series: [{
            name: 'rate',
            data: data.values,
            tooltip: {
              valueDecimals: 2
            }
          }],
          plotOptions: {
            series: {
              pointStart: Number(data.start),
              pointInterval: 24 * 3600 * 1000 // one day
            }
          },
          xAxis: {
            type: 'datetime'
          }
        }
      }
      )
  }
}

@Component({
  selector: 'app-currencies',
  templateUrl: './selectBaseCurrencyDialog.component.html',
  styleUrls: ['./selectBaseCurrencyDialog.component.css']
})
export class SelectBaseCurrencyDialog implements OnInit {

  currencies: Currency[];
  constructor(private sharedService: SharedService, public dialogRef: MdDialogRef<SelectBaseCurrencyDialog>) { }

  ngOnInit() {
    this.currencies = this.sharedService.currencies;
  }

  selectCurrency(cid: string) {
    this.dialogRef.close(cid);
  }
}