import { Component, OnInit } from '@angular/core';
import { RateService } from '../service/rate.service'
import { CurrencyService } from '../../currency/service/currency.service'
import { Currency } from '../../currency'
import { Rate } from '../../rate'

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {

  currencies: Currency[];
  baseCurrency: Currency;
  currentRates: Rate[];

  constructor(private rateService: RateService,
    private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(
      body => {
        this.currencies = new Array();
        if (body.code == '200') {
          for (let currency of body.data as Currency[]) {
            currency.icon = 'assets/flags/'+currency.icon;
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

}
