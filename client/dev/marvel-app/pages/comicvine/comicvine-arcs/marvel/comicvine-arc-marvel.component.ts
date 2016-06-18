import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../../../modules/search/search.component";
import {GoBackUpComponent} from "../../../../modules/go-back-up/go-back-up.component";
import {Grid} from "../../../../modules/grid/grid.component";
import {ComicvineStoryService} from "../../../../services/comicvine/story-arcs.service";

@Component({
  selector: 'story-arcs',
  providers: [ComicvineStoryService],
  directives: [Grid, SearchComponent,GoBackUpComponent],
  templateUrl:'marvel-app/pages/comicvine/comicvine-arcs/marvel/comicvine-arc-marvel.html'
})

export class ComicvineStoryArcMarvelPage {
  private elems:Array<any> = [];
  private categories:Array<String> = [];
  private selectedCategories:Array<String> = [];
  private allStoriesLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastStoryArc;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreElem = true;
  private storyArcsUrl = '/api/comicvine/story_arcs/';
  private page = 'storyArcsMarvelPage';

  constructor(private _storyArcsService:ComicvineStoryService) {
    this.getArcs(this.storyArcsUrl);
    this.loadMoreElem = true;


  }

  getArcs(storyArcsUrl) {
    this._storyArcsService.getStoryArcs(storyArcsUrl)
      .subscribe(
        storyArcs => {
          this.elems = storyArcs;
          this.allStoriesLoaded = storyArcs;
          this.lastStoryArc = storyArcs[storyArcs.length -1].story_arc.name;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreArcs(storyArcsUrl,lastStoryName,qty){
    this.loadMoreElem = false;

    if(!this._storyArcsService.getMoreStoryArcs(storyArcsUrl,lastStoryName,qty)){
      return;
    }
    this._storyArcsService.getMoreStoryArcs(storyArcsUrl,lastStoryName,qty)
      .subscribe(
        storyArcs => {
          if(storyArcs.length === 0){
            return;
          }

          this.elems = this.elems.concat(storyArcs);
          this.allStoriesLoaded = this.elems;
          this.lastStoryArc = storyArcs[storyArcs.length -1].story_arc.name;
          if(storyArcs.length === qty){
            this.loadMoreElem = true;
          }

        },
        error => this.errorMessage = <any>error
      );
  }





  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.elems = this.allStoriesLoaded;
      this.isActive = false;
      this.isSearchedActivated = false;

      return;
    }
    this.isSearchedActivated = true;
    this.isActive = true;
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 1)
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._storyArcsService.searchStoryArcsByName(this.storyArcsUrl,searchTerm));


    keyups.subscribe( (data:Array<any>) => {
      this.elems = data;
      this.isActive = false;
    });

  }

  onBottomOfPage(){
    if(this.isFilterActivated || this.isSearchedActivated){
      return;
    }
    if(this.loadMoreElem){
      this.getMoreArcs(this.storyArcsUrl,this.lastStoryArc,100);
    }

  }
}
