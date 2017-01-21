import { Component, OnInit } from '@angular/core';
import { RateService } from '../service/rate.service'
import { CurrencyService } from '../../currency/service/currency.service'
import { Currency } from '../../currency'
import { Rate } from '../../rate'
import { MdDialog, MdDialogRef } from '@angular/material'
import { CurrenciesComponent } from '../../currency/component/currencies.component'

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {

  currencies: any;
  baseCurrency: Currency;
  currentRates: Rate[];
  dialogRef: MdDialogRef<CurrenciesComponent>;

  constructor(private rateService: RateService,
    private currencyService: CurrencyService,
    private dialog: MdDialog) {
    this.currencies = [];
  }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(
      body => {
        if (body.code == '200') {
          for (let currency of body.data as Currency[]) {
            currency.icon = 'assets/flags/' + currency.icon;
            this.currencies[currency.cid] = currency;
            if (currency.code == 'USD') {
              this.baseCurrency = currency;
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
    this.dialogRef = this.dialog.open(CurrenciesComponent, {
      disableClose: false,
      width: '800px',
      height: '800px'
    });

    this.dialogRef.afterClosed().subscribe(cid => {
      this.baseCurrency = this.currencies[cid];
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
}
