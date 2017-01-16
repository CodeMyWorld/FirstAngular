import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service'
import {Hero} from '../hero'
import { Currency } from '../currency'
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

  ngOnInit() {
  }

  onClickMe(){
    var response;
    this.httpService.getHeroes().then(heroes => this.values = heroes.toString());

    this.httpService.getCurrencies().subscribe(
      currencies => this.currencies = currencies,
      errorMessage => this.errorMessage = <any>errorMessage
    )
  }
  onKey(value: string){
    this.values += value + ' | ';
  }
}
