import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {Http,Response} from "@angular/http";

@Injectable()
export class ComicvineCharactersService {

  constructor(public http:Http) {}


  getCharacters(characterUrl): Observable<any>{
    return this.http.get(characterUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMoreCharacters(characterUrl,lastName,qty): Observable<any>{
    if(lastName){
      return this.http.get(characterUrl + "?lastName=" + lastName + "&qty=" + qty)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  searchCharactersByName(characterUrl,userInput):Observable<any>{
    return this.http.get(characterUrl+ "?name=" + userInput )
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




