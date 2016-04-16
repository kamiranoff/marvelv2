import {Component} from 'angular2/core'

@Component({
  selector:'header-component',
  styleUrls:['header.css'],
  templateUrl:"marvel-app/modules/header/header.component.html"
})

export class HeaderComponent {
  title="Marvel Encyclopedia";
  subtitle="With great powers comes great responsabilities";
}
