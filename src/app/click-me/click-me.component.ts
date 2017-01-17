import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service'
import {Hero} from '../hero'
import { Currency } from '../currency/currency'
import { RouterModule }   from '@angular/router';

@Component({
  selector: 'click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})

export class ClickMeComponent implements OnInit {
  clickMessage = 'havent click yet';
  values = '';
  constructor(private httpService: HttpServiceService) { }
  currencies: Currency[];
  errorMessage: string
  inputvalue: string

  ngOnInit() {
  }

  onClickMe(){
    this.httpService.getCurrencies().subscribe(
      currencies => this.currencies = currencies,
      errorMessage => this.errorMessage = <any>errorMessage
    );
  }
  onKey(value: string){
    this.values += value + ' | ';
  }
}
