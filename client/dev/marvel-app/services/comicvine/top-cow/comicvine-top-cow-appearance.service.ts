import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {Http,Response} from "@angular/http";

@Injectable()
export class ComicvineTopCowAppearancesService {

  constructor(public http:Http) {
  }
  private _heroesUrl = '/api/comicvine/top-cow/appearances';

  getAppearancesFromTopCow(): Observable<any>{
    return this.http.get(this._heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}




