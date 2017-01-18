import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import '../../rxjs-operators'
import { Observable } from 'rxjs/Observable'
import { Currency } from '../currency'


@Injectable()
export class CurrencyService {
  private allCurrenciesUrl = "/api/currency/currencies";
  private addCurrencyUrl = "/api/currency/add"
  
  constructor(private http: Http) {}


 private handleError(error: any): Promise<any> {
    console.error('An error occurred hahahaha', error); 
    return Promise.reject(error.message || error);  
 }

 private extractData(res: Response){
   let body = res.json();
   return body || {};
 }

 getCurrencies(): Observable<any>{
   return this.http.get(this.allCurrenciesUrl)
   .map(this.extractData)
   .catch(this.handleError);
 }

 addCurrency(code: string): Observable<any>{
   let params = new URLSearchParams();
   params.append('code', code);
   return this.http.post(this.addCurrencyUrl,params)
   .map(this.extractData)
   .catch(this.handleError);
 }
}
