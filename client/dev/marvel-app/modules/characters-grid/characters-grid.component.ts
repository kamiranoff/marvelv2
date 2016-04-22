import {Component,ElementRef} from "angular2/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {CharactersService} from "../../services/characters.service";
import {GetAverageRgb} from "../../helpers/get-average-rgb.helper";


@Component({
  selector:'characters-grid',
  inputs:['characters'],
  directives:[ROUTER_DIRECTIVES],
  templateUrl:"marvel-app/modules/characters-grid/characters-grid.component.html"
})

export class CharactersGrid{
  private characters = [];


  constructor() {

  }


  changeTitleColorOnHover(idx,elm){
    var img = elm.currentTarget.getElementsByTagName("img")[0];
    var imageColor = GetAverageRgb.getAverageRGB(img);
    var rgbImageColor = "rgb("+imageColor.r+","+imageColor.g+","+imageColor.b+")";
    this.characters[idx].dominantColor= rgbImageColor;
  }
}





