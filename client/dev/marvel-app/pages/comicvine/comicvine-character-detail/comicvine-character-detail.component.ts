import {Component} from "@angular/core";
import {RouteParams} from '@angular/router-deprecated';


import {Parallax,ParallaxConfig} from "../../../helpers/parallax.directive";
import {ComicvineCharacterDetailService} from "../../../services/comicvine/comicvine-character-detail.service";
import {LoadImagesPipe} from "../../../pipes/load-images.pipe";
import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";
import {MakeComicvineLinksPipe} from "../../../pipes/make-comicvine-links";

@Component({
  selector:'character-detail',
  directives:[Parallax,GoBackUpComponent],
  pipes:[LoadImagesPipe,MakeComicvineLinksPipe],
  providers:[ComicvineCharacterDetailService],
  templateUrl:'marvel-app/pages/comicvine/comicvine-character-detail/comicvine-character-detail.component.html'
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
    this.saveCharacterDetail(this.name);
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

  saveCharacterDetail(name){


    this._characterDetailService.saveCharWithName(name)
      .subscribe(
        () => {
          console.log('success');
        },
        error => {
          this.errorMessage = <any>error;
          console.log('error',error);
        }
      );

  }

}
