import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";
import {CharactersService} from "../../services/marvel/characters.service";
import {FilterComponent} from "../../modules/filter/filter.component";
import {CategoriesService} from "../../services/marvel/categories-service";
import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {Grid} from "../../modules/grid/grid.component";

@Component({
  selector: 'homepage',
  providers: [CharactersService,CategoriesService],
  directives: [Grid, SearchComponent, FilterComponent,GoBackUpComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(searchTerm)]="searchTerm"></search-component>
    <filter [categories]="categories" (onFilterChanged)="onCategoryClicked($event)" [(selectedCategories)]="selectedCategories"></filter>
    <grid [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage()"></grid>
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
  private lastName;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreElem = true;
  private page = "marvelApi";

  constructor(private _characterService:CharactersService,private _categoriesService:CategoriesService) {
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
          this.lastName = characters[characters.length -1].character.name;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastName,qty){
    this.loadMoreElem = false;

    if(!this._characterService.getMoreCharacters(lastName,qty)){
      return;
    }
    this._characterService.getMoreCharacters(lastName,qty)
      .subscribe(
        characters => {
          if(characters.length === 0){
            return;
          }

          this.elems = this.elems.concat(characters);
          this.allCharactersLoaded = this.elems;
          this.lastName = characters[characters.length -1].character.name;
          console.log(this.lastName);
          console.log("this.elems",this.elems.length);
          if(characters.length === qty){
            this.loadMoreElem = true;
          }

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
    this.searchTerm = '';
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
    this.selectedCategories = [];
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

  onBottomOfPage(){
    if(this.isFilterActivated || this.isSearchedActivated){
     return;
    }
    if(this.loadMoreElem){
      this.getMoreCharacters(this.lastName,100);
    }

  }
}
