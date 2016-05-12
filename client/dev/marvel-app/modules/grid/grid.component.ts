import {Component,ElementRef,EventEmitter,Output,Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CharactersService} from "../../services/characters.service";
import {GetAverageRgb} from "../../helpers/get-average-rgb.helper";

@Component({
  selector:'grid',
  inputs:['elems'],
  directives:[ROUTER_DIRECTIVES],
  templateUrl:"marvel-app/modules/grid/grid.component.html"
})

export class Grid{
  private elems = [];
  @Input() private page;
  @Input() private loadMoreElem:boolean;
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
    this.elems[idx].dominantColor= rgbImageColor;
  }
}





