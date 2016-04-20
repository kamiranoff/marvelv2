import {Observable} from "rxjs/Rx";
import {Injectable} from 'angular2/core';
import {Http,Response} from "angular2/http";

@Injectable()
export class CharacterDetailService {
  private _heroDetailUrl = '/api/marvelapi/character/';

  constructor(public http:Http) {
  }


  getCharacterById(id): Observable{
    return this.http.get(this._heroDetailUrl + id)
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
    console.log('error.message',error.message);
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}



