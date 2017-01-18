import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency'
import { CurrencyService } from '../service/currency.service'
import { Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MdSnackBar} from '@angular/material'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  inputCode: string
  mode = "indeterminate"

  constructor(private currencyService: CurrencyService,
  private router: Router,
  private location: Location,
  private snakBar: MdSnackBar) { }

  ngOnInit() {
  }

    addCurrency(){
    if(this.inputCode != null){
      this.currencyService.addCurrency(this.inputCode).subscribe(
        body => {
          if(body.code == 600){
            alert(body.message);
          }else if(body.code == 200){
            let currency: Currency = body.data;
            this.snakBar.open("add successfully", currency.cid);
            this.router.navigate([''])
          }
        },
        errorMessage => alert(errorMessage)
      )
    }
  }

}
