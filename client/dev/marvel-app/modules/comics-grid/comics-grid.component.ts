import {Component,Input,Output,EventEmitter} from "angular2/core";
import {GetAverageRgb} from "../../helpers/get-average-rgb.helper";
@Component({
  selector:'comics-grid',
  inputs:['comics'],
  templateUrl:'marvel-app/modules/comics-grid/comics-grid.component.html'
})

export class ComicsGrid{
  private comics = [];
  @Input() private loadMoreComics:boolean;
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
    this.comics[idx].dominantColor= rgbImageColor;
  }
}
