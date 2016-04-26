import {Component,Input,Output,EventEmitter} from "angular2/core";
import {CategoriesService} from "../../services/categories-service";
import {ReplacePipe} from "../../pipes/replace.pipe";


@Component({
  selector:'filter',
  inputs:['categories'],
  pipes:[ReplacePipe],
  providers:[CategoriesService],
  templateUrl:"marvel-app/modules/filter/filter.component.html"

})

export class FilterComponent{
  private categories = [];
  private filter:Array<any> = [];
  private isVisible = false;

  constructor(private _categoriesService:CategoriesService){};

  @Output() private onFilterChanged:EventEmitter<any> = new EventEmitter();

  toggleFilter(){
    this.isVisible = !this.isVisible;
  };

  onFilterClicked(category){
    var categoryName = category.name;
    var indexOfCategory = this.filter.indexOf(categoryName);
    if( indexOfCategory !== -1){
      this.filter.splice(indexOfCategory,1);
      category.selected=false;
    }else{
      this.filter.push(categoryName);
      category.selected=true;
    }


    this.onFilterChanged.emit(this.filter);

  }

}
