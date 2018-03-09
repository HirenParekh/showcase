import {Component} from '@angular/core';
import {AppProjectBase} from '../app-project-base.model';

@Component({
  selector: 'app-css-position',
  templateUrl: './css-position.component.html',
  styleUrls: ['./css-position.component.css']
})
export class CssPositionComponent extends AppProjectBase {
  constructor() {
    super();
    this.addDependencies();
  }

  addDependencies() {
    this.addLinkTagToElementDOM('assets/css-position/css/style.css');
    this.addScriptTagToElementDOM('assets/css-position/js/scrollbar.js');
    this.addScriptTagToElementDOM('assets/common/js/bootstrap.min.js');
    this.addScriptTagToElementDOM('assets/css-position/js/script.js');
  }
}
