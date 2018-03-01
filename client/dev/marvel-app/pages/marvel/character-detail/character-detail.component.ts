import { Component } from "@angular/core";
import { RouteParams } from '@angular/router-deprecated';

import { CharacterDetailService } from "../../../services/marvel/character-detail.service";
import { Parallax } from "../../../helpers/parallax.directive";
import { MakeLinksPipe } from "../../../pipes/make-links.pipe";
import { BreakLinesPipe } from "../../../pipes/break-lines.pipe";
import { MakeTitlesPipe } from "../../../pipes/makeTitles.pipe";


@Component({
  selector: 'character-detail',
  pipes: [MakeLinksPipe, BreakLinesPipe, MakeTitlesPipe],
  directives: [Parallax],
  providers: [CharacterDetailService],
  templateUrl: 'marvel-app/pages/marvel/character-detail/character-detail.component.html'
})

export class CharacterDetail {
  private character = {};
  private id;
  private errorMessage: string;
  private name: string;

  constructor(private _characterDetailService: CharacterDetailService, params: RouteParams) {
    this.id = params.get('id');
    this.name = params.get('name');
    this.getCharacterDetail(this.id);
    this.saveCharacterDetail(this.name);
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }

  saveCharacterDetail(name) {


    this._characterDetailService.saveCharWithName(name)
      .subscribe(
        () => {
          console.log('success');
        },
        error => {
          this.errorMessage = <any>error;
          console.log('error', error);
        }
      );

  }

  getCharacterDetail(id) {
    this._characterDetailService.getCharacterById(id)
      .subscribe(
        character => {
          this.character = character[0].character;
        },
        error => this.errorMessage = <any>error
      );

  }

}
