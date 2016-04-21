import {Component} from "angular2/core";
@Component({
  selector:'filter',
  templateUrl:"marvel-app/modules/filter/filter.component.html"

})

export class FilterComponent{
 private categories = [
   {
     name:'Heroes'
   },
   {
     name:'Villains'
   },
   {
     name:'Women'
   },
   {
     name:'X-Men'
   }
 ]
}
