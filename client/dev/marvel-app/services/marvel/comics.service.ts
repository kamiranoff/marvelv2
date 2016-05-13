import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {Http,Response} from "@angular/http";

@Injectable()
export class ComicsService {

  constructor(public http:Http) {
  }
  private _comicsUrl = '/api/marvelapi/comics';


  getComics(): Observable<any>{
    return this.http.get(this._comicsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMoreComics(lastId,qty): Observable<any>{
    if(lastId){
      return this.http.get(this._comicsUrl + "?lastid=" + lastId + "&qty=" + qty)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }


  searchComicsByTitle(userInput):Observable<any>{
    return this.http.get(this._comicsUrl + "?title=" + userInput )
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMoreComicsFromSearch(searchTerm,lastId,qty){
    console.log(searchTerm);
    if(lastId){
      return this.http.get(this._comicsUrl + "?title=" + searchTerm + "&lastid=" + lastId + "&qty=" + qty)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  //getCharcterByCategory(categoryName):Observable<any>{
  //  return this.http.get(this._comicsUrl + "?categories=" + categoryName )
  //    .map(this.extractData)
  //    .catch(this.handleError);
  //}

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




