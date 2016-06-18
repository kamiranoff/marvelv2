import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {Http,Response} from "@angular/http";
import {ServicesHelpers} from "../../helpers/services-helpers";


@Injectable()
export class ComicvineStoryService {

  constructor(public http:Http) {}


  getStoryArcs(storyArcsUrl): Observable<any>{
    return this.http.get(storyArcsUrl)
      .map(ServicesHelpers.extractData)
      .catch(ServicesHelpers.handleError);
  }

  getMoreStoryArcs(storyArcsUrl,lastStoryArcName,qty): Observable<any>{
    if(lastStoryArcName){
        return this.http.get(storyArcsUrl + "?lastStoryArc=" + lastStoryArcName + "&qty=" + qty)
        .map(ServicesHelpers.extractData)
        .catch(ServicesHelpers.handleError);
    }
  }

  searchStoryArcsByName(storyArcsUrl,userInput):Observable<any>{
    return this.http.get(storyArcsUrl+ "?name=" + userInput )
      .map(ServicesHelpers.extractData)
      .catch(ServicesHelpers.handleError);
  }



}




