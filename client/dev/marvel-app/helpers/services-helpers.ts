import {Observable} from "rxjs/Rx";
import {Response} from "@angular/http";

export class ServicesHelpers{
  static extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }
  static handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.log('error.message',error.message);
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
