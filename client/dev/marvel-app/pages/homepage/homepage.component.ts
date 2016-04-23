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
    <characters-grid [characters]="characters"></characters-grid>
    <go-back-up></go-back-up>
  `
})

export class Homepage {
  private characters:Array<any> = [];
  private categories:Array<String> = [];
  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:Boolean;

  constructor(private _characterService:CharactersService,private _categoriesService:CategoriesService) {
    this.getCharacters();
    this.getCategories();
  }

  getCharacters() {
    this._characterService.getCharacters()
      .subscribe(
        characters => {
          this.characters = characters;
          this.allCharactersLoaded = characters;
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
    console.log(categories);
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
    if (searchInput === '') {
      this.characters = this.allCharactersLoaded;
      this.isActive = false;
      return;
    }
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
}
