import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServicesHelpers} from "../../helpers/services-helpers";


@Injectable()
export class CardsService {
  private _cardsUrl = '/api/marvelapi/characters?qty=';

  constructor(public http:Http) {
  }
  getHeroes(qty): Observable<any>{
    return this.http.get(this._cardsUrl + qty)
      .map(ServicesHelpers.extractData)
      .catch(ServicesHelpers.handleError);
  }

}




