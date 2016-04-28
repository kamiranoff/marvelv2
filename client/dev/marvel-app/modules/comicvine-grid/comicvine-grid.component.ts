import {Component,ElementRef,EventEmitter,Output,Input} from "angular2/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {CharactersService} from "../../services/characters.service";
import {GetAverageRgb} from "../../helpers/get-average-rgb.helper";
import {} from "angular2/core";



@Component({
  selector:'comicvine-grid',
  inputs:['characters'],
  directives:[ROUTER_DIRECTIVES],
  templateUrl:"marvel-app/modules/comicvine-grid/comicvine-grid.component.html"
})

export class ComicvineCharGrid{
  private characters = [];
  @Input() private loadMoreChar:boolean;
  @Output() onBottomOfPage:EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  onScroll () {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      this.onBottomOfPage.emit("on the bottom");
    }

  }

  changeTitleColorOnHover(idx,elm){
    var img = elm.currentTarget.getElementsByTagName("img")[0];
    var imageColor = GetAverageRgb.getAverageRGB(img);
    var rgbImageColor = "rgb("+imageColor.r+","+imageColor.g+","+imageColor.b+")";
    this.characters[idx].dominantColor= rgbImageColor;
  }
}





