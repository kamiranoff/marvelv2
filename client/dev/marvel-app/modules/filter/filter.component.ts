import {Component,Input,Output,EventEmitter} from "angular2/core";
import {CategoriesService} from "../../services/categories-service";

@Component({
  selector:'filter',
  inputs:['categories'],
  providers:[CategoriesService],
  templateUrl:"marvel-app/modules/filter/filter.component.html"

})

export class FilterComponent{
  private categories = [];
  private filter:Array<any> = [];

  constructor(private _categoriesService:CategoriesService){};

  @Output() private onFilterChanged:EventEmitter<any> = new EventEmitter();

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
