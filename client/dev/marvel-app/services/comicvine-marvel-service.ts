///<reference path="../../../../node_modules/rxjs/Observable.d.ts"/>
import {Observable} from "rxjs/Rx";
import {Injectable} from 'angular2/core';
import {Http,Response} from "angular2/http";

@Injectable()
export class ComicvineMarvelCharactersService {

  constructor(public http:Http) {
  }
  private _heroesUrl = '/api/comicvine/marvel/characters';


  getCharactersFromMarvel(): Observable<any>{
    return this.http.get(this._heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMoreCharactersFromMarvel(lastName,qty): Observable<any>{
    if(lastName){
      return this.http.get(this._heroesUrl + "?lastName=" + lastName + "&qty=" + qty)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  searchCharactersByNameFromMarvel(userInput):Observable<any>{
    return this.http.get(this._heroesUrl + "?name=" + userInput )
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




