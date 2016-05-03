import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';


import {Parallax,ParallaxConfig} from "../../helpers/parallax.directive";
import {ComicvineCharacterDetailService} from "../../services/comicvine-character-detail.service";

@Component({
  selector:'character-detail',
  directives:[Parallax],
  providers:[ComicvineCharacterDetailService],
  templateUrl:'marvel-app/modules/comicvine-character-detail/comicvine-character-detail.component.html'
})

export class ComicvineCharacterDetail{
  private character = {};
  private id;
  private errorMessage: string;
  private name:string;

  constructor(private _characterDetailService:ComicvineCharacterDetailService,params:RouteParams) {
    this.id = params.get('id');
    this.name = params.get('name');
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
