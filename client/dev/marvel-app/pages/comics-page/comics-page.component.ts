import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";
import {FilterComponent} from "../../modules/filter/filter.component";
import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {ComicsGrid} from "../../modules/comics-grid/comics-grid.component";
import {ComicsService} from "../../services/comics.service";

@Component({
  selector: 'comics-page',
  providers: [ComicsService,SearchAndFilterService],
  directives: [ComicsGrid, SearchComponent, FilterComponent,GoBackUpComponent],
  template: `
    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <filter [categories]="categories" (onFilterChanged)="onCategoryClicked($event)"></filter>
    <comics-grid [loadMoreComics]="loadMoreComics" [comics]="comics"  (onBottomOfPage)="onBottomOfPage($event)"></comics-grid>
    <go-back-up></go-back-up>
  `
})


export class ComicsPage {
  private comics:Array<any> = [];
  private categories:Array<String> = [];
  private selectedCategories:Array<String> = [];
  private allComicsLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreComics = true;
  private limit:number = 100;

  constructor(private _comicsService:ComicsService,private _searchAndFilterService:SearchAndFilterService) {
    this.getComics();

    this.loadMoreComics = true;


  }

  getComics() {
    this._comicsService.getComics()
      .subscribe(
        comics => {
          this.comics = comics;
          this.allComicsLoaded = comics;
          this.lastId = comics[comics.length -1]._id;
          console.log(comics);
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
          this.comics= this.comics.concat(comics);
          this.allComicsLoaded = this.comics;
          this.lastId = comics[comics.length -1]._id;
          this.loadMoreComics = true;
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
          this.comics= this.comics.concat(comics);
          this.allComicsLoaded = this.comics;
          this.lastId = comics[comics.length -1]._id;
          this.loadMoreComics = false;
          if(comics.length === this.limit){
            this.loadMoreComics = true;
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  //getCategories(){
  //  this._comicsService.getCategories()
  //    .subscribe(
  //      categories => {
  //        this.categories = categories;
  //      },
  //      error => this.errorMessage = <any>error
  //    );
  //}

  //onCategoryClicked(categories){
  //  this.selectedCategories = categories;
  //  if(categories.length === 0){
  //    this.isFilterActivated = false;
  //    this.comics  = this.allComicsLoaded;
  //  }else{
  //    this.isFilterActivated = true;
  //  }
  //  this.isActive = true;
  //  this._comicsService.getCharcterByCategory(categories)
  //    .subscribe(
  //     comics=> {
  //        this.comics= comics
  //        this.isActive=false;
  //      },
  //      error => this.errorMessage = <any>error
  //    );
  //
  //}

  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.comics= this.allComicsLoaded;
      this.isActive = false;
      this.isSearchedActivated = false;

      return;
    }
    this.loadMoreComics = false;
    this.isSearchedActivated = true;
    this.isActive = true;
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 1)
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._comicsService.searchComicsByTitle(searchTerm));

    keyups.subscribe(data => {
      this.comics = data;
      this.lastId = data[data.length -1]._id;
      this.isActive = false;
      this.loadMoreComics = false;
      if(data.length === this.limit){
        this.loadMoreComics = true;
      }

    });

  }

  onBottomOfPage($event){
    if(this.isFilterActivated){
      return;
    }
    console.log("this.isSearchedActivated",this.isSearchedActivated);
    console.log("this.loadMoreComics",this.loadMoreComics);
    if(this.isSearchedActivated && this.loadMoreComics){

      this.getMoreComicsFromSearch(this.searchTerm,this.lastId,this.limit);
      return;
    }else if(!this.isSearchedActivated){
      this.getMoreComics(this.lastId,this.limit);
      this.loadMoreComics = false;
    }

  }
}
