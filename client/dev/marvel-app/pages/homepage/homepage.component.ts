import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";
import {CharactersService} from "../../services/marvel/characters.service";
import {FilterComponent} from "../../modules/filter/filter.component";
import {CategoriesService} from "../../services/marvel/categories-service";
import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Grid} from "../../modules/grid/grid.component";

@Component({
  selector: 'homepage',
  providers: [CharactersService,CategoriesService,SearchAndFilterService],
  directives: [Grid, SearchComponent, FilterComponent,GoBackUpComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <filter [categories]="categories" (onFilterChanged)="onCategoryClicked($event)"></filter>
    <grid [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage($event)"></grid>
    <go-back-up></go-back-up>
  `
})

export class Homepage {
  private elems:Array<any> = [];
  private categories:Array<String> = [];
  private selectedCategories:Array<String> = [];
  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreElem = true;
  private page = "marvelApi";

  constructor(private _characterService:CharactersService,private _categoriesService:CategoriesService,private _searchAndFilterService:SearchAndFilterService) {
    this.getCharacters();
    this.getCategories();
    this.loadMoreElem = true;


  }

  getCharacters() {
    this._characterService.getCharacters()
      .subscribe(
        characters => {
          this.elems = characters;
          this.allCharactersLoaded = characters;
          this.lastId = characters[characters.length -1]._id;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastId,qty){
    if(!this._characterService.getMoreCharacters(lastId,qty)){
      return;
    }
    this._characterService.getMoreCharacters(lastId,qty)
      .subscribe(
        characters => {
          if(characters.length === 0){
            return;
          }
          this.elems = this.elems.concat(characters);
          this.allCharactersLoaded = this.elems;
          this.lastId = characters[characters.length -1]._id;
          this.loadMoreElem = true;
        },
        error => this.errorMessage = <any>error
      );
  }

  getCategories(){
    this._categoriesService.getCategories()
      .subscribe(
        categories => {
          this.categories = categories;
        },
        error => this.errorMessage = <any>error
      );
  }

  onCategoryClicked(categories){
    this.selectedCategories = categories;
    if(categories.length === 0){
      this.isFilterActivated = false;
      this.elems  = this.allCharactersLoaded;
    }else{
      this.isFilterActivated = true;
    }
    this.isActive = true;
    this._characterService.getCharcterByCategory(categories)
      .subscribe(
        characters => {
          this.elems = characters;
          this.isActive=false;
        },
        error => this.errorMessage = <any>error
      );

  }

  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.elems = this.allCharactersLoaded;
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
      .flatMap(searchTerm => this._characterService.searchCharactersByName(searchTerm));


    keyups.subscribe( (data:Array<any>) => {
      this.elems = data;
      this.isActive = false;
    });

  }

  onBottomOfPage($event){
    this.loadMoreElem = false;
    if(this.isFilterActivated || this.isSearchedActivated){
     return;
    }
    this.getMoreCharacters(this.lastId,100);

  }
}
