import { Injectable } from '@angular/core';
import { Currency } from './currency'

@Injectable()
export class SharedService {

  public baseCurrency: Currency;
  public selectedCurrency: string;
  public currencies: Currency[];

  constructor() { }

}
