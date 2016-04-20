import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';

import {CharacterDetailService} from "../../services/character-detail.service";
import {Parallax,ParallaxConfig} from "../../helpers/parallax.directive";

@Component({
  selector:'character-detail',
  directives:[Parallax],
  providers:[CharacterDetailService],
  templateUrl:'marvel-app/modules/character-detail/character-detail.component.html'
})

export class CharacterDetail{
  private character = {};
  private id;
  private errorMessage: string;


  constructor(private _characterDetailService:CharacterDetailService,params:RouteParams) {
    this.id = params.get('id');
    this.getCharacterDetail(this.id);
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }

  getCharacterDetail(id){
    this._characterDetailService.getCharacterById(id)
      .subscribe(
        character => {
          this.character = character[0].character;
        },
        error =>  this.errorMessage = <any>error
      );

  }

}
