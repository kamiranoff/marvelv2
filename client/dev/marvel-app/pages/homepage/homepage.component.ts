import {Component,Input,EventEmitter} from "angular2/core";
import {CharactersGrid} from "../../modules/characters-grid/characters-grid.component";

@Component({
  selector:'homepage',
  directives:[CharactersGrid],
  template:`

    <characters-grid></characters-grid>
  `
})

export class Homepage{
}
