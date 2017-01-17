import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import { Hero } from './hero'
import 'rxjs/add/operator/toPromise';
import './rxjs-operators'
import { Observable } from 'rxjs/Observable'
import { Currency } from './currency/currency'

@Injectable()
export class HttpServiceService {
  private url = "/api/currency/currencies";

  constructor(private http: Http) {}

  getHeroes(): Promise<string> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred hahahaha', error); // for demo purposes only
    return Promise.reject(error.message || error);  
 }

 private extractData(res: Response){
   let body = res.json();
   return body.data || {};
 }

 getCurrencies(): Observable<Currency[]>{
   return this.http.get(this.url)
   .map(this.extractData)
   .catch(this.handleError);
 }

}
