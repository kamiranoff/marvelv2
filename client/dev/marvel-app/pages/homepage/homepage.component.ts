import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {CharactersGrid} from "../../modules/characters-grid/characters-grid.component";
import {SearchComponent} from "../../modules/search/search.component";
import {CharactersService} from "../../services/characters.service";
import {FilterComponent} from "../../modules/filter/filter.component";
import {CategoriesService} from "../../services/categories-service";
import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";

@Component({
  selector: 'homepage',
  providers: [CharactersService,CategoriesService],
  directives: [CharactersGrid, SearchComponent, FilterComponent,GoBackUpComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchTerm)="onSearchChanged($event)"></search-component>
    <filter [categories]="categories" (onFilterChanged)="onCategoryClicked($event)"></filter>
    <characters-grid [loadMoreChar]="loadMoreChar" [characters]="characters" (onBottomOfPage)="onBottomOfPage($event)"></characters-grid>
    <go-back-up></go-back-up>
  `
})

export class Homepage {
  private characters:Array<any> = [];
  private categories:Array<String> = [];
  private selectedCategories:Array<String> = [];
  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private isFilterActivated = false;
  private loadMoreChar = true;

  constructor(private _characterService:CharactersService,private _categoriesService:CategoriesService) {
    this.getCharacters();
    this.getCategories();
    this.loadMoreChar = true;
  }

  getCharacters() {
    this._characterService.getCharacters()
      .subscribe(
        characters => {
          this.characters = characters;
          this.allCharactersLoaded = characters;
          this.lastId = characters[characters.length -1]._id;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastId,qty){
    this._characterService.getMoreCharacters(lastId,qty)
      .subscribe(
        characters => {
          if(characters.length === 0){
            return;
          }
          this.characters = this.characters.concat(characters);
          this.allCharactersLoaded = this.characters;

          this.lastId = characters[characters.length -1]._id;
          this.loadMoreChar = true;
          console.log(this.loadMoreChar);
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
      this.characters  = this.allCharactersLoaded;
    }else{
      this.isFilterActivated = true;
    }
    this.isActive = true;
    this._characterService.getCharcterByCategory(categories)
      .subscribe(
        characters => {
          this.characters = characters;
          this.isActive=false;
        },
        error => this.errorMessage = <any>error
      );

  }

  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.characters = this.allCharactersLoaded;
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

    keyups.subscribe(data => {
      this.characters = data;
      this.isActive = false;
    });

  }

  onBottomOfPage($event){
    this.loadMoreChar = false;
    if(this.isFilterActivated || this.isSearchedActivated){
     return;
    }
    this.getMoreCharacters(this.lastId,100);


  }
}
