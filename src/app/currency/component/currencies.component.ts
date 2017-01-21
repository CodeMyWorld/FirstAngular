import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { Currency } from '../../currency';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  currencies: Currency[];
  constructor(private currencyService: CurrencyService, public dialogRef: MdDialogRef<CurrenciesComponent>) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(
      body => {
        this.currencies = body.data;
        for (let currency of this.currencies){
          currency.icon = 'assets/flags/' + currency.icon;
        }
      },
      errorMessage => console.log(errorMessage)
    )
  }

  selectCurrency(cid: string){
    this.dialogRef.close(cid);
  }
}
