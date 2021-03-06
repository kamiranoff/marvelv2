import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Router} from  '@angular/router-deprecated';
@Component({
  selector:'navbar',
  directives:[ROUTER_DIRECTIVES],
  templateUrl:'marvel-app/modules/navbar/navbar.component.html'
})

export class NavbarComponent{
  private isVisible = false;
  toggleNavigation(){
    this.isVisible = !this.isVisible;
  };

  constructor(private router: Router) {
    router.subscribe(() => {
      if(this.isVisible){
        this.toggleNavigation()
      }

    })
  }
}
