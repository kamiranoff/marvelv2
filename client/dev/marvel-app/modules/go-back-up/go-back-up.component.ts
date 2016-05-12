import {Component} from "@angular/core";
@Component({
  selector:'go-back-up',
  template:`
    <div (click)="onClick()" class="go-back-up">
      <span class="icon icon-arrow-up"></span>
    </div>
  `
})


export class GoBackUpComponent{

  private timeOut;
  onClick(){
    var fullHeight =  document.body.scrollTop;
    this.scrollToTop(fullHeight);
  }

  scrollToTop(heightWhenClicked) {
    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
     var x =  (heightWhenClicked - document.body.scrollTop) / heightWhenClicked;
      window.scrollBy(0,-50);
      this.timeOut = setTimeout(() => {
        (this.scrollToTop(heightWhenClicked));

      },(Math.cos(Math.PI * x) + 1) / 2);
    }else{
      clearTimeout(this.timeOut);

    }

  }

}
