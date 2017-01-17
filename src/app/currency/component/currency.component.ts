import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency'
import { CurrencyService } from '../service/currency.service'

@Component({
  selector: 'rate',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies: Currency[];
  inputCode: string

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getAllCurrencies();
  }

  getAllCurrencies(){
    this.currencyService.getCurrencies().subscribe(
      currencies => this.currencies = currencies,
      errorMessage => alert(<any>errorMessage)
    )
  }

  addCurrency(){
    if(this.inputCode != null){
      this.currencyService.addCurrency(this.inputCode).subscribe(
        currency => alert(currency.cid),
        errorMessage => alert(errorMessage)
      )
    this.getAllCurrencies();
    }
  }

  addButton(){
    alert(this.inputCode);
    this.addCurrency();
  }

}
