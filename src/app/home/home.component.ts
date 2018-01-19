import {Component} from '@angular/core';
import {AppProjectBase} from '../app-project-base.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppProjectBase {
  constructor() {
    super();
  }
}
