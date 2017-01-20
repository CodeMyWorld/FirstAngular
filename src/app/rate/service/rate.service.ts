import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import '../../rxjs-operators'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class RateService {

  private currentRateUrl = "/api/rate/current"
  constructor(private http: Http) { }

  getCurrentRate(from: string): Observable<any> {
    let params = new URLSearchParams();
    params.append('from', from);
    return this.http.get(this.currentRateUrl, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred hahahaha', error);
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
