import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import { Hero } from './hero'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpServiceService {
  private url = "http://localhost:8080/api/currencies";

  constructor(private http: Http) {}

  getHeroes(): Promise<string> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as string)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
 }
}
