import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../../modules/search/search.component";
import {FilterComponent} from "../../../modules/filter/filter.component";
import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../../services/search-filter.service";
import {Grid} from "../../../modules/grid/grid.component";
import {ComicsService} from "../../../services/marvel/comics.service";

@Component({
  selector: 'comics-page',
  providers: [ComicsService,SearchAndFilterService],
  directives: [Grid, SearchComponent, FilterComponent, GoBackUpComponent],
  template: `
    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <filter [categories]="categories" (onFilterChanged)="onCategoryClicked($event)"></filter>
    <grid  [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage($event)"></grid>
    <go-back-up></go-back-up>
  `
})


export class ComicsPage {
  private elems:Array<any> = [];
  private categories:Array<String> = [];
  private selectedCategories:Array<String> = [];
  private allComicsLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreElem = true;
  private limit:number = 100;
  private page = 'marvelApiComics';

  constructor(private _comicsService:ComicsService,private _searchAndFilterService:SearchAndFilterService) {
    this.getComics();

    this.loadMoreElem = true;


  }

  getComics() {
    this._comicsService.getComics()
      .subscribe(
        comics => {
          this.elems = comics;
          this.allComicsLoaded = comics;
          this.lastId = comics[comics.length -1]._id;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreComics(lastId,qty){
    if(!this._comicsService.getMoreComics(lastId,qty)){
      return;
    }
    this._comicsService.getMoreComics(lastId,qty)
      .subscribe(
        comics=> {
          if(comics.length === 0){
            return;
          }
          this.elems= this.elems.concat(comics);
          this.allComicsLoaded = this.elems;
          this.lastId = comics[comics.length -1]._id;
          this.loadMoreElem = true;
        },
        error => this.errorMessage = <any>error
      );
  }

  getMoreComicsFromSearch(searchTerm,lastId,qty){
    if(!this._comicsService.getMoreComicsFromSearch(searchTerm,lastId,qty)){
      return;
    }
    this._comicsService.getMoreComicsFromSearch(searchTerm,lastId,qty)
      .subscribe(
        comics=> {
          if(comics.length === 0){
            return;
          }
          this.elems= this.elems.concat(comics);
          this.allComicsLoaded = this.elems;
          this.lastId = comics[comics.length -1]._id;
          this.loadMoreElem = false;
          if(comics.length === this.limit){
            this.loadMoreElem = true;
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.elems= this.allComicsLoaded;
      this.isActive = false;
      this.isSearchedActivated = false;

      return;
    }
    this.loadMoreElem = false;
    this.isSearchedActivated = true;
    this.isActive = true;
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 1)
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._comicsService.searchComicsByTitle(searchTerm));

    keyups.subscribe( (data:Array<any>) =>{
      this.elems = data;
      this.lastId = data[data.length -1]._id;
      this.isActive = false;
      this.loadMoreElem = false;
      if(data.length === this.limit){
        this.loadMoreElem = true;
      }
    });


  }

  onBottomOfPage($event){
    if(this.isFilterActivated){
      return;
    }

    if(this.isSearchedActivated && this.loadMoreElem){

      this.getMoreComicsFromSearch(this.searchTerm,this.lastId,this.limit);
      return;
    }else if(!this.isSearchedActivated){
      this.getMoreComics(this.lastId,this.limit);
      this.loadMoreElem = false;
    }

  }
}
